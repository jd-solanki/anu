import type { Preset } from '@unocss/core'

const rules: Preset['rules'] = [
  // Spacing
  [
    /^spacing-(\d+)$/,
    ([, d]) => ({ '--a-spacing': (Number(d) / 100) }),
  ],

  // Typography
  [
    /^typography-(\w+)-([-\w]+)$/,
    ([, type, c]: string[]) => ({
      [`--a-typography-${type}-color`]: `var(--a-${c})`,
    }),
  ],
  [
    /^typography-(\w+)-opacity-(\d+)$/,
    ([, type, o]: string[]) => ({
      [`--a-typography-${type}-opacity`]: `${Number(o) * 0.01}`,
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
