const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Union = mongoose.model("Union");
const Grief = mongoose.model("Grief");
const Poll = mongoose.model("Poll")
const { requireUser } = require("../../config/passport");
const validateGriefInput = require("../../validations/griefs");

// Poll Index
router.get("/", async (req, res) => {
    try {
        const polls = await Poll.find();
        return res.json(polls);
    } catch (e) {
        return res.status(422).json(e);
    }
});

router.post("/", async (req, res) => {
    try {
        const grief = req.grief.id;
        const { question } = "Choose an action!";
        const options = [
        { option: "Collective Bargaining", votes: 0 },
        { option: "Strike", votes: 0 },
        { option: "Protest", votes: 0 },
        { option: "Dismiss", votes: 0 },
        { option: "Boycott", votes: 0 },
        ];
        const poll = new Poll({ question, options, grief });
        await poll.save();
        return res.json(poll);
    } catch (e) {
        return res.status(422).json(e);
    }
});

router.patch("/:id", requireUser, async (req, res) => {
  try {
    const user = req.user;
    const pollId = req.params.id;
    const selectedOption = req.body.selectedOption;

    // Find the poll by ID
    const poll = await Poll.findById(pollId);
    if (!poll) {
      return res.status(404).json({ error: "Poll not found" });
    }

    // Check if the user has already voted in this poll
    // if (poll.options.includes(user._id)) {
    //   return res
    //     .status(400)
    //     .json({ error: "You have already voted in this poll" });
    // }

    // Find the selected option by ID
    const selectedOptionIndex = poll.options.findIndex(
      (o) => o.id === selectedOption
    );
    if (selectedOptionIndex === -1) {
      return res.status(400).json({ error: "Invalid option selected" });
    }

// Remove the user from the selectedBy array of all other options and decrement their votes
poll.options.forEach((option) => {
  if (option.selectedBy.includes(user._id)) {
    option.selectedBy = option.selectedBy.filter((id) => id !== user._id);
    poll.voters.pop(user._id);
    option.votes = 0;
    option.selectedBy.pop(user._id);
    if (option.id !== selectedOption) {
      poll.votes--;
    }
  }
});

    

    // Add the user to the list of voters and increment the vote count for the selected option
    poll.voters.push(user._id);
    poll.options[selectedOptionIndex].selectedBy.push(user._id);
    poll.options[selectedOptionIndex].votes++;
    poll.votes++;

    // Save the updated poll
    await poll.save();

    // Return the updated poll data
    return res.json(poll);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Internal server error" });
  }
});



router.delete("/:id", async (req, res) => {
    try {
        const poll = await Poll.findByIdAndDelete(req.params.id);
        res.json(poll);
    } catch (e) {
        res.status(422).json(e);
    }
});

router.get("/id", async (req, res) => {
    try {
        const poll = await Poll.findById(req.params.id);
        return res.json(poll);
        } catch (e) {
          return res.status(422).json(e);
        }
});


module.exports = router;
