import express from 'express';
import Pricing from '../models/Pricing.js';

const router = express.Router();

// GET pricing
router.get('/', async (req, res) => {
  try {
    const pricing = await Pricing.findOne({});
    res.json(pricing || {});
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// UPDATE pricing
router.put('/', async (req, res) => {
  try {
    const pricing = await Pricing.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true }
    );
    res.json(pricing);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;