import type { Preset } from '@unocss/core'

const rules: Preset['rules'] = [
  // Spacing
  [
    /^spacing-(\d+)$/,
    ([, d]) => ({ '--a-spacing': (Number(d) / 100) }),
  ],

  // Typography
  [
    /^a-(title|subtitle)-([-\w]+)$/,
    ([, type, c]: string[]) => ({
      [`--a-${type}-c`]: `var(--a-${c})`,
    }),
  ],
  [
    /^a-(title|subtitle)-opacity-(\d+)$/,
    ([, type, o]: string[]) => ({
      [`--a-${type}-opacity`]: `${Number(o) * 0.01}`,
    }),
  ],
]

export { rules }
