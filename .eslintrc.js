module.exports = {
  root: true,
  env: {
    browser: true,
  },
  extends: [
    'eslint:all',
    'plugin:react/all',
    'airbnb',
    'airbnb-typescript',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react/jsx-runtime',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    // 'react/prop-types': 'off',
    // 'react/jsx-curly-brace-presence': 'error',
    // // React 17
    // 'react/jsx-uses-react': 'off',
    // 'react/react-in-jsx-scope': 'off',
    // 'react/self-closing-comp': [
    //   'error',
    //   {
    //     component: true,
    //     html: true,
    //   },
    // ],
    // 'react/jsx-boolean-value': 'error',
    // 'prefer-template': 'error',
    // 'jsx-quotes': ['error', 'prefer-double'],
    // 'react/jsx-tag-spacing': 'error',
    'react/require-default-props': 'warn',
    'import/no-cycle': 'warn',
    'jsx-a11y/label-has-associated-control': 'warn',
  },
}
