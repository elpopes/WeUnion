const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const griefSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
      required: true,
    },
    // ADD imageUrls along with a grief?
    imageUrls: {
      type: [String],
      required: false
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Grief", griefSchema);
