module.exports = (sequelize, DataTypes) => {
  const UsersInterests = sequelize.define('UsersInterests', {
    description: DataTypes.STRING,
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['Areas', 'Causes',  'SDG', 'Skills']],
          msg: "type must be a 'Areas', 'Causes', 'SDG' or 'Skills'"
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