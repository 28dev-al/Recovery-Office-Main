/**
 * Service Debugging Utility for Recovery Office Booking System
 * 
 * Helps debug service data flow and ObjectId validation issues
 */

interface ServiceDebugInfo {
  allValid: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  issues: any[];
}

interface ServiceSummary {
  totalServices: number;
  servicesWithValidIds: number;
  servicesWithValidMongoIds: number;
  allIdsValid: boolean;
  allMongoIdsValid: boolean;
}

/**
 * Debug service data array to identify ObjectId validation issues
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debugServiceData = (services: any[], context: string): ServiceDebugInfo => {
  console.log(`[ServiceDebugger] ${context} - Debugging service data:`);

  services.forEach((service, index) => {
    const serviceId = service.id || '';
    const mongoId = service._id || '';
    
    console.log(`[ServiceDebugger] Service ${index + 1}:`, {
      name: service.name,
      id: service.id,
      _id: service._id,
      mongoObjectId: service.mongoObjectId,
      hasValidId: !!service.id,
      hasValidMongoId: !!service._id,
      idLength: serviceId.length,
      mongoIdLength: mongoId.length,
      isValidObjectIdFormat: /^[0-9a-fA-F]{24}$/.test(serviceId),
      isValidMongoIdFormat: /^[0-9a-fA-F]{24}$/.test(mongoId),
      isFallback: service.isFallback,
      isBackendService: service.isBackendService
    });
  });

  // Summary analysis
  const validIds = services.filter(s => /^[0-9a-fA-F]{24}$/.test(s.id || ''));
  const validMongoIds = services.filter(s => /^[0-9a-fA-F]{24}$/.test(s._id || ''));
  const issues = services.filter(s => 
    !/^[0-9a-fA-F]{24}$/.test(s.id || '') && 
    !/^[0-9a-fA-F]{24}$/.test(s._id || '')
  );

  const summary: ServiceSummary = {
    totalServices: services.length,
    servicesWithValidIds: validIds.length,
    servicesWithValidMongoIds: validMongoIds.length,
    allIdsValid: validIds.length === services.length,
    allMongoIdsValid: validMongoIds.length === services.length
  };

  console.log(`[ServiceDebugger] Summary:`, summary);

  // Highlight critical issues
  if (issues.length > 0) {
    console.error(`[ServiceDebugger] ❌ Found ${issues.length} services with invalid ObjectIds:`);
    issues.forEach((service, index) => {
      console.error(`[ServiceDebugger] Issue ${index + 1}:`, {
        serviceName: service.name,
        receivedId: service.id,
        receivedMongoId: service._id,
        isFallback: service.isFallback,
        recommendation: service.isFallback ? 
          'This is a fallback service - backend may be down' : 
          'Backend service should have valid MongoDB ObjectId'
      });
    });
  } else {
    console.log(`[ServiceDebugger] ✅ All services have valid ObjectId formats`);
  }

  return {
    allValid: validIds.length === services.length || validMongoIds.length === services.length,
    issues
  };
};

/**
 * Validate a single ObjectId
 */
export const validateObjectId = (id: string, context: string = 'Unknown'): boolean => {
  const isValid = /^[0-9a-fA-F]{24}$/.test(id);

  if (!isValid) {
    console.error(`[ServiceDebugger] Invalid ObjectId in ${context}:`, {
      receivedId: id,
      type: typeof id,
      length: id?.length,
      expected: 'MongoDB ObjectId (24 character hex string)',
      example: '6830bb99da51afb0a6180bed'
    });
  } else {
    console.log(`[ServiceDebugger] ✅ Valid ObjectId in ${context}:`, id);
  }

  return isValid;
};

/**
 * Debug booking submission data
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debugBookingSubmissionData = (bookingData: any, context: string = 'Booking Submission'): void => {
  console.log(`[ServiceDebugger] ${context} - Debugging booking data:`);
  
  const serviceId = bookingData.serviceId || bookingData.selectedService?.id;
  const clientId = bookingData.clientId;
  
  console.log(`[ServiceDebugger] Service ID Analysis:`, {
    serviceId,
    type: typeof serviceId,
    length: serviceId?.length,
    isValidObjectId: /^[0-9a-fA-F]{24}$/.test(serviceId || ''),
    source: bookingData.selectedService ? 'selectedService.id' : 'direct serviceId'
  });
  
  console.log(`[ServiceDebugger] Client ID Analysis:`, {
    clientId,
    type: typeof clientId,
    length: clientId?.length,
    isValidObjectId: /^[0-9a-fA-F]{24}$/.test(clientId || '')
  });
  
  if (bookingData.selectedService) {
    console.log(`[ServiceDebugger] Selected Service Details:`, {
      id: bookingData.selectedService.id,
      _id: bookingData.selectedService._id,
      mongoObjectId: bookingData.selectedService.mongoObjectId,
      name: bookingData.selectedService.name,
      isBackendService: bookingData.selectedService.isBackendService,
      isFallback: bookingData.selectedService.isFallback,
      debugInfo: bookingData.selectedService.debugInfo
    });
  }
  
  // Validation summary
  const hasValidServiceId = /^[0-9a-fA-F]{24}$/.test(serviceId || '');
  const hasValidClientId = /^[0-9a-fA-F]{24}$/.test(clientId || '');
  
  if (hasValidServiceId && hasValidClientId) {
    console.log(`[ServiceDebugger] ✅ All IDs valid for backend submission`);
  } else {
    console.error(`[ServiceDebugger] ❌ Invalid IDs detected:`, {
      serviceIdValid: hasValidServiceId,
      clientIdValid: hasValidClientId,
      recommendation: 'Check service selection and client creation processes'
    });
  }
};

/**
 * Debug API response data
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debugAPIResponse = (response: any, endpoint: string): void => {
  console.log(`[ServiceDebugger] API Response Debug - ${endpoint}:`);
  
  if (response.data && Array.isArray(response.data)) {
    console.log(`[ServiceDebugger] Response contains ${response.data.length} items`);
    
    if (response.data.length > 0) {
      const firstItem = response.data[0];
      console.log(`[ServiceDebugger] First item structure:`, {
        hasId: !!firstItem.id,
        hasMongoId: !!firstItem._id,
        idValue: firstItem.id,
        mongoIdValue: firstItem._id,
        name: firstItem.name,
        allKeys: Object.keys(firstItem)
      });
    }
  } else if (response.data) {
    console.log(`[ServiceDebugger] Single item response:`, {
      hasId: !!response.data.id,
      hasMongoId: !!response.data._id,
      idValue: response.data.id,
      mongoIdValue: response.data._id,
      type: typeof response.data
    });
  }
  
  console.log(`[ServiceDebugger] Response status:`, response.status);
  console.log(`[ServiceDebugger] Response headers:`, response.headers);
};

/**
 * Create a comprehensive debug report
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createDebugReport = (services: any[], selectedService: any, bookingData: any): string => {
  const report = [
    '=== SERVICE SELECTION DEBUG REPORT ===',
    `Generated: ${new Date().toISOString()}`,
    '',
    '1. SERVICES ANALYSIS:',
    `   Total Services: ${services.length}`,
    `   Backend Services: ${services.filter(s => s.isBackendService).length}`,
    `   Fallback Services: ${services.filter(s => s.isFallback).length}`,
    `   Valid ObjectIds: ${services.filter(s => /^[0-9a-fA-F]{24}$/.test(s.id || '')).length}`,
    '',
    '2. SELECTED SERVICE:',
    `   Name: ${selectedService?.name || 'None'}`,
    `   ID: ${selectedService?.id || 'None'}`,
    `   MongoDB ID: ${selectedService?._id || 'None'}`,
    `   Is Backend Service: ${selectedService?.isBackendService || false}`,
    `   Is Fallback: ${selectedService?.isFallback || false}`,
    `   Valid ObjectId: ${/^[0-9a-fA-F]{24}$/.test(selectedService?.id || '')}`,
    '',
    '3. BOOKING DATA:',
    `   Service ID: ${bookingData?.serviceId || 'None'}`,
    `   Client ID: ${bookingData?.clientId || 'None'}`,
    `   Service ID Valid: ${/^[0-9a-fA-F]{24}$/.test(bookingData?.serviceId || '')}`,
    `   Client ID Valid: ${/^[0-9a-fA-F]{24}$/.test(bookingData?.clientId || '')}`,
    '',
    '4. RECOMMENDATIONS:',
    services.filter(s => s.isFallback).length > 0 ? 
      '   ⚠️ Fallback services detected - check backend connection' : 
      '   ✅ All services from backend',
    /^[0-9a-fA-F]{24}$/.test(selectedService?.id || '') ? 
      '   ✅ Selected service has valid ObjectId' : 
      '   ❌ Selected service has invalid ObjectId - booking will fail',
    '=== END REPORT ==='
  ].join('\n');
  
  console.log(report);
  return report;
};

export default {
  debugServiceData,
  validateObjectId,
  debugBookingSubmissionData,
  debugAPIResponse,
  createDebugReport
}; 