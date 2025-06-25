import mongoose from 'mongoose';

const bentoSchema = new mongoose.Schema({
  url: { type: String, required: true },
  imgText: { type: String, required: true },
  bentoId: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Bento', bentoSchema);