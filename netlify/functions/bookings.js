const { connectToDatabase } = require('./shared/database');
const { handleCors, createResponse } = require('./shared/cors');
const Booking = require('./shared/models/Booking');
const Client = require('./shared/models/Client');
const Service = require('./shared/models/Service');

exports.handler = async (event, _context) => {
  const corsResponse = handleCors(event);
  if (corsResponse) return corsResponse;

  try {
    await connectToDatabase();

    switch (event.httpMethod) {
      case 'GET': {
        // Get all bookings for dashboard
        const bookings = await Booking.find({})
          .populate('clientId', 'firstName lastName email phone')
          .populate('serviceId', 'name price duration')
          .sort({ createdAt: -1 });

        const formattedBookings = bookings.map(booking => ({
          _id: booking._id,
          reference: booking.reference || `BK-${booking._id.toString().slice(-6)}`,
          clientName: booking.clientId ? 
            `${booking.clientId.firstName} ${booking.clientId.lastName}` : 
            'Unknown Client',
          serviceName: booking.serviceId?.name || 'Unknown Service',
          date: booking.date,
          timeSlot: booking.timeSlot,
          status: booking.status || 'pending',
          estimatedValue: booking.estimatedValue || 0,
          createdAt: booking.createdAt
        }));

        return createResponse(200, {
          status: 'success',
          results: formattedBookings.length,
          data: formattedBookings
        });
      }

      case 'POST': {
        // Create new booking
        const bookingData = JSON.parse(event.body);
        
        // Validate required fields
        if (!bookingData.clientId || !bookingData.serviceId) {
          return createResponse(400, {
            status: 'error',
            message: 'Missing required fields: clientId and serviceId'
          });
        }

        // Create booking with reference number
        const newBooking = new Booking({
          ...bookingData,
          reference: `RO-${Date.now()}`,
          status: 'confirmed',
          createdAt: new Date()
        });

        const savedBooking = await newBooking.save();

        return createResponse(201, {
          status: 'success',
          data: savedBooking,
          message: 'Booking created successfully'
        });
      }

      default:
        return createResponse(405, {
          status: 'error',
          message: 'Method not allowed'
        });
    }
  } catch (error) {
    console.error('Bookings function error:', error);
    return createResponse(500, {
      status: 'error',
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}; 