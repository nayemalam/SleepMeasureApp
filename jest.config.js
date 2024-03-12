module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!@react-native|react-native|@react-navigation/.*|react-native-paper)',
  ],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  automock: false,
  setupFiles: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@screens/(.*)$': '<rootDir>/src/screens/$1',
    '^@types/(.*)$': '<rootDir>/src/types/$1',
  },
};
