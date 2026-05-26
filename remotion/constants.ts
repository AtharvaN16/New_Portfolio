export const FPS = 30

// Beat boundaries (frames)
export const BEAT1_START = 0
export const BEAT1_END   = 120  // 4s
export const BEAT2_START = 120
export const BEAT2_END   = 390  // 9s
export const BEAT3_START = 390
export const BEAT3_END   = 540  // 5s
export const BEAT4_START = 540
export const BEAT4_END   = 720  // 6s
export const TOTAL_FRAMES = BEAT4_END

// Spring presets
export const SPRING_GENTLE = { mass: 1, stiffness: 60, damping: 14 } as const
export const SPRING_SNAPPY = { mass: 1, stiffness: 80, damping: 18 } as const
export const SPRING_GRID   = { mass: 1, stiffness: 65, damping: 15 } as const
export const SPRING_CARD   = { mass: 1, stiffness: 70, damping: 16 } as const

// Brand colours
export const GRAD_START = '#225432'
export const GRAD_END   = '#36A459'
export const GRAD_CSS   = `linear-gradient(295deg, ${GRAD_START} 11.56%, ${GRAD_END} 88.84%)`

// Beat 2 — scroll animation (frames within beat, absolute)
export const B2_SLIDE_IN_START  = BEAT2_START          // 120
export const B2_SLIDE_IN_END    = BEAT2_START + 30     // 150
export const B2_SCROLL_START    = BEAT2_START + 60     // 180
export const B2_SCROLL_END      = BEAT2_START + 210    // 330
export const B2_CURSOR_ENTER    = BEAT2_START + 180    // 300
export const B2_SIDEBAR_CLICK   = BEAT2_START + 210    // 330
export const B2_BOOKMARK_MOVE   = BEAT2_START + 225    // 345
export const B2_BOOKMARK_CLICK  = BEAT2_START + 240    // 360

// Beat 3 — card animation (frames, absolute)
export const B3_SCREEN_OUT_END  = BEAT3_START + 18     // 408
export const B3_CARD_SLIDE_END  = BEAT3_START + 55     // 445
export const B3_ROWS_START      = BEAT3_START + 55     // 445
export const B3_ROWS_PER_FRAME  = 2

// Beat 4 — grid (frames, absolute)
export const B4_CARD_DOWN_END   = BEAT4_START + 18     // 558
export const B4_FLY_IN_START    = BEAT4_START + 27     // 567
export const B4_FLY_IN_END      = BEAT4_START + 87     // 627
export const B4_HOLD_END        = BEAT4_START + 147    // 687
export const B4_FADE_END        = BEAT4_END            // 720
