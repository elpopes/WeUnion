const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autopopulate = require("mongoose-autopopulate");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    union: {
      type: Schema.Types.ObjectId,
      ref: "Union",
      autopopulate: {
        select: "name", // Specify the field(s) you want to populate
      },
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userSchema);
