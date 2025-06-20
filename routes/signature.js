import { v2 as cloudinary } from 'cloudinary';
import express from 'express';
import { checkAuth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/signature', checkAuth, (req, res) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { 
      timestamp, 
      folder: 'eco-holiday-reels',
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