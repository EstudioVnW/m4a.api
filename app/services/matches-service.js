'use strict';
const { User } = require('../../domain/entities');
const { sendAvatar, handleImage } = require('../../domain/firebaseStorage');
const Json = require('../responses/users');
const { login } = require('../../domain/auth');

module.exports = class Users {
  constructor(router) {
    this.router = router;
  }

  expose() {
    this.createMatch();
  }

  createMatch() {
    this.router.get('/matches', async (req, res) => {
      try {
        res.status(200).json({
          message: 'ok'
        })
      }
      catch (err) {
        res.status(500).json({
          message: 'something is broken'
        })
      }
    });
  }

};