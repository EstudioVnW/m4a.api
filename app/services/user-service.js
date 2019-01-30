'use strict';
const { User, Match, Initiative, Interests, UsersInterests } = require('../../domain/entities');
const { sendAvatar, handleImage } = require('../../domain/firebaseStorage');
const Json = require('../responses/users');
const { login } = require('../../domain/auth');

module.exports = class Users {
  constructor(router) {
    this.router = router;
  }

  expose() {
    this.createUser();
    this.updateUser();
    this.deleteUser();
    this.findUser();
    this.uploadAvatar();
    this.findUsersList();
  }

  createUser() {
    this.router.post('/users', async (req, res) => {
      try {
        // grava os dados
        const user = await User.create(
          req.body
        )
          
        const rela = await UsersInterests.create({
          InterestId: 1,
          UserId: user.id
        })

        const token = await login(req.body.email)

        res.status(200).json({
          token: token,
          data: user,
          rela: rela
        })
      }
      catch (err) {
        console.log(err)
        res.status(500).json(err)
      }
    });
  }

  updateUser() {
    this.router.put('/users/:userId', async (req, res) => {
      try {
        if (await User.findOne({ where: { id: req.params.userId } })) {
          if (await User.update(req.body, { where: { id: req.params.userId } })) {
            return res.status(201).json({
              message: 'User has been updated.'
            });
          }
        }
        return res.status(404).json({
          message: 'Didn’t find anything here!'
        });
      }
      catch (err) {
        return res.status(500).json(err);
      }
    });
  }

  deleteUser() {
    this.router.delete('/users/:userId', async (req, res) => {
      try {
        if (await User.findOne({ where: { id: req.params.userId } })) {
          if (await User.destroy({ where: { id: req.params.userId } })) {
            return res.status(201).json({
              message: 'User has been deleted.'
            });
          }
        }
        return res.status(404).json({
          message: 'Didn’t find anything here!'
        });
      }
      catch (err){
        res.status(500).json({ message: 'something is broken' });
      }
    });
  }

  findUser() {
    // ok
    this.router.get('/users/:email', async (req, res) => {
      try {
        const { include } = req.query;
        
        if (include === 'initiatives') {
          const user = await User.findOne({
            where: { email: req.params.email },
            include: [Initiative]
          })
          if (user) {
            return res.status(200).json({
              data: Json.format(user)
            });
          }
        }

        const user = await User.findOne({
          where: { email: req.params.email },
        })

        if (user) {
          return res.status(200).json({
            data: Json.format(user)
          });
        }

        return res.status(404).json({
          message: 'Didn’t find anything here!'
        });
      }
      catch (err) {
        res.status(500).json({ message: 'something is broken' })
      }
    });
  }

  uploadAvatar() {
    this.router.post("/users/uploadavatar", handleImage.single('avatar'), async (req, res) => {
      try {
        const file = await sendAvatar(req.file)
        if (file) res.status(200).json({ message: file })
      }
      catch (err) {
        res.status(500).json({ message: 'something is broken' })
      }
    });
  }

  findUsersList() {
    this.router.get('/users', async (req, res) => {
      try {
        const { include } = req.query;

        if (include === 'interests') {
          const userWithInterests = await User.findAll({
            include: [{ model: Interests }]
          })

          return res.status(200).json({
            data: userWithInterests
          })
        }

        res.status(200).json({
          data: await User.findAll().map(user => Json.format(user))
        })
      }
      catch (err) {
        console.log(err)
        res.status(500).json({ message: 'something is broken' })
      }
    });
  }

};