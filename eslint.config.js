import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: {
    tsconfigPath: 'tsconfig.json',
  },
  rules: {
    'vue/object-curly-newline': 'error',
    'vue/require-prop-types': 'error',
    'vue/require-default-prop': 'error',
    'vue/no-setup-props-reactivity-loss': 'error',
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 1,
      },
      multiline: {
        max: 1,
      },
    }],
  },
})
