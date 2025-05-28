/**
 * Services API Client
 * 
 * Handles fetching services from the backend with proper error handling,
 * fallback services, and valid MongoDB ObjectId format.
 */

import { ServiceType } from '../types/service.types';

export interface ServiceData {
  _id: string;
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
  type?: ServiceType;
  formattedPrice?: string;
  formattedDuration?: string;
  icon?: string;
  isActive?: boolean;
  availableForNewClients?: boolean;
  isValidObjectId?: boolean;
  isDevelopmentFallback?: boolean;
}

export class ServicesAPI {
  private baseURL = 'http://localhost:5000/api';

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
      console.log('[ServicesAPI] Raw response:', responseData);
      
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
      
      // Validate and format services for frontend
      const formattedServices = services.map((service: any) => ({
        _id: service._id,
        id: service._id, // Use _id as id for consistency
        name: service.name, // PRESERVE EXACT NAME
        description: service.description,
        duration: service.duration,
        price: service.price,
        category: service.category || 'recovery',
        type: this.mapCategoryToServiceType(service.category || 'recovery'),
        formattedPrice: `£${service.price}`,
        formattedDuration: `${service.duration} minutes`,
        icon: service.icon || this.getDefaultIcon(service.category || 'recovery'),
        isActive: service.isActive !== false,
        availableForNewClients: true,
        isValidObjectId: /^[0-9a-fA-F]{24}$/.test(service._id),
        isDevelopmentFallback: false
      }));
      
      console.log('[ServicesAPI] Formatted services:', formattedServices);
      return formattedServices;
      
    } catch (error) {
      console.error('[ServicesAPI] Error:', error);
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
    console.log('[ServicesAPI] Using fallback services');
    
    return [
      {
        _id: '507f1f77bcf86cd799439011',
        id: 'cryptocurrency-recovery',
        name: 'Cryptocurrency Recovery',
        description: 'Expert recovery of stolen Bitcoin, Ethereum, and other digital assets',
        duration: 60,
        price: 750,
        category: 'crypto',
        type: ServiceType.CRYPTOCURRENCY_RECOVERY,
        formattedPrice: '£750',
        formattedDuration: '1 hour',
        icon: '/icons/services/crypto.svg',
        isActive: true,
        availableForNewClients: true,
        isValidObjectId: true,
        isDevelopmentFallback: true
      },
      {
        _id: '507f1f77bcf86cd799439012',
        id: 'investment-fraud-recovery',
        name: 'Investment Fraud Recovery',
        description: 'Recovery services for victims of investment scams and Ponzi schemes',
        duration: 60,
        price: 750,
        category: 'fraud',
        type: ServiceType.INVESTMENT_FRAUD_RECOVERY,
        formattedPrice: '£750',
        formattedDuration: '1 hour',
        icon: '/icons/services/fraud.svg',
        isActive: true,
        availableForNewClients: true,
        isValidObjectId: true,
        isDevelopmentFallback: true
      },
      {
        _id: '507f1f77bcf86cd799439013',
        id: 'regulatory-assistance',
        name: 'Regulatory Assistance',
        description: 'Professional assistance with financial regulatory matters',
        duration: 45,
        price: 500,
        category: 'regulatory',
        type: ServiceType.REGULATORY_COMPLAINT,
        formattedPrice: '£500',
        formattedDuration: '45 minutes',
        icon: '/icons/services/regulatory.svg',
        isActive: true,
        availableForNewClients: true,
        isValidObjectId: true,
        isDevelopmentFallback: true
      },
      {
        _id: '507f1f77bcf86cd799439014',
        id: 'professional-negligence',
        name: 'Professional Negligence',
        description: 'Legal action against negligent financial professionals',
        duration: 90,
        price: 950,
        category: 'legal',
        type: ServiceType.LEGAL_CONSULTATION,
        formattedPrice: '£950',
        formattedDuration: '1 hour 30 minutes',
        icon: '/icons/services/legal.svg',
        isActive: true,
        availableForNewClients: true,
        isValidObjectId: true,
        isDevelopmentFallback: true
      }
    ];
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