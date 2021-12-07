module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  plugins: ['@typescript-eslint'],
  extends: [
    // 'airbnb',
    // 'airbnb-typescript',
    // 'airbnb/hooks',
    // 'eslint:recommended',
    // 'plugin:@typescript-eslint/recommended',
    'xo',
    'xo-typescript/space',
    'xo-react/space',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/jsx-runtime',
    'plugin:sonarjs/recommended',
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
    '@typescript-eslint/naming-convention': [
      'off',
      {
        selector: ['function'],
        format: ['camelCase'],
        leadingUnderscore: 'allow',
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'warn',
    'jsx-a11y/label-has-associated-control': 'off',
    'func-names': 'off',
    'new-cap': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
