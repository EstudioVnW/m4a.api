const UserJson = {
  format: (user) => {
    return {
      type: `User`,
      id: user.id,
      attributes: {
        username: user.username,
        email: user.email,
        userProfile: user.userProfile,
        bio: user.bio,
        birthday: user.birthday,
        avatar: user.avatar,
        country: user.country,
        state: user.state,
        city: user.city,
        address: user.address,
        zipcode: user.zipcode,
        latlong: user.latlong,
        allowToRemote: user.allowToRemote,
        userStatus: user.userStatus,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    };
  }
};

module.exports = UserJson;