/**
 * Booking Page Index
 * 
 * This file re-exports the BookingPageWrapper component to maintain 
 * clean imports while providing proper error boundaries and context providers.
 * 
 * Temporarily using simplified version for debugging.
 */

import React from 'react';
import { BookingErrorBoundary } from '../../components/booking/BookingErrorBoundary';
import BookingPageSimple from './BookingPageSimple'; // Using simplified version for debugging

/**
 * Safe BookingPage with error boundaries
 * 
 * Wraps the booking page with error boundaries to prevent crashes
 * and provide fallback UI for better user experience.
 */
const SafeBookingPage: React.FC = () => {
  return (
    <BookingErrorBoundary 
      componentName="SafeBookingPage"
      fallback={
        <div style={{ 
          padding: '40px', 
          textAlign: 'center', 
          background: '#f8f9fa',
          minHeight: '400px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <h2 style={{ color: '#dc3545', marginBottom: '16px' }}>
              Booking System Error
          </h2>
          <p style={{ color: '#6c757d', marginBottom: '24px' }}>
            We're experiencing technical difficulties with the booking system.
            Please try refreshing the page or contact us directly.
          </p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              background: '#0A214F',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
    >
            Refresh Page
          </button>
        </div>
      }
    >
      <BookingPageSimple />
    </BookingErrorBoundary>
  );
};

export default SafeBookingPage; 







