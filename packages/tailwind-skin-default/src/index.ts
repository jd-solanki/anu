import plugin from 'tailwindcss/plugin'

interface PluginOptions {
    updateThemeShadows?: boolean
}

const pluginOptionsDefaults: PluginOptions = {
    updateThemeShadows: true,
}

export const pluginSkinDefault = plugin.withOptions(
    function (options: PluginOptions = {}) {
        const _options = { ...pluginOptionsDefaults, ...options }

        return function ({ addComponents, theme, config }) {

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
    },
    function (options: PluginOptions = {}) {
        const _options = { ...pluginOptionsDefaults, ...options }

        if (!_options.updateThemeShadows) return {}
        
        return {
            theme: {
                boxShadow: {
                    'sm': '0 1px 2px 0 hsla(0, 0%, 0%, 0.1)',
                    'DEFAULT': '0 4px 24px 0 hsla(0, 0%, 0%, 0.1)',
                    'md': '0 8px 16px 0 hsla(0, 0%, 0%, 0.1)',
                    'lg': '0 16px 32px 0 hsla(0, 0%, 0%, 0.1)',
                    'xl': '0 24px 48px 0 hsla(0, 0%, 0%, 0.1)',
                    '2xl': '0 40px 64px 0 hsla(0, 0%, 0%, 0.1)',
                }
            }
        }
    }
)