module.exports = {
  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "synchronize": false,
  "migrationsRun": true,
  "ssl": true,
  "logging": false,
  "entities": [
    "src/entities/**/*.ts"
  ],
  "migrations": [
    "src/migrations/**/*.ts"
  ],
  "subscribers": [
    "src/subscribers/**/*.ts"
  ],
  "cli": {
    "entitiesDir": "src/entities",
    "migrationsDir": "src/migrations",
    "subscribersDir": "src/subscribers"
  }
}

