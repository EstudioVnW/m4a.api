'use strict';
const { User, Match, Initiative } = require('../../domain/entities');
const Json = require('../responses/users');

module.exports = class Users {
  constructor(router) {
    this.router = router;
  }

  expose() {
    this.findUsersList();
    this.createUser();
    this.findUser();
    this.updateUser();
    this.deleteUser();
  }

  findUsersList() {
    this.router.get('/users', async (req, res) => {
      try {
        res.status(200)
          .json({
            data: await User.findAll().map(user => Json.format(user))
          })
      }
      catch (err) {
        res.status(500).json(err)
      }
    });
  }

  createUser() {
    this.router.post('/users', async (req, res) => {
      try {
        res.status(200)
          .json({
            data: Json.format(
              await User.create(req.body)
            )
          })
      }
      catch (err) {
        res.status(500).json(err)
      }
    });
  }

  findUser() {
    this.router.get('/users/:email', async (req, res) => {
      try {
        const { include } = req.query;
        if (include === 'initiatives') {
          const user = await User.findOne({
            where: { email: req.params.email },
            include: [Initiative]
          })
          if (user) {
            return res.status(200).json({data: user});
          }
        }

        const user = await User.findOne({
          where: { email: req.params.email },
        })

        if (user) {
          return res.status(200).json({data: Json.format(user)});
        }

        return res.status(404).json({ message: 'Didn’t find anything here!' });
      }
      catch (err) {
        res.status(500).json(err)
      }
    });
  }

  updateUser() {
    this.router.put('/users/:userId', async (req, res) => {
      try {
        if (await User.findOne({ where: { id: req.params.userId } })) {
          if (await User.update(req.body, { where: { id: req.params.userId } })) {
            return res.status(201).json({ message: 'User has been updated.'});
          }
        }
        return res.status(404).json({ message: 'Didn’t find anything here!' });
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
            return res.status(201).json({ message: 'User has been deleted.'});
          }
        }
        return res.status(404).json({ message: 'Didn’t find anything here!' });
      }
      catch (err){
        res.status(500).json(err);
      }
    });
  }

};