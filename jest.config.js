module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  projects: [
    {
      displayName: 'frontend',
      preset: 'ts-jest',
      testEnvironment: 'node',
      roots: ['<rootDir>/packages/frontend/src', '<rootDir>/packages/frontend/__tests__'],
      testMatch: [
        '<rootDir>/packages/frontend/**/__tests__/**/*.test.ts',
        '<rootDir>/packages/frontend/**/__tests__/**/*.test.tsx',
        '<rootDir>/packages/frontend/**/?(*.)+(spec|test).ts',
        '<rootDir>/packages/frontend/**/?(*.)+(spec|test).tsx'
      ],
      transform: {
        '^.+\\.tsx?$': ['ts-jest', {
          tsconfig: 'packages/frontend/tsconfig.json'
        }],
      },
      moduleNameMapper: {
        '^@shared/(.*)$': '<rootDir>/packages/shared/$1',
        '^@frontend/(.*)$': '<rootDir>/packages/frontend/src/$1',
      },
      collectCoverageFrom: [
        'packages/frontend/src/**/*.{ts,tsx}',
        '!packages/frontend/src/**/*.d.ts',
        '!packages/frontend/src/index.ts'
      ],
      coverageDirectory: 'packages/frontend/coverage',
      setupFilesAfterEnv: ['<rootDir>/packages/frontend/__tests__/setup.ts']
    },
    {
      displayName: 'backend',
      preset: 'ts-jest',
      testEnvironment: 'node',
      roots: ['<rootDir>/packages/backend/src', '<rootDir>/packages/backend/__tests__'],
      testMatch: [
        '<rootDir>/packages/backend/**/__tests__/**/*.test.ts',
        '<rootDir>/packages/backend/**/?(*.)+(spec|test).ts'
      ],
      transform: {
        '^.+\\.ts$': ['ts-jest', {
          tsconfig: 'packages/backend/tsconfig.json'
        }],
      },
      moduleNameMapper: {
        '^@shared/(.*)$': '<rootDir>/packages/shared/$1',
        '^@backend/(.*)$': '<rootDir>/packages/backend/src/$1',
      },
      collectCoverageFrom: [
        'packages/backend/src/**/*.ts',
        '!packages/backend/src/**/*.d.ts',
        '!packages/backend/src/main.ts'
      ],
      coverageDirectory: 'packages/backend/coverage',
      setupFilesAfterEnv: ['<rootDir>/packages/backend/__tests__/setup.ts']
    }
  ],
  collectCoverageFrom: [
    'packages/*/src/**/*.{ts,tsx}',
    '!packages/*/src/**/*.d.ts',
    '!packages/backend/src/main.ts',
    '!packages/frontend/src/index.ts'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html']
};
