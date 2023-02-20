const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const unionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Union", unionSchema);
