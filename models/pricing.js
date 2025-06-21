import mongoose from 'mongoose';

const pricingSchema = new mongoose.Schema({
  party: {
    adult: { type: Number, default: 1000 },    // ₹1,000
    child: { type: Number, default: 500 },     // ₹500
    timing: { 
      from: { type: String, default: '12 PM' },
      to: { type: String, default: '09 PM' }
    },
    lunch: {
      from: { type: String, default: '01:30 PM' },
      to: { type: String, default: '03 PM' }
    },
    dinner: {
      from: { type: String, default: '07:30 PM' },
      to: { type: String, default: '09 PM' }
    }
  },
  nightStay: {
    cottage: { type: Number, default: 4000 },  // ₹4,000
    villa: { type: Number, default: 7000 },     // ₹7,000
    poolRoom: { type: Number, default: 8500 }   // ₹8,500
  },
  camping: {
    basePrice: { type: Number, default: 2000 }, // ₹2,000
    taxPercent: { type: Number, default: 12 }   // 12%
  }
}, { timestamps: true });

export default mongoose.model('Pricing', pricingSchema);