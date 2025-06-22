import express from 'express';
import Gallery from '../models/GalleryModel.js';
import { checkAuth } from '../middlewares/auth.js';
import { v2 as cloudinary } from 'cloudinary';

const router = express.Router();
// Get all gallery images
router.get('/', async (req, res) => {
    try {
        const gallery = await Gallery.findOne().sort({ createdAt: -1 });
        res.json(gallery?.images || []);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add new image to gallery
router.post('/', checkAuth, async (req, res) => {
    const { url, category } = req.body;

    try {
        let gallery = await Gallery.findOne().sort({ createdAt: -1 });

        if (!gallery) {
            gallery = new Gallery({ images: [] });
        }

        gallery.images.push({ url, category });
        await gallery.save();

        res.status(201).json(gallery.images);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete image from gallery
router.delete('/:id', checkAuth, async (req, res) => {
    try {
        const gallery = await Gallery.findOne().sort({ createdAt: -1 });

        if (!gallery) {
            return res.status(404).json({ message: 'Gallery not found' });
        }

        gallery.images = gallery.images.filter(img => img._id.toString() !== req.params.id);
        await gallery.save();

        res.json(gallery.images);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});




// Get Cloudinary upload signature for gallery
router.get('/gallery-signature', checkAuth, (req, res) => {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
        {
            timestamp,
            folder: 'eco-holiday-gallery',
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
