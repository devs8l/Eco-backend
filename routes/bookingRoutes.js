import express from 'express';
import {
  createBooking,
  deleteBooking,
  getBookings,
  updateBookingStatus,
} from '../controllers/bookingController.js';

const router = express.Router();

// Form submission endpoints
router.route('/')
  .post(createBooking) // Create new booking
  .get(getBookings); // Get all bookings (for admin)

router.route('/:id')
  .patch(updateBookingStatus)  // Update status
  .delete(deleteBooking);      // Delete booking


export default router;