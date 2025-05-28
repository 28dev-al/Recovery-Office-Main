const { connectToDatabase } = require('./shared/database');
const { handleCors, createResponse } = require('./shared/cors');

exports.handler = async (event, _context) => {
  const corsResponse = handleCors(event);
  if (corsResponse) return corsResponse;

  try {
    await connectToDatabase();
    
    return createResponse(200, {
      status: 'OK',
      timestamp: new Date().toISOString(),
      environment: 'production',
      database: 'Connected to MongoDB Atlas',
      service: 'Recovery Office API',
      version: '1.0.0',
      platform: 'Netlify Functions'
    });
  } catch (error) {
    return createResponse(500, {
      status: 'ERROR',
      message: 'Database connection failed',
      error: error.message
    });
  }
}; 