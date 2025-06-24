import mongoose from 'mongoose';

const roomImagesSchema = new mongoose.Schema({
  cottage: [{
    url: String,
    publicId: String,
    isFeatured: Boolean
  }],
  villa: [{
    url: String,
    publicId: String,
    isFeatured: Boolean
  }],
  poolRoom: [{
    url: String,
    publicId: String,
    isFeatured: Boolean
  }],
  woodenHut: [{
    url: String,
    publicId: String,
    isFeatured: Boolean
  }]
}, { timestamps: true });

const RoomImages = mongoose.model('RoomImages', roomImagesSchema);

export default RoomImages;