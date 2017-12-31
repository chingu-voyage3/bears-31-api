const express = require('express');
const models = require('../models');

const router = express.Router();

/**
 * Create a new group
 * @param {object} req - The request object
 * @param {object} res - The response object to write to
 * @return {object} The new group object
 */
router.post('/groups', async (req, res) => {
  const { name } = req.body;
  const group = await models.Group.create({ name });
  // ToDo: Assign the user who created the group as admin
  res.json(group);
});

/**
 * Update a specific group
 * @param {object} req - The request object
 * @param {object} res - The response object to write to
 * @return {object} The updated group object
 */
router.put('/groups/:groupid([0-9]+)', async (req, res) => {
  // ToDo: Only admins of the group should be able to access this endpoint
  const { id } = req.params;
  const group = await models.Group.findOne({ where: { id } });
  const { name } = req.body;
  const updatedGroup = await group.update({ name });
  res.json(updatedGroup);
});

/**
 * Delete a specific group
 * @param {object} req - The request object
 * @param {object} res - The response object to write to
 * @return {boolean} Whether the group was successfully deleted or not
 */
router.delete('/groups/:groupid([0-9]+)', async (req, res) => {
  // ToDo: Only admins of the group should be able to access this endpoint
  const { id } = req.params;
  const group = await models.Group.findOne({ where: { id } });
  group.destroy().then((queryResult) => {
    res.json(queryResult);
  }).catch((err) => {
    res.json(err);
  });
});

/**
 * List all the group members
 * @param {object} req - The request object
 * @param {object} res - The response object to write to
 * @return {object[]} The array of members
 */
router.get('/groups/:groupid([0-9]+)/members', (req, res) => {
  const response = {
    endpoint: 'List all the group members',
    group_id: req.params.groupid,
  };
  res.json(response);
});

/**
 * Add a group member
 * @param {object} req - The request object
 * @param {object} res - The response object to write to
 * @return {object} The new member
 */
router.post('/groups/:groupid([0-9]+)/members', async (req, res) => {
  // ToDo: Make endpoint only accessible to group admins
  const { id } = req.params;
  const { email, username } = req.body;
  let user;
  // If an email was passed, we prioritize it
  if (email) {
    user = await models.User.findOne({ where: { email } });
    // ToDo: create an invitation to the app if the user is not found
  } else if (username) {
    user = await models.User.findOne({ where: { username } });
  }
  const userGroup = await models.UserGroup.create({ group_id: id, user_id: user.id });
  res.json(userGroup);
});

/**
 * Update a group member (change its role)
 * @param {object} req - The request object
 * @param {object} res - The response object to write to
 * @return {object} The updated member
 */
router.put('/groups/:groupid([0-9]+)/members/memberid([0-9]+)', async (req, res) => {
  // ToDo: Only group admins should be able to access this endpoint
  const { groupid, memberid } = req.params;
  const { isAdmin } = req.body;
  const userGroup = await models.UserGroup.findOne({
    where: {
      group_id: groupid,
      user_id: memberid
    },
  });
  const updatedUserGroup = await userGroup.update({ is_admin: isAdmin });
  res.json(updatedUserGroup);
});

/**
 * Remove a group member
 * @param {object} req - The request object
 * @param {object} res - The response object to write to
 * @return {boolean} Whether the member was successfully removed or not
 */
router.delete('/groups/:groupid([0-9]+)/members/memberid([0-9]+)', async (req, res) => {
  // ToDo: Only group admins should be able to access this endpoint
  const { groupid, memberid } = req.params;
  const userGroup = await models.UserGroup.findOne({
    where: {
      group_id: groupid,
      user_id: memberid,
    },
  });
  userGroup.destroy().then((queryResult) => {
    res.json(queryResult);
  }).catch((err) => {
    res.json(err);
  });
});

module.exports = router;
