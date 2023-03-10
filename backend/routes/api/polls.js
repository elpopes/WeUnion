const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Union = mongoose.model("Union");
const Grief = mongoose.model("Grief");
const Polls = mongoose.model("Polls");
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

// shows griefs with the polls attached

router.get("/polls", async (req, res) => {
    try {
        const griefs = await Grief.find()
        .populate("author", "_id username profileImageUrl")
        .populate("polls")
        .sort({ createdAt: -1 });
        return res.json(griefs);
    } catch (err) {
        return res.json([]);
    }
});

// update the grief with the voters selection from the poll

router.patch("/polls/:griefId", async (req, res) => {
    try {
        const grief = await Grief.findById(req.params.griefId);
        grief.polls.voters.push(req.body.voterId);
        grief.polls.votes += 1;
        grief.save();
        return res.json(grief);
    } catch (err) {
        return res.json([]);
    }
});

