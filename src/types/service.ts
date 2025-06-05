export interface ServiceData {
  _id: string;
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  isActive: boolean;
  type?: string; // Optional for compatibility
  
  // Optional properties used in various components
  image?: string;
  icon?: string;
  formattedPrice?: string;
  formattedDuration?: string;
  isValidObjectId?: boolean;
  isDevelopmentFallback?: boolean;
  availableForNewClients?: boolean;
  mongoObjectId?: string; // Legacy field
  
  // Debug info
  debugInfo?: {
    originalId?: string;
    mongoId?: string;
    processedAt?: string;
    fallbackUsed?: boolean;
    fallbackService?: boolean;
  };
}

// Alias for backward compatibility
export type ServiceOption = ServiceData;

// Service with optional _id for creation
export interface ServiceInput {
  _id?: string;
  id?: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  isActive?: boolean;
  type?: string;
}

// Validate if a service has all required fields
export function isValidService(service: unknown): service is ServiceData {
  if (!service || typeof service !== 'object') return false;
  
  const s = service as Record<string, unknown>;
  
  return !!(
    s._id &&
    typeof s._id === 'string' &&
    s._id.length === 24 &&
    s.id &&
    typeof s.id === 'string' &&
    s.name &&
    typeof s.name === 'string' &&
    s.description &&
    typeof s.description === 'string' &&
    typeof s.price === 'number' &&
    typeof s.duration === 'number' &&
    s.category &&
    typeof s.category === 'string' &&
    typeof s.isActive === 'boolean'
  );
}

// Convert ServiceInput to ServiceData (for API responses)
export function toServiceData(input: ServiceInput): ServiceData | null {
  if (!input._id || !input.id) return null;
  
  return {
    _id: input._id,
    id: input.id,
    name: input.name,
    description: input.description,
    price: input.price,
    duration: input.duration,
    category: input.category,
    isActive: input.isActive ?? true,
    type: input.type
  };
} 