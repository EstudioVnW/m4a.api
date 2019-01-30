'use strict';
const { Initiative, Match, User, InitiativesInterests, Interests, InitiativesImages } = require('../../domain/entities');
const { InitiativeRepository } = require('../../domain/repositories');

const Json = require('../responses/initiatives');
const { loggedUser } = require('../../domain/auth')
const { sendPhotos, handleImage } = require('../../domain/firebaseStorage');

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
        if (req.query.include === 'interests') {

          const initiativeWithInterests = await Initiative.findAll({
            include: [{ model: Interests }]
          })

          return res.status(200).json({
            data: initiativeWithInterests
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
    this.router.post('/initiatives/uploadphotos/:initiativeId', handleImage.array('avatar', 5), async (req, res) => {
      try {
        console.log('searching initiative...')
        const find = await Initiative.findOne({
          where: { id: req.params.initiativeId }
        })

        if (find) {
          console.log('sending images to firebase')
          const saveFirebase = await Promise.all(
            req.files.map(item => {
                console.log('saving...')
                return sendPhotos({
                  initiative: find,
                  data: item
                })
              }
            )
          )

          if (saveFirebase) {
            console.log('sending images to mysql')
            const saveMySQL = await Promise.all(
              saveFirebase.map(item => {
                console.log('saving...')
                InitiativesImages.create({
                  InitiativeId: req.params.initiativeId,
                  image: item
                })
              })
            )

            if (saveMySQL) {
              return res.status(200).json({ data: saveFirebase })
            }
          } 
        }

      }
      catch (err) {
        console.log(err)
        res.status(500).json({ message: 'something is broken' })
      }
    })
  }

};