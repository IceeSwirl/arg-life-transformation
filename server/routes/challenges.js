const express = require('express');
const router = express.Router();
const Challenge = require('../models/Challenge');
const Identity = require('../models/Identity');
const auth = require('../middleware/auth');

// Get all challenges
router.get('/', async (req, res) => {
  try {
    const challenges = await Challenge.find()
      .populate('identity', 'name avatar category')
      .sort({ createdAt: -1 });
    
    res.json(challenges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get challenges by identity
router.get('/identity/:identityId', async (req, res) => {
  try {
    const challenges = await Challenge.find({ identity: req.params.identityId })
      .populate('identity', 'name avatar category')
      .sort({ difficulty: 1 });
    
    res.json(challenges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new challenge (admin)
router.post('/', auth, async (req, res) => {
  try {
    const challenge = new Challenge(req.body);
    await challenge.save();
    
    await challenge.populate('identity', 'name avatar category');
    res.status(201).json(challenge);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get daily challenges
router.get('/daily', async (req, res) => {
  try {
    const challenges = await Challenge.aggregate([
      { $sample: { size: 5 } }
    ]);
    
    res.json(challenges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;