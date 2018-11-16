'use strict';
const { Initiative } = require('../../domain/entities');
const Json = require('../responses/initiatives');

module.exports = class Initiatives {
  constructor(router) {
    this.router = router;
  }

  expose() {
    this.findInitiativesList();
    this.createInitiative();
  }

  findInitiativesList() {
    this.router.get('/initiatives', async (req, res) => {
      try {
        const initiatives = await Initiative.findAll().map(initiative => Json.format(initiative))
        res.status(200).json(initiatives)
      }
      catch (err) {
        res.status(500).json(err)
      }
    });
  }

  createInitiative() {
    this.router.post('/initiatives', async (req, res) => {
      try {
        const initiative = await Initiative.create(req.body)
        res.status(200).json(Json.format(initiative))
      }
      catch (err) {
        res.status(500).json(err)
      }
    });
  }

};