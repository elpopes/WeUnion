const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// schema that belongs to the grief which is a poll

const pollOptionSchema = new Schema({
    option: {
        type: String,
        ref: "Grief",
        // required: true
    },
    votes: {
        type: Number,
        default: 0,
    },
    voters: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
});