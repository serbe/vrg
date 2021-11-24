module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  plugins: [],
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',
  ],
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
    //
    '@typescript-eslint/explicit-function-return-type': 'warn',
    'jsx-a11y/label-has-associated-control': 'off',
    'func-names': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
