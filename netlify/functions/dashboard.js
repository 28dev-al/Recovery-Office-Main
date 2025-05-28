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

    // Extract the path after /dashboard/
    const path = event.path.replace('/.netlify/functions/dashboard', '');

    switch (path) {
      case '/analytics': {
        // Get analytics data
        const [totalBookings, totalClients, bookings, services] = await Promise.all([
          Booking.countDocuments(),
          Client.countDocuments(),
          Booking.find({}).populate('serviceId', 'price').exec(),
          Service.find({}).exec()
        ]);

        // Calculate total revenue from real bookings
        const totalRevenue = bookings.reduce((sum, booking) => {
          return sum + (booking.estimatedValue || booking.serviceId?.price || 0);
        }, 0);

        // Calculate success rate
        const completedBookings = bookings.filter(b => b.status === 'completed').length;
        const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
        const successfulBookings = completedBookings + confirmedBookings;
        const successRate = totalBookings > 0 ? (successfulBookings / totalBookings) * 100 : 0;

        const analytics = {
          totalBookings,
          totalRevenue: Math.round(totalRevenue),
          activeClients: totalClients,
          successRate: Math.round(successRate * 10) / 10,
          statusBreakdown: {
            pending: bookings.filter(b => b.status === 'pending').length,
            confirmed: bookings.filter(b => b.status === 'confirmed').length,
            completed: bookings.filter(b => b.status === 'completed').length,
            cancelled: bookings.filter(b => b.status === 'cancelled').length
          },
          averageBookingValue: totalBookings > 0 ? Math.round(totalRevenue / totalBookings) : 0,
          totalServices: services.length
        };

        return createResponse(200, {
          status: 'success',
          data: analytics
        });
      }

      case '/bookings': {
        // Get all bookings with populated data
        const bookings = await Booking.find({})
          .populate('clientId', 'firstName lastName email phone')
          .populate('serviceId', 'name price duration')
          .sort({ createdAt: -1 })
          .exec();

        const formattedBookings = bookings.map(booking => ({
          _id: booking._id,
          reference: booking.reference || `BK-${booking._id.toString().slice(-6)}`,
          clientName: booking.clientId ? 
            `${booking.clientId.firstName} ${booking.clientId.lastName}` : 
            'Unknown Client',
          clientEmail: booking.clientId?.email || '',
          serviceName: booking.serviceId?.name || 'Unknown Service',
          servicePrice: booking.serviceId?.price || 0,
          date: booking.date,
          timeSlot: booking.timeSlot,
          status: booking.status || 'pending',
          estimatedValue: booking.estimatedValue || booking.serviceId?.price || 0,
          urgencyLevel: booking.urgencyLevel || 'standard',
          createdAt: booking.createdAt,
          updatedAt: booking.updatedAt
        }));

        return createResponse(200, {
          status: 'success',
          results: formattedBookings.length,
          data: formattedBookings
        });
      }

      default:
        return createResponse(404, {
          status: 'error',
          message: 'Dashboard endpoint not found'
        });
    }
  } catch (error) {
    console.error('Dashboard function error:', error);
    return createResponse(500, {
      status: 'error',
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}; 