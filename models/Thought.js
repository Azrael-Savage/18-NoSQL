const mongoose = require('mongoose');

const ReactionSchema = new mongoose.Schema({
  reactionId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => formatDate(timestamp),
  },
  },
  {
      toJSON: {
        getters: true,
      },
  }
);

const ThoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => formatDate(timestamp),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [ReactionSchema],
},
{
  toJSON: {
    getters: true,
  },
}
);

ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleString();
};

const Thought = mongoose.model('Thought', ThoughtSchema);

module.exports = Thought;
