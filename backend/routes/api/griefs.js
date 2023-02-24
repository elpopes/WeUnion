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
    console.log("the TRY >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    // console.log(res.json());
    console.log(griefs);
    return res.json(griefs);
  } catch (err) {
    console.log("the CATCH >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
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

// router.post("/", requireUser, validateGriefInput, async (req, res, next) => {
//   try {
//     const newGrief = new Grief({
//       text: req.body.text,
//       author: req.user._id,
//     });

//     let grief = await newGrief.save();
//     grief = await grief.populate("author", "_id username profileImageUrl");
//     return res.json(grief);
//   } catch (err) {
//     next(err);
//   }
// });

router.post("/", requireUser, validateGriefInput, async (req, res, next) => {
  try {
    const { text, imageUrls } = req.body;
    const author = req.user.id;
    const question = "Choose an action!";
    const options = [
      { option: "Collective Bargaining", votes: 0, selected: false },
      { option: "Strike", votes: 0, selected: false },
      { option: "Protest", votes: 0, selected: false },
      { option: "Dismiss", votes: 0, selected: false },
      { option: "Boycott", votes: 0, selected: false },
    ];
    const newGrief = new Grief({
      author,
      text,
      imageUrls,
      poll: { question, options },
    });

    let grief = await newGrief.save();
    grief = await grief.populate("author", "_id username profileImageUrl");
    return res.json(grief);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
