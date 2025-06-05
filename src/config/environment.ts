/**
 * Environment Configuration
 * Centralized configuration for API endpoints and environment settings
 */

export interface EnvironmentConfig {
  api: {
    baseURL: string;
  };
  environment: 'development' | 'production' | 'staging';
  isDevelopment: boolean;
  isProduction: boolean;
}

const getApiBaseURL = (): string => {
  // Check for React environment variable first
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // Fallback to production API
  return 'https://recovery-office-backend-production.up.railway.app/api';
};

const getEnvironment = (): 'development' | 'production' | 'staging' => {
  const nodeEnv = process.env.NODE_ENV;
  const reactEnv = process.env.REACT_APP_ENVIRONMENT;
  
  if (reactEnv === 'production' || nodeEnv === 'production') {
    return 'production';
  }
  
  if (reactEnv === 'staging' || nodeEnv === 'staging') {
    return 'staging';
  }
  
  return 'development';
};

export const config: EnvironmentConfig = {
  api: {
    baseURL: getApiBaseURL(),
  },
  environment: getEnvironment(),
  isDevelopment: getEnvironment() === 'development',
  isProduction: getEnvironment() === 'production',
};

export default config; 