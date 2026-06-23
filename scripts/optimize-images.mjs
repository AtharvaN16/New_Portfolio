#!/usr/bin/env node
/**
 * Resize + re-encode referenced raster assets to AVIF (max 2560px wide).
 * Originals are preserved. Run: node scripts/optimize-images.mjs [--all]
 */

import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = process.cwd()
const PUBLIC = path.join(ROOT, 'public')
const MAX_WIDTH = 2560
const MAX_AVIF_BYTES = 2.5 * 1024 * 1024
const LEGACY_MIN_BYTES = 750 * 1024
const MODERN_MIN_BYTES = 1024 * 1024
const OUTPUT_EXT = '.avif'
const CHECK_ALL = process.argv.includes('--all')
const DRY_RUN = process.argv.includes('--dry-run')

const SOURCE_EXTENSIONS = new Set(['.ts', '.tsx', '.md', '.mdx', '.css'])
const RASTER_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif'])
const LEGACY_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg'])
const MODERN_EXTENSIONS = ['.avif', '.webp']
const imageRefPattern = /\/images\/[^"')\s]+\.(?:png|jpe?g|webp|avif)/gi

function toPosix(value) {
  return value.split(path.sep).join('/')
}

function walkFiles(dir, predicate, files = []) {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === '.next' || name === '.git') continue
    const filePath = path.join(dir, name)
    const stats = statSync(filePath)
    if (stats.isDirectory()) {
      walkFiles(filePath, predicate, files)
    } else if (predicate(filePath)) {
      files.push(filePath)
    }
  }
  return files
}

function formatBytes(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)}MB`
}

function absPath(publicRef) {
  return path.join(PUBLIC, publicRef.slice(1))
}

function referencedImagePaths() {
  const refs = new Set()
  const sourceFiles = walkFiles(path.join(ROOT, 'src'), (file) =>
    SOURCE_EXTENSIONS.has(path.extname(file))
  )

  for (const file of sourceFiles) {
    const source = readFileSync(file, 'utf8')
    for (const match of source.matchAll(imageRefPattern)) {
      refs.add(match[0])
    }
  }

  return [...refs].sort()
}

function allRasterPaths() {
  return walkFiles(path.join(PUBLIC, 'images'), (file) =>
    RASTER_EXTENSIONS.has(path.extname(file).toLowerCase())
  ).map((file) => `/${toPosix(path.relative(PUBLIC, file))}`)
}

function legacySiblings(publicPath) {
  const parsed = path.parse(publicPath)
  return [...LEGACY_EXTENSIONS]
    .map((ext) => path.join(parsed.dir, `${parsed.name}${ext}`))
    .filter((candidate) => existsSync(candidate))
}

function modernOutputPath(sourcePath) {
  return path.join(
    path.dirname(sourcePath),
    `${path.parse(sourcePath).name}${OUTPUT_EXT}`
  )
}

function pickSourcePath(publicRef) {
  const abs = absPath(publicRef)
  if (!existsSync(abs)) return null

  const legacies = legacySiblings(abs)
  if (legacies.length > 0) {
    return legacies.sort((a, b) => statSync(b).size - statSync(a).size)[0]
  }

  return abs
}

function shouldOptimize(publicRef, sourcePath) {
  const avifPath = modernOutputPath(sourcePath)
  const sourceSize = statSync(sourcePath).size
  const sourceExt = path.extname(sourcePath).toLowerCase()

  if (LEGACY_EXTENSIONS.has(sourceExt) && sourceSize >= LEGACY_MIN_BYTES) {
    return true
  }

  if (existsSync(avifPath)) {
    const avifSize = statSync(avifPath).size
    if (avifSize >= MODERN_MIN_BYTES) return true
    if (LEGACY_EXTENSIONS.has(sourceExt) && avifSize >= sourceSize * 0.85) {
      return true
    }
  }

  const refExt = path.extname(publicRef).toLowerCase()
  if (refExt === '.webp' && existsSync(absPath(publicRef)) && !existsSync(avifPath)) {
    return true
  }

  if (refExt === '.webp' && existsSync(absPath(publicRef))) {
    return statSync(absPath(publicRef)).size >= MODERN_MIN_BYTES
  }

  if (refExt === '.avif') {
    return existsSync(absPath(publicRef)) && statSync(absPath(publicRef)).size >= MODERN_MIN_BYTES
  }

  return false
}

async function encodeAvif(pipeline, sourceExt) {
  if (LEGACY_EXTENSIONS.has(sourceExt)) {
    const lossless = await pipeline
      .clone()
      .avif({ lossless: true, effort: 4 })
      .toBuffer()
    if (lossless.length <= MAX_AVIF_BYTES) return lossless
  }

  const quality = sourceExt === '.jpg' || sourceExt === '.jpeg' ? 55 : 58
  return pipeline.clone().avif({ quality, effort: 4 }).toBuffer()
}

async function optimizeOne(publicRef) {
  const sourcePath = pickSourcePath(publicRef)
  if (!sourcePath || !shouldOptimize(publicRef, sourcePath)) {
    return null
  }

  const outPath = modernOutputPath(sourcePath)
  const beforeBytes = existsSync(outPath)
    ? statSync(outPath).size
    : statSync(sourcePath).size

  const image = sharp(sourcePath, { failOn: 'none' })
  const meta = await image.metadata()
  const needsResize = (meta.width ?? 0) > MAX_WIDTH

  let pipeline = image.rotate()
  if (needsResize) {
    pipeline = pipeline.resize({
      width: MAX_WIDTH,
      withoutEnlargement: true,
      fit: 'inside',
    })
  }

  if (DRY_RUN) {
    return {
      publicRef,
      out: toPosix(path.relative(PUBLIC, outPath)),
      before: formatBytes(beforeBytes),
      after: '(dry-run)',
      resized: needsResize,
    }
  }

  const buffer = await encodeAvif(
    pipeline,
    path.extname(sourcePath).toLowerCase()
  )
  writeFileSync(outPath, buffer)

  return {
    publicRef,
    out: toPosix(path.relative(PUBLIC, outPath)),
    before: formatBytes(beforeBytes),
    after: formatBytes(buffer.length),
    resized: needsResize,
  }
}

function migrateReferences() {
  const sourceFiles = walkFiles(path.join(ROOT, 'src'), (file) =>
    SOURCE_EXTENSIONS.has(path.extname(file))
  )
  let replacements = 0

  for (const file of sourceFiles) {
    let source = readFileSync(file, 'utf8')
    let changed = false

    for (const match of source.matchAll(imageRefPattern)) {
      const ref = match[0]
      const ext = path.extname(ref).toLowerCase()
      if (ext === '.avif') continue

      const currentPath = absPath(ref)
      if (!existsSync(currentPath)) continue

      const avifRef = ref.replace(/\.(png|jpe?g|webp)$/i, '.avif')
      const avifPath = absPath(avifRef)
      if (!existsSync(avifPath)) continue

      if (ext !== '.webp') {
        const legacySize = statSync(currentPath).size
        const avifSize = statSync(avifPath).size
        if (avifSize >= legacySize && legacySize <= LEGACY_MIN_BYTES) continue
      }

      source = source.split(ref).join(avifRef)
      changed = true
      replacements += 1
    }

    if (changed && !DRY_RUN) {
      writeFileSync(file, source)
    }
  }

  return replacements
}

async function main() {
  if (process.argv.includes('--migrate-only')) {
    const migrated = DRY_RUN ? 0 : migrateReferences()
    console.log(`Updated ${migrated} source reference(s) to AVIF.`)
    return
  }

  const targets = CHECK_ALL ? allRasterPaths() : referencedImagePaths()
  const results = []

  for (const publicRef of targets) {
    try {
      const result = await optimizeOne(publicRef)
      if (result) results.push(result)
    } catch (error) {
      console.error(`Failed ${publicRef}:`, error.message)
    }
  }

  for (const result of results) {
    console.log(
      `${result.out}: ${result.before} → ${result.after}${result.resized ? ' (resized)' : ''}`
    )
  }

  const migrated = DRY_RUN ? 0 : migrateReferences()
  console.log(
    `\nOptimized ${results.length} asset(s) to AVIF. Updated ${migrated} source reference(s).`
  )
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
