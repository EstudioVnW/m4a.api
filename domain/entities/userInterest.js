module.exports = (sequelize, DataTypes) => {
  const UserInterests = sequelize.define('UserInterests', {
    interestDescription: DataTypes.STRING,
    interestType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['Areas', 'Causes',  'SDG', 'Skills']],
          msg: "interestType must be a 'skill', 'cause', 'area' or 'sdg'"
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

  UserInterests.associate = models => {
    UserInterests.belongsTo(models.User);
  };

  return UserInterests;
}