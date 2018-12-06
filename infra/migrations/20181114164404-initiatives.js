module.exports = {
  up: (queryInterface, DataTypes) => {
    queryInterface.createTable('Initiatives', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
      },
      website: {
        type: DataTypes.STRING,
      },
      bio: {
        type: DataTypes.STRING,
      },
      birthday: {
        type: DataTypes.DATE,
      },
      avatar: {
        type: DataTypes.STRING,
      },
      country: {
        type: DataTypes.STRING,
      },
      state: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      latlong: {
        type: DataTypes.STRING,
      },
      skills: {
        type: DataTypes.STRING,
      },
      causes: {
        type: DataTypes.STRING,
      },
      areas: {
        type: DataTypes.STRING,
      },
      sdgs: {
        type: DataTypes.STRING,
      },
      eventType: {
        type: DataTypes.STRING,
      },
      start: {
        type: DataTypes.DATE,
      },
      finish: {
        type: DataTypes.DATE,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      UserId: {
        type: DataTypes.INTEGER,
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
    queryInterface.dropTable('Initiatives');
  }
};
