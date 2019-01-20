'use strict';
const { Initiative, Match, User, InitiativesInterests } = require('../../domain/entities');
const { InitiativeRepository } = require('../../domain/repositories');

const Json = require('../responses/initiatives');
const { loggedUser } = require('../../domain/auth')
const { sendAvatar, handleImage } = require('../../domain/firebaseStorage');

module.exports = class Initiatives {
  constructor(router) {
    this.router = router;
  }

  expose() {
    this.createInitiative();
    this.findInitiative();
    this.findInitiativesList();
    this.uploadPhotos();
  }

  createInitiative() {
    this.router.post('/initiatives', async (req, res) => {
      try {
        res.status(200).json({
          data: await Initiative.create(
            req.body, { include: [InitiativesInterests]
          })
        })
      }
      catch (err) {
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
          return res.status(200).json({ data: initiative });
        }

        return res.status(404).json({
          message: 'Didn’t find anything here!'
        });
      }
      catch (err) {
        res.status(500).json(err)
      }
    });
  }

  findInitiativesList() {
    this.router.get('/initiatives', async (req, res) => {
      try {
        // nearest
        if (req.query.nearest) {
          const result = await InitiativeRepository.findNearest(await loggedUser(req))
          return res.status(200).json({
            data: result.map(initiative => Json.format(initiative))
          })
        }
        // initiatives-interests
        if (req.query.include === 'initiatives-interests') {
          return res.status(200).json({
              data: await Initiative.findAll({
              include: [InitiativesInterests]
            })
          })
        }

        return res.status(200).json({
          data: await Initiative.findAll().map(initiative => Json.format(initiative))
        })
      }
      catch (err) {
        res.status(500).json(err)
      }
    });
  }

  uploadPhotos() {
    this.router.post('/initiatives/uploadphotos', handleImage.array('avatar', 12), async (req, res) => {
      try {
        const images = await Promise.all(
          req.files.map(item => sendAvatar(item))
        )
        if (images) {
          res.status(200).json({ message: images })
        }
      }
      catch (err) {
        console.log(err)
        res.status(500).json({ message: 'something is broken' })
      }
    })
  }

};