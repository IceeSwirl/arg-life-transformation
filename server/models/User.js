const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profile: {
    avatar: String,
    bio: String,
    currentIdentity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Identity'
    },
    level: {
      type: Number,
      default: 1
    },
    xp: {
      type: Number,
      default: 0
    },
    completedChallenges: [{
      challenge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Challenge'
      },
      completedAt: Date,
      proof: String,
      rating: Number
    }],
    streak: {
      type: Number,
      default: 0
    },
    totalTransformations: {
      type: Number,
      default: 0
    }
  },
  preferences: {
    notifications: {
      type: Boolean,
      default: true
    },
    privacy: {
      type: String,
      enum: ['public', 'friends', 'private'],
      default: 'friends'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);