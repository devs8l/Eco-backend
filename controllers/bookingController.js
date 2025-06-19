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


// @desc    Update booking status
// @route   PATCH /api/bookings/:id
// @access  Private/Admin
export const updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status. Must be pending, confirmed, or cancelled'
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
      message: 'Booking status updated successfully'
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Delete a booking
// @route   DELETE /api/bookings/:id
// @access  Private/Admin
export const deleteBooking = async (req, res, next) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {},
      message: 'Booking deleted successfully'
    });

  } catch (error) {
    next(error);
  }
};

