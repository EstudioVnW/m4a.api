'use strict';
const { Initiative, Match, User } = require('../../domain/entities');
const { InitiativeRepository } = require('../../domain/repositories');

const Json = require('../responses/initiatives');
const { loggedUser } = require('../../domain/auth')

module.exports = class Initiatives {
  constructor(router) {
    this.router = router;
  }

  expose() {
    this.findInitiativesList();
    this.createInitiative();
    this.findInitiative();
  }

  // nearest
  findInitiativesList() {
    this.router.get('/initiatives', async (req, res) => {
      try {
        if (req.query.nearest) {
          const result = await InitiativeRepository.findNearest(await loggedUser(req))
          return res.status(200).json({
            data: result.map(initiative =>
              Json.format(initiative)
            )
          })
        }
        return res.status(200).json({
          data: await Initiative.findAll()
            .map(initiative =>
              Json.format(initiative)
            )
          })
      }
      catch (err) {
        console.log(err)
        res.status(500).json(err)
      }
    });
  }

  findInitiative() {
    this.router.get('/initiatives/:initiativeId', async (req, res) => {
      try {
        const initiative = await Initiative.findOne({
          where: { id: req.params.initiativeId },
          include: [{
            model: Match,
            include: [User]
          }]
        })
        
        if (initiative) {
          return res.status(200).json({data: initiative});
        }

        return res.status(404).json({ message: 'Didn’t find anything here!' });
      }
      catch (err) {
        res.status(500).json(err)
      }
    });
  }

  createInitiative() {
    this.router.post('/initiatives', async (req, res) => {
      try {
        res.status(200)
          .json(Json.format(await Initiative.create(req.body)))
      }
      catch (err) {
        res.status(500).json(err)
      }
    });
  }

};