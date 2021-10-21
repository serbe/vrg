module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/jsx-runtime',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:prettier/recommended',
  ],
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    // "react/prop-types": "off",
    // "react/jsx-curly-brace-presence": "error",
    // // React 17
    // "react/jsx-uses-react": "off",
    // "react/react-in-jsx-scope": "off",
    // "react/self-closing-comp": [
    //   "error",
    //   {
    //     component: true,
    //     html: true,
    //   },
    // ],
    // "react/jsx-boolean-value": "error",
    // "prefer-template": "error",
    // "jsx-quotes": ["error", "prefer-double"],
    // "react/jsx-tag-spacing": "error",
    'react/require-default-props': 'warn',
    'import/no-cycle': 'warn',
    'jsx-a11y/label-has-associated-control': 'warn',
  },
}
