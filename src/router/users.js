const express = require('express');
const bcrypt = require('bcrypt');
const { User, Users } = require('../models');
const jwtUtils = require('../utils/jwt');

const router = express.Router();

/**
 * Register a new user
 * @param {object} req - The request object
 * @param {object} res - The response object to write to
 * @return {object} The just created user
 */
router.post('/users/register', async (req, res) => {
  const {
    username, firstName, lastName, email, password,
  } = req.body;

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
});

/**
 * Get a list of all the users
 * @param {object} req - The request object
 * @param {object} res - The response object to write to
 * @return {object[]} The list of users
 */
router.get('/users', async (req, res) => {
  Users.forge().fetch()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.json(err);
    });
});

/**
 * Get a single user using its username
 * @param {object} req - The request object
 * @param {object} res - The response object to write to
 * @return {object} The user
 */
router.get('/users/:username', async (req, res) => {
  const { username } = req.params;
  User.forge({ username }).fetch({ withRelated: ['groups'] })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
