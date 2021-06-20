module.exports = {
  roots: ['<rootDir>/tests'],
  testMatch: ['**/?(*.)spec.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  }
}
