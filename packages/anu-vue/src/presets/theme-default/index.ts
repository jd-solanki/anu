import type { CSSEntries, Preset } from 'unocss'

export const colors = ['primary', 'success', 'info', 'warning', 'danger']

export function presetThemeDefault(): Preset {
  return {
    name: '@anu-vue/preset-theme-default',
    theme: {
      colors: {
        primary: 'hsl(var(--primary))',
        success: 'hsl(var(--success))',
        info: 'hsl(var(--info))',
        warning: 'hsl(var(--warning))',
        danger: 'hsl(var(--danger))',
        a: { border: 'hsla(var(--base-color),var(--border-opacity))' },
      },
      fontSize: {
        rxs: ['0.75em', '1em'],
        rsm: ['0.875em', '1.25em'],
        rbase: ['1em', '1.5em'],
        rlg: ['1.125em', '1.75em'],
        rxl: ['1.25em', '1.75em'],
        r2xl: ['1.5em', '2em'],
        r3xl: ['1.875em', '2.25em'],
        r4xl: ['2.25em', '2.5em'],
        r5xl: ['3em', '1em'],
        r6xl: ['3.75em', '1em'],
        r7xl: ['4.5em', '1em'],
        r8xl: ['6em', '1em'],
        r9xl: ['8em', '1em'],
      },
    },
    safelist: [
      ...colors.map(c => `bg-${c}`),
      ...colors.map(c => `hover:bg-${c}`),

      ...colors.map(c => `border-${c}`),
      ...colors.map(c => `text-${c}`),
      ...colors.map(c => `shadow-${c}`),
      ...colors.map(c => `after:bg-${c}`),
      ...colors.map(c => `next:checked:bg-${c}`),
      ...colors.map(c => `next:checked:border-${c}`),

      // Typography
      ...colors.map(c => `typography-title-${c}`),
      ...colors.map(c => `typography-subtitle-${c}`),
      ...colors.map(c => `typography-text-${c}`),
    ],
    rules: [
      // Typography
      [
        /^typography-(\w+)-(\w+)$/,
        ([, type, c]: string[]) => ({
          [`--typography-${type}-color`]: `var(--${c})`,
        }),
      ],
      [
        /^typography-(\w+)-opacity-(\d+)$/,
        ([, type, o]: string[]) => ({
          [`--typography-${type}-opacity`]: `${Number(o) * 0.01}`,
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

      // [
      //   'card-heading', {
      //     '--typography-title-color': 'var(--base-color)',
      //     '--typography-subtitle-color': 'var(--base-color)',
      //     '--typography-text-color': 'var(--base-color)',
      //   },
      // ],
    ],
    shortcuts: [
      {
        // Grid
        'grid-row': 'grid gap-6 place-items-start w-full',

        // Button
        'btn': 'px-[1em] font-medium rounded-[0.5em] gap-x-[0.5em] h-[2.5em] whitespace-nowrap',
        'btn-icon-only': 'font-medium rounded-lg h-[2.5em] w-[2.5em] i:em:text-lg',

        // Alert
        'alert': 'p-4 font-medium rounded-lg w-full gap-x-2',

        // Card
        'card-spacer': 'p-5',
        'card-content-spacer': 'flex flex-col items-start gap-y-4',
        'card-body': 'card-spacer card-content-spacer',

        'text-high-emphasis': 'text-[hsla(var(--base-color),var(--text-emphasis-high-opacity))]',
        'text-medium-emphasis': 'text-[hsla(var(--base-color),var(--text-emphasis-medium-opacity))]',
        'text-light-emphasis': 'text-[hsla(var(--base-color),var(--text-emphasis-light-opacity))]',

        // States
        'states': '\
        relative \
        before:content-empty \
        before:absolute \
        before:inset-0 \
        before:rounded-inherit \
        before:bg-current-color \
        before:opacity-0 \
        \
        before:transition \
        before:duration-200 \
        before:ease-in-out \
        \
        hover:before:opacity-15',
      },
    ],
    variants: [
      // `em:` variant converts rem unit into em
      (matcher: string) => {
        if (!matcher.startsWith('em:'))
          return matcher

        return {
          // slice `em:` prefix and passed to the next variants and rules
          matcher: matcher.slice(3),
          body: (body: CSSEntries) => {
            body.forEach(v => {
              // v[1] can also be number
              if (typeof v[1] === 'string' && v[1].endsWith('rem'))
                v[1] = `${v[1].slice(0, -3)}em`
            })

            return body
          },
        }
      },
    ],
  }
}
