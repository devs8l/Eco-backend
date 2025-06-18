import Booking from '../models/Booking.js';


// @desc    Create new booking
// @route   POST /api/bookings
// @access  Public
export const createBooking = async (req, res, next) => {
  try {
    const { packageName, name, email, phone, adults, kids, rooms, extraBeds, checkInDate, checkOutDate } = req.body;

    // Basic validation
    if (!packageName || !name || !email || !phone || !adults || !checkInDate) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    // Room booking specific validation
    if (packageName === 'Room Booking' && !checkOutDate) {
      return res.status(400).json({ success: false, error: 'Check-out date is required for room bookings' });
    }

    const booking = await Booking.create({
      packageName,
      name,
      email,
      phone,
      adults,
      kids: kids || 0,
      rooms: packageName === 'Room Booking' ? rooms : undefined,
      extraBeds: packageName === 'Room Booking' ? (extraBeds || 0) : undefined,
      checkInDate,
      checkOutDate: packageName === 'Room Booking' ? checkOutDate : undefined,
      status: 'pending'
    });

    // Future: Send confirmation email
    // await sendBookingConfirmation(booking);

    res.status(201).json({
      success: true,
      data: booking,
      message: 'Booking submitted successfully!'
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
export const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    next(error);
  }
};

