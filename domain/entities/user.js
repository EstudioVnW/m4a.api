module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "name can't be empty"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "email must be unique"
      },
      validate: {
        notEmpty: {
          msg: "email can't be empty"
        },
        isEmail: {
          msg: "email must be an email"
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "password can't be empty"
        }
      }
    },
    bio: {
      type: DataTypes.STRING,
      len: {
        args: [4,30],
        msg: "bio must be between 4 and 30 characters"
      }
    },
    birthday: DataTypes.DATE,
    avatar: DataTypes.STRING,
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.STRING,
    latlong: DataTypes.STRING,
    skills: DataTypes.STRING,
    causes: DataTypes.STRING,
    areas: DataTypes.STRING,
    sdgs: DataTypes.STRING,
    allowToRemote: DataTypes.INTEGER,
    userProfile: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['org', 'people']],
          msg: "userProfile must be an org or a people using lowercase"
        }
      }
    },
    userStatus: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      validate: {
        isIn: {
          args: [[0, 1]],
          msg: "userStatus must be 0 or 1"
        }
      }
    },
  });

  User.associate = models => {
    User.belongsToMany(models.Initiative, {
      through: 'Combinations',
      as: 'initiatives',
      foreignKey: 'UserId',
    })
  }

  return User;
}