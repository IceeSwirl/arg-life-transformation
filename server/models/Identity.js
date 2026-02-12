const mongoose = require('mongoose');

const identitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  category: {
    type: String,
    enum: ['fashion', 'athlete', 'entrepreneur', 'craftsman', 'artist', 'custom'],
    default: 'custom'
  },
  avatar: String,
  attributes: {
    style: [String],
    habits: [String],
    skills: [String],
    networks: [String],
    environment: [String]
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  xpMultiplier: {
    type: Number,
    default: 1.0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Identity', identitySchema);