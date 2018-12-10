const UserJson = {
  format: (user) => {
    return {
      type: `User`,
      id: user.id,
      attributes: {
        username: user.username,
        email: user.email,
        password: user.password,
        bio: user.bio,
        birthday: user.birthday,
        avatar: user.avatar,
        country: user.country,
        state: user.state,
        city: user.city,
        address: user.address,
        latlong: user.latlong,
        skills: user.skills,
        causes: user.causes,
        areas: user.areas,
        sdgs: user.sdgs,
        allowToRemote: user.allowToRemote,
        userProfile: user.userProfile,
        userStatus: user.userStatus,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    };
  }
};

module.exports = UserJson;