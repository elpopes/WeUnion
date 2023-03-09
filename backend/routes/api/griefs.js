const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Union = mongoose.model("Union");
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

//new route to get the union's grievances
router.get("/union/:unionId", async (req, res, next) => {
  let union;
  try {
    union = await Union.findById(req.params.unionId);
  } catch (err) {
    const error = new Error("Union not found");
    error.statusCode = 404;
    error.errors = { message: "No union found with that id" };
    return next(error);
  }
  try {
    const griefs = await Grief.find({ union: union })
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

// router.post("/", requireUser, validateGriefInput, async (req, res, next) => {
//   try {
//     const { text, imageUrls } = req.body;
//     const author = req.user.id;
//     const union = req.user.union;
//     const question = "Choose an action!";
//     const options = [
//       { option: "Collective Bargaining", votes: 0, selected: false },
//       { option: "Strike", votes: 0, selected: false },
//       { option: "Protest", votes: 0, selected: false },
//       { option: "Dismiss", votes: 0, selected: false },
//       { option: "Boycott", votes: 0, selected: false },
//     ];
//     const newGrief = new Grief({
//       author,
//       union,
//       text,
//       imageUrls,
//       poll: { question, options },
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
    const union = req.user.union;
    const question = "Choose an action!";
    const options = [
      { option: "Collective Bargaining", votes: 0, selected: false, voters: [] },
      { option: "Strike", votes: 0, selected: false, voters: [] },
      { option: "Protest", votes: 0, selected: false, voters: [] },
      { option: "Dismiss", votes: 0, selected: false, voters: [] },
      { option: "Boycott", votes: 0, selected: false, voters: [] },
    ];
    
    const newGrief = new Grief({
      author,
      union,
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

router.post("/:id/vote", requireUser, async (req, res, next) => {
  try {
    const grief = await Grief.findById(req.params.id);
    if (!grief) {
      return res.status(404).json({ message: "Grief not found" });
    }

    const { optionIndex } = req.body;
    if (optionIndex < 0 || optionIndex >= grief.poll.options.length) {
      return res.status(400).json({ message: "Invalid option index" });
    }

    const option = grief.poll.options[optionIndex];
    if (option.voters.includes(req.user.id)) {
      return res.status(400).json({ message: "You have already voted for this option" });
    }

    option.votes += 1;
    option.voters.push(req.user.id);

    await grief.save();
    return res.json(grief);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const grief = await Grief.findByIdAndDelete(req.params.id);
    res.json({ message: `${grief} deleted successfully` });
  } catch (e) {
    res.status(422).json(e);
  }
});

module.exports = router;
