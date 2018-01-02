const express = require('express');
const { Group, Meeting } = require('../models');

const router = express.Router();

/**
 * List all the group meetings
 * @param {object} req - The request object
 * @param {object} res - The response object to write to
 * @return {object[]} The array of meetings
 */
router.get('/groups/:groupid([0-9]+)/meetings', async (req, res) => {
  // ToDo: Only group members should be able to access the endpoint
  const { groupid } = req.params;
  Group.forge({ id: groupid }).fetch({ withRelated: ['meetings'] })
    .then((group) => {
      res.json(group);
    })
    .catch((err) => {
      res.json(err);
    });
});

/**
 * Create a new group meeting
 * @param {object} req - The request object
 * @param {object} res - The response object to write to
 * @return {object} The just created meeting
 */
router.post('/groups/:groupid([0-9]+)/meetings', (req, res) => {
  // ToDo: Only group admins should be able to access this endpoint
  // Maybe send an email after the meeting has been created
  // to notify all members so they can create their own status
  // instead of doing it API side
  const { groupid } = req.params;
  const {
    title, location, details, due,
  } = req.body;
  // ToDo: check if the group exists
  Group.byID(groupid)
    .then((group) => {
      const data = {
        title,
        location,
        details,
        due,
        group_id: group.id,
      };
      Meeting.forge(data).save()
        .then((meeting) => {
          res.json(meeting);
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
 * Details for an specific meeting
 * @param {object} req - The request object
 * @param {object} res - The response object to write to
 * @return {object} The meeting object
 */
router.get(
  '/groups/:groupid([0-9]+)/meetings/:meetingid([0-9]+)',
  async (req, res) => {
    // ToDo: Only group members should be able to access this endpoint
    const { groupid, meetingid } = req.params;
    Meeting.forge({ id: meetingid, group_id: groupid }).fetch()
      .then((meeting) => {
        res.json(meeting);
      })
      .catch((err) => {
        res.json(err);
      });
  },
);

/**
 * Update an specific meeting
 * @param {object} req - The request object
 * @param {object} res - The response object to write to
 * @return {object} The updated meeting object
 */
/*
router.put(
  '/groups/:groupid([0-9]+)/meetings/:meetingid([0-9]+)',
  async (req, res) => {
    // ToDo: Only group admins should be able to access this endpoint
    const { groupid, meetingid } = req.params;
    const { title, location, details, due } = req.body;
    models.Meeting.findOne({
      where: {
        group_id: groupid,
        id: meetingid,
      },
    })
      .then((meeting) => {
        meeting.update({
          title,
          location,
          details,
          due,
        })
          .then((updatedMeeting) => {
            res.json(updatedMeeting);
          })
          .catch((err) => {
            res.json(err);
          });
      })
      .catch((err) => {
        res.json(err);
      });
  }
);
*/

/**
 * Delete an specific meeting
 * @param {object} req - The request object
 * @param {object} res - The response object to write to
 * @return {boolean} Whether the deletion was successful or not
 */
/*
router.delete(
  '/groups/:groupid([0-9]+)/meetings/:meetingid([0-9]+)',
  async (req, res) => {
    const { groupid, meetingid } = req.params;
    models.Meeting.findOne({
      where: {
        group_id: groupid,
        id: meetingid,
      },
    })
      .then((meeting) => {
        meeting.destroy()
          .then(() => {
            const response = {
              message: 'Meeting deleted',
            };
            res.json(response);
          })
          .catch((err) => {
            res.json(err);
          });
      })
      .catch((err) => {
        res.json(err);
      });
  }
);
*/

/**
 * Update a group member status on a meeting
 * @param {object} req - The request object
 * @param {object} res - The response object to write to
 * @return {object} The updated user status
 */
/*
router.put(
  '/groups/:groupid([0-9]+)/meetings/:meetingid([0-9]+)/users/:userid([0-9]+)',
  async (req, res) => {
    // ToDo: Only the members themselves should be able to update their status
    const { meetingid, userid } = req.params;
    const { status } = req.body;
    models.UserMeeting.findOne({
      where: {
        meeting_id: meetingid,
        user_id: userid,
      },
    })
      .then((userMeeting) => {
        userMeeting.update({ status })
          .then((updatedUserMeeting) => {
            res.json(updatedUserMeeting);
          })
          .catch((err) => {
            res.json(err);
          });
      })
      .catch((err) => {
        res.json(err);
      });
  }
);
*/

module.exports = router;
