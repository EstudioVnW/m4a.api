const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const {
  User, Interests, Initiative, Matches,
} = require('./entities');

const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.js`)[env];

const UsersLong = require('../app/responses/users-long');

const secret = config.jwtSecret;

const login = async (email) => {
  const user = await User.findOne({
    where: { email },
    include: [
      Interests,
      {
        model: Initiative,
        as: 'UserInitiatives',
      },
    ],
  });
  if (!user) {
    return undefined;
  }
  const matches = await Matches.findAll({
    where: {
      UserId: user.id,
      liked: true,
    },
    include: [
      Initiative,
    ],
  });

  const data = {
    id: user.id,
    ...UsersLong.format(user),
    Interests: user.Interests.map((item) => ({
      id: item.id,
      description: item.description,
      type: item.type,
    })),
    listening_groups: [
      ...user.UserInitiatives.filter((item) => item.muted !== true).map((item) => ({
        id: item.id,
        name: item.name,
      })),
      ...matches.filter((item) => item.muted !== true).map((item) => ({
        id: item.Initiative.id,
        name: item.Initiative.name,
      })),
    ],
  };

  return await auth(data);
};

const loggedUser = async (req) => {
  try {
    const authorization = req.header('Authorization');
    const token = authorization.replace('Bearer ', '');
    const decoded = jwt.verify(token, secret);

    return await User.findOne({
      where: { email: decoded.info.email },
      include: [Interests],
    });
  } catch (err) {
    return undefined;
  }
};

const requiresAuth = (allowedRoutes) => (req, res, next) => {
  if (req.originalUrl.includes('docs')) return next();
  const url = allowedRoutes.find((item) => item.path === req.originalUrl);
  if (url && url.methods.includes(req.method)) {
    return next();
  }
  const authorization = req.header('Authorization');
  if (!authorization) {
    return res.status(401).json({ message: 'No authorization header found' });
  }
  try {
    const token = authorization.replace('Bearer ', '');
    jwt.verify(token, secret);
    next();
  } catch (err) {
    return res.status(401).json({
      message: 'Invalid token',
    });
  }
};

const routerList = [
  {
    path: '/',
    methods: ['GET'],
  },
  {
    path: '/user',
    methods: ['POST'],
  },
  {
    path: '/interests',
    methods: ['GET'],
  },
  {
    path: '/interests/Fields',
    methods: ['GET'],
  },
  {
    path: '/interests/Causes',
    methods: ['GET'],
  },
  {
    path: '/interests/SDGs',
    methods: ['GET'],
  },
  {
    path: '/interests/Skills',
    methods: ['GET'],
  },
  {
    path: '/login/facebook',
    methods: ['POST'],
  },
  {
    path: '/login/google',
    methods: ['POST'],
  },
  {
    path: '/login/verify',
    methods: ['GET'],
  },
];

const loginFB = async (info) => {
  let user;
  if (info.id) {
    user = await User.findOne({
      where: { facebookId: info.id },
      include: [
        Interests,
        {
          model: Initiative,
          as: 'UserInitiatives',
        },
      ],
    });
  }
  if (user === null) {
    user = await User.findOne({
      where: { username: info.name },
      include: [
        Interests,
        {
          model: Initiative,
          as: 'UserInitiatives',
          where: {
            muted: {
              [Op.or]: [false, null],
            },
            deletedAt: null,
          },
        },
      ],
    });
  }
  if (!user) {
    return undefined;
  }
  const matches = await Matches.findAll({
    where: {
      UserId: user.id,
      liked: true,
    },
    include: [
      {
        model: Initiative,
        where: {
          muted: {
            [Op.or]: [false, null],
          },
          deletedAt: null,
        },
      },
    ],
  });

  const data = {
    id: user.id,
    ...UsersLong.format(user),
    facebookId: user.facebookId && user.facebookId,
    Interests: user.Interests.map((item) => ({
      id: item.id,
      description: item.description,
      type: item.type,
    })),
    listening_groups: [
      ...user.UserInitiatives.map((item) => ({
        id: item.id,
        name: item.name,
      })),
      ...matches.map((item) => ({
        id: item.Initiative.id,
        name: item.Initiative.name,
      })),
    ],
  };
  return await auth(data);
};

const auth = async (data) => jwt.sign({
  sub: data.id,
  info: data,
  aud: 'Match4Action',
  iss: 'Match4Action',
},
secret, {
  expiresIn: '7d',
});

module.exports = {
  login, loginFB, loggedUser, requiresAuth, routerList,
};
