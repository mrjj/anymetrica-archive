// jest.config.js
module.exports = {
  testMatch: [
    '**/__tests__/**/*.test.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  clearMocks: true,
  coverageDirectory: 'coverage',
};
