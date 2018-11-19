'use strict';
const { Match } = require('../../domain/entities');
const Json = require('../responses/users');

module.exports = class Users {
  constructor(router) {
    this.router = router;
  }

  expose() {
    this.getMatches();
    this.createMatch();
  }

  getMatches() {
    this.router.get('/match', async (req, res) => {
      try {
        const matches = await Match.findAll().map(match => match)
        res.status(200).json(matches)
      }
      catch (err) {
        res.status(500).json(err)
      }
    });
  }

  createMatch() {
    this.router.post('/match', async (req, res) => {
      try {
        const match = await Match.create(req.body)
        res.status(200).json(match)
      }
      catch (err) {
        res.status(500).json(err)
      }
    });
  }

};