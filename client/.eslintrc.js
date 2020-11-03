module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-one-expression-per-line': 'off',
    'react/require-default-props': 'off',
    'no-plusplus': 'off',
    'react/jsx-filename-extension': 'off',
  },
};
