const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwtUtils = require('../utils/jwt');

const router = express.Router();

/**
 * Register a new user
 * @param {object} req - The request object
 * @param {object} res - The response object to write to
 * @return {object} The just created user
 */
router.post('/users/register', async (req, res) => {
  const { username, firstName, lastName, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = new User();
  user.set('username', username);
  user.set('firstName', firstName);
  user.set('lastName', lastName);
  user.set('email', email);
  user.set('password', hashedPassword);
  user.save().then((u) => {
    res.json(u);
  }).catch((err) => {
    res.json(err);
  });
});

/**
 * Get a JWT to login
 * @param {object} req - The request object
 * @param {object} res - The response object to write to
 * @return {object} The JWT
 */
router.post('/users/login', async (req, res) => {
  const { username, password } = req.body;
  User.byUsername(username)
    .then((u) => {
      if (u.verifyPassword(password)) {
        const payload = {
          username: u.get('username'),
        };
        const token = jwtUtils.encodeToken(payload);
        const response = {
          token,
        };
        res.json(response);
      } else {
        const response = {
          error: 'Invalid credentials',
        };
        res.json(response);
      }
    })
    .catch((err) => {
      res.json(err);
    });
  /*
  models.User.findOne({
    where: {
      username,
    },
  }).then((user) => {
    bcrypt.compare(password, user.password, (err, valid) => {
      if (valid) {
        const payload = {
          username: user.username,
        };
        const token = jwtUtils.encodeToken(payload);
        const response = {
          token,
        };
        res.json(response);
      } else {
        const response = {
          error: 'Invalid credentials',
        };
        res.json(response);
      }
    });
  }).catch((err) => {
    res.json(err);
  });
  */
});

module.exports = router;
