#!/usr/bin/env node
/**
 * Captures full-page prototype images (inner screen only, no green frame).
 * Run: bun run dev → node scripts/capture-ualberta-prototypes.mjs
 */
import { chromium } from 'playwright'
import { execSync } from 'node:child_process'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const OUT_DIR = path.join(
  ROOT,
  'public/images/case-studies/ualberta-library-website'
)
const ARCHIVE_DIR = path.join(ROOT, 'user provided assets/UofA')
const META_JSON = path.join(OUT_DIR, 'prototype-captures.meta.json')
const BASE_URL = process.env.CAPTURE_BASE_URL ?? 'http://localhost:3000'
const CASE_STUDY_URL = `${BASE_URL}/case-studies/ualberta-library-website`

const VIEWPORT = { width: 1440, height: 900 }
const DEVICE_SCALE = 2

const CAPTURES = [
  {
    kind: 'services',
    fileBase: 'full-experience-prototype',
    paneSelector:
      '#ualberta-final-solution > div > div > div[data-lenis-prevent="true"]',
  },
  {
    kind: 'hours',
    fileBase: 'full-hours-locations-prototype',
    paneSelector:
      '#ualberta-hours-prototype > div > div > div[data-lenis-prevent="true"]',
  },
  {
    kind: 'guides',
    fileBase: 'full-subject-guides-prototype',
    paneSelector:
      '#ualberta-subject-guides-prototype > div > div > div[data-lenis-prevent="true"]',
  },
]

async function capturePrototype(page, target) {
  const prototypePane = page.locator(target.paneSelector)
  await prototypePane.waitFor({ state: 'visible', timeout: 60_000 })
  await prototypePane.scrollIntoViewIfNeeded()
  await page.waitForTimeout(1200)

  const captureHeight = await prototypePane.evaluate((pane, kind) => {
    const paneTop = pane.getBoundingClientRect().top
    const width = pane.offsetWidth

    let captureHeight = pane.clientHeight
    if (kind === 'services') {
      const directoryRoot = pane.querySelector(
        '.flex.flex-col.bg-white.overflow-hidden.w-full.border-none'
      )
      if (directoryRoot) {
        captureHeight = Math.min(
          pane.scrollHeight,
          Math.ceil(directoryRoot.getBoundingClientRect().bottom - paneTop + 32)
        )
      }
    } else if (kind === 'hours') {
      const sidebar = pane.querySelector('aside')
      const jumpLinks = pane.querySelector('main .mb-10')
      let bottom = 0

      if (sidebar) {
        const sidebarScroll =
          sidebar.querySelector('.flex-1.overflow-y-auto') ?? sidebar
        const sidebarTop = sidebar.getBoundingClientRect().top - paneTop
        bottom = sidebarTop + sidebarScroll.scrollHeight + 24
      }

      if (jumpLinks) {
        bottom = Math.max(
          bottom,
          jumpLinks.getBoundingClientRect().bottom - paneTop + 32
        )
      } else {
        bottom = pane.clientHeight
      }

      captureHeight = Math.min(pane.scrollHeight, Math.ceil(bottom))
    } else if (kind === 'guides') {
      const scrollArea = pane.querySelector('.flex-1.overflow-y-auto')

      if (scrollArea) {
        scrollArea.style.height = 'auto'
        scrollArea.style.maxHeight = 'none'
        scrollArea.style.overflow = 'visible'
        const top = scrollArea.getBoundingClientRect().top - paneTop
        captureHeight = Math.min(
          pane.scrollHeight,
          Math.ceil(top + scrollArea.scrollHeight + 32)
        )
      }

    }

    pane.style.height = `${captureHeight}px`
    pane.style.maxHeight = `${captureHeight}px`
    pane.style.overflow = 'hidden'
    pane.style.flexShrink = '0'

    document.getElementById('prototype-fullpage-capture')?.remove()

    const host = document.createElement('div')
    host.id = 'prototype-fullpage-capture'
    host.style.cssText = [
      'position:fixed',
      'inset:0',
      'z-index:2147483647',
      'background:#ffffff',
      'display:flex',
      'align-items:flex-start',
      'justify-content:center',
      'overflow:hidden',
    ].join(';')

    const scaler = document.createElement('div')
    scaler.id = 'prototype-fullpage-capture-scaler'
    scaler.style.transformOrigin = 'top center'
    scaler.style.width = `${width}px`
    scaler.style.height = `${captureHeight}px`
    scaler.style.overflow = 'hidden'

    document.body.appendChild(host)
    scaler.appendChild(pane)
    host.appendChild(scaler)

    const pad = 24
    const scale = Math.min(
      (window.innerWidth - pad * 2) / width,
      (window.innerHeight - pad * 2) / captureHeight,
      1
    )
    scaler.style.transform = `scale(${scale})`

    return captureHeight
  }, target.kind)

  await page.waitForTimeout(500)

  const outPng = path.join(ARCHIVE_DIR, `${target.fileBase}.png`)
  const scaler = page.locator('#prototype-fullpage-capture-scaler')
  const box = await scaler.boundingBox()
  if (!box) throw new Error(`Could not measure bounds for ${target.fileBase}`)

  await page.screenshot({
    path: outPng,
    type: 'png',
    clip: { x: box.x, y: box.y, width: box.width, height: box.height },
  })

  const outWebp = path.join(OUT_DIR, `${target.fileBase}.webp`)
  if (existsSync('/opt/homebrew/bin/cwebp')) {
    execSync(`cwebp -lossless "${outPng}" -o "${outWebp}"`, { stdio: 'inherit' })
  }

  await page.evaluate(() => {
    document.getElementById('prototype-fullpage-capture')?.remove()
  })

  const dims = execSync(`sips -g pixelWidth -g pixelHeight "${outPng}"`, {
    encoding: 'utf8',
  })
  const width = Number(dims.match(/pixelWidth: (\d+)/)?.[1] ?? 0)
  const height = Number(dims.match(/pixelHeight: (\d+)/)?.[1] ?? 0)

  return { fileBase: target.fileBase, width, height, captureHeight }
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true })
  mkdirSync(ARCHIVE_DIR, { recursive: true })

  const browser = await chromium.launch()
  const page = await browser.newPage({
    viewport: VIEWPORT,
    deviceScaleFactor: DEVICE_SCALE,
  })

  await page.goto(CASE_STUDY_URL, { waitUntil: 'networkidle', timeout: 120_000 })

  const readMore = page.getByRole('button', { name: /read full case study/i })
  if (await readMore.isVisible().catch(() => false)) {
    await readMore.click()
    await page.waitForTimeout(800)
  }

  const results = []
  for (const target of CAPTURES) {
    console.log(`Capturing ${target.fileBase}…`)
    results.push(await capturePrototype(page, target))
  }

  await browser.close()
  writeFileSync(META_JSON, JSON.stringify(results, null, 2))

  for (const r of results) {
    console.log(`${r.fileBase}: ${r.width}×${r.height}`)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
