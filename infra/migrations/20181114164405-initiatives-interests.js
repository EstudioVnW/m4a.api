'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('InitiativesInterests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      interestDescription: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      interestType: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
      InitiativeId: {
        type: Sequelize.INTEGER,
        references: { model: 'Initiatives', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('InitiativesInterests');
  }
};
