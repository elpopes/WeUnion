const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autopopulate = require("mongoose-autopopulate");


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
    imageUrls: {
      type: [String],
      required: false,
    },
    union: {
      type: Schema.Types.ObjectId,
      ref: "Union",
      autopopulate: {
        select: "name", // Specify the field(s) you want to populate
      },
    },
    poll: {
      type: Schema.Types.ObjectId,
      ref: "Poll",
  },
  },
  {
    timestamps: true,
  }
);

// Virtual field to calculate percentage of votes for each poll option
// griefSchema.virtual("poll.optionsWithPercentage").get(function () {
//   const totalVotes = this.poll.options.reduce(
//     (sum, option) => sum + option.votes,
//     0
//   );
//   return this.poll.options.map((option) => ({
//     option: option.option,
//     votes: option.votes,
//     percentage: totalVotes === 0 ? 0 : (option.votes / totalVotes) * 100,
//   }));
// });

module.exports = mongoose.model("Grief", griefSchema);
