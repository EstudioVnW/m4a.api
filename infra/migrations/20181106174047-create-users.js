module.exports = {
  up: (queryInterface, DataTypes) => {
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      username: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
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
      userProfile: {
        type: DataTypes.STRING,
      },
      allowToRemote: {
        type: DataTypes.BOOLEAN,
      },
      userStatus: {
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
  },

  down: (queryInterface) => {
    queryInterface.dropTable('Users');
  }
};