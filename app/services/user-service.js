'use strict';
const { User } = require('../../domain/entities');
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
        const users = await User.findAll().map(user => Json.format(user))
        res.status(200).json({data: users})
      }
      catch (err) {
        res.status(500).json(err)
      }
    });
  }

  createUser() {
    this.router.post('/users', async (req, res) => {
      try {
        const user = await User.create(req.body)
        res.status(200).json({data: Json.format(user)})
      }
      catch (err) {
        res.status(500).json(err)
      }
    });
  }

  findUser() {
    this.router.get('/users/:userId', async (req, res) => {
      try {
        const user = await User.find({ where: { id: req.params.userId } })
        if (user) {
          res.status(200).json({data: Json.format(user)});
        }
        else {
          res.status(404).json({ message: 'Didn’t find anything here!' });
        }
      }
      catch (err) {
        res.status(500).json(err)
      }
    });
  }

  updateUser() {
    this.router.put('/users/:userId', async (req, res) => {
      try {
        const find = await User.find({ where: { id: req.params.userId } })
        if (find) {
          const update = await User.update(req.body, { where: { id: req.params.userId } })
          if (update) {
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
        const find = await User.find({ where: { id: req.params.userId } })
        if (find) {
          const deleted = await User.destroy({ where: { id: req.params.userId } })
          if (deleted) {
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