const InitiativeJson = {
  format: (initiative) => {
    return {
      type: `Initiative`,
      id: initiative.id,
      attributes: {
        name: initiative.name,
        website: initiative.website,
        avatar: initiative.avatar,
        bio: initiative.bio,
        country: initiative.country,
        city: initiative.city,
        userId: initiative.userId,
        interests: initiative.Interests && initiative.Interests.map(interest => ({
          id: interest.id,
          description: interest.description,
          type: interest.type,
          bio: interest.bio,
          avatar: interest.avatar
        }))
      }
    }
  }
}

module.exports = InitiativeJson;