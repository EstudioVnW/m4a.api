'use strict';
const { Initiative } = require('../../domain/entities');

const queryCity = (currentUser) =>
 `select * from Initiatives
  where country = '${currentUser.country}'
  and state = '${currentUser.state}'
  and city = '${currentUser.city}'`

const queryState = (currentUser) =>
 `select * from Initiatives
  where country = '${currentUser.country}'
  and state = '${currentUser.state}'`

const queryCountry = (currentUser) =>
 `select * from Initiatives
  where country = '${currentUser.country}'`

module.exports = class InitiativeRepository {
  async findNearest(currentUser) {
    try {
      // tem país, estado e cidade
      let result = await Initiative.sequelize.query(
        queryCity(currentUser), 
        {
          raw: true
        }
      )
      if (result[0].length === 0) {
        // tem país, estado?
        result = await Initiative.sequelize.query(
        queryState(currentUser), 
        {
          raw: true
        }
      )}
      if (result[0].length === 0) {
        // tem país?
        result = await Initiative.sequelize.query(
        queryCountry(currentUser), 
        {
          raw: true
        }
      )}
      if (result[0].length === 0) {
        // tem no planeta ?
        return await Initiative.findAll({raw: true})
      }
      console.log(result)
      return result[0]
    }

    catch (err) {
      throw err;
    }
  }
};