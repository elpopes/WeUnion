const validateUnionInput = require("../../validations/unions");

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Union = mongoose.model("Union");
const Grief = mongoose.model("Grief");
const { requireUser } = require("../../config/passport");

// Define the routes for managing Union dissolution

// vote to dissolve a Union

router.post("/union/:id/dissolve", requireUser, validateUnionInput, async (req, res) => {
    try {
        const union = await Union.findById(req.params.id);
        union.dissolutionVotes.push(req.user._id);
        union.save();
        return res.json(union);
    } catch (e) {
        return res.status(422).json(e);
    }
});

// View Votes to Dissolve the Union

router.get("/union/:id/dissolve", async (req, res) => {
    try {
        const union = await Union.findById(req.params.id);
        return res.json(union.dissolutionVotes);
    } catch (e) {
        return res.status(422).json(e);
    }
});

// Get the Majority for a Grievance

router.get("/union/:id/dissolve/majority", async (req, res) => {
    try {
        const union = await Union.findById(req.params.id);
        const majority = union.dissolutionVotes.length / union.members.length;
        return res.json(majority);
    } catch (e) {
        return res.status(422).json(e);
    }
});

// Get the Majority for an Action

router.get("/union/:id/dissolve/majority/:action", async (req, res) => {
    try {
        const union = await Union.findById(req.params.id);
        const majority = union.dissolutionVotes.length / union.members.length;
        if (majority > 0.5) {
            if (req.params.action === "dissolve") {
                union.dissolved = true;
                union.save();
                return res.json(union);
            } else if (req.params.action === "cancel") {
                union.dissolutionVotes = [];
                union.save();
                return res.json(union);
            } else {
                return res.status(422).json(e);
            }
        } else {
            return res.status(422).json(e);
        }
    } catch (e) {
        return res.status(422).json(e);
    }
});

// Get the Majority to Dissolve the Union

router.get("/union/:id/dissolve/majority/dissolve", async (req, res) => {
    try {
        const union = await Union.findById(req.params.id);
        const majority = union.dissolutionVotes.length / union.members.length;
        if (majority > 0.5) {
            union.dissolved = true;
            union.save();
            return res.json(union);
        } else {
            return res.status(422).json(e);
        }
    } catch (e) {
        return res.status(422).json(e);
    }
});



module.exports = router;

