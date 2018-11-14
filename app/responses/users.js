const UserJson = {
  format: (user) => {
    return {
      data: {
        type: `User`,
        id: user.id,
        attributes: {
          name: user.ds_name,
          email: user.ds_email,
          bio: user.ds_bio,
          birthday: user.dt_birthday,
          avatar: user.ds_avatar,
          profile: user.ds_profile,
          is_allow_to_remote: user.fl_is_allow_to_remote,
          country: user.ds_country,
          city: user.ds_city,
          address: user.ds_address,
          latlong: user.nr_latlong,
          skills: user.ds_skills,
          causes: user.ds_causes,
          areas: user.ds_areas,
          sdgs: user.ds_sdgs,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        }
      }
    };
  }
};

module.exports = UserJson;