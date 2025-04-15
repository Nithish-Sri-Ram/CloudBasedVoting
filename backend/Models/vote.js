const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
  election: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Election',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  candidate: {
    type: Number,
    required: true
  },
  votedAt: {
    type: Date,
    default: Date.now
  }
});

// Ensure one vote per user per election
VoteSchema.index({ election: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Vote', VoteSchema);
