require('dotenv').config()
require('dotenv').load()

module.exports = {
  "development": {
    "username": process.env.RELACIONAL_DB_USERNAME,
    "password": process.env.RELACIONAL_DB_PASS,
    "database": process.env.RELACIONAL_DB_NAME,
    "host": process.env.RELACIONAL_DB_HOST,
    "dialect": "mysql",
    "projectId": process.env.FIREBASE_PROJECT_ID,
    "jwtSecret": process.env.JWT_SECRET
  },
  "test": {
    "username": process.env.TEST_RELACIONAL_DB_USERNAME,
    "password": process.env.TEST_RELACIONAL_DB_PASS,
    "database": process.env.TEST_RELACIONAL_DB_NAME,
    "host": process.env.TEST_RELACIONAL_DB_HOST,
    "dialect": "mysql",
    "projectId": process.env.FIREBASE_PROJECT_ID,
    "jwtSecret": process.env.JWT_SECRET
  },
  "production": {
    "username": process.env.RELACIONAL_DB_USERNAME,
    "password": process.env.RELACIONAL_DB_PASS,
    "database": process.env.RELACIONAL_DB_NAME,
    "host": process.env.RELACIONAL_DB_HOST,
    "dialect": "mysql",
    "projectId": process.env.FIREBASE_PROJECT_ID,
    "jwtSecret": process.env.JWT_SECRET
  }
}