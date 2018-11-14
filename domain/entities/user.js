module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    ds_profile: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['organization', 'people']],
          msg: "ds_profile must be an organization or a people using lowercase"
        }
      }
    },
    ds_email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "ds_email must be unique"
      },
      validate: {
        notEmpty: {
          msg: "ds_email can't be empty"
        },
        isEmail: {
          msg: "ds_email must be an email"
        },
      }
    },
    ds_name: {
      type: DataTypes.STRING,
      allowNull: false,
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
    fl_is_allow_to_remote: DataTypes.BOOLEAN,
  });

  return User;
}