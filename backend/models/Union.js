const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autopopulate = require("mongoose-autopopulate");
const unionSchema = new Schema(
    {
    name: {
        type: String,
        required: true,
    },
    unionMember: {
        type: Schema.Types.ObjectId,
        ref: "User",
        autopopulate: {
        select: "union", // Specify the field(s) you want to populate
        },
    },
    actions: {
        type: String,
        required: true,
            },
    },
    {
    timestamps: true,
    }
);
module.exports = mongoose.model("Union", unionSchema);