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

  // ℹ️ Drawer styles based on anchor
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
    'a-alert': 'p-4 font-medium rounded-lg gap-x-2',

    // 👉 Badge
    'a-badge': 'px-1 rounded-full h-5 min-w-[1.25rem] flex justify-center items-center text-white text-xs font-medium z-[1] whitespace-nowrap',
    'a-badge-dot': 'min-w-[0.5rem] h-2',
    'a-badge-bordered': 'outline outline-2 outline-[hsl(var(--a-layer))]',

    // 👉 Button
    'a-btn': 'px-[1em] font-medium rounded-[0.5em] gap-x-[0.5em] h-[2.5em]',
    'a-btn-icon-only': 'font-medium rounded-lg h-[2.5em] w-[2.5em] i:em:text-lg',

    // 👉 Base Input
    'a-base-input-root': 'min-w-[181px] gap-y-1',
    'a-base-input-input-container': 'i:em:w-6 i:em:h-6 gap-x-3',
    'a-base-input-input-wrapper': 'transition duration-250 ease-out flex i:em:w-5 i:em:h-5 gap-x-2 em:h-12 em:rounded-lg',

    'a-base-input-prepend-inner-icon': 'ml-3 z-1',
    'a-base-input-append-inner-icon': 'em:me-3',

    'a-base-input-w-prepend-inner': 'em:pl-10',
    'a-base-input-wo-prepend-inner': 'em:pl-4',
    'a-base-input-w-append-inner': 'em:pr-10',
    'a-base-input-wo-append-inner': 'em:pr-4',

    // ℹ️ We have to add important before `bg-` because textarea has `bg-transparent` class
    'a-base-input-disabled': '!all-[.a-base-input-child]-bg-[hsla(var(--a-base-color),0.12)] opacity-50',
    'a-base-input-interactive': 'all-[.a-base-input-child]-placeholder:transition all-[.a-base-input-child]-placeholder:duration-250 all-[.a-base-input-child]-placeholder:ease all-[.a-base-input-child:focus]-placeholder-translate-x-1',

    // 👉 Card
    'a-card': 'rounded-lg shadow-lg',
    'a-card-typography-wrapper': 'card-padding next:pt-0 not-last:pb-4',
    'card-padding': 'p-5',
    'card-spacer': 'not-last-children-mb-$a-card-spacer',
    'card-body': 'card-padding',

    // 👉 Checkbox
    'a-checkbox-box': 'border-solid h-5 w-5 border-(2 a-border rounded) transition duration-200 mr-2',
    'a-checkbox-disabled': 'opacity-50',
    'a-checkbox-icon': 'transition duration-150 delay-100 ease-[cubic-bezier(.57,1.48,.87,1.09)]',

    // 👉 Chip
    'a-chip-wrapper': 'inline-flex items-center px-3 py-1 h-fit rounded-[inherit] text-sm whitespace-nowrap font-medium',
    'a-chip-disabled': 'opacity-50 pointer-events-none',
    'a-chip-content': 'flex items-center gap-x-1',

    // 👉 Dialog
    'a-dialog-wrapper': 'z-[52]',
    'a-dialog': 'shadow-2xl uno-layer-base-w-[500px] z-[53]',

    // 👉 Drawer
    'a-drawer-wrapper': 'z-[52]',

    // ℹ️ We added `!rounded-none` because ACard have rounded utility that override the `rounded-none`
    'a-drawer': 'shadow-2xl z-[53] !rounded-none',

    // 👉 Input
    'a-input-type-file': 'file:rounded-lg file:border-none file:mr-4 file:px-4 file:py-3 file:text-gray-500 file:rounded-r-none file:bg-[hsla(var(--a-base-color),0.05)] !px-0',

    // 👉 List
    'a-list': 'rounded-lg my-2',

    // 👉 Helper class to create pill shaped list items
    'a-list-items-pill': 'my-[0.65rem] children-[.a-list-item]-rounded-lg [--a-list-item-margin:0.18rem_0.75rem] [--a-list-item-padding:0.5rem_0.75rem]',

    // 👉 Menu
    'a-menu': 'z-[51] shadow-xl [--a-transition-slide-up-transform:10px]',

    // 👉 Radio
    'a-radio-circle': 'border-solid h-5 w-5 border-(2 a-border) rounded-full mr-2 p-1 after:(duration-250 ease-in-out)', // ℹ️ :after is inner dot
    'a-radio-disabled': 'opacity-50',

    // 👉 Select
    'a-select-options-container': 'z-10 border border-solid border-a-border rounded-lg em:py-3 shadow-lg',
    'a-select-option': 'em:px-4 em:py-1',

    // 👉 Switch
    'a-switch-toggle': 'transition-colors transition-duration-100 ease-in-out',
    'a-switch-dot': 'h-[1.18em] w-[1.18em] bg-white transition transition-duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]',
    'a-switch-icon': 'em:text-xs',
    'a-switch-disabled': 'opacity-50',

    // 👉 Table
    'a-table-table': 'all-[tr]-border-b all-[tr]-border-a-border',
    'a-table-table-th': 'capitalize em:px-[1.15rem] em:h-14 text-left',
    'a-table-table-td': 'em:px-[1.15rem] em:h-14',
    'a-table-footer': 'em:px-[1.15rem] em:h-14 gap-x-4',
    'a-table-footer-per-page-container': 'em:text-sm gap-x-2',
    'a-table-footer-per-page-select': 'text-xs w-16 min-w-auto',
    'a-table-footer-per-page-select--input-wrapper-classes': 'em:h-9 rounded-0 !border-transparent !border-b-a-border', // ℹ️ inputWrapperClasses prop
    'a-table-footer-per-page-select--options-wrapper-classes': 'text-xs', // ℹ️ optionsWrapperClasses prop
    'a-table-footer-previous-page-btn': '!rounded-full !text-xs me-2',
    'a-table-footer-next-page-btn': '!rounded-full !text-xs',

    // 👉 Textarea
    'a-textarea': 'py-4',

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
