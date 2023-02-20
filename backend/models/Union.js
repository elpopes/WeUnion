const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autopopulate = require("mongoose-autopopulate");

const unionSchema = new Schema(
    {
      author: {
        type: Schema.Types.ObjectId,
        ref: "Members",
        autopopulate: {
        select: "union_name", // Specify the field(s) you want to populate
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