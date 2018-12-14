require('dotenv').config()
require('dotenv').load()

module.exports = {
  "development": {
    "username": process.env.RELACIONAL_DB_USERNAME,
    "password": process.env.RELACIONAL_DB_PASS,
    "database": process.env.RELACIONAL_DB_NAME,
    "host": process.env.RELACIONAL_DB_HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.RELACIONAL_DB_USERNAME,
    "password": process.env.RELACIONAL_DB_PASS,
    "database": process.env.RELACIONAL_DB_NAME,
    "host": process.env.RELACIONAL_DB_HOST,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.RELACIONAL_DB_USERNAME,
    "password": process.env.RELACIONAL_DB_PASS,
    "database": process.env.RELACIONAL_DB_NAME,
    "host": process.env.RELACIONAL_DB_HOST,
    "dialect": "mysql"
  }
}
