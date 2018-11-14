'use strict';
const { Initiative } = require('../../domain/entities');

module.exports = class Initiatives {
  constructor(router) {
    this.router = router;
  }

  expose() {
    this.findInitiativesList();
    this.createInitiative();
  }

  findInitiativesList() {
    this.router.get('/initiative', async (req, res) => {
      await Initiative.findAll()
        .then(users => res.status(200).json(users))
        .catch(err => res.status(500).json(err))
    });
  }

  createInitiative() {
    this.router.post('/initiative', async (req, res) => {
      await Initiative.create(req.body)
        .then(user => res.status(200).json(user))
        .catch(err => res.status(500).json(err))
    });
  }

};