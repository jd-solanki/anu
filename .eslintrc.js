module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    // 'airbnb-base',
    '@antfu/eslint-config-vue',
    'plugin:vue/vue3-recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    'vue',
    '@typescript-eslint',
    'import',
    'react',
  ],
  ignorePatterns: ['node_modules/*', 'dist/*', '*.yaml', '*.yml', '*.json', '*.md'],
  rules: {
    // we don't want it
    'semi': ['error', 'never'],

    // add parens ony when required in arrow function
    'arrow-parens': ['error', 'as-needed'],

    // add new line above comment
    'newline-before-return': 'error',

    // Allow multi line string
    'no-multi-str': 'off',

    // add new line above comment
    'lines-around-comment': [
      'error',
      {
        beforeBlockComment: true,
        beforeLineComment: true,
        allowBlockStart: true,
        allowClassStart: true,
        allowObjectStart: true,
        allowArrayStart: true,
      },
    ],

    'vue/custom-event-name-casing': ['error', 'camelCase', {
      ignores: [
        '/^(click):[a-z]+[a-zA-Z]+$/',
      ],
    }],

    // Vue
    'vue/require-default-prop': 'off',
    'vue/no-restricted-class': ['error', '/^(p|m)(l|r)-/'],
    'vue/no-required-prop-with-default': 'error',

    // 'vue/require-prop-comment': ['error', {
    //   type: 'JSDoc',
    // }],

    // Plugin: eslint-plugin-import
    'import/prefer-default-export': 'off',

    // Plugin: eslint-plugin-import
    // For omitting extension for ts files
    // 'import/extensions': [
    //   'error',
    //   'ignorePackages',
    //   {
    //     js: 'never',
    //     jsx: 'never',
    //     ts: 'never',
    //     tsx: 'never',
    //   },
    // ],
    // ℹ️ Temporary disabled rules
    'import/extensions': 'off',

    '@typescript-eslint/consistent-type-imports': 'error',

    // JSX rules
    // 'react/jsx-boolean-value': ['error', 'never'],
    // 'react/jsx-child-element-spacing': 'error',
    // 'react/jsx-closing-bracket-location': 'error',

    // // 'react/jsx-closing-tag-location': 'error',
    // 'react/jsx-curly-brace-presence': 'error',
    // 'react/jsx-curly-newline': 'error',
    // 'react/jsx-curly-spacing': 'error',
    // 'react/jsx-equals-spacing': 'error',
    // 'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.jsx'] }],
    // 'react/jsx-first-prop-new-line': 'error',
    // 'react/jsx-indent-props': [2, 2],
    // 'react/jsx-indent': [2, 2],
    // 'react/jsx-max-props-per-line': 'error',
    // 'react/jsx-no-comment-textnodes': 'error',
    // 'react/jsx-no-duplicate-props': 'error',
    // 'react/jsx-no-leaked-render': 'error',
    // 'react/jsx-no-target-blank': 'error',
    // 'react/jsx-no-useless-fragment': 'error',
    // 'react/jsx-one-expression-per-line': 'error',
    // 'react/jsx-pascal-case': 'error',
    // 'react/jsx-props-no-multi-spaces': 'error',
    // 'react/jsx-sort-props': 'error',
    // 'react/jsx-tag-spacing': 'error',
    // 'react/self-closing-comp': 'error',

    // // 'react/no-unknown-property': ['error', { ignore: ['class', 'v-show', 'v-model', 'v-slots', 'for', 'tabindex'] }],
    // 'react/no-unescaped-entities': 'error',
    // 'react/no-invalid-html-attribute': 'error',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: 'packages/*/tsconfig.json',
      },
    },
  },
}
