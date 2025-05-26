import * as React from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom'; 
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from './components/common';
import { EmergencyErrorBoundary } from './components/EmergencyErrorBoundary';
import AppRoutes from './routes';
import { ThemeProvider } from './design-system/theme/ThemeProvider';
import { BookingProvider } from './context/BookingContext';
import PremiumNavbar from './components/sections/premium/PremiumNavbar';
import PremiumLayout from './components/sections/premium/PremiumLayout';

/**
 * Layout wrapper that conditionally shows navigation based on route
 */
const ConditionalLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  if (isDashboard) {
    // Dashboard routes don't need the main site navigation
    return <>{children}</>;
  }

  // Regular pages get the full premium layout
  return (
    <>
      <PremiumNavbar />
      <PremiumLayout>
        {children}
      </PremiumLayout>
    </>
  );
};

/**
 * Main App Component
 * 
 * Sets up the core providers and routing for the Recovery Office application.
 * This is the proper full implementation for production use.
 * 
 * Provider hierarchy:
 * - EmergencyErrorBoundary (system-wide error recovery)
 * - HelmetProvider (SEO/head management)
 * - ThemeProvider (design system)
 * - BookingProvider (booking context for entire app)
 * - ErrorBoundary (error handling)
 * - BrowserRouter (routing)
 */
const App: React.FC = () => {
  return (
    <EmergencyErrorBoundary>
      <HelmetProvider>
        <ThemeProvider initialMode="premium">
          <BookingProvider>
            <ErrorBoundary>
              <BrowserRouter>
                <ConditionalLayout>
                  <AppRoutes />
                </ConditionalLayout>
              </BrowserRouter>
            </ErrorBoundary>
          </BookingProvider>
        </ThemeProvider>
      </HelmetProvider>
    </EmergencyErrorBoundary>
  );
};

export default App; 





