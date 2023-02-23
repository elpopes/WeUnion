const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autopopulate = require("mongoose-autopopulate");

const pollOptionSchema = new Schema({
  option: {
    type: String
    // required: true
  },
  votes: {
    type: Number,
    default: 0
  }
});

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
      required: false
    },
    poll: {
      question: {
        type: String
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
      }
    },
    voters: [{
      type: Schema.Types.ObjectId,
      ref: "User"
    }]
  },
  {
    timestamps: true,
  }
);

// Virtual field to calculate percentage of votes for each poll option
griefSchema.virtual('poll.optionsWithPercentage').get(function() {
  const totalVotes = this.poll.options.reduce((sum, option) => sum + option.votes, 0);
  return this.poll.options.map(option => ({
    option: option.option,
    votes: option.votes,
    percentage: totalVotes === 0 ? 0 : (option.votes / totalVotes) * 100
  }));
});

module.exports = mongoose.model("Grief", griefSchema);