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
  },
  plugins: ['@typescript-eslint', 'import', 'simple-import-sort', 'unused-imports', 'sonarjs', 'destructuring'],
  extends: ['airbnb-base', 'plugin:prettier/recommended', 'plugin:@typescript-eslint/recommended'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.js', '.ts'],
    },
  },
  rules: {
    // airbnb es lint
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'import/no-named-default': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-import-module-exports': 'off',
    camelcase: 'off',
    'no-throw-literal': 'off',
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'no-underscore-dangle': 'off',
    'no-console': 'off',
    'no-plusplus': 'off',
    'max-depth': ['error', 3],
    'max-len': ['error', 120],
    'max-lines': ['error', { max: 250 }],
    'max-nested-callbacks': ['error', 4],
    'max-params': ['error', 5],
    'max-statements': ['error', 20],
    'no-negated-condition': 'error',
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
        leadingUnderscore: 'allow',
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

    'no-shadow': 'off',
    'default-param-last': 'off',
    'func-call-spacing': 'off',
    'no-duplicate-imports': 'off',
    'no-loop-func': 'off',
    'no-use-before-define': 'off',
    'space-infix-ops': 'off',
    '@typescript-eslint/default-param-last': 'error',
    '@typescript-eslint/func-call-spacing': 'error',
    '@typescript-eslint/no-duplicate-imports': ['error', { includeExports: true }],
    '@typescript-eslint/no-loop-func': 'error',
    '@typescript-eslint/no-use-before-define': ['error', { ignoreTypeReferences: false }],
    '@typescript-eslint/space-infix-ops': ['error', { int32Hint: false }],
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true, argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
    '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],

    // simple-import-sort
    'sort-imports': 'off',
    'import/order': 'off',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // 1. Side effect imports
          ['^\\u0000'],
          // 2. Any other 3rd party imports
          ['^@?\\w'],
          // 3. Our modules, other than the module the current file is part of
          ['^'],
          // 4. Other parts of the same module that the current file is part of
          ['^\\.'],
          // 5. Types
          ['^.*\\u0000$'],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',

    // unused-imports
    'unused-imports/no-unused-imports': 'error',

    // sonarjs
    'sonarjs/prefer-immediate-return': 'error',

    // destructuring
    'destructuring/in-params': ['error', { 'max-params': 0 }],
    'destructuring/in-methods-params': 'error',
  },
};
