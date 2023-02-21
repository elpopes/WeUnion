// Code to insert current as first member when creating new union

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const unionSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      // unique: true
    },
  ],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

unionSchema.pre("save", async function (next) {
  try {
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Union", unionSchema);
