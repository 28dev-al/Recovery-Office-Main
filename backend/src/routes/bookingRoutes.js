const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { validateBooking } = require('../middleware/validationMiddleware');
const { protect, restrictTo, apiKeyAuth } = require('../middleware/authMiddleware');

/**
 * @route   POST /api/bookings
 * @desc    Create a new booking
 * @access  Public
 */
router.post('/', validateBooking, bookingController.createBooking);

/**
 * @route   GET /api/bookings/:id
 * @desc    Get booking by ID
 * @access  Public for own booking (with validation), Private for admin/staff
 */
router.get('/:id', bookingController.getBookingById);

/**
 * @route   PATCH /api/bookings/:id
 * @desc    Update booking
 * @access  Public for own booking (with validation), Private for admin/staff
 */
router.patch('/:id', bookingController.updateBooking);

/**
 * @route   DELETE /api/bookings/:id
 * @desc    Cancel booking
 * @access  Public for own booking (with validation), Private for admin/staff
 */
router.delete('/:id', bookingController.cancelBooking);

/**
 * @route   GET /api/bookings
 * @desc    Get all bookings (admin)
 * @access  Private/Admin
 */
// Support both legacy API key auth and new JWT auth
router.get('/',
  (req, res, next) => {
    // Try JWT first, if it fails, try API key
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      return protect(req, res, next);
    }
    
    // If no Bearer token, try API key
    return apiKeyAuth(req, res, next);
  },
  // If using JWT auth, check for admin role
  (req, res, next) => {
    if (req.user) {
      return restrictTo('admin')(req, res, next);
    }
    
    // If using API key auth, it's already validated
    next();
  },
  bookingController.getAllBookings
);

module.exports = router; 