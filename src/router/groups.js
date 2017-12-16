const express = require("express");

const router = express.Router();

/**
 * Create a new group
 * @param {object} req - The request object
 * @param {object} res - The response object to write to
 * @return {object} The new group object
 */
router.post("/groups", (req, res) => {
  let response = {
    endpoint: "Create a new group"
  };
  res.json(response);
});

/**
 * Update a specific group
 * @param {object} req - The request object
 * @param {object} res - The response object to write to
 * @return {object} The updated group object
 */
router.put("/groups/:groupid([0-9]+)", (req, res) => {
  let response = {
    endpoint: "Update a specific group",
    group_id: req.params.group_id
  };
  res.json(response);
});

/**
 * Delete a specific group
 * @param {object} req - The request object
 * @param {object} res - The response object to write to
 * @return {boolean} Whether the group was successfully deleted or not
 */
router.delete("/groups", (req, res) => {
  let response = {
    endpoint: "Create a new group"
  };
  res.json(response);
});

/**
 * List all the group members
 * @param {object} req - The request object
 * @param {object} res - The response object to write to
 * @return {object[]} The array of members
 */
router.get("/groups/:groupid([0-9]+)/members", (req, res) => {
  let response = {
    group_id: req.params.groupid
  };
  res.json(response);
});

/**
 * Add a group member
 * @param {object} req - The request object
 * @param {object} res - The response object to write to
 * @return {object} The new member
 */
router.post("/groups/:groupid([0-9]+)/members", (req, res) => {
  let response = {
    group_id: req.params.groupid
  };
  res.json(response);
});

/**
 * Update a group member (change its role)
 * @param {object} req - The request object
 * @param {object} res - The response object to write to
 * @return {object} The updated member
 */
router.get("/groups/:groupid([0-9]+)/members/memberid([0-9]+)", (req, res) => {
  let response = {
    group_id: req.params.groupid,
    member_id: req.params.memberid
  };
  res.json(response);
});

/**
 * Remove a group member
 * @param {object} req - The request object
 * @param {object} res - The response object to write to
 * @return {boolean} Whether the member was successfully removed or not
 */
router.get("/groups/:groupid([0-9]+)/members/memberid([0-9]+)", (req, res) => {
  let response = {
    endpoint: "Remove a group member",
    group_id: req.params.groupid,
    member_id: req.params.memberid
  };
  res.json(response);
});

module.exports = router;
