'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      bio: {
        type: Sequelize.STRING,
      },
      birthday: {
        type: Sequelize.DATE,
      },
      avatar: {
        type: Sequelize.STRING,
      },
      country: {
        type: Sequelize.STRING,
      },
      state: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      latlong: {
        type: Sequelize.STRING,
      },
      skills: {
        type: Sequelize.STRING,
      },
      causes: {
        type: Sequelize.STRING,
      },
      areas: {
        type: Sequelize.STRING,
      },
      sdgs: {
        type: Sequelize.STRING,
      },
      userProfile: {
        type: Sequelize.STRING,
      },
      allowToRemote: {
        type: Sequelize.BOOLEAN,
      },
      userStatus: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};