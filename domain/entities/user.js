module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "name can't be empty",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: 'email must be unique',
      },
      validate: {
        isEmail: {
          msg: 'email must be an email',
        },
      },
    },
    bio: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [0, 100],
          msg: 'bio must have until 100 characters',
        },
      },
    },
    birthday: DataTypes.DATE,
    avatar: DataTypes.STRING,
    country: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.STRING,
    latlong: DataTypes.GEOMETRY('POINT', 4326),
    zipcode: DataTypes.STRING,
    facebookId: DataTypes.STRING,
    allowToRemote: DataTypes.INTEGER,
    userProfile: DataTypes.STRING,
    userStatus: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      validate: {
        isIn: {
          args: [[0, 1]],
          msg: 'userStatus must be 0 or 1',
        },
      },
    },
    partner: DataTypes.STRING,
    partnerVinculo: DataTypes.STRING,
  },
  {
    paranoid: true,
    timestamps: true,
  });

  User.associate = (models) => {
    User.hasMany(models.Initiative, { foreignKey: 'UserId', as: 'UserInitiatives' });

    User.hasMany(models.Organization, { foreignKey: 'idAdmin', as: 'userOrganizations' });

    User.belongsToMany(models.Interests, { through: 'UsersInterests' });

    User.belongsToMany(models.Initiative, { through: 'Matches' });
  };
  return User;
};
