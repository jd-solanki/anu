import type { Preset } from '@unocss/core'

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
      },
    },
    safelist: [
      ...colors.map(c => `bg-${c}`),
      ...colors.map(c => `hover:bg-${c}`),

      ...colors.map(c => `border-${c}`),
      ...colors.map(c => `text-${c}`),
      ...colors.map(c => `shadow-${c}`),
      ...colors.map(c => `next:checked:bg-${c}`),
      ...colors.map(c => `next:checked:border-${c}`),
    ],
    rules: [
      ['rounded-inherit', { 'border-radius': 'inherit' }],
      [
        /^s-(\w+)$/,
        ([, c]: string[]) => ({
          'background-color': `hsl(var(--${c}))`,
          'color': `hsl(var(--on-${c}))`,
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
    shortcuts: [
      {
        btn: 'px-4 font-medium rounded-lg gap-x-2 h-[40px]',
        alert: 'p-4 font-medium rounded-lg w-full gap-x-2',
        states: '\
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
  }
}
