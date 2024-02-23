module.exports = {
  root: true,
  extends: '@react-native',
  // TODO: Remove this and styles accordingly
  rules: {
    'react-native/no-inline-styles': 0,
    'react/no-unstable-nested-components': 'off',
  },
  options: {
    'prettier/prettier': [
      'error',
      {},
      {
        usePrettierrc: true,
      },
    ],
  },
};
