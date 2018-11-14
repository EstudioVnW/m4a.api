'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const StatusService = require('./app/services/status-service');
const UserService = require('./app/services/user-service');
const InitiativeService = require('./app/services/initiative-service.js');
const port = 3000

class Server {
  constructor () {
    this.app = express();
    this.router = express.Router();
  }

  setup () {
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'DELETE, GET, POST, PATCH');
      res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With,Content-Type,Accept, Authorization');
      next();
    });
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.use(bodyParser.json());
  }

  start () {
    // services
    new StatusService(this.router).expose();
    new UserService(this.router).expose();
    new InitiativeService(this.router).expose();

    // configs and start
    this.app.enable('trust proxy');
    this.app.use('/', this.router);
    this.app.listen(port, () => {
      console.log(`Readyy! http://localhost:${port}/`);
    });

  }
}

const api = new Server();

api.setup();
api.start();