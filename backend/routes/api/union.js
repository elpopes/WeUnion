const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Grief = mongoose.model("Grief");
const Union = mongoose.model("Union");
const { requireUser } = require("../../config/passport");
const validateGriefInput = require("../../validations/griefs");

// View a specific Union

router.get("/union/:id", async (req, res) => {
    try {
        const union = await Union.findById(req.params.id);
        return res.json(union);
    } catch (e) {
        return res.status(422).json(e);
    }
});

// Create a new Union

router.post("/union", requireUser, async (req, res) => {
    try {
        const union = await Union.create(req.body);
        return res.json(union);
    } catch (e) {
        return res.status(422).json(e);
    }
});

// Update a Union

router.put("/union/:id", requireUser, async (req, res) => {

    try {
        const union = await Union.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.json(union);
    } catch (e) {
        return res.status(422).json(e);
    }
});

// Delete a Union

router.delete("/union/:id", requireUser, async (req, res) => {
    try {
        const union = await Union.findByIdAndDelete(req.params.id);
        return res.json(union);
    } catch (e) {
        return res.status(422).json(e);
    }
});

// View all Unions

router.get("/unions", async (req, res) => {
    try {
        const unions = await Union.find();
        return res.json(unions);
    } catch (e) {
        return res.status(422).json(e);
    }
});

module.exports = router;




