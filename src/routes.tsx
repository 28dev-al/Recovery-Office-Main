import * as React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ErrorBoundary from './components/common/ErrorBoundary';

// Import pages
import Home from './pages/Home/Home';
import Services from './pages/Services/Services';
import InvestmentFraudRecovery from './pages/Services/InvestmentFraudRecovery';
import CryptocurrencyRecovery from './pages/Services/CryptocurrencyRecovery';
import About from './pages/About';
import Contact from './pages/Contact/Contact';
import Blog from './pages/Blog/Blog';
import FAQ from './pages/FAQ/FAQ';
import Booking from './pages/Booking';
import NotFound from './pages/NotFound/NotFound';
import Privacy from './pages/legal/Privacy';
import Terms from './pages/legal/Terms';
import HIPAA from './pages/legal/HIPAA';
import Accessibility from './pages/legal/Accessibility';
import ComponentTest from './pages/ComponentTest/ComponentTest';

// Import Dashboard pages
import DashboardPage from './pages/Dashboard/DashboardPage';
import BookingsPage from './pages/Dashboard/BookingsPage';
import ClientsPage from './pages/Dashboard/ClientsPage';
import ServicesPage from './pages/Dashboard/ServicesPage';
import AnalyticsPage from './pages/Dashboard/AnalyticsPage';

const AppRoutes: React.FC = () => {
  const location = useLocation();

  // Wrap pages in error boundaries to prevent entire app crashes
  return (
    <Routes location={location}>
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
            <InvestmentFraudRecovery />
          </ErrorBoundary>
        }
      />
      <Route
        path="/services/cryptocurrency-recovery"
        element={
          <ErrorBoundary>
            <CryptocurrencyRecovery />
          </ErrorBoundary>
        }
      />
      <Route
        path="/about"
        element={
          <ErrorBoundary>
            <About />
          </ErrorBoundary>
        }
      />
      <Route
        path="/contact"
        element={
          <ErrorBoundary>
            <Contact />
          </ErrorBoundary>
        }
      />
      <Route
        path="/blog"
        element={
          <ErrorBoundary>
            <Blog />
          </ErrorBoundary>
        }
      />
      <Route
        path="/faq"
        element={
          <ErrorBoundary>
            <FAQ />
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
            <Booking />
          </ErrorBoundary>
        }
      />
      <Route
        path="/privacy"
        element={
          <ErrorBoundary>
            <Privacy />
          </ErrorBoundary>
        }
      />
      <Route
        path="/terms"
        element={
          <ErrorBoundary>
            <Terms />
          </ErrorBoundary>
        }
      />
      <Route
        path="/hipaa"
        element={
          <ErrorBoundary>
            <HIPAA />
          </ErrorBoundary>
        }
      />
      <Route
        path="/accessibility"
        element={
          <ErrorBoundary>
            <Accessibility />
          </ErrorBoundary>
        }
      />
      <Route
        path="/component-test"
        element={
          <ErrorBoundary>
            <ComponentTest />
          </ErrorBoundary>
        }
      />
      
      {/* Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <ErrorBoundary>
            <DashboardPage />
          </ErrorBoundary>
        }
      />
      <Route
        path="/dashboard/bookings"
        element={
          <ErrorBoundary>
            <BookingsPage />
          </ErrorBoundary>
        }
      />
      <Route
        path="/dashboard/clients"
        element={
          <ErrorBoundary>
            <ClientsPage />
          </ErrorBoundary>
        }
      />
      <Route
        path="/dashboard/services"
        element={
          <ErrorBoundary>
            <ServicesPage />
          </ErrorBoundary>
        }
      />
      <Route
        path="/dashboard/analytics"
        element={
          <ErrorBoundary>
            <AnalyticsPage />
          </ErrorBoundary>
        }
      />
      
      <Route
        path="*"
        element={
          <ErrorBoundary>
            <NotFound />
          </ErrorBoundary>
        }
      />
    </Routes>
  );
};

export default AppRoutes; 





