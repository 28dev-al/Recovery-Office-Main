const { connectToDatabase } = require('./shared/database');
const { handleCors, createResponse } = require('./shared/cors');
const Client = require('./shared/models/Client');

exports.handler = async (event, _context) => {
  const corsResponse = handleCors(event);
  if (corsResponse) return corsResponse;

  try {
    await connectToDatabase();

    switch (event.httpMethod) {
      case 'GET': {
        const clients = await Client.find({}).sort({ createdAt: -1 });
        return createResponse(200, {
          status: 'success',
          results: clients.length,
          data: clients
        });
      }

      case 'POST': {
        const clientData = JSON.parse(event.body);
        
        // Check if client already exists
        let existingClient = await Client.findOne({ 
          email: clientData.email.toLowerCase() 
        });

        if (existingClient) {
          return createResponse(200, {
            status: 'success',
            message: 'Client already exists',
            data: existingClient
          });
        }

        // Create new client
        const newClient = new Client({
          ...clientData,
          email: clientData.email.toLowerCase(),
          createdAt: new Date()
        });

        const savedClient = await newClient.save();

        return createResponse(201, {
          status: 'success',
          data: savedClient,
          message: 'Client created successfully'
        });
      }

      default:
        return createResponse(405, {
          status: 'error',
          message: 'Method not allowed'
        });
    }
  } catch (error) {
    console.error('Clients function error:', error);
    return createResponse(500, {
      status: 'error',
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}; 