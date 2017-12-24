const express = require('express');
const jwtUtils = require('../utils/jwt');
const authHelper = require('../utils/authHelper');

const router = express.Router();

/**
 * Register a new user
 * @param {object} req - The request object
 * @param {object} res - The response object to write to
 * @return {object} The just created user
 */
router.post('/users/register', (req, res) => authHelper
  .createUser(req)
  .then(user => jwtUtils.encodeToken(user[0]))
  .then((token) => {
    res.status(200).json({
      token,
      status: 'sucess',
    });
  })
  .catch((err) => {
    res.status(500).json({
      status: 'error',
    });
  }));

/**
 * Get a JWT to login
 * @param {object} req - The request object
 * @param {object} res - The response object to write to
 * @return {object} The JWT
 */
router.post('/users/login', (req, res) => {
  const obj = {
    username: req.body.username,
  };
  const token = jwtUtils.encodeToken(obj);
  const response = {
    endpoint: 'Get a JWT to login',
    token,
  };
  res.json(response);
});

module.exports = router;
