import type { Preset, StaticShortcutMap } from '@unocss/core'

const shortcuts: Exclude<Preset['shortcuts'], undefined | StaticShortcutMap> = [
  // 👉 States
  [/^states:?(\d+)?$/, ([, op]) => `\
      relative \
      before:pointer-events-none \
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
      const classes = (dir === 'left' || dir === 'right')
        ? 'w-[300px] max-w-[calc(100vw-2rem)]'
        : 'h-[300px] max-h-[calc(100vh-2rem)]'

      return `children-[.a-drawer]-(${classes})`
    },
  ],
  {
    // 👉 Grid
    'grid-row': 'grid gap-6 place-items-start w-full',

    // 👉 Typography
    'a-title': 'font-medium block em:text-lg text-[hsla(var(--a-title-c),var(--a-title-opacity))] whitespace-nowrap',
    'a-subtitle': 'block em:text-sm text-[hsla(var(--a-subtitle-c),var(--a-subtitle-opacity))]',
    'a-text': '',
    'text-high-emphasis': 'text-[hsla(var(--a-base-c),var(--a-text-emphasis-high-opacity))]',
    'text-medium-emphasis': 'text-[hsla(var(--a-base-c),var(--a-text-emphasis-medium-opacity))]',
    'text-light-emphasis': 'text-[hsla(var(--a-base-c),var(--a-text-emphasis-light-opacity))]',

    // SECTION Components
    // 👉 Alert
    'a-alert': 'em:spacing:p-4 font-medium em:spacing:rounded-lg em:spacing:gap-x-2',

    // 👉 Avatar
    'a-avatar': 'text-2xl em:spacing:h-8 em:spacing:w-8 rounded-full',

    // 👉 Badge
    // with text-xs, 1.6666666667em => 20px
    'a-badge': 'em:spacing:px-[0.3333333333em] rounded-full spacing:h-[1.6666666667em] spacing:min-w-[1.6666666667em] flex justify-center items-center text-white em:text-xs font-medium z-[1] whitespace-nowrap',
    'a-badge-dot': 'spacing:min-w-[0.666666666666667em] spacing:h-[0.666666666666667em]',

    // with text-xs, outline: 0.166666666666667em => 2px
    'a-badge-bordered': 'outline em:spacing:outline-width-[0.166666666666667em] outline-[hsl(var(--a-surface-c))]',

    // 👉 Base Input
    'a-base-input-root': 'em:spacing:gap-y-1',
    'a-base-input-input-container': 'i:em:w-6 i:em:h-6 em:spacing:gap-x-3',
    'a-base-input-input-wrapper': 'transition duration-250 ease-out flex i:em:w-5 i:em:h-5 em:[&_>_.a-spinner]-w-5 em:spacing:h-12 em:spacing:rounded-lg',

    'a-base-input-prepend-inner-icon': 'z-1',

    // 'a-base-input-append-inner-icon': '',

    // 'a-base-input-w-prepend-inner': 'em:spacing:pl-10',
    // 'a-base-input-wo-prepend-inner': 'em:spacing:pl-4',
    // 'a-base-input-w-append-inner': 'em:spacing:pr-10',
    // 'a-base-input-wo-append-inner': 'em:spacing:pr-4',

    // ℹ️ We have to add important before `bg-` because textarea has `bg-transparent` class
    'a-base-input-disabled': '!all-[.a-base-input-input-wrapper]-bg-[hsla(var(--a-base-c),0.12)] opacity-50',
    'a-base-input-interactive': 'all-[.a-base-input-child]-placeholder:transition all-[.a-base-input-child]-placeholder:duration-250 all-[.a-base-input-child]-placeholder:ease all-[.a-base-input-child:focus]-placeholder-translate-x-1',

    // 'a-base-input-child': 'autofill-bg-transparent',

    // 👉 Button
    'a-btn': 'em:spacing:px-4 font-medium em:spacing:rounded-lg em:spacing:h-10 focus-visible:ring-2 ring-offset-2',
    'a-btn-content': 'flex items-center justify-center em:spacing:gap-x-2',
    'a-btn-icon-only': 'em:spacing:px-2 font-medium em:spacing:rounded-lg aspect-square em:spacing:min-w-10 uno-layer-base-i:em:[&_.a-btn-content]-text-lg focus-visible:ring-2 ring-offset-2',

    // 👉 Card
    'a-card': 'em:spacing:rounded-lg shadow-lg em:[&_>_.a-loader_.a-spinner]-w-7',
    'a-card-typography-wrapper': 'a-card-padding next:pt-0 em:spacing:not-last:pb-4',
    'a-card-padding': 'em:spacing:p-$a-card-padding',
    'a-card-spacer': 'not-last-children-mb-$a-card-spacer',
    'a-card-body': 'a-card-padding',

    // 👉 Checkbox
    'a-checkbox-box': 'border-solid h-5 w-5 border-(2 a-border rounded) transition duration-200 mr-2',
    'a-checkbox-disabled': 'opacity-50',
    'a-checkbox-icon': 'transition duration-150 delay-100 ease-[cubic-bezier(.57,1.48,.87,1.09)]',

    // 👉 Chip
    'a-chip': 'rounded-full inline-flex items-center gap-x-1 px-3 py-1 h-fit text-sm whitespace-nowrap font-medium',
    'a-chip-disabled': 'opacity-50 pointer-events-none',

    // 👉 Dialog
    'a-dialog-wrapper': 'z-[52]',
    'a-dialog': 'shadow-2xl w-[500px] z-[53]',

    // 👉 Drawer
    'a-drawer-wrapper': 'z-[52]',

    // ℹ️ We added `!rounded-none` because ACard have rounded utility that override the `rounded-none`
    'a-drawer': 'shadow-2xl z-[53] !rounded-none',

    // 👉 Input
    'a-input-type-file': `
      file:[&_.a-base-input-child]-rounded-lg
      file:[&_.a-base-input-child]-border-none
      file:[&_.a-base-input-child]-mr-4
      file:[&_.a-base-input-child]-px-4
      file:[&_.a-base-input-child]-py-3
      file:[&_.a-base-input-child]-text-gray-500
      file:[&_.a-base-input-child]-rounded-r-none
      file:[&_.a-base-input-child]-bg-[hsla(var(--a-base-c),0.05)]
      !all-[.a-base-input-input-wrapper]-px-0
    `,

    // 👉 List
    'a-list': 'em:spacing:rounded-lg m-[var(--a-list-margin,calc(0.5em*var(--a-spacing))_0)] gap-[var(--a-list-gap)]',
    'a-list-item': 'gap-[var(--a-list-item-gap,calc(0.75em*var(--a-spacing)))] p-[var(--a-list-item-padding,calc(0.5em*var(--a-spacing))_calc(1em*var(--a-spacing)))] m-[var(--a-list-item-margin)] min-h-[var(--a-list-item-min-height,calc(2.5em*var(--a-spacing)))]',

    // Helper class to create pill shaped list items
    'a-list-items-pill': '[--a-list-margin:calc(0.75em*var(--a-spacing))_0] em:spacing:children-[.a-list-item]-rounded-lg [--a-list-item-margin:calc(0.18em*var(--a-spacing))_calc(0.75em*var(--a-spacing))] [--a-list-item-padding:calc(0.5em*var(--a-spacing))_calc(0.75em*var(--a-spacing))]',

    // 👉 Loader
    'a-loader': '[&.a-loader-full-page]-text-3xl',

    // 👉 Menu
    'a-menu': 'z-[51] shadow-xl [--slide-y-translateY:10px]',

    // 👉 Rating
    'a-rating': 'text-xl',
    'a-rating-animated': 'i:(transition-transform ease-in-out duration-250) hover:i:scale-125',
    'a-rating-disabled': 'opacity-50',

    // 👉 Radio
    'a-radio-circle': 'border-solid h-5 w-5 border-(2 a-border) rounded-full mr-2 p-1 after:(duration-250 ease-in-out)', // ℹ️ :after is inner dot
    'a-radio-disabled': 'opacity-50',

    // 👉 Select
    'a-select-floating': '[--slide-y-translateY:6px]',
    'a-select-options-container': 'z-10',
    'a-select-options-list': 'spacing-75',

    // 👉 Switch
    'a-switch': 'select-none',
    'a-switch-label': 'select-text',
    'a-switch-toggle': 'transition-colors transition-duration-100 ease-in-out',
    'a-switch-dot': 'h-[1.18em] w-[1.18em] bg-white transition transition-duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]',
    'a-switch-icon': 'em:text-xs',
    'a-switch-disabled': 'opacity-50',

    // 👉 Table
    'a-table-table': 'all-[tbody_tr]-border-t all-[tr]-border-a-border',

    // With 1em (14px), 1.1428571429em => 16px & 3.5em => 49px
    'a-table-table-th': 'capitalize em:spacing:px-[1.1428571429em] spacing:h-[3.5em] text-left em:text-sm',

    'a-table-table-td': 'em:spacing:px-[1.1428571429em] spacing:h-[3.5em] text-sm',

    // With 1em (12px), 1.3333333333em => 16px & 4.0833333333em => 49px
    'a-data-table-pagination': 'border-t border-a-border em:spacing:px-[1.3333333333em] spacing:h-[4.0833333333em] em:spacing:gap-x-4 em:text-xs',
    'a-data-table-pagination-meta': 'em:text-base',
    'a-data-table-per-page': '[&_.a-base-input-input-wrapper]-rounded-0 [&_.a-base-input-input-wrapper]-!border-transparent [&_.a-base-input-input-wrapper]-!border-b-a-border [&_.a-base-input-root]-max-w-[70px]',
    'a-data-table-per-page-select--options-wrapper-classes': 'em:text-sm', // ℹ️ optionsWrapperClasses prop
    'a-data-table-pagination-navigation': '[&_.a-data-table-paginate-previous]-!rounded-full em:[&_.a-data-table-paginate-previous]-spacing:me-2 [&_.a-data-table-paginate-next]-!rounded-full em:spacing:gap-x-2',

    // 👉 Tabs
    'a-tabs': '[--a-tabs-arrow-spacing:2.5em]',
    'a-tabs-header': '[.a-tabs-vertical_&]-w-min',
    'a-tabs-wrapper': '[.a-tabs-with-arrows_&]-mx-$a-tabs-arrow-spacing [.a-tabs-with-arrows_&]-max-w-[calc(100%-(var(--a-tabs-arrow-spacing)/2))]',
    'a-tabs-navigation-arrow-wrapper': 'w-$a-tabs-arrow-spacing',
    'a-tabs-active-indicator': 'bg-primary bottom-0 transition-all duration-200 ease-in-out will-change-transform,width,height [.a-tabs-vertical_&]-w-2px [.a-tabs.a-tabs-horizontal_&]-h-2px',

    'a-tabs-bordered': '[&_.a-tabs-header]-border-a-border [&.a-tabs-horizontal_.a-tabs-header]-border-b [&.a-tabs-vertical_.a-tabs-header]-border-r',

    'a-tab': 'text-center em:spacing:px-5 em:spacing:py-3 em:gap-2',
    'a-tab-title ': 'capitalize',

    'a-tabs-navigation-arrow-previous': 'i-bx-left-arrow-alt',
    'a-tabs-navigation-arrow-next': 'i-bx-right-arrow-alt',

    // 👉 Textarea
    'a-textarea': '[&_.a-base-input-input-wrapper]-px-0 [&_.a-base-input-input-wrapper]-box-content [&_.a-base-input-input-wrapper]-h-32',
    'a-textarea-textarea': 'em:spacing:py-4 overflow-x-hidden em:spacing:px-4',

    // 👉 Tooltip
    'a-tooltip-wrapper': 'z-[54]',
    'a-tooltip': 'bg-[hsl(var(--a-tooltip-bg-c))] em:px-2 em:py-1 em:rounded-lg',
    'a-tooltip-text': 'em:text-sm text-white text-center',

    // !SECTION Components

    'overlay': 'absolute inset-0 content-empty bg-[hsla(var(--a-loader-overlay-bg-c),var(--a-loader-overlay-bg-opacity))] opacity-0 rounded-inherit transition-opacity transition-duration-250',

    'kbd': 'outline-1 outline-solid outline-a-border p-[0.2em_0.45em] rounded-lg min-w-[33px] opacity-60',
  },
]

export { shortcuts }
