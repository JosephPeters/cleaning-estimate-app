const express = require('express');
const router = express.Router();
const Estimate = require('../models/Estimate');

// Create a new estimate
router.post('/', async (req, res) => {
  console.log('Request body:', req.body); // Log the request body for debugging
  try {
    const newEstimate = new Estimate(req.body);
    const savedEstimate = await newEstimate.save();
    res.status(201).json(savedEstimate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all estimates
router.get('/', async (req, res) => {
  try {
    const estimates = await Estimate.find();
    res.json(estimates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;