const express = require("express");

const router = express.Router();

/**
 * List all the group meetings
 * @param {object} req - The request object
 * @param {object} res - The response object to write to
 * @return {object[]} The array of meetings
 */
router.get("/groups/:groupid([0-9]+)/meetings", (req, res) => {
  let response = {
    group_id: req.params.groupid
  };
  res.json(response);
});

/**
 * Create a new group meeting
 * @param {object} req - The request object
 * @param {object} res - The response object to write to
 * @return {object} The just created meeting
 */
router.post("/groups/:groupid([0-9]+)/meetings", (req, res) => {
  let response = {
    group_id: req.params.groupid
  };
  res.json(response);
});

/**
 * Details for an specific meeting
 * @param {object} req - The request object
 * @param {object} res - The response object to write to
 * @return {object} The meeting object
 */
router.get(
  "/groups/:groupid([0-9]+)/meetings/:meetingid([0-9]+)",
  (req, res) => {
    let response = {
      group_id: req.params.groupid,
      meeting_id: req.params.meetingid
    };
    res.json(response);
  }
);

/**
 * Update an specific meeting
 * @param {object} req - The request object
 * @param {object} res - The response object to write to
 * @return {object} The updated meeting object
 */
router.put(
  "/groups/:groupid([0-9]+)/meetings/:meetingid([0-9]+)",
  (req, res) => {
    let response = {
      group_id: req.params.groupid,
      meeting_id: req.params.meetingid
    };
    res.json(response);
  }
);

/**
 * Delete an specific meeting
 * @param {object} req - The request object
 * @param {object} res - The response object to write to
 * @return {boolean} Whether the deletion was successful or not
 */
router.delete(
  "/groups/:groupid([0-9]+)/meetings/:meetingid([0-9]+)",
  (req, res) => {
    let response = {
      group_id: req.params.groupid,
      meeting_id: req.params.meetingid
    };
    res.json(response);
  }
);

/**
 * Update a group member status on a meeting
 * @param {object} req - The request object
 * @param {object} res - The response object to write to
 * @return {object} The updated user status
 */
router.put(
  "/groups/:groupid([0-9]+)/meetings/:meetingid([0-9]+)/users/:usergid([0-9]+)",
  (req, res) => {
    let response = {
      group_id: req.params.groupid
    };
    res.json(response);
  }
);

module.exports = router;
