/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  roots: ['<rootDir>/tests'],
  testMatch: ['**/?(*.)spec.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  setupFiles: ['dotenv/config'],
  setupFilesAfterEnv: ['./jest.setup.ts']
}

module.exports = config
