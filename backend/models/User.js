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
    unions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Union",
      },
    ],
    // ADD profileImageUrl
    profileImageUrl: {
      type: String,
      // required: true
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userSchema);
