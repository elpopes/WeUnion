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
      .populate("author", "_id username")
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
      .populate("author", "_id username");
    return res.json(griefs);
  } catch (err) {
    return res.json([]);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const grief = await Grief.findById(req.params.id).populate(
      "author",
      "_id username"
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
    grief = await grief.populate("author", "_id username");
    return res.json(grief);
  } catch (err) {
    next(err);
  }
});

module.exports = router;