import type { Preset } from 'unocss'

export function presetCore(): Preset {
  return {
    name: '@anu-vue/preset-core',
    variants: [
      (matcher: string) => {
        if (!matcher.startsWith('i:'))
          return matcher

        return {
          // slice `i:` prefix and passed to the next variants and rules
          matcher: matcher.slice(2),
          selector: (s: string) => `${s} > i`,
        }
      },
    ],
  }
}
