'use strict';
const { User } = require('../../domain/entities');
const Err = require('../responses/errors');
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
      await User.findAll()
        .then(users => {
          const lista = []
          users.map((user) => {
            lista.push(Json.formatUser(user))
          })    
          res.json(lista);
        })
        .catch(err => {
          const error = Err.formatError(err)
          res.status(error.status).json(error);
        });
    });
  }


  createUser() {
    this.router.post('/users', async (req, res) => {
      await User.create(req.body)
        .then(user => {
          res.json(Json.formatUser(user));
        })
        .catch(err => {
          const error = Err.formatError(err)
          res.status(error.status).json(error);
        });
    });
  }

  findUser() {
    this.router.get('/users/:id', async (req, res) => {
      await User.find({ where: { id: req.params.id } })
        .then(user => {
          if (!user) {
            res.status(404).json({
              message: 'Didn’t find anything here!'
            });
          }
          res.json(Json.formatUser(user));
        })
        .catch(err => res.status(500).json(Err.formatError(err)))
    });
  }

  updateUser() {
    this.router.put('/users/:id', async (req, res) => {
      const id = req.params.id;
      const updates = req.body;
      
      const user = await User.find({ where: { id: id } })

      if (user) {
        User.update(updates, { where: { id: id } })
        res.json({
          type: 'User',
          message: 'User ' + id + ' was updated with success!'
        });
      }

      else {
        res.status(404).json({ message: 'Didn’t find anything here!' });
      }
    });
  }

  deleteUser() {
    this.router.delete('/users/:id', async (req, res) => {
      const id = req.params.id;

      let deleted = await User.destroy({ where: { id: id } })

      if (deleted) {
        res.json({type: 'User', message: 'User ' + id + ' was deleted with success!' });
      }
      else {
        res.status(404).json({ message: 'Didn’t find anything here!' });
      }

    });
  }

};