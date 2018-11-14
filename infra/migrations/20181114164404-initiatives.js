module.exports = {
  up: (queryInterface, DataTypes) => {
    queryInterface.createTable('Initiatives', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      ds_website_url: {
        type: DataTypes.STRING,
      },
      ds_name: {
        type: DataTypes.STRING,
        unique: true,
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
      fl_event_type: {
        type: DataTypes.BOOLEAN,
      },
      dt_start: {
        type: DataTypes.DATE,
      },
      dt_finish: {
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
    });
  },

  down: (queryInterface) => {
    queryInterface.dropTable('Initiatives');
  }
};