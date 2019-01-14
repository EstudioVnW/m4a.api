module.exports = (sequelize, DataTypes) => {
  const UserInterest = sequelize.define('UserInterest', {
    interestDescription: DataTypes.STRING,
    interestType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['skill', 'cause', 'area', 'sdg']],
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

  UserInterest.associate = models => {
    UserInterest.belongsTo(models.User);
  };

  return UserInterest;
}