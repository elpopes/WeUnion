const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const unionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});
module.exports = mongoose.model("Union", unionSchema);
