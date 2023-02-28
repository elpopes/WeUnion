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
      unique: true
      // autopopulate: {
        // select: "name", // Specify the field(s) you want to populate
      // },
    },
  ],
        // ADD profileImageUrl
      profileImageUrl: {
      type: String
      // required: true
      },
    },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userSchema);

