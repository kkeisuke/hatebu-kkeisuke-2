/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/?(*.)spec.ts'],
  setupFiles: ['dotenv/config'],
  setupFilesAfterEnv: ['./jest.setup.ts']
}

module.exports = config
