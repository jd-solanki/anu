import plugin from 'tailwindcss/plugin'

export const pluginSkinDefault = plugin.withOptions(function (options = {}) {
    return function ({ addComponents, theme }) {
        addComponents({
            '.a-accordion-header': {
                paddingTop: theme('spacing.3'),
                paddingBottom: theme('spacing.3'),
                display: 'inline-flex',
                alignItems: 'center',
                columnGap: theme('spacing.3'),
                width: '100%',
                fontWeight: theme('fontWeight.semibold'),
                textAlign: 'start',
                borderRadius: theme('borderRadius.lg'),
                '&:disabled': {
                    opacity: '0.5',
                    pointerEvents: 'none',
                },
            },
        })
    }
})