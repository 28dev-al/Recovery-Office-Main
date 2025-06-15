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
import { PerformanceOptimizer } from './components/common/PerformanceOptimizer';
import { trackPageView } from './utils/analytics';

// Import i18n configuration (MUST be imported before any component that uses translations)
import './i18n';

/**
 * Layout wrapper that conditionally shows navigation based on route
 * Also handles Google Analytics page view tracking for React Router
 */
const ConditionalLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  // Track page views for Google Analytics on route changes
  React.useEffect(() => {
    // Get page title from document or create a meaningful title
    const pageTitle = document.title || `Recovery Office - ${location.pathname}`;
    
    // Track the page view with Google Analytics
    trackPageView({
      page_title: pageTitle,
      page_location: window.location.href,
      page_path: location.pathname + location.search
    });
  }, [location]);

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
              <PerformanceOptimizer />
              <React.Suspense fallback={<div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh',
                fontSize: '18px',
                color: '#1a365d'
              }}>Loading translations...</div>}>
                <BrowserRouter>
                  <ConditionalLayout>
                    <AppRoutes />
                  </ConditionalLayout>
                </BrowserRouter>
              </React.Suspense>
            </ErrorBoundary>
          </BookingProvider>
        </ThemeProvider>
      </HelmetProvider>
    </EmergencyErrorBoundary>
  );
};

export default App; 





