module.exports = (sequelize, DataTypes) => {
  return Match = sequelize.define("Match", {
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
    InitativeId: {
      type: DataTypes.INTEGER,
      references: 'Initative',
      referencesKey: 'id',
      allowNull: false
    },
  });
  return Match;
}