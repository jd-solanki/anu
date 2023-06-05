module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    // 'airbnb-base',
    '@antfu',
    'plugin:vue/vue3-recommended',
    'plugin:import/recommended',
    'plugin:@typescript-eslint/recommended',
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
    'vue/component-name-in-template-casing': ['error', 'PascalCase', {
      registeredComponentsOnly: false,
      ignores: [],
    }],

    // Vue
    'vue/require-default-prop': 'off',
    'vue/no-restricted-class': ['error', '/^(p|m)(l|r)-/', '/^font-(100|200|700|800|900|bold|black)$/'],
    'vue/no-required-prop-with-default': 'error',
    'vue/v-on-event-hyphenation': ['error', 'never'],
    'vue/first-attribute-linebreak': ['error', {
      singleline: 'beside',
      multiline: 'below',
    }],
    'vue/require-name-property': 'error',
    'vue/component-definition-name-casing': 'error',
    'vue/no-duplicate-attr-inheritance': 'error',
    'vue/match-component-file-name': ['error', {
      extensions: ['vue', 'tsx'],
    }],

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

    // Ignore _ as unused variable
    '@typescript-eslint/no-unused-vars': [
      'error', {
        varsIgnorePattern: '^_+$',
        argsIgnorePattern: '^_+$',
      },
    ],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: 'tsconfig.json',
      },
    },
  },
}
