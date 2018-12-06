'use strict';
const { login, loggedUser } = require('../../domain/auth');

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
        const {email} = req.body
        res.status(200).json({ data: await login(email)})
      }
      catch (err) {
        console.log(err)
        res.status(500).json(err)
      }
    });
  }

  verifyToken() {
    this.router.get('/login/verify', async (req, res) => {
      try {
        const user = await loggedUser(req)
        if (user) {
          return res.status(200)
        }
      }
      catch (err) {
        console.log(err)
        res.status(500).json(err)
      }
    });
  }

};