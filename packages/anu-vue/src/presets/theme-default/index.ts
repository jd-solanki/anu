import type { CSSEntries, Preset } from '@unocss/core'
import { defu } from 'defu'

interface PresetOptions {
  shortcutOverrides?: Exclude<Preset['shortcuts'], undefined>
}

// TODO: Pass this to Anu plugin so that it can use the classes defined by theme preset
export const colors = ['primary', 'success', 'info', 'warning', 'danger'] as const
export type Colors = typeof colors

const themeShortcuts: Exclude<Preset['shortcuts'], undefined> = [
  // 👉 States
  [/^states:?(\d+)?$/, ([, op]) => `\
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
      hover:before:opacity-${op || 15}`,
  ],
  [
    /^a-drawer-anchor-(left|right|top|bottom)$/,
    ([, dir]) => {
      const classes = dir === 'left' || dir === 'right'
        ? 'uno-layer-base-w-[300px] max-w-[calc(100vw-2rem)]'
        : 'uno-layer-base-h-[300px] max-h-[calc(100vh-2rem)]'

      return `children-[.a-drawer]-(${classes})`
    },
  ],
  {
    // 👉 Grid
    'grid-row': 'grid gap-6 place-items-start w-full',

    // 👉 Typography
    'text-high-emphasis': 'text-[hsla(var(--a-base-color),var(--a-text-emphasis-high-opacity))]',
    'text-medium-emphasis': 'text-[hsla(var(--a-base-color),var(--a-text-emphasis-medium-opacity))]',
    'text-light-emphasis': 'text-[hsla(var(--a-base-color),var(--a-text-emphasis-light-opacity))]',

    // SECTION Components
    // 👉 Alert
    'a-alert': 'em:spacing:p-4 font-medium em:spacing:rounded-lg em:spacing:gap-x-2',

    // 👉 Avatar
    'a-avatar': 'uno-layer-base-text-2xl em:spacing:h-8 em:spacing:w-8 uno-layer-base-rounded-full',

    // 👉 Badge
    // with text-xs, 1.6666666667em => 20px
    'a-badge': 'em:spacing:px-[0.3333333333em] rounded-full spacing:h-[1.6666666667em] spacing:min-w-[1.6666666667em] flex justify-center items-center uno-layer-base-text-white em:uno-layer-base-text-xs uno-layer-base-font-medium z-[1] whitespace-nowrap',
    'a-badge-dot': 'spacing:min-w-[0.666666666666667em] spacing:h-[0.666666666666667em]',

    // with text-xs, outline: 0.166666666666667em => 2px
    'a-badge-bordered': 'outline em:spacing:outline-width-[0.166666666666667em] outline-[hsl(var(--a-layer))]',

    // 👉 Base Input
    'a-base-input-root': 'spacing:min-w-[181px] em:spacing:gap-y-1',
    'a-base-input-input-container': 'i:em:w-6 i:em:h-6 em:spacing:gap-x-3',
    'a-base-input-input-wrapper': 'transition duration-250 ease-out flex i:em:w-5 i:em:h-5 em:spacing:h-12 em:spacing:rounded-lg',

    'a-base-input-prepend-inner-icon': 'z-1',

    // 'a-base-input-append-inner-icon': '',

    // 'a-base-input-w-prepend-inner': 'em:spacing:pl-10',
    // 'a-base-input-wo-prepend-inner': 'em:spacing:pl-4',
    // 'a-base-input-w-append-inner': 'em:spacing:pr-10',
    // 'a-base-input-wo-append-inner': 'em:spacing:pr-4',

    // ℹ️ We have to add important before `bg-` because textarea has `bg-transparent` class
    'a-base-input-disabled': '!all-[.a-base-input-input-wrapper]-bg-[hsla(var(--a-base-color),0.12)] opacity-50',
    'a-base-input-interactive': 'all-[.a-base-input-child]-placeholder:transition all-[.a-base-input-child]-placeholder:duration-250 all-[.a-base-input-child]-placeholder:ease all-[.a-base-input-child:focus]-placeholder-translate-x-1',

    // 'a-base-input-child': 'autofill-bg-transparent',

    // 👉 Button
    'a-btn': 'em:spacing:px-4 font-medium em:spacing:rounded-lg em:spacing:gap-x-2 em:spacing:h-10 focus-visible:ring-2 ring-offset-2',
    'a-btn-icon-only': 'font-medium em:spacing:rounded-lg em:spacing:h-10 em:spacing:w-10 i:em:text-lg focus-visible:ring-2 ring-offset-2',

    // 👉 Card
    'a-card': 'em:spacing:rounded-lg shadow-lg',
    'a-card-typography-wrapper': 'card-padding next:pt-0 em:spacing:not-last:pb-4',
    'card-padding': 'em:spacing:p-5',
    'card-spacer': 'not-last-children-mb-$a-card-spacer',
    'card-body': 'card-padding',

    // 👉 Checkbox
    'a-checkbox-box': 'border-solid h-5 w-5 border-(2 a-border rounded) transition duration-200 mr-2',
    'a-checkbox-disabled': 'opacity-50',
    'a-checkbox-icon': 'transition duration-150 delay-100 ease-[cubic-bezier(.57,1.48,.87,1.09)]',

    // 👉 Dialog
    'a-dialog-wrapper': 'z-[52]',
    'a-dialog': 'shadow-2xl uno-layer-base-w-[500px] z-[53]',

    // 👉 Drawer
    'a-drawer-wrapper': 'z-[52]',

    // ℹ️ We added `!rounded-none` because ACard have rounded utility that override the `rounded-none`
    'a-drawer': 'shadow-2xl z-[53] !rounded-none',

    // 👉 Input
    'a-input-type-file': 'all-[.a-base-input-child]-file:(rounded-lg border-none mr-4 px-4 py-3 text-gray-500 rounded-r-none bg-[hsla(var(--a-base-color),0.05)]) !all-[.a-base-input-input-wrapper]-px-0',

    // 👉 List
    'a-list': 'em:spacing:rounded-lg em:spacing:my-2',

    // Helper class to create pill shaped list items
    'a-list-items-pill': 'em:spacing:my-[0.65em] em:spacing:children-[.a-list-item]-rounded-lg [--a-list-item-margin:0.18em_0.75em] [--a-list-item-padding:0.5em_0.75em]',

    // 👉 Menu
    'a-menu': 'z-[51] shadow-xl [--a-transition-slide-up-transform:10px]',

    // 👉 Radio
    'a-radio-circle': 'border-solid h-5 w-5 border-(2 a-border) rounded-full mr-2 p-1 after:(duration-250 ease-in-out)', // ℹ️ :after is inner dot
    'a-radio-disabled': 'opacity-50',

    // 👉 Select
    'a-select-options-container': 'z-10 border border-solid border-a-border em:spacing:rounded-lg em:spacing:py-3 shadow-lg',
    'a-select-option': 'em:spacing:px-4 em:spacing:py-1',

    // 👉 Switch
    'a-switch-toggle': 'transition-colors transition-duration-100 ease-in-out',
    'a-switch-dot': 'h-[1.18em] w-[1.18em] bg-white transition transition-duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]',
    'a-switch-icon': 'em:text-xs',
    'a-switch-disabled': 'opacity-50',

    // 👉 Table
    'a-table-table': 'all-[tr]-border-b all-[tr]-border-a-border',

    // With 1em (14px), 1.1428571429em => 16px & 3.5em => 49px
    'a-table-table-th': 'capitalize em:spacing:px-[1.1428571429em] spacing:h-[3.5em] text-left em:text-sm',

    'a-table-table-td': 'em:spacing:px-[1.1428571429em] spacing:h-[3.5em] text-sm',

    // With 1em (12px), 1.3333333333em => 16px & 4.0833333333em => 49px
    'a-table-footer': 'em:spacing:px-[1.3333333333em] spacing:h-[4.0833333333em] em:spacing:gap-x-4 em:text-xs',
    'a-table-pagination-meta': '[--a-typography-text-opacity:var(--a-typography-subtitle-opacity)]',

    'a-table-footer-per-page-container': 'em:spacing:gap-x-2',
    'a-table-footer-per-page-select': 'em:spacing:w-16 min-w-14',

    'a-table-footer-per-page-select--input-wrapper-classes': 'rounded-0 !border-transparent !border-b-a-border', // ℹ️ inputWrapperClasses prop
    'a-table-footer-per-page-select--options-wrapper-classes': 'em:text-sm spacing-85', // ℹ️ optionsWrapperClasses prop
    'a-table-footer-previous-page-btn': '!rounded-full em:spacing:me-2',
    'a-table-footer-next-page-btn': '!rounded-full',

    // 👉 Textarea
    'a-textarea': 'em:spacing:py-4',

  // !SECTION Components
  },
]

export function presetThemeDefault(options: PresetOptions = {}): Preset {
  const shortcuts = options.shortcutOverrides ? (defu(options.shortcutOverrides, themeShortcuts) as Preset['shortcuts']) : themeShortcuts

  return {
    name: '@anu-vue/preset-theme-default',
    theme: {
      colors: {
        primary: 'hsl(var(--a-primary))',
        success: 'hsl(var(--a-success))',
        info: 'hsl(var(--a-info))',
        warning: 'hsl(var(--a-warning))',
        danger: 'hsl(var(--a-danger))',
        a: { border: 'hsla(var(--a-base-color),var(--a-border-opacity))' },
      },
    },
    safelist: [
      ...colors.map(c => `[--a-layer-color:hsla(var(--a-${c}),var(--un-bg-opacity,1))]`),
      ...colors.map(c => `bg-${c}`),
      ...colors.map(c => `hover:bg-${c}`),

      ...colors.map(c => `border-${c}`),
      ...[...colors, '$a-layer-text'].map(c => `text-${c}`),
      ...colors.map(c => `shadow-${c}`),
      ...colors.map(c => `after:bg-${c}`),
      ...colors.map(c => `next:checked:bg-${c}`),
      ...colors.map(c => `next:checked:border-${c}`),

      // Typography
      ...[...colors, 'layer-text', 'white'].map(c => `typography-title-${c}`),
      ...[...colors, 'layer-text', 'white'].map(c => `typography-subtitle-${c}`),
      ...[...colors, 'layer-text', 'white'].map(c => `typography-text-${c}`),
      ...['top', 'right', 'bottom', 'left'].map(dir => `a-drawer-anchor-${dir}`),
    ],
    rules: [
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
    ],
    shortcuts,
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
              if (typeof v[1] === 'string') {
                if (v[1].endsWith('rem'))
                  v[1] = `${v[1].slice(0, -3)}em`

                // Handle spacing variant usage\
                else if (v[1].endsWith('rem * var(--a-spacing, 1))'))
                  v[1] = `${v[1].slice(0, -26)}em * var(--a-spacing, 1))`
              }
            })

            return body
          },
        }
      },

      // `spacing:` variant adds --a-spacing CSS var
      (matcher: string) => {
        if (!matcher.startsWith('spacing:'))
          return matcher

        return {
          // slice `spacing:` prefix and passed to the next variants and rules
          matcher: matcher.slice(8),
          body: (body: CSSEntries) => {
            body.forEach(v => {
              v[1] = `calc(${v[1]} * var(--a-spacing, 1))`
            })

            return body
          },
        }
      },
    ],
  }
}
