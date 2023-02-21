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

// Create a new Union

router.post("/", requireUser, validateUnionInput, async (req, res) => {
  try {
    // Check if a union with the same name already exists
    const existingUnion = await Union.findOne({ name: req.body.name });
    if (existingUnion) {
      return res
        .status(422)
        .json({ message: "A union with this name already exists." });
    }

    // Create the new union with the current user and member
    const newUnion = new Union({
      name: req.body.name,
      members: [req.body.member._id],
      createdBy: req.user._id,
    });

    // Save the new union and return the response
    let union = await newUnion.save();
    union = await union.populate("members");
    return res.json(union);
  } catch (e) {
    return res.status(422).json(e);
  }
});

// router.post("/", requireUser, validateUnionInput, async (req, res) => {
//   try {
//     const newUnion = new Union({
//       name: req.body.name,
//       members: [req.body.member._id], // use the correct field name and store the member ID as an array
//       createdBy: req.user._id, // add createdBy field with the current user's ID
//     });

//     let union = await newUnion.save();
//     union = await union.populate("members"); // populate the members field
//     return res.json(union);
//   } catch (e) {
//     if (e.code === 11000) {
//       // duplicate key error
//       return res.status(422).json({ message: "Union name already exists" });
//     }
//     return res.status(422).json(e);
//   }
// });

router.get("/:id", async (req, res) => {
  try {
    const union = await Union.findById(req.params.id);
    return res.json(union);
  } catch (e) {
    return res.status(422).json(e);
  }
});

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
