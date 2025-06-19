import express from 'express';
import {
  createBooking,
  deleteBooking,
  getBookings,
  updateBookingStatus,
} from '../controllers/bookingController.js';
import { checkAuth } from '../middlewares/auth.js';

const router = express.Router();

// Form submission endpoints
router.route('/')
  .post(createBooking) // Create new booking
  .get(checkAuth, getBookings); // Get all bookings (for admin)

router.route('/:id')
  .patch(checkAuth, updateBookingStatus)  // Update status
  .delete(checkAuth, deleteBooking);      // Delete booking


export default router;