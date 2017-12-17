const express = require('express');

const router = express.Router();

/**
 * Register a new user
 * @param {object} req - The request object
 * @param {object} res - The response object to write to
 * @return {object} The just created user
 */
router.post('/users/register', (req, res) => {
  let response = {
    endpoint: 'Register a new user',
    group_id: req.params.groupid
  };
  res.json(response);
});

/**
 * Get a JWT to login
 * @param {object} req - The request object
 * @param {object} res - The response object to write to
 * @return {object} The JWT
 */
router.post('/users/login', (req, res) => {
  let response = {
    endpoint: 'Get a JWT to login',
    group_id: req.params.groupid
  };
  res.json(response);
});

module.exports = router;
