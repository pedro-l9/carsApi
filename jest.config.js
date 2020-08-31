module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  resetMocks: true,
  collectCoverageFrom: ['src/services/*.ts', 'src/repositories/*.ts'],
};
