const InitiativeJson = {
  format: (iniative) => {
    return {
      data: {
        type: `Initiative`,
        id: iniative.id,
        attributes: {
          name: iniative.ds_name,
          ds_website_url: iniative.ds_email,
          bio: iniative.ds_bio,
          birthday: iniative.dt_birthday,
          avatar: iniative.ds_avatar,
          country: iniative.ds_country,
          city: iniative.ds_city,
          address: iniative.ds_address,
          latlong: iniative.nr_latlong,
          skills: iniative.ds_skills,
          causes: iniative.ds_causes,
          areas: iniative.ds_areas,
          sdgs: iniative.ds_sdgs,
          fl_event_type: iniative.fl_event_type,
          dt_start: iniative.dt_start,
          dt_finish: iniative.dt_finish,
          createdAt: iniative.createdAt,
          updatedAt: iniative.updatedAt,
          userId: iniative.UserId,
        }
      }
    };
  }
};

module.exports = InitiativeJson;