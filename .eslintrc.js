module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  plugins: ['@typescript-eslint', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/all',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/all',
    'plugin:unicorn/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  // extends: [
  //   'eslint:recommended',
  //   'plugin:@typescript-eslint/all',
  //   'plugin:@typescript-eslint/recommended-requiring-type-checking',
  //   'plugin:react/all',
  //   'plugin:jsx-a11y/recommended',
  //   'plugin:react/jsx-runtime',
  //   'plugin:react-hooks/recommended',
  //   'plugin:import/recommended',
  //   'plugin:import/typescript',
  //   'plugin:prettier/recommended',
  // ],
  env: {
    // Your environments (which contains several predefined global variables)
    //
    // browser: true,
    // node: true,
    // mocha: true,
    // jest: true,
    // jquery: true
  },
  globals: {
    // Your global variables (setting to false means it's not allowed to be reassigned)
    //
    // myGlobal: false
  },
  rules: {
    // Customize your rules
    // 'spaced-comment': [
    //   'error',
    //   'always',
    //   {
    //     markers: ['/'],
    //   },
    // ],
    // 'max-params': ['error', 4],
    '@typescript-eslint/explicit-function-return-type': 'warn',
    'jsx-a11y/label-has-associated-control': 'off',
    '@typescript-eslint/no-magic-numbers': 'off',
    '@typescript-eslint/prefer-readonly-parameter-types': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    '@typescript-eslint/no-type-alias': 'off',
    '@typescript-eslint/naming-convention': 'off',
    'react/no-multi-comp': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-no-literals': 'off',
    'react/forbid-component-props': 'warn',
    'react/jsx-no-bind': 'off',
    'react/jsx-max-depth': ['warn', { max: 5 }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'unicorn/no-empty-file': 'off',
    'unicorn/no-null': 'warn',
    'unicorn/filename-case': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
