// Description: This file contains the schema for the Poll model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// schema that belongs to the grief which is a poll

const pollOptionSchema = new Schema({
    option: {
        type: String,
        // required: true
    },
    votes: {
        type: Number,
        default: 0,
    },
    selectedBy: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    poll: {
        type: Schema.Types.ObjectId,
        ref: "Poll",
    },
});


const pollSchema = new Schema(
    {
        question: {
            type: String,
            // required: true
        },
        options: {
            type: [pollOptionSchema],
            required: true,
            // validate: {
            //   validator: function(v) {
            //     return v.length >= 2;
            //   },
            //   message: props => `${props.value} must have at least 2 options`
            // }
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
        grief_id: {
            type: Schema.Types.ObjectId,
            ref: "Grief",
        },
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model("Poll", pollSchema);

