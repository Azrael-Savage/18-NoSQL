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
});

const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleString();
};

module.exports = ReactionSchema;
