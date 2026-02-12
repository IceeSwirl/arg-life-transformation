const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  type: {
    type: String,
    enum: ['micro-habit', 'social', 'environment', 'skill', 'network'],
    required: true
  },
  identity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Identity',
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'easy'
  },
  xpReward: {
    type: Number,
    default: 10
  },
  duration: {
    type: Number,
    default: 24
  },
  instructions: [String],
  requirements: {
    items: [String],
    location: String,
    timeOfDay: String
  },
  arOverlay: {
    enabled: Boolean,
    marker: String,
    instructions: String
  },
  verification: {
    type: {
      type: String,
      enum: ['photo', 'video', 'text', 'peer'],
      default: 'photo'
    },
    criteria: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Challenge', challengeSchema);