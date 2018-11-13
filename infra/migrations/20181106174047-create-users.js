module.exports = {
  up: (queryInterface, DataTypes) => {
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      ds_profile: {
        type: DataTypes.STRING,
      },
      ds_email: {
        type: DataTypes.STRING,
        unique: true,
      },
      ds_name: {
        type: DataTypes.STRING,
      },
      ds_bio: {
        type: DataTypes.STRING,
      },
      dt_birthday: {
        type: DataTypes.DATE,
      },
      ds_avatar: {
        type: DataTypes.STRING,
      },
      ds_country: {
        type: DataTypes.STRING,
      },
      ds_city: {
        type: DataTypes.STRING,
      },
      ds_address: {
        type: DataTypes.STRING,
      },
      nr_latlong: {
        type: DataTypes.STRING,
      },
      ds_skills: {
        type: DataTypes.STRING,
      },
      ds_causes: {
        type: DataTypes.STRING,
      },
      ds_areas: {
        type: DataTypes.STRING,
      },
      ds_sdgs: {
        type: DataTypes.STRING,
      },
      fl_is_allow_to_remote: {
        type: DataTypes.BOOLEAN,
      },
      ds_sdgs: {
        type: DataTypes.STRING,
      },
      ds_sdgs: {
        type: DataTypes.STRING,
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