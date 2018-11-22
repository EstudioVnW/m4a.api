'use strict';
const { Match, User, Initiative } = require('../../domain/entities');
const Json = require('../responses/users');

module.exports = class Users {
  constructor(router) {
    this.router = router;
  }

  expose() {
    this.getMatches();
    this.createMatch();
    this.findMatch();
  }

  getMatches() {
    this.router.get('/matchs', async (req, res) => {
      try {
        res.status(200)
          .json({ data: await Match.findAll().map(match => match) })
      }
      catch (err) {
        res.status(500).json(err)
      }
    });
  }

  findMatch() {
    this.router.get('/matchs/:matchId', async (req, res) => {
      try {
        const match = await Match.findOne({
          where: { id: req.params.matchId },
          include: [User, Initiative]
        })

        if (match) {
          return res.status(200).json({data: match});
        }

        return res.status(404).json({ message: 'Didn’t find anything here!' });
      }
      catch (err) {
        res.status(500).json(err)
      }
    });
  }

  createMatch() {
    this.router.post('/matchs', async (req, res) => {
      try {
        res.status(200)
          .json({ data: await Match.create(req.body) })
      }
      catch (err) {
        res.status(500).json(err)
      }
    });
  }

};