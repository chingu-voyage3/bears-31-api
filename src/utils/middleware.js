const { decodeToken } = require('./jwt');
const { User } = require('../models');

const checkAuth = (req, res, next) => {
  // Check if there's a token in the request, if not reject
  const jwt = req.headers.authorization;
  if (!jwt) {
    res.send(401, 'Invalid or missing authorization token');
  }
  // There's a token, see if it's a valid one and retrieve the payload
  else {
    const payload = decodeToken(jwt);
    if (!payload) {
      res.send(401, 'Invalid token');
    } else {
      User.byUsername(payload.username)
        .then(() => next())
        .catch((err) => {
          console.log(err);
        });
    }
  }
};

module.exports = {
  checkAuth,
};
