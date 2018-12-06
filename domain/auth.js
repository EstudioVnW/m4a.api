var jwt = require('jsonwebtoken');
const { User } = require('./entities');

const secret = 'alohomora'

const login = async (email) => {
  const user = await User.findOne({
    where: { email: email },
  })
  return jwt.sign({
    email: user.email },
    secret, {
    expiresIn: '7d'
  });
}

const loggedUser = (token) => {
  try {
    return jwt.verify(token, secret);
  }
  catch(err) {
    throw err
  }
}

const requiresAuth = (req, res, next) => {
  const authorization = req.header('Authorization')
  if (!authorization) {
    return res.status(401).json({ message: 'No authorization header found' });
  }
  try {
    const token = authorization.replace('Bearer ', '')
    jwt.verify(token, secret);
    next()
  }
  catch(err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = { login, loggedUser, requiresAuth };