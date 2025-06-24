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
  }],
  camping: [{
    url: String,
    publicId: String,
    isFeatured: Boolean
  }],
  villaFacility: [{
    url: String,
    publicId: String,
    isFeatured: Boolean
  }],
  dining: [{
    url: String,
    publicId: String,
    isFeatured: Boolean
  }],
  swimming: [{
    url: String,
    publicId: String,
    isFeatured: Boolean
  }],
  photoshoot: [{
    url: String,
    publicId: String,
    isFeatured: Boolean
  }]

}, { timestamps: true });

const RoomImages = mongoose.model('RoomImages', roomImagesSchema);

export default RoomImages;