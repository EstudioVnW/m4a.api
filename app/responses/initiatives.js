const InitiativeJson = {
  format: (iniative) => {
    return {
      type: `Initiative`,
      id: iniative.id,
      attributes: {
        name: iniative.name,
        website: iniative.website,
        bio: iniative.bio,
        birthday: iniative.birthday,
        avatar: iniative.avatar,
        country: iniative.country,
        state: iniative.state,
        city: iniative.city,
        address: iniative.address,
        zipcode: user.latlong,
        latlong: iniative.latlong,
        skills: iniative.skills,
        causes: iniative.causes,
        areas: iniative.areas,
        sdgs: iniative.sdgs,
        eventType: iniative.eventType,
        start: iniative.start,
        finish: iniative.finish,
        createdAt: iniative.createdAt,
        updatedAt: iniative.updatedAt,
        userId: iniative.UserId,
      }
    };
  }
};

module.exports = InitiativeJson;