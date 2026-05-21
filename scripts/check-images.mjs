#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'

const ROOT = process.cwd()
const CHECK_ALL = process.argv.includes('--all')
const SOURCE_EXTENSIONS = new Set(['.ts', '.tsx', '.md', '.mdx', '.css'])
const RASTER_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif'])
const LEGACY_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg'])
const MODERN_EXTENSIONS = new Set(['.webp', '.avif'])
const LARGE_LEGACY_BYTES = 750 * 1024
const MAX_LEGACY_BYTES = 1024 * 1024
const LARGE_MODERN_BYTES = 2500 * 1024

const imageRefPattern = /\/images\/[^"')\s]+\.(?:png|jpe?g|webp|avif|svg|mp4)/gi

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

function gitOutput(command) {
  try {
    return execSync(command, { cwd: ROOT, encoding: 'utf8' })
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
  } catch {
    return []
  }
}

function changedFiles() {
  const files = new Set([
    ...gitOutput('git diff --name-only'),
    ...gitOutput('git diff --cached --name-only'),
  ])

  for (const line of gitOutput('git status --short')) {
    const file = line.slice(3).trim()
    if (file) files.add(file)
  }

  return [...files].map((file) => path.join(ROOT, file))
}

function sourceFilesToCheck() {
  if (CHECK_ALL) {
    return walkFiles(path.join(ROOT, 'src'), (file) =>
      SOURCE_EXTENSIONS.has(path.extname(file))
    )
  }

  return changedFiles().filter((file) => {
    const relative = toPosix(path.relative(ROOT, file))
    return relative.startsWith('src/') && SOURCE_EXTENSIONS.has(path.extname(file))
  })
}

function publicImagesToCheck() {
  const files = CHECK_ALL
    ? walkFiles(path.join(ROOT, 'public/images'), (file) =>
        RASTER_EXTENSIONS.has(path.extname(file).toLowerCase())
      )
    : changedFiles().filter((file) => {
        const relative = toPosix(path.relative(ROOT, file))
        return (
          relative.startsWith('public/images/') &&
          RASTER_EXTENSIONS.has(path.extname(file).toLowerCase())
        )
      })

  return files.filter((file) => existsSync(file))
}

function formatBytes(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(1)}MB`
}

function smallerAdjacentModernAsset(publicPath) {
  const currentSize = statSync(publicPath).size
  const parsed = path.parse(publicPath)
  return [...MODERN_EXTENSIONS]
    .map((ext) => path.join(parsed.dir, `${parsed.name}${ext}`))
    .find(
      (candidate) =>
        existsSync(candidate) && statSync(candidate).size < currentSize
    )
}

const errors = []
const warnings = []
const referencedAssets = new Set()

for (const file of sourceFilesToCheck()) {
  if (!existsSync(file)) continue
  if (file.includes('.example.')) continue
  const source = readFileSync(file, 'utf8')
  for (const match of source.matchAll(imageRefPattern)) {
    const publicRef = match[0]
    const assetPath = path.join(ROOT, 'public', publicRef)
    referencedAssets.add(assetPath)

    if (!existsSync(assetPath)) {
      errors.push(`${toPosix(path.relative(ROOT, file))}: missing ${publicRef}`)
      continue
    }

    const extension = path.extname(assetPath).toLowerCase()
    if (!LEGACY_EXTENSIONS.has(extension)) continue

    const size = statSync(assetPath).size
    const modern = smallerAdjacentModernAsset(assetPath)

    if (size > MAX_LEGACY_BYTES && modern) {
      errors.push(
        `${publicRef} is ${formatBytes(size)}. Reference WebP/AVIF instead${
          modern ? `: /${toPosix(path.relative(path.join(ROOT, 'public'), modern))}` : '.'
        }`
      )
    } else if (size > LARGE_LEGACY_BYTES) {
      warnings.push(
        `${publicRef} is ${formatBytes(size)}. Prefer WebP/AVIF if it is smaller and visually equivalent.`
      )
    }
  }
}

for (const file of publicImagesToCheck()) {
  const extension = path.extname(file).toLowerCase()
  const size = statSync(file).size
  const publicRef = `/${toPosix(path.relative(path.join(ROOT, 'public'), file))}`

  if (LEGACY_EXTENSIONS.has(extension) && size > MAX_LEGACY_BYTES) {
    const modern = smallerAdjacentModernAsset(file)
    if (modern && !CHECK_ALL) {
      errors.push(
        `${publicRef} is ${formatBytes(size)}. Reference smaller WebP/AVIF (${toPosix(path.relative(ROOT, modern))}).`
      )
    } else {
      warnings.push(
        `${publicRef} is ${formatBytes(size)}. ${
          modern
            ? `Smaller modern asset exists: ${toPosix(path.relative(ROOT, modern))}.`
            : 'Add WebP/AVIF only if it is smaller and visually equivalent.'
        }`
      )
    }
  }

  if (MODERN_EXTENSIONS.has(extension) && size > LARGE_MODERN_BYTES) {
    warnings.push(
      `${publicRef} is ${formatBytes(size)} even after optimization. Confirm it needs full resolution.`
    )
  }
}

for (const assetPath of referencedAssets) {
  if (!existsSync(assetPath)) continue
  const extension = path.extname(assetPath).toLowerCase()
  const size = statSync(assetPath).size
  if (MODERN_EXTENSIONS.has(extension) && size > LARGE_MODERN_BYTES) {
    warnings.push(
      `Referenced ${`/${toPosix(path.relative(path.join(ROOT, 'public'), assetPath))}`} is ${formatBytes(size)}. Confirm it needs full resolution.`
    )
  }
}

for (const warning of [...new Set(warnings)]) {
  console.warn(`Image warning: ${warning}`)
}

if (errors.length > 0) {
  for (const error of [...new Set(errors)]) {
    console.error(`Image error: ${error}`)
  }
  process.exit(1)
}

// eslint-disable-next-line no-console -- Success output is useful in local and CI logs.
console.log(
  CHECK_ALL
    ? 'Image check passed for all source references and public images.'
    : 'Image check passed for changed source references and image assets.'
)
