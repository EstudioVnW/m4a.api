'use strict';
const { login, loggedUser } = require('../../domain/auth');
const Json = require('../responses/users');

module.exports = class Login {
  constructor(router) {
    this.router = router;
  }

  expose() {
    this.getToken();
    this.verifyToken();
  }

  getToken() {
    this.router.post('/login', async (req, res) => {
      try {
        const { email } = req.body
        const token = await login(email)
        if (token) {
          return res.status(200).json({ data: token })
        }
        return res.status(404).json({ message: 'Didn’t find anything here!'})
      }
      catch (err) {
        res.status(500).json(err)
      }
    });
  }

  verifyToken() {
    this.router.get('/login/verify', async (req, res) => {
      try {
        const user = await loggedUser(req)
        if (user) {
          return res.status(200).json({ data: Json.format(user) });
        }
        return res.status(401).end()
      }
      catch (err) {
        console.log(err)
        return res.status(500).json(err)
      }
    });
  }

};