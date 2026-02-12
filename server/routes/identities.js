const express = require('express');
const router = express.Router();
const Identity = require('../models/Identity');

// Get all identities
router.get('/', async (req, res) => {
  try {
    const identities = await Identity.find().sort({ category: 1, name: 1 });
    res.json(identities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get identity by ID
router.get('/:id', async (req, res) => {
  try {
    const identity = await Identity.findById(req.params.id);
    if (!identity) {
      return res.status(404).json({ message: 'Identity not found' });
    }
    res.json(identity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new identity
router.post('/', async (req, res) => {
  try {
    const identity = new Identity(req.body);
    await identity.save();
    res.status(201).json(identity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get identities by category
router.get('/category/:category', async (req, res) => {
  try {
    const identities = await Identity.find({ category: req.params.category });
    res.json(identities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;