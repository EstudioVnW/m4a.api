module.exports = (sequelize, DataTypes) => {
  const Match = sequelize.define("Match", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: 'User',
      referencesKey: 'id',
      allowNull: false
    },
    InitiativeId: {
      type: DataTypes.INTEGER,
      references: 'Initiative',
      referencesKey: 'id',
      allowNull: false
    },
    matchStatus: {
      type: DataTypes.BOOLEAN
    }
  });

  Match.associate = models => {
    Match.belongsTo(models.User, {
      foreignKey: 'UserId',
    })
    Match.belongsTo(models.Initiative, {
      foreignKey: 'InitiativeId',
    })
  }

  return Match;
}