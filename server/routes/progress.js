const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get user progress
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .populate('profile.currentIdentity')
      .populate('profile.completedChallenges.challenge');
    
    res.json({
      level: user.profile.level,
      xp: user.profile.xp,
      currentIdentity: user.profile.currentIdentity,
      completedChallenges: user.profile.completedChallenges,
      streak: user.profile.streak,
      totalTransformations: user.profile.totalTransformations
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update current identity
router.put('/identity', auth, async (req, res) => {
  try {
    const { identityId } = req.body;
    
    const user = await User.findById(req.user.userId);
    user.profile.currentIdentity = identityId;
    await user.save();
    
    res.json({ message: 'Identity updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Complete challenge
router.post('/complete-challenge', auth, async (req, res) => {
  try {
    const { challengeId, proof, rating } = req.body;
    
    const user = await User.findById(req.user.userId);
    
    // Check if already completed
    const alreadyCompleted = user.profile.completedChallenges.find(
      c => c.challenge.toString() === challengeId
    );
    
    if (alreadyCompleted) {
      return res.status(400).json({ message: 'Challenge already completed' });
    }
    
    // Add completed challenge
    user.profile.completedChallenges.push({
      challenge: challengeId,
      completedAt: new Date(),
      proof,
      rating
    });
    
    // Update XP and level
    user.profile.xp += 50; // Base XP
    user.profile.streak += 1;
    
    // Level up logic
    const xpNeeded = user.profile.level * 100;
    if (user.profile.xp >= xpNeeded) {
      user.profile.level += 1;
      user.profile.xp -= xpNeeded;
    }
    
    await user.save();
    
    res.json({
      message: 'Challenge completed!',
      newLevel: user.profile.level,
      newXp: user.profile.xp,
      streak: user.profile.streak
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;