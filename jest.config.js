module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleNameMapper: {
      "^@app/(.*)$": "<rootDir>/src/application/$1",
      "^@infra/(.*)$": "<rootDir>/src/infra/$1",
      "^@config/(.*)$": "<rootDir>/src/config/$1",
      "^@domain/(.*)$": "<rootDir>/src/domain/$1",
      "^@db/(.*)$": "<rootDir>/src/db/$1",
      "^@presentation/(.*)$": "<rootDir>/src/presentation/$1",
      "^@shared/(.*)$": "<rootDir>/src/shared/$1",
      "^@test/(.*)$": "<rootDir>/test/$1"
    },
    globals: {
      "ts-jest": {
        "tsconfig": "tsconfig.jest.json"
      }
    }
};
  