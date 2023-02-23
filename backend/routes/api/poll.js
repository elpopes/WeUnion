const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Grief = mongoose.model("Grief");
const { requireUser } = require("../../config/passport");
const validateGriefInput = require("../../validations/griefs");
const model = require("../../models");
// Backend code for handling poll requests
// const express = require('express');
// const router = express.Router();
const Poll = require('../models/poll');

// Create a new poll
router.post('/', async (req, res) => {
    const { question, options } = req.body;
    const newPoll = new Poll({ question, options });
    await newPoll.save();
    res.json(newPoll);
});

// Update a poll
router.put('/:id', async (req, res) => {
    const { option } = req.body;
    const poll = await Poll.findById(req.params.id);

    if (!poll) {
        return res.status(404).json({ message: 'Poll not found' });
    }

    const index = poll.options.indexOf(option);

    if (index === -1) {
        return res.status(400).json({ message: 'Invalid option' });
    }

    poll.votes[index]++;
    await poll.save();
    res.json(poll);
});

module.exports = router;

