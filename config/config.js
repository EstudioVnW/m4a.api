require('dotenv').config()
require('dotenv').load()

module.exports = {
  "development": {
    "username": process.env.RELACIONAL_DB_USERNAME,
    "password": process.env.RELACIONAL_DB_PASS,
    "database": process.env.RELACIONAL_DB_NAME,
    "host": process.env.RELACIONAL_DB_HOST,
    "dialect": "mysql",
    "projectId": process.env.PROJECT_ID
  },
  "test": {
    "username": process.env.TEST_RELACIONAL_DB_USERNAME,
    "password": process.env.TEST_RELACIONAL_DB_PASS,
    "database": process.env.TEST_RELACIONAL_DB_NAME,
    "host": process.env.TEST_RELACIONAL_DB_HOST,
    "dialect": "mysql",
    "projectId": process.env.PROJECT_ID
  },
  "production": {
    "username": process.env.RELACIONAL_DB_USERNAME,
    "password": process.env.RELACIONAL_DB_PASS,
    "database": process.env.RELACIONAL_DB_NAME,
    "host": process.env.RELACIONAL_DB_HOST,
    "dialect": "mysql",
    "projectId": process.env.PROJECT_ID
  }
}
