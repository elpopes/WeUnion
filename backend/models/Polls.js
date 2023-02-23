const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autopopulate = require("mongoose-autopopulate");

const pollSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: { type: [String], required: true },
    votes: { type: [Number], default: Array },
});

module.exports = mongoose.model("Poll", pollSchema);
