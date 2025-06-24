import express from 'express';
import { v2 as cloudinary } from 'cloudinary';
import RoomImages from '../models/RoomImages.js';
import { checkAuth } from '../middlewares/auth.js';

const router = express.Router();

// Get all images
router.get('/', async (req, res) => {
  try {
    let images = await RoomImages.findOne();
    if (!images) {
      images = await RoomImages.create({
        cottage: [],
        villa: [],
        poolRoom: []
      });
    }
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update images for a room type
router.put('/:type', checkAuth, async (req, res) => {
  try {
    const { type } = req.params;
    const { images } = req.body;
    
    if (!['cottage', 'villa', 'poolRoom','woodenHut'].includes(type)) {
      return res.status(400).json({ message: 'Invalid room type' });
    }

    const updated = await RoomImages.findOneAndUpdate(
      {},
      { [type]: images },
      { new: true, upsert: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get Cloudinary upload signature
router.get('/signature', checkAuth, (req, res) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { 
      timestamp, 
      folder: 'eco-holiday-rooms',
    },
    process.env.CLOUDINARY_SECRET_KEY
  );

  res.json({ 
    timestamp, 
    signature, 
    apiKey: process.env.CLOUDINARY_API_KEY, 
    cloudName: process.env.CLOUDINARY_NAME 
  });
});

export default router;