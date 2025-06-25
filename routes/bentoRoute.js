import express from 'express';
import Bento from '../models/bento.js';

const router = express.Router();

// GET all bento items
router.get('/', async (req, res) => {
  try {
    const bentos = await Bento.find();
    res.json(bentos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new bento item
router.post('/', async (req, res) => {
  const bento = new Bento({
    url: req.body.url,
    imgText: req.body.imgText,
    bentoId: req.body.bentoId
  });

  try {
    const newBento = await bento.save();
    res.status(201).json(newBento);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT (update) a bento item
router.put('/:id', async (req, res) => {
  try {
    const updatedBento = await Bento.findByIdAndUpdate(
      req.params.id,
      {
        url: req.body.url,
        imgText: req.body.imgText,
        bentoId: req.body.bentoId
      },
      { new: true }
    );
    res.json(updatedBento);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;