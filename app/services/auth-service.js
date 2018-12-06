'use strict';
const { login } = require('../../domain/auth');

module.exports = class Login {
  constructor(router) {
    this.router = router;
  }

  expose() {
    this.getToken();
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

};