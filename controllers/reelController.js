import Reel from '../models/reelModel.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';

export const getReels = async (req, res) => {
  try {
    const reels = await Reel.find().sort({ createdAt: -1 });
    res.json(reels);
  } catch (error) {
    console.error('Error getting reels:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const uploadReel = async (req, res) => {
  try {
    const { title, description, videoUrl, publicId } = req.body;

    if (!videoUrl || !publicId) {
      return res.status(400).json({ message: 'Missing video data' });
    }

    const newReel = new Reel({
      title,
      description,
      videoUrl,
      publicId
    });

    await newReel.save();
    res.status(201).json(newReel);
  } catch (error) {
    console.error('Error saving reel:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteReel = async (req, res) => {
  try {
    const reel = await Reel.findById(req.params.id);
    if (!reel) return res.status(404).json({ message: 'Reel not found' });

    await deleteFromCloudinary(reel.publicId);
    await Reel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Reel deleted successfully' });
  } catch (error) {
    console.error('Error deleting reel:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};