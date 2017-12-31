const decodeToken = require('./jwt').decodeToken;
const models = require('../models');

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
    }
    else {
      models.User.findOne({
        where: {
          username: payload.username,
        },
      })
        .then((user) => {
          next();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }
};

module.exports = {
  checkAuth,
};
