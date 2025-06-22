import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  images: [{
    url: { type: String, required: true },
    category: { type: String, required: true }
  }]
}, { timestamps: true });

export default mongoose.model('Gallery', gallerySchema);