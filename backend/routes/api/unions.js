const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Union = mongoose.model("Union");
const { requireUser } = require("../../config/passport");
const validateUnionInput = require("../../validations/unions");

// View a specific Union
router.get("/", async (req, res) => {
  try {
    const unions = await Union.find();
    return res.json(unions);
  } catch (e) {
    return res.status(422).json(e);
  }
});

router.post("/", requireUser, validateUnionInput, async (req, res) => {
  try {
    // console.log(req.body)
    // const union = await Union.create(req.body);
    // return res.json(union);

    const newUnion = new Union({
      name: req.body.name,
    });

    let union = await newUnion.save();
    union = await union.populate("name");
    return res.json(union);
  } catch (e) {
    return res.status(422).json(e);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const union = await Union.findById(req.params.id);
    return res.json(union);
  } catch (e) {
    return res.status(422).json(e);
  }
});

// Create a new Union

// Update a Union

router.put("/:id", requireUser, async (req, res) => {
  try {
    const union = await Union.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.json(union);
  } catch (e) {
    return res.status(422).json(e);
  }
});

// Delete a Union

router.delete("/:id", async (req, res) => {
  try {
    const union = await Union.findByIdAndDelete(req.params.id);
    return res.json(union);
  } catch (e) {
    return res.status(422).json(e);
  }
});

// View all Unions

module.exports = router;
