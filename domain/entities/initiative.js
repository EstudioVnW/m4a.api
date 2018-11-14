module.exports = (sequelize, DataTypes) => {
  const Initiative = sequelize.define('Initiative', {
    ds_website_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "ds_website_url can't be empty"
        },
      }
    },
    ds_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "ds_name must be unique"
      },
      validate: {
        notEmpty: {
          msg: "ds_name can't be empty"
        }
      }
    },
    ds_bio: {
      type: DataTypes.STRING,
      len: {
        args: [4,30],
        msg: "ds_bio must be between 4 and 30 characters"
      }
    },
    dt_birthday: DataTypes.DATE,
    ds_avatar: DataTypes.STRING,
    ds_country: DataTypes.STRING,
    ds_city: DataTypes.STRING,
    ds_address: DataTypes.STRING,
    nr_latlong: DataTypes.STRING,
    ds_skills: DataTypes.STRING,
    ds_causes: DataTypes.STRING,
    ds_areas: DataTypes.STRING,
    ds_sdgs: DataTypes.STRING,
    fl_event_type: DataTypes.BOOLEAN,
    dt_start: DataTypes.DATE,
    dt_finish: DataTypes.DATE,
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "UserId can't be empty"
        }
      }
    }
  });

  Initiative.associate = models => {
    Initiative.belongsTo(models.User);
  };

  return Initiative;
}