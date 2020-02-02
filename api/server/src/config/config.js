module.exports = {
  "development": {
    "username": "postgres",
    "password": null,
    "database": "burger_development",
    "host": "db",
    "dialect": "postgres",
  },
  "test": {
    "username": "postgres",
    "password": null,
    "database": "burger_test",
    "host": "db",
    "dialect": "postgres",
    "logging": false,
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "postgres",
  }
}
