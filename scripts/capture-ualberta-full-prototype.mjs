#!/usr/bin/env node
/** Delegates to capture-ualberta-prototypes.mjs (captures all UAlberta prototypes). */
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const script = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  'capture-ualberta-prototypes.mjs'
)
const result = spawnSync(process.execPath, [script], { stdio: 'inherit' })
process.exit(result.status ?? 1)
