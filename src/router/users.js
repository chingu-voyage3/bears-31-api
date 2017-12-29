const express = require('express');
const bcrypt = require('bcrypt');
const models = require('../models');
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
  models.User.create({
    username,
    email,
    first_name: firstName,
    last_name: lastName,
    password: hashedPassword,
  }).then((user) => {
    res.json(user);
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
});

module.exports = router;
