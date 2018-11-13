module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    ds_profile: DataTypes.STRING,
    ds_email: DataTypes.STRING,
    ds_name: DataTypes.STRING,
    ds_bio: DataTypes.STRING,
    dt_birthday: DataTypes.DATE,
    ds_avatar: DataTypes.STRING,
    ds_country: DataTypes.STRING,
    ds_city: DataTypes.STRING,
    ds_address: DataTypes.STRING,
    nr_latlong: DataTypes.STRING,
    ds_skills: DataTypes.STRING,
    ds_causes: DataTypes.STRING,
    ds_areas: DataTypes.STRING,
    ds_sdgs: DataTypes.STRING,
    fl_is_allow_to_remote: DataTypes.BOOLEAN,
  });

  return User;
}
