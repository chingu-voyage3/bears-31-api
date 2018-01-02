const express = require('express');
const { User, Group, Groups } = require('../models');
const { decodeToken } = require('../utils/jwt');
const { checkAuth } = require('../utils/middleware');

const router = express.Router();

/**
 * List all the groups
 * @param {object} req - The request object
 * @param {object} res - The response object to write to
 * @return {object[]} The array of groups
 */
router.get('/groups', async (req, res) => {
  Groups.forge().fetch()
    .then((groups) => {
      res.json(groups);
    })
    .catch((err) => {
      res.json(err);
    });
});

/**
 * Create a new group
 * @param {object} req - The request object
 * @param {object} res - The response object to write to
 * @return {object} The new group object
 */
router.post('/groups', checkAuth, async (req, res) => {
  // Gets the token payload
  const token = decodeToken(req.headers.authorization);

  // Tries to find an user for the token username
  // if it finds the user, then it will try to create
  // the group, if the operation is successful, it will
  // attach the user to the group, doing so, it will create
  // a new row in the users_groups table so we can query
  // for the related groups/users from each model
  User.byUsername(token.username)
    .then((user) => {
      const { name } = req.body;
      const data = {
        name,
      };
      Group.forge(data).save()
        .then((group) => {
          user.groups().attach(group);
          res.json(group);
        })
        .catch((err) => {
          res.json(err);
        });
    })
    .catch((err) => {
      res.json(err);
    });
});

/**
 * Update a specific group
 * @param {object} req - The request object
 * @param {object} res - The response object to write to
 * @return {object} The updated group object
 */
router.put('/groups/:groupid([0-9]+)', async (req, res) => {
  // ToDo: Only admins of the group should be able to access this endpoint
  const { groupid } = req.params;
  const { name } = req.body;
  Group.forge({ id: groupid }).fetch()
    .then((group) => {
      group.save({
        name: name || group.get('name'),
      })
        .then(() => {
          res.json({
            message: 'Group updated',
          });
        })
        .catch((err) => {
          res.json(err);
        });
    })
    .catch((err) => {
      res.json(err);
    });
});

/**
 * Delete a specific group
 * @param {object} req - The request object
 * @param {object} res - The response object to write to
 * @return {boolean} Whether the group was successfully deleted or not
 */
router.delete('/groups/:groupid([0-9]+)', checkAuth, async (req, res) => {
  // ToDo: Only admins of the group should be able to access this endpoint
  const { groupid } = req.params;
  Group.forge({ id: groupid }).fetch()
    .then((group) => {
      group.users().detach();
      group.destroy()
        .then(() => res.json('group deleted'))
        .catch(err => res.json(err));
    })
    .catch(err => res.json(err));
});

/**
 * List all the group members
 * @param {object} req - The request object
 * @param {object} res - The response object to write to
 * @return {object[]} The array of members
 */
router.get('/groups/:groupid([0-9]+)/members', (req, res) => {
  const { groupid } = req.params;
  Group.forge({ id: groupid }).fetch({ withRelated: ['users'] })
    .then((group) => {
      console.log(`The group: ${group}`);
      res.json(group);
    })
    .catch((err) => {
      console.error(err);
      res.json(err);
    });
});

/**
 * Add a group member
 * @param {object} req - The request object
 * @param {object} res - The response object to write to
 * @return {object} The new member
 */
router.post('/groups/:groupid([0-9]+)/members', async (req, res) => {
  // ToDo: Make endpoint only accessible to group admins
  const { groupid } = req.params;
  const { email, username } = req.body;

  Group.forge({ id: groupid }).fetch()
    .then((group) => {
      User.byUsername(username)
        .then((user) => {
          group.users().attach(user);
          res.json({
            message: 'User added to the group',
          });
        })
        .catch((err) => {
          res.json(err);
        });
    })
    .catch((err) => {
      res.json(err);
    });
  /*
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
  */
});

/**
 * Update a group member (change its role)
 * @param {object} req - The request object
 * @param {object} res - The response object to write to
 * @return {object} The updated member
 */
/*
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
*/

/**
 * Remove a group member
 * @param {object} req - The request object
 * @param {object} res - The response object to write to
 * @return {boolean} Whether the member was successfully removed or not
 */
/*
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
*/

module.exports = router;
