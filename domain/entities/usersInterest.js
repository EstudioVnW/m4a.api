module.exports = (sequelize, DataTypes) => {
  const UsersInterests = sequelize.define('UsersInterests', {
    InterestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "InterestId can't be empty"
        }
      }
    },
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

  UsersInterests.associate = models => {
    UsersInterests.belongsTo(models.User);
  };

  return UsersInterests;
}