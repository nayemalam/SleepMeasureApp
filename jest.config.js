module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!@react-native|react-native|@react-navigation/.*|react-native-paper)',
  ],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  automock: false,
  setupFiles: ['<rootDir>/jest.setup.js'],
};
