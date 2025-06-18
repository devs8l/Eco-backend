// models/Booking.js
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  packageName: {
    type: String,
    required: true,
    enum: ['Day Out Booking', 'Room Booking'] // Add other package types as needed
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: true,
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
  },
  adults: {
    type: Number,
    required: true,
    min: 1
  },
  kids: {
    type: Number,
    default: 0,
    min: 0
  },
  // Room Booking specific fields
  rooms: {
    type: Number,
    min: 1,
    required: function() { return this.packageName === 'Room Booking'; }
  },
  extraBeds: {
    type: Number,
    default: 0,
    min: 0,
    required: function() { return this.packageName === 'Room Booking'; }
  },
  checkInDate: {
    type: String,
    required: true
  },
  checkOutDate: {
    type: String,
    required: function() { return this.packageName === 'Room Booking'; }
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;