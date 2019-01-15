const InitiativeJson = {
  format: (initiative) => {
    console.log('entrou', initiative)
    return {
      type: `Initiative`,
      id: initiative.id,
      attributes: {
        name: initiative.name,
        website: initiative.website,
        bio: initiative.bio,
        birthday: initiative.birthday,
        avatar: initiative.avatar,
        country: initiative.country,
        state: initiative.state,
        city: initiative.city,
        address: initiative.address,
        zipcode: initiative.zipcode,
        latlong: initiative.latlong,
        skills: initiative.skills,
        causes: initiative.causes,
        areas: initiative.areas,
        sdgs: initiative.sdgs,
        eventType: initiative.eventType,
        start: initiative.start,
        finish: initiative.finish,
        createdAt: initiative.createdAt,
        updatedAt: initiative.updatedAt,
        userId: initiative.UserId,
      }
    };
  }
};

module.exports = InitiativeJson;