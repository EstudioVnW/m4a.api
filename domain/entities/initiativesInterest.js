module.exports = (sequelize, DataTypes) => {
  const InitiativesInterests = sequelize.define('InitiativesInterests', {
    InterestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "InterestId can't be empty"
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

  return InitiativesInterests;
}