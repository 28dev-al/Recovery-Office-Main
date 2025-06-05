/**
 * Services API Client
 * 
 * Handles fetching services from the backend with proper error handling,
 * fallback services, and valid MongoDB ObjectId format.
 */

import { ServiceType } from '../types/service.types';
import { ServiceData } from '../types/service';

export class ServicesAPI {
  private baseURL = 'https://recovery-office-backend-production.up.railway.app/api';

  constructor() {
    console.log(`[ServicesAPI] Environment: ${process.env.NODE_ENV}`);
    console.log(`[ServicesAPI] Base URL: ${this.baseURL}`);
  }

  async getServices(): Promise<ServiceData[]> {
    try {
      console.log('[ServicesAPI] Fetching from MongoDB Atlas via:', `${this.baseURL}/services`);

      const response = await fetch(`${this.baseURL}/services`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const responseData = await response.json();
      console.log('[ServicesAPI] Raw MongoDB response:', responseData);
      
      // CRITICAL FIX: Handle the {status, results, data} structure from backend
      let services;
      if (responseData.data && Array.isArray(responseData.data)) {
        // Backend returns {status: 'success', results: 4, data: Array}
        services = responseData.data;
      } else if (Array.isArray(responseData)) {
        // Fallback: direct array response
        services = responseData;
      } else {
        throw new Error('Invalid response structure from services API');
      }
      
      console.log('[ServicesAPI] Extracted services array:', services);
      console.log('[ServicesAPI] Services count:', services.length);
      
      // CRITICAL: Validate and format services with REAL MongoDB ObjectIds
      const formattedServices = services.map((service: Record<string, unknown>, index: number) => {
        const realMongoId = service._id as string;
        const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(realMongoId);
        
        console.log(`[ServicesAPI] Processing service ${index + 1}:`, {
          name: service.name,
          mongoId: realMongoId,
          isValidObjectId,
          rawService: service
        });
        
        // CRITICAL: Ensure we're using REAL MongoDB ObjectIds
        if (!isValidObjectId) {
          console.error(`[ServicesAPI] Invalid MongoDB ObjectId for service: ${service.name}`, {
            receivedId: realMongoId,
            expectedFormat: '24-character hex string'
          });
          throw new Error(`Invalid MongoDB ObjectId for service: ${service.name}`);
        }
        
        return {
          _id: realMongoId,           // ← REAL MongoDB ObjectId from database
          id: realMongoId,            // ← Use REAL MongoDB ID, not fake ID
          name: service.name as string,
          description: service.description as string,
          duration: service.duration as number,
          price: service.price as number,
          category: (service.category as string) || 'recovery',
          type: this.mapCategoryToServiceType((service.category as string) || 'recovery'),
          formattedPrice: `£${service.price}`,
          formattedDuration: `${service.duration} minutes`,
          icon: (service.icon as string) || this.getDefaultIcon((service.category as string) || 'recovery'),
          isActive: service.isActive !== false,
          availableForNewClients: true,
          isValidObjectId: true,      // ← Confirmed valid
          isDevelopmentFallback: false, // ← Real service from MongoDB
          // Debug info
          originalMongoId: realMongoId,
          debugInfo: 'Real MongoDB ObjectId preserved from database'
        };
      });
      
      console.log('[ServicesAPI] Final formatted services with REAL MongoDB IDs:', formattedServices);
      console.log('[ServicesAPI] ID verification:', formattedServices.map((s: ServiceData) => ({
        name: s.name,
        _id: s._id,
        idLength: s._id.length,
        isValidObjectId: s.isValidObjectId
      })));
      
      return formattedServices;
      
    } catch (error) {
      console.error('[ServicesAPI] Error fetching services:', error);
      
      // CRITICAL: Don't use fallback services - let the error bubble up
      // This ensures we know when the API is failing due to CORS
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch') || error.message.includes('CORS')) {
          console.error('[ServicesAPI] CORS ERROR DETECTED - Backend not allowing frontend domain');
          throw new Error('CORS_ERROR: Backend not configured for this domain. Check Railway CORS settings.');
        }
        if (error.message.includes('HTTP 500')) {
          console.error('[ServicesAPI] Backend server error');
          throw new Error('BACKEND_ERROR: Server error on Railway backend');
        }
      }
      
      throw error;
    }
  }

  private validateAndProcessService(service: Record<string, unknown>): ServiceData {
    // Ensure valid MongoDB ObjectId format
    const validObjectId = this.ensureValidObjectId(service._id as string || service.id as string);
    
    return {
      _id: validObjectId,
      id: (service.id as string) || validObjectId,
      name: (service.name as string) || 'Unknown Service',
      description: (service.description as string) || 'Professional recovery service',
      duration: (service.duration as number) || 60,
      price: (service.price as number) || 500,
      category: (service.category as string) || 'recovery',
      type: (service.type as ServiceType) || ServiceType.INITIAL_CONSULTATION,
      formattedPrice: (service.formattedPrice as string) || `£${(service.price as number) || 500}`,
      formattedDuration: (service.formattedDuration as string) || `${(service.duration as number) || 60} minutes`,
      icon: (service.icon as string) || '/icons/services/default.svg',
      isActive: (service.isActive as boolean) !== false,
      availableForNewClients: (service.availableForNewClients as boolean) !== false,
      isValidObjectId: /^[0-9a-fA-F]{24}$/.test(validObjectId),
      isDevelopmentFallback: false
    };
  }

  private ensureValidObjectId(id?: string): string {
    // Check if already valid MongoDB ObjectId
    if (id && /^[0-9a-fA-F]{24}$/.test(id)) {
      return id;
    }
    
    // Generate a valid MongoDB ObjectId format
    const timestamp = Math.floor(Date.now() / 1000).toString(16).padStart(8, '0');
    const randomBytes = Array.from({ length: 16 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
    
    return timestamp + randomBytes;
  }

  private getFallbackServices(): ServiceData[] {
    // PRODUCTION: No fallback services - always use real backend data
    console.error('[ServicesAPI] CRITICAL: Fallback services requested in production mode');
    throw new Error('PRODUCTION_ERROR: Fallback services not available. Real backend connection required.');
  }

  private mapCategoryToServiceType(category: string) {
    switch (category) {
      case 'recovery': return ServiceType.CRYPTOCURRENCY_RECOVERY;
      case 'compliance': return ServiceType.REGULATORY_COMPLAINT;
      default: return ServiceType.INITIAL_CONSULTATION;
    }
  }

  private getDefaultIcon(category: string): string {
    switch (category) {
      case 'recovery': return '/icons/services/recovery.svg';
      case 'compliance': return '/icons/services/regulatory.svg';
      default: return '/icons/services/default.svg';
    }
  }

  /**
   * Health check for the services API
   */
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    try {
      const response = await fetch(`${this.baseURL}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        return {
          status: 'healthy',
          timestamp: new Date().toISOString()
        };
      } else {
        throw new Error(`Health check failed: ${response.status}`);
      }
    } catch (error) {
      console.warn('[ServicesAPI] Health check failed:', error);
      return {
        status: 'unhealthy',
        timestamp: new Date().toISOString()
      };
    }
  }
}

export const servicesAPI = new ServicesAPI();
export default servicesAPI; 
