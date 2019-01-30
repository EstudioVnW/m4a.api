module.exports = (sequelize, DataTypes) => {
  const InitiativesInterests = sequelize.define('InitiativesInterests', {
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "UserId can't be empty"
        }
      }
    },
    InitiativeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "InitiativeId can't be empty"
        }
      }
    }
  });

  InitiativesInterests.associate = models => {
    InitiativesInterests.belongsTo(models.Initiative);
  };

  return InitiativesInterests;
}