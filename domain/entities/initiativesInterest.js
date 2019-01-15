module.exports = (sequelize, DataTypes) => {
  const InitiativesInterests = sequelize.define('InitiativesInterests', {
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