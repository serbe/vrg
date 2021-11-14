module.exports = {
  extends: ['alloy', 'alloy/react', 'alloy/typescript'],
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
    'spaced-comment': [
      'error',
      'always',
      {
        markers: ['/'],
      },
    ],
    'max-params': ['error', 4],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
