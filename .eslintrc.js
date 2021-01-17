module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
    createDefaultProgram: true,
  },
  env: {
    es6: true,
    'jest/globals': true,
  },
  plugins: [
    'prettier',
    '@typescript-eslint',
    'jest',
    'jest-formatting',
    'simple-import-sort',
    'unused-imports',
  ],
  extends: [
    'airbnb-base',
    'prettier',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:jest-formatting/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.js', '.jsx', '.ts', '.tsx'],
    },
  },
  rules: {
    // airbnb es lint
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'import/no-named-default': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-underscore-dangle': 'off',
    camelcase: 'off',
    'no-throw-literal': 'off',
    'class-methods-use-this': 'off',
    'max-depth': ['error', 3],
    'max-len': ['error', 100],
    'max-lines': ['error', { max: 200 }],
    'max-nested-callbacks': ['error', 4],
    'max-params': ['error', 5],
    'max-statements': ['error', 20],
    'no-negated-condition': 'error',
    'no-console': 'off',
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: ['return'],
      },
      {
        blankLine: 'always',
        prev: ['const', 'let', 'block', 'block-like'],
        next: '*',
      },
      {
        blankLine: 'any',
        prev: ['const', 'let'],
        next: ['const', 'let'],
      },
    ],

    // typescript
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'default',
        format: ['camelCase'],
      },
      {
        selector: 'variable',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'function',
        format: ['camelCase', 'PascalCase'],
      },
      {
        selector: 'parameter',
        format: ['camelCase', 'PascalCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'enumMember',
        format: ['UPPER_CASE'],
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
      {
        selector: 'property',
        format: ['camelCase', 'PascalCase'],
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-confusing-non-null-assertion': 'error',
    '@typescript-eslint/no-dynamic-delete': 'error',
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
    '@typescript-eslint/prefer-enum-initializers': 'error',
    '@typescript-eslint/prefer-literal-enum-member': 'error',
    '@typescript-eslint/require-array-sort-compare': ['error', { ignoreStringArrays: true }],
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
    // typescript extension
    'no-shadow': 'off',
    'default-param-last': 'off',
    'func-call-spacing': 'off',
    'no-duplicate-imports': 'off',
    'no-loop-func': 'off',
    'no-magic-numbers': 'off',
    'no-use-before-define': 'off',
    'space-infix-ops': 'off',
    '@typescript-eslint/default-param-last': 'error',
    '@typescript-eslint/func-call-spacing': 'error',
    '@typescript-eslint/no-duplicate-imports': ['error', { includeExports: true }],
    '@typescript-eslint/no-loop-func': 'error',
    '@typescript-eslint/no-magic-numbers': 'off',
    '@typescript-eslint/no-use-before-define': ['error', { ignoreTypeReferences: false }],
    '@typescript-eslint/space-infix-ops': ['error', { int32Hint: false }],
    '@typescript-eslint/no-shadow': ['error'],

    // simple-import-sort
    'sort-imports': 'off',
    'import/order': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',

    // unused-imports
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports-ts': 'error',
    'unused-imports/no-unused-vars-ts': [
      'warn',
      { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
    ],
  },
  overrides: [
    {
      files: ['*.test.ts', '*.test.tsx', '**/__data__/*.ts'],
      rules: {
        'max-lines': 'off',
        'max-nested-callbacks': 'off',
        'react/jsx-handler-names': 'off',
        'react/jsx-no-literals': 'off',
        'react-native/no-inline-styles': 'off',
        '@typescript-eslint/no-empty-function': 'off',
      },
    },
  ],
};