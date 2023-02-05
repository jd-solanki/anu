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
      [`--a-${type}-color`]: `var(--a-${c})`,
    }),
  ],
  [
    /^a-(title|subtitle)-opacity-(\d+)$/,
    ([, type, o]: string[]) => ({
      [`--a-${type}-opacity`]: `${Number(o) * 0.01}`,
    }),
  ],

  [
    'overlay',
    {
      position: 'absolute',
      inset: 0,
      content: '\'\'',
      background: 'currentColor',
      opacity: 0,
    },
  ],
]

export { rules }
