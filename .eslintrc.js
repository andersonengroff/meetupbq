module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    semi: ['error', 'never'],
    'no-console': 0,
    'no-useless-escape': 0,
    'linebreak-style': 0,
    'class-methods-use-this': 'off',
    'max-len': ['error', { code: 150, ignoreStrings: true }],
    'object-curly-newline': 'off',
    'prefer-destructuring': ['error', { object: true, array: false }],
  }
};
