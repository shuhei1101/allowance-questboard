module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  displayName: 'shared',
  roots: ['<rootDir>/core', '<rootDir>/features', '<rootDir>/__tests__'],
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
    '^@shared/(.*)$': '<rootDir>/$1',
  },
  collectCoverageFrom: [
    'core/**/*.{ts,tsx}',
    'features/**/*.{ts,tsx}',
    '!**/*.d.ts'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  passWithNoTests: true
};
