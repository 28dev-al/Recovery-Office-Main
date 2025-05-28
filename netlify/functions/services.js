const { connectToDatabase } = require('./shared/database');
const { handleCors, createResponse } = require('./shared/cors');
const Service = require('./shared/models/Service');

exports.handler = async (event, _context) => {
  // Handle CORS
  const corsResponse = handleCors(event);
  if (corsResponse) return corsResponse;

  try {
    await connectToDatabase();

    switch (event.httpMethod) {
      case 'GET': {
        const services = await Service.find({ isActive: true });
        
        // Format services for frontend
        const formattedServices = services.map(service => ({
          _id: service._id,
          id: service._id, // Ensure both _id and id are available
          name: service.name,
          description: service.description,
          duration: service.duration,
          price: service.price,
          formattedPrice: `£${service.price}`,
          formattedDuration: service.duration === 60 ? '1 hour' : 
                           service.duration > 60 ? `${Math.floor(service.duration / 60)} hour ${service.duration % 60} minutes` :
                           `${service.duration} minutes`,
          icon: service.icon,
          category: service.category,
          isActive: service.isActive,
          slug: service.slug,
          createdAt: service.createdAt,
          updatedAt: service.updatedAt,
          debugInfo: {
            hasMongoId: true,
            mongoIdString: service._id.toString(),
            isValidObjectId: true
          }
        }));

        return createResponse(200, {
          status: 'success',
          results: formattedServices.length,
          data: formattedServices,
          message: 'Services retrieved successfully'
        });
      }

      case 'POST': {
        // Create new service (admin only)
        const serviceData = JSON.parse(event.body);
        
        const newService = new Service({
          ...serviceData,
          createdAt: new Date()
        });

        const savedService = await newService.save();

        return createResponse(201, {
          status: 'success',
          data: savedService,
          message: 'Service created successfully'
        });
      }

      default:
        return createResponse(405, {
          status: 'error',
          message: 'Method not allowed'
        });
    }
  } catch (error) {
    console.error('Services function error:', error);
    return createResponse(500, {
      status: 'error',
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}; 