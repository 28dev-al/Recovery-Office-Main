import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import ErrorBoundary from './components/common/ErrorBoundary';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Keep only critical pages as direct imports for faster initial load
import Home from './pages/Home/Home';
import Services from './pages/Services/Services';

// Lazy load all other pages for performance
const InvestmentFraudRecoveryPage = lazy(() => import('./pages/Services/InvestmentFraudRecoveryPage').then(module => ({ default: module.InvestmentFraudRecoveryPage })));
const CryptocurrencyRecoveryPage = lazy(() => import('./pages/Services/CryptocurrencyRecoveryPage').then(module => ({ default: module.CryptocurrencyRecoveryPage })));
const FinancialScamRecoveryPage = lazy(() => import('./pages/Services/FinancialScamRecoveryPage').then(module => ({ default: module.FinancialScamRecoveryPage })));
const RegulatoryComplaintPage = lazy(() => import('./pages/Services/RegulatoryComplaintPage').then(module => ({ default: module.RegulatoryComplaintPage })));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact/Contact'));
const BlogPage = lazy(() => import('./pages/Blog/BlogPage').then(module => ({ default: module.BlogPage })));
const FAQPage = lazy(() => import('./pages/FAQ/FAQPage').then(module => ({ default: module.FAQPage })));
const Booking = lazy(() => import('./pages/Booking'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

// Legal pages - lazy loaded
const Privacy = lazy(() => import('./pages/legal/Privacy'));
const PrivacyPolicyPageEnhanced = lazy(() => import('./pages/legal/PrivacyPolicy/PrivacyPolicyPageEnhanced').then(module => ({ default: module.PrivacyPolicyPageEnhanced })));
const TermsOfServicePageEnhanced = lazy(() => import('./pages/legal/TermsOfService/TermsOfServicePageEnhanced').then(module => ({ default: module.TermsOfServicePageEnhanced })));
const Terms = lazy(() => import('./pages/legal/Terms'));
const DataSecurityPage = lazy(() => import('./pages/DataSecurity/DataSecurityPage').then(module => ({ default: module.DataSecurityPage })));
const Accessibility = lazy(() => import('./pages/legal/Accessibility'));
const ComponentTest = lazy(() => import('./pages/ComponentTest/ComponentTest'));

// Auth pages - lazy loaded
const LoginPage = lazy(() => import('./pages/Auth/LoginPage').then(module => ({ default: module.LoginPage })));

// Dashboard pages - lazy loaded (admin only)
const DashboardPage = lazy(() => import('./pages/Dashboard/DashboardPage').then(module => ({ default: module.DashboardPage })));
const BookingsPage = lazy(() => import('./pages/Dashboard/BookingsPage').then(module => ({ default: module.BookingsPage })));
const ClientsPage = lazy(() => import('./pages/Dashboard/ClientsPage'));
const ServicesPage = lazy(() => import('./pages/Dashboard/ServicesPage'));
const AnalyticsPage = lazy(() => import('./pages/Dashboard/AnalyticsPage'));

// Google Ads Landing Pages - lazy loaded for performance
const CryptocurrencyRecoveryLanding = lazy(() => import('./pages/landing/CryptocurrencyRecoveryLanding'));

// Performance-optimized loading fallback
const LoadingFallback: React.FC<{ message?: string }> = ({ message = 'Loading...' }) => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '50vh',
    fontSize: '16px',
    color: '#1a365d',
    backgroundColor: '#f7fafc'
  }}>
    {message}
  </div>
);

const AppRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <Routes location={location}>
      {/* Main Pages */}
      <Route
        path="/"
        element={
          <ErrorBoundary>
            <Home />
          </ErrorBoundary>
        }
      />
      <Route
        path="/services"
        element={
          <ErrorBoundary>
            <Services />
          </ErrorBoundary>
        }
      />
      <Route
        path="/services/investment-fraud-recovery"
        element={
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback message="Loading Investment Fraud Recovery..." />}>
              <InvestmentFraudRecoveryPage />
            </Suspense>
          </ErrorBoundary>
        }
      />
      <Route
        path="/services/cryptocurrency-recovery"
        element={
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback message="Loading Cryptocurrency Recovery..." />}>
              <CryptocurrencyRecoveryPage />
            </Suspense>
          </ErrorBoundary>
        }
      />
      <Route
        path="/services/financial-scam-recovery"
        element={
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback message="Loading Financial Scam Recovery..." />}>
              <FinancialScamRecoveryPage />
            </Suspense>
          </ErrorBoundary>
        }
      />
      <Route
        path="/services/regulatory-assistance"
        element={
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback message="Loading Regulatory Assistance..." />}>
              <RegulatoryComplaintPage />
            </Suspense>
          </ErrorBoundary>
        }
      />
      <Route
        path="/about"
        element={
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback message="Loading About..." />}>
              <About />
            </Suspense>
          </ErrorBoundary>
        }
      />
      <Route
        path="/contact"
        element={
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback message="Loading Contact..." />}>
              <Contact />
            </Suspense>
          </ErrorBoundary>
        }
      />
      <Route
        path="/blog"
        element={
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback message="Loading Blog..." />}>
              <BlogPage />
            </Suspense>
          </ErrorBoundary>
        }
      />
      <Route
        path="/faq"
        element={
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback message="Loading FAQ..." />}>
              <FAQPage />
            </Suspense>
          </ErrorBoundary>
        }
      />
      <Route
        path="/booking/:serviceId?"
        element={
          <ErrorBoundary
            fallback={
              <div className="error-fallback">
                <h2>Something went wrong in the booking system</h2>
                <p>Please try again later or contact us directly to schedule your consultation.</p>
                <a href="/contact">Contact Us</a>
              </div>
            }
          >
            <Suspense fallback={<LoadingFallback message="Loading Booking System..." />}>
              <Booking />
            </Suspense>
          </ErrorBoundary>
        }
      />
      
      {/* Legal Pages */}
      <Route
        path="/privacy"
        element={
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback message="Loading Privacy Policy..." />}>
              <Privacy />
            </Suspense>
          </ErrorBoundary>
        }
      />
      <Route
        path="/privacy-policy"
        element={
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback message="Loading Privacy Policy..." />}>
              <PrivacyPolicyPageEnhanced />
            </Suspense>
          </ErrorBoundary>
        }
      />
      <Route
        path="/terms"
        element={
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback message="Loading Terms..." />}>
              <Terms />
            </Suspense>
          </ErrorBoundary>
        }
      />
      <Route
        path="/terms-of-service"
        element={
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback message="Loading Terms of Service..." />}>
              <TermsOfServicePageEnhanced />
            </Suspense>
          </ErrorBoundary>
        }
      />
      <Route
        path="/hipaa"
        element={<Navigate to="/data-security" replace />}
      />
      <Route
        path="/data-security"
        element={
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback message="Loading Data Security..." />}>
              <DataSecurityPage />
            </Suspense>
          </ErrorBoundary>
        }
      />
      <Route
        path="/accessibility"
        element={
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback message="Loading Accessibility..." />}>
              <Accessibility />
            </Suspense>
          </ErrorBoundary>
        }
      />
      <Route
        path="/component-test"
        element={
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback message="Loading Component Test..." />}>
              <ComponentTest />
            </Suspense>
          </ErrorBoundary>
        }
      />
      
      {/* Authentication Routes */}
      <Route
        path="/login"
        element={
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback message="Loading Login..." />}>
              <LoginPage />
            </Suspense>
          </ErrorBoundary>
        }
      />
      
      {/* Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <ErrorBoundary>
            <ProtectedRoute>
              <Suspense fallback={<LoadingFallback message="Loading Dashboard..." />}>
                <DashboardPage />
              </Suspense>
            </ProtectedRoute>
          </ErrorBoundary>
        }
      />
      <Route
        path="/dashboard/bookings"
        element={
          <ErrorBoundary>
            <ProtectedRoute>
              <Suspense fallback={<LoadingFallback message="Loading Bookings..." />}>
                <BookingsPage />
              </Suspense>
            </ProtectedRoute>
          </ErrorBoundary>
        }
      />
      <Route
        path="/dashboard/clients"
        element={
          <ErrorBoundary>
            <ProtectedRoute>
              <Suspense fallback={<LoadingFallback message="Loading Clients..." />}>
                <ClientsPage />
              </Suspense>
            </ProtectedRoute>
          </ErrorBoundary>
        }
      />
      <Route
        path="/dashboard/services"
        element={
          <ErrorBoundary>
            <ProtectedRoute>
              <Suspense fallback={<LoadingFallback message="Loading Services..." />}>
                <ServicesPage />
              </Suspense>
            </ProtectedRoute>
          </ErrorBoundary>
        }
      />
      <Route
        path="/dashboard/analytics"
        element={
          <ErrorBoundary>
            <ProtectedRoute>
              <Suspense fallback={<LoadingFallback message="Loading Analytics..." />}>
                <AnalyticsPage />
              </Suspense>
            </ProtectedRoute>
          </ErrorBoundary>
        }
      />
      
      {/* Google Ads Landing Pages - High Priority for Conversions */}
      <Route
        path="/cryptocurrency-recovery"
        element={
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback message="Loading Cryptocurrency Recovery Landing..." />}>
              <CryptocurrencyRecoveryLanding />
            </Suspense>
          </ErrorBoundary>
        }
      />
      
      {/* 404 Page */}
      <Route
        path="*"
        element={
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback message="Loading..." />}>
              <NotFound />
            </Suspense>
          </ErrorBoundary>
        }
      />
    </Routes>
  );
};

export default AppRoutes; 





