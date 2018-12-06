'use strict';
// basic configs
const express = require('express');
const bodyParser = require('body-parser');

// services
const StatusService = require('./app/services/status-service');
const UserService = require('./app/services/user-service');
const InitiativeService = require('./app/services/initiative-service.js');
const MatchService = require('./app/services/match-service');
const Login = require('./app/services/auth-service');

const port = 3000

// swagger setup
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger.json');
const options = {
  customCss: '.swagger-ui .topbar { display: none } body {background-color: #ddd; display: flex; padding: 2rem; align-items: center; justify-content: center;} .swagger-ui {background-color: #fff; min-width: 90vw; border: 1px solid #619F42;  min-height: 100vh; } .swagger-ui .info .title {color: #FF7700} .swagger-ui .scheme-container {display: none}'
};

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
    new MatchService(this.router).expose();
    new Login(this.router).expose();

    // configs and start
    this.app.enable('trust proxy');
    this.app.use('/', this.router);
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
    this.app.listen(port, () => {
      console.log(`Readyy! http://localhost:${port}/`);
    });

  }
}

const api = new Server();

api.setup();
api.start();