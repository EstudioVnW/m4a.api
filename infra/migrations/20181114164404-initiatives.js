'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Initiatives', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
      },
      website: {
        type: Sequelize.STRING,
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
      eventType: {
        type: Sequelize.STRING,
      },
      start: {
        type: Sequelize.DATE,
      },
      finish: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
    });

    queryInterface.addIndex('Initiatives', [
      'country', 'state', 'city'
    ])

  },

  down: (queryInterface) => {
    return queryInterface.dropTable('Initiatives');
  }
};
