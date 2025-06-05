/**
 * Production Data Validation Utilities
 * 
 * Ensures data integrity when transitioning from mock to real production data
 */

import { ServiceData } from '../types/service';
import { ClientInformation } from '../types/client';

/**
 * Validates that a service object has real MongoDB ObjectId and required fields
 */
export const validateProductionService = (service: any): ServiceData | null => {
  if (!service._id || service._id.length !== 24) {
    console.error('[Production Validation] Invalid service ObjectId:', service);
    return null;
  }

  if (!service.name || !service.description) {
    console.error('[Production Validation] Missing required service fields:', service);
    return null;
  }

  return {
    _id: service._id,
    id: service._id,
    name: service.name,
    description: service.description,
    duration: Number(service.duration) || 60,
    price: Number(service.price) || 0,
    category: service.category || 'recovery',
    isActive: Boolean(service.isActive !== false),
    type: service.type || service.category
  };
};

/**
 * Validates booking submission data for production backend
 */
export const validateBookingSubmission = (data: any): boolean => {
  const requiredFields = ['serviceId', 'clientName', 'email', 'phone'];
  
  for (const field of requiredFields) {
    if (!data[field]) {
      console.error(`[Production Validation] Missing required field: ${field}`);
      return false;
    }
  }

  // Validate MongoDB ObjectId format
  if (!data.serviceId || data.serviceId.length !== 24) {
    console.error('[Production Validation] Invalid serviceId format:', data.serviceId);
    return false;
  }

  return true;
};

/**
 * Validates client information for production submission
 */
export const validateClientInfo = (clientInfo: any): ClientInformation | null => {
  if (!clientInfo.firstName || !clientInfo.lastName || !clientInfo.email || !clientInfo.phone) {
    console.error('[Production Validation] Missing required client fields');
    return null;
  }

  // Ensure email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(clientInfo.email)) {
    console.error('[Production Validation] Invalid email format:', clientInfo.email);
    return null;
  }

  return clientInfo as ClientInformation;
};

/**
 * Removes all mock/fallback data flags and properties
 */
export const sanitizeForProduction = (data: any): any => {
  const sanitized = { ...data };
  
  // Remove development/mock flags
  delete sanitized.isDevelopmentFallback;
  delete sanitized.isMockData;
  delete sanitized.fallbackService;
  delete sanitized.debugInfo;
  
  return sanitized;
};

/**
 * Logs production-ready data structure for debugging
 */
export const logProductionData = (label: string, data: any): void => {
  console.log(`[Production Data] ${label}:`, {
    type: typeof data,
    keys: Object.keys(data || {}),
    hasMongoId: data?._id?.length === 24,
    isArray: Array.isArray(data),
    length: Array.isArray(data) ? data.length : undefined,
    sample: Array.isArray(data) ? data[0] : data
  });
}; 