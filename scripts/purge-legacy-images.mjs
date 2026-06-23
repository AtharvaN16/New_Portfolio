#!/usr/bin/env node
/**
 * Delete legacy PNG/JPG/WebP under public/images when:
 * - a matching .avif exists, AND
 * - no file in the repo references the legacy path
 *
 * Dry-run by default. Pass --execute to delete.
 *
 *   node scripts/purge-legacy-images.mjs
 *   node scripts/purge-legacy-images.mjs --execute
 */

import { existsSync, readFileSync, readdirSync, statSync, unlinkSync } from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const PUBLIC_IMAGES = path.join(ROOT, 'public', 'images')
const EXECUTE = process.argv.includes('--execute')
const SCAN_DIRS = ['src', 'remotion', 'tests', 'scripts']
const SCAN_EXTENSIONS = new Set([
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.css',
  '.md',
  '.mdx',
  '.html',
  '.json',
])
const LEGACY_EXT = /\.(png|jpe?g|webp)$/i
const REF_PATTERN = /\/images\/[^"')\s]+\.(?:png|jpe?g|webp|avif)/gi

function toPosix(value) {
  return value.split(path.sep).join('/')
}

function walkFiles(dir, predicate, files = []) {
  if (!existsSync(dir)) return files
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

function collectReferencedLegacyPaths() {
  const refs = new Set()
  for (const dir of SCAN_DIRS) {
    const files = walkFiles(path.join(ROOT, dir), (file) =>
      SCAN_EXTENSIONS.has(path.extname(file))
    )
    for (const file of files) {
      const source = readFileSync(file, 'utf8')
      for (const match of source.matchAll(REF_PATTERN)) {
        const ref = match[0]
        if (LEGACY_EXT.test(ref)) refs.add(ref)
      }
      // Dynamic template paths e.g. `${i + 1}.png` — flag directory patterns
      if (source.includes('/images/') && /\.png|\.jpe?g|\.webp/.test(source)) {
        const dynamic = source.match(
          /\/images\/[a-zA-Z0-9_\-/]+(?:\$\{[^}]+\}|\+)[^"'\s]*\.(?:png|jpe?g|webp)/g
        )
        dynamic?.forEach((fragment) => refs.add(`__DYNAMIC__${fragment}`))
      }
    }
  }
  return refs
}

function listLegacyRasterFiles() {
  return walkFiles(PUBLIC_IMAGES, (file) =>
    LEGACY_EXT.test(path.extname(file).toLowerCase())
  )
}

function formatBytes(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)}MB`
}

const referenced = collectReferencedLegacyPaths()
const legacyFiles = listLegacyRasterFiles()

const toDelete = []
const skipped = {
  referenced: [],
  noAvif: [],
}

for (const filePath of legacyFiles) {
  const publicRef = `/${toPosix(path.relative(path.join(ROOT, 'public'), filePath))}`
  const avifPath = filePath.replace(LEGACY_EXT, '.avif')

  if ([...referenced].includes(publicRef)) {
    skipped.referenced.push(publicRef)
    continue
  }

  if (!existsSync(avifPath)) {
    skipped.noAvif.push(publicRef)
    continue
  }

  toDelete.push({ filePath, publicRef, bytes: statSync(filePath).size })
}

toDelete.sort((a, b) => b.bytes - a.bytes)
const totalBytes = toDelete.reduce((sum, item) => sum + item.bytes, 0)

console.log(EXECUTE ? 'Executing purge…' : 'Dry run — pass --execute to delete\n')
console.log(`Legacy files scanned: ${legacyFiles.length}`)
console.log(`Safe to delete: ${toDelete.length} (${formatBytes(totalBytes)})`)
console.log(`Skipped (still referenced): ${skipped.referenced.length}`)
console.log(`Skipped (no AVIF twin): ${skipped.noAvif.length}\n`)

if (skipped.referenced.length > 0) {
  console.log('Still referenced:')
  skipped.referenced.slice(0, 20).forEach((ref) => console.log(`  ${ref}`))
  if (skipped.referenced.length > 20) {
    console.log(`  …and ${skipped.referenced.length - 20} more`)
  }
  console.log()
}

console.log('Largest deletions:')
toDelete.slice(0, 15).forEach(({ publicRef, bytes }) => {
  console.log(`  ${publicRef} (${formatBytes(bytes)})`)
})
if (toDelete.length > 15) console.log(`  …and ${toDelete.length - 15} more`)

if (!EXECUTE) {
  console.log('\nRun: bun run images:purge -- --execute')
  process.exit(0)
}

let deleted = 0
for (const { filePath, publicRef, bytes } of toDelete) {
  unlinkSync(filePath)
  deleted++
  console.log(`deleted ${publicRef} (${formatBytes(bytes)})`)
}

console.log(`\nDeleted ${deleted} files, freed ${formatBytes(totalBytes)}.`)
