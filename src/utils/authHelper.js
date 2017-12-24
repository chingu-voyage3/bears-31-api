const bcrypt = require('bcrypt');
const models = require('../../src/db/models');
const User = require('../../src/db/models/user');

module.exports = (req) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    User.create({
      username: req.body.username,
      password: hash,
    });
  });
};
