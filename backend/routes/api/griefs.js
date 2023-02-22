const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Grief = mongoose.model("Grief");
const { requireUser } = require("../../config/passport");
const validateGriefInput = require("../../validations/griefs");

/* GET griefs listing. */
router.get("/", async (req, res) => {
  try {
    const griefs = await Grief.find()
      .populate("author", "_id username profileImageUrl")
      .sort({ createdAt: -1 });
    return res.json(griefs);
  } catch (err) {
    return res.json([]);
  }
});

router.get("/user/:userId", async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.params.userId);
  } catch (err) {
    const error = new Error("User not found");
    error.statusCode = 404;
    error.errors = { message: "No user found with that id" };
    return next(error);
  }
  try {
    const griefs = await Grief.find({ author: user._id })
      .sort({ createdAt: -1 })
      .populate("author", "_id username profileImageUrl");
    return res.json(griefs);
  } catch (err) {
    return res.json([]);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const grief = await Grief.findById(req.params.id).populate(
      "author",
      "_id username profileImageUrl"
    );
    return res.json(grief);
  } catch (err) {
    const error = new Error("Grievance not found");
    error.statusCode = 404;
    error.errors = { message: "No grievance found with that id" };
    return next(error);
  }
});

router.post("/", requireUser, validateGriefInput, async (req, res, next) => {
  try {
    const newGrief = new Grief({
      text: req.body.text,
      author: req.user._id,
    });

    let grief = await newGrief.save();
    grief = await grief.populate("author", "_id username profileImageUrl");
    return res.json(grief);
  } catch (err) {
    next(err);
  }
});

router.post("/:id/vote", async (req, res) => {
  try {
    const { optionId } = req.body;
    const { griefId } = req.params;
    const grief = await Grief.findById(griefId);
    if (!grief) {
      return res.status(404).json({ error: "Grief not found" });
    }
    if (!grief.poll) {
      return res.status(400).json({ error: "Grief does not have a poll" });
    }
    const option = grief.poll.options.find(o => o._id.equals(optionId));
    if (!option) {
      return res.status(400).json({ error: "Invalid poll option ID" });
    }
    const user = await User.findById(req.user.id);
    if (user.votedPolls.includes(griefId)) {
      return res.status(400).json({ error: "You have already voted on this poll" });
    }
    option.votes++;
    await grief.save();
    user.votedPolls.push(griefId);
    await user.save();
    return res.json(grief);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
