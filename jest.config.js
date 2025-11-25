module.exports = {
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.jsx'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  
  // Transform JS/JSX files with babel-jest
  transform: {
    '^.+\\.(js|jsx)$': ['babel-jest', { configFile: './babel.config.js' }],
  },
  
  // Mock CSS/SCSS imports so tests don't fail on them
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg|ico)$': '<rootDir>/__mocks__/fileMock.js',
    // Adding path aliases below ->
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
  },
  
  // Don't transform node_modules except for specific packages
  transformIgnorePatterns: [
    'node_modules/(?!(@testing-library|react-syntax-highlighter)/)',
  ],
};
