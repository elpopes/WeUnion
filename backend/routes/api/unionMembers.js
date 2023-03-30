const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Union = mongoose.model("Union");
const { requireUser } = require("../../config/passport");

// Define the routes for managing Union members

// join a Union

router.post("/union/:id/join", requireUser, async (req, res) => {
  try {
    const unionId = req.params.id;
    const userId = req.user._id;

    const union = await Union.findById(unionId);
    union.members.push(userId);
    await union.save();

    const user = await User.findById(userId);
    if (!user.unions.includes(unionId)) {
      user.unions.unshift(unionId);
      await user.save();
    }

    return res.json(union);
  } catch (e) {
    return res.status(422).json(e);
  }
});

// invite a user to a Union

router.post("/union/:id/invite", requireUser, async (req, res) => {
  try {
    const union = await Union.findById(req.params.id);
    union.invites.push(req.body.userId);
    union.save();
    return res.json(union);
  } catch (e) {
    return res.status(422).json(e);
  }
});

// accept an invite to a Union

router.post("/union/:id/accept", requireUser, async (req, res) => {
  try {
    const union = await Union.findById(req.params.id);
    union.members.push(req.user._id);
    union.invites.pull(req.user._id);
    union.save();
    return res.json(union);
  } catch (e) {
    return res.status(422).json(e);
  }
});

// reject an invite to a Union

router.post("/union/:id/reject", requireUser, async (req, res) => {
  try {
    const union = await Union.findById(req.params.id);
    union.invites.pull(req.user._id);
    union.save();
    return res.json(union);
  } catch (e) {
    return res.status(422).json(e);
  }
});

// leave a Union

router.post("/union/:id/leave", requireUser, async (req, res) => {
  try {
    const union = await Union.findById(req.params.id);
    union.members.pull(req.user._id);
    union.save();
    return res.json(union);
  } catch (e) {
    return res.status(422).json(e);
  }
});

// kick a user from a Union

router.post("/union/:id/kick", requireUser, async (req, res) => {
  try {
    const union = await Union.findById(req.params.id);
    union.members.pull(req.body.userId);
    union.save();
    return res.json(union);
  } catch (e) {
    return res.status(422).json(e);
  }
});

router.post("/union/:id/member", requireUser, async (req, res) => {
  try {
    const member = await User.findById(req.params.userId);
    return res.json(member);
  } catch (e) {
    return res.status(422).json(e);
  }
});

module.exports = router;
