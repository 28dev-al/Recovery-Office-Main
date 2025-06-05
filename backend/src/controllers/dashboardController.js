const dashboardController = {
  // Get overview statistics for dashboard
  getOverviewStats: async (req, res) => {
    try {
      console.log('[Dashboard Controller] Fetching overview stats...');

      // Use Mongoose models instead of req.app.locals.db
      const Booking = require('../models/Booking');
      const Client = require('../models/Client');
      const Service = require('../models/Service');
      
      const [bookings, clients, services] = await Promise.all([
        Booking.find().lean().catch(() => []),
        Client.find().lean().catch(() => []),
        Service.find().lean().catch(() => [])
      ]);

      console.log(`[Dashboard] Found ${bookings.length} bookings, ${clients.length} clients, ${services.length} services`);

      // Calculate statistics with fallbacks
      const totalBookings = bookings.length || 0;
      const totalRevenue = bookings.reduce((sum, booking) => {
        return sum + (booking.price || booking.totalAmount || 0);
      }, 0);
      
      const activeClients = clients.filter(client => 
        client.status === 'active' || !client.status
      ).length || 0;
      
      const completedBookings = bookings.filter(b => b.status === 'completed').length || 0;
      const successRate = totalBookings > 0 ? (completedBookings / totalBookings) * 100 : 0;

      const response = {
        status: 'success',
        data: {
          totalBookings,
          totalRevenue,
          activeClients,
          successRate,
          averageBookingValue: totalBookings > 0 ? totalRevenue / totalBookings : 0,
          todayBookings: 0,
          statusBreakdown: bookings.reduce((acc, booking) => {
            const status = booking.status || 'pending';
            acc[status] = (acc[status] || 0) + 1;
            return acc;
          }, {})
        }
      };

      console.log('[Dashboard] Response:', response);
      res.json(response);

    } catch (error) {
      console.error('[Dashboard Controller] Error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to fetch overview statistics',
        error: error.message
      });
    }
  },

  // Get recent bookings for dashboard
  getRecentBookings: async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 10;
      console.log(`[Dashboard] Fetching ${limit} recent bookings...`);

      const Booking = require('../models/Booking');
      
      const bookings = await Booking.find()
        .sort({ createdAt: -1 })
        .limit(limit)
        .lean()
        .catch(() => []);

      const formattedBookings = bookings.map(booking => ({
        _id: booking._id,
        id: booking._id.toString(),
        clientName: booking.clientName || 
                   `${booking.firstName || ''} ${booking.lastName || ''}`.trim() ||
                   'Unknown Client',
        serviceName: booking.serviceName || 'Unknown Service',
        date: booking.selectedDate || booking.date || booking.createdAt,
        time: booking.selectedTimeSlot || booking.time || 'TBD',
        status: booking.status || 'pending',
        value: booking.price || booking.totalAmount || 0,
        urgency: booking.urgencyLevel || 'medium',
        createdAt: booking.createdAt
      }));

      console.log(`[Dashboard] Found ${formattedBookings.length} bookings`);
      
      res.json({
        status: 'success',
        data: formattedBookings
      });

    } catch (error) {
      console.error('[Dashboard Controller] Bookings error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to fetch recent bookings',
        error: error.message
      });
    }
  },

  // Get recent activities for dashboard
  getRecentActivities: async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 20;
      console.log(`[Dashboard] Generating ${limit} activities...`);

      const Booking = require('../models/Booking');
      const Client = require('../models/Client');
      
      const [recentBookings, recentClients] = await Promise.all([
        Booking.find().sort({ createdAt: -1 }).limit(10).lean().catch(() => []),
        Client.find().sort({ createdAt: -1 }).limit(10).lean().catch(() => [])
      ]);

      const activities = [];

      // Add booking activities
      recentBookings.forEach(booking => {
        activities.push({
          _id: `booking-${booking._id}`,
          type: 'booking_created',
          clientName: booking.clientName || 'Client',
          description: `New booking created for ${booking.serviceName || 'service'}`,
          timestamp: booking.createdAt,
          metadata: { bookingId: booking._id }
        });
      });

      // Add client activities  
      recentClients.forEach(client => {
        activities.push({
          _id: `client-${client._id}`,
          type: 'client_registered',
          clientName: client.name || `${client.firstName || ''} ${client.lastName || ''}`.trim() || 'New Client',
          description: 'New client registered for recovery services',
          timestamp: client.createdAt,
          metadata: { clientId: client._id }
        });
      });

      // Sort and limit
      const sortedActivities = activities
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, limit);

      console.log(`[Dashboard] Generated ${sortedActivities.length} activities`);
      
      res.json({
        status: 'success',
        data: sortedActivities
      });

    } catch (error) {
      console.error('[Dashboard Controller] Activities error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to generate recent activities',
        error: error.message
      });
    }
  },

  // Get analytics data for charts
  getAnalyticsData: async (req, res) => {
    try {
      console.log('[Dashboard Controller] Fetching analytics data using Mongoose...');

      const Booking = require('../models/Booking');
      const Service = require('../models/Service');
      
      const [bookings, services] = await Promise.all([
        Booking.find().lean().catch(err => {
          console.error('[Dashboard] Analytics bookings error:', err);
          return [];
        }),
        Service.find().lean().catch(err => {
          console.error('[Dashboard] Analytics services error:', err);
          return [];
        })
      ]);

      console.log(`[Dashboard] Analytics data: ${bookings.length} bookings, ${services.length} services`);

      // Generate service popularity data
      const serviceStats = services.map(service => {
        const serviceBookings = bookings.filter(booking => 
          booking.serviceName === service.name || 
          booking.serviceId === service._id.toString()
        );
        
        const revenue = serviceBookings.reduce((sum, booking) => {
          return sum + (booking.price || booking.totalAmount || 0);
        }, 0);

        return {
          serviceId: service._id,
          name: service.name,
          bookingCount: serviceBookings.length,
          revenue: revenue,
          waitlistCount: 0 // Would need waitlist collection for real data
        };
      });

      // Generate booking trends (last 30 days)
      const last30Days = [];
      for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        const dayBookings = bookings.filter(booking => {
          const bookingDate = new Date(booking.createdAt);
          return bookingDate.toISOString().split('T')[0] === dateStr;
        }).length;

        last30Days.push({
          _id: dateStr,
          count: dayBookings
        });
      }

      const response = {
        status: 'success',
        data: {
          bookingStats: {
            dailyBookings: last30Days,
            totalRevenue: bookings.reduce((sum, b) => sum + (b.price || b.totalAmount || 0), 0),
            statusCounts: bookings.reduce((acc, booking) => {
              const status = booking.status || 'pending';
              acc[status] = (acc[status] || 0) + 1;
              return acc;
            }, {})
          },
          topServices: serviceStats,
          clientAcquisition: [], // Would need historical client data
          waitlistMetrics: {
            statusCounts: {},
            conversionRate: 0,
            conversionTime: { average: 0, min: 0, max: 0 },
            topServices: []
          }
        }
      };

      console.log('[Dashboard Controller] Analytics data generated successfully');
      res.json(response);

    } catch (error) {
      console.error('[Dashboard Controller] Error fetching analytics:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to fetch analytics data',
        error: error.message
      });
    }
  },

  // Get service popularity data
  getServicePopularity: async (req, res) => {
    try {
      console.log('[Dashboard Controller] Fetching service popularity using Mongoose...');

      const Booking = require('../models/Booking');
      const Service = require('../models/Service');
      
      const [bookings, services] = await Promise.all([
        Booking.find().lean().catch(err => {
          console.error('[Dashboard] Service popularity bookings error:', err);
          return [];
        }),
        Service.find().lean().catch(err => {
          console.error('[Dashboard] Service popularity services error:', err);
          return [];
        })
      ]);

      console.log(`[Dashboard] Service popularity data: ${bookings.length} bookings, ${services.length} services`);

      const servicePopularity = services.map(service => {
        const serviceBookings = bookings.filter(booking => 
          booking.serviceName === service.name || 
          booking.serviceId === service._id.toString()
        );
        
        const revenue = serviceBookings.reduce((sum, booking) => {
          return sum + (booking.price || booking.totalAmount || 0);
        }, 0);

        return {
          serviceId: service._id,
          name: service.name,
          bookingCount: serviceBookings.length,
          revenue: revenue
        };
      });

      console.log('[Dashboard Controller] Service popularity calculated successfully');
      
      res.json({
        status: 'success',
        data: servicePopularity
      });

    } catch (error) {
      console.error('[Dashboard Controller] Error fetching service popularity:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to fetch service popularity',
        error: error.message
      });
    }
  }
};

module.exports = dashboardController; 