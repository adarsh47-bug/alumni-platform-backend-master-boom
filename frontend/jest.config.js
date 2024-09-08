// jest.config.js
module.exports = {
  // Enable ECMAScript Modules
  extensionsToTreatAsEsm: ['.ts', '.tsx', '.js', '.jsx'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest', // Use babel-jest for JavaScript files
  },
  // Ignore transformations for specific node_modules
  transformIgnorePatterns: [
    '/node_modules/(?!your-module-to-transform/)',
  ],
  // Mock non-JS modules
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js',
  },
  // Other configurations
  testEnvironment: 'jsdom',
};