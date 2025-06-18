import express from 'express';
import {
  createBooking,
  getBookings,
} from '../controllers/bookingController.js';

const router = express.Router();

// Form submission endpoints
router.route('/')
  .post(createBooking) // Create new booking
  .get(getBookings); // Get all bookings (for admin)


export default router;