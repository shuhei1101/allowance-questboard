module.exports = {
  preset: 'react-native',
  testEnvironment: 'jsdom',
  displayName: 'frontend',
  roots: ['<rootDir>/src', '<rootDir>/__tests__'],
  testMatch: [
    '<rootDir>/**/__tests__/**/*.test.ts',
    '<rootDir>/**/__tests__/**/*.test.tsx',
    '<rootDir>/**/?(*.)+(spec|test).ts',
    '<rootDir>/**/?(*.)+(spec|test).tsx'
  ],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: './tsconfig.json'
    }],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@frontend/(.*)$': '<rootDir>/src/$1',
    '^@backend/(.*)$': '<rootDir>/../backend/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.ts'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.tsx']
};
