import nextJest from 'next/jest.js';
 
const createJestConfig = nextJest({
  dir: './',
});

const config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  testPathIgnorePatterns: [
    "<rootDir>/build/", 
    "<rootDir>/node_modules/", 
    "<rootDir>/.next/", 
    "<rootDir>/.swc/", 
    "<rootDir>/coverage/"
  ],
  coverageDirectory: "coverage",
  collectCoverage: false,
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  fakeTimers: {
    enableGlobally: true
  }
}
 
export default createJestConfig(config)