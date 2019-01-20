module.exports = (sequelize, DataTypes) => {
  const InitiativesInterests = sequelize.define('InitiativesInterests', {
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