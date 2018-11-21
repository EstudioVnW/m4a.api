module.exports = {
  up: (queryInterface, DataTypes) => {
    queryInterface.createTable('Matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      UserId: {
        type: DataTypes.INTEGER,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: false
      },
      InitiativeId: {
        type: DataTypes.INTEGER,
        references: { model: 'Initiatives', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: false
      },
      matchStatus: {
        type: DataTypes.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });

    queryInterface.addConstraint('Matches', [
        'UserId', 'InitiativeId'
      ],{
        type: 'unique', name: 'uniqueUserAndInit'
      })
  
},

  down: (queryInterface) => {
    queryInterface.dropTable('Matches');
  }
};