import type { CSSProperties } from 'react'

/** Shared mount — sits below the word without affecting line box height. */
export const PRONUNCIATION_SCRIBBLE_MOUNT_STYLE: CSSProperties = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: '100%',
  marginTop: '2px',
  height: '12px',
  pointerEvents: 'none',
  overflow: 'visible',
}
