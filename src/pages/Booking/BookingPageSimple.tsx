/**
 * Professional BookingPage with Complete Step Implementation
 * 
 * Full booking wizard with all steps implemented using professional components.
 * Features complete backend integration and error handling.
 * 
 * FIXED: Removed PremiumLayout wrapper to prevent duplicate header issue.
 * The layout is already provided by App.tsx ConditionalLayout.
 */

import React from 'react';
import styled from 'styled-components';
import { ProfessionalBookingWizard } from './components/ProfessionalBookingWizard';
import { Helmet } from 'react-helmet-async';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%);
  color: white;
  text-align: center;
  padding: 80px 20px 60px;
`;

const HeroTitle = styled.h1`
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 20px;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
`;

const BookingContent = styled.div`
  max-width: 1000px;
  margin: -40px auto 0;
  padding: 0 20px 80px;
  position: relative;
  z-index: 1;
`;

export const BookingPageSimple: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Book Professional Consultation - Recovery Office</title>
        <meta name="description" content="Book your confidential financial asset recovery consultation with Recovery Office's expert team. Specialized in cryptocurrency recovery, investment fraud, and regulatory assistance." />
        <meta name="keywords" content="financial recovery consultation, cryptocurrency recovery, investment fraud, Recovery Office booking" />
      </Helmet>
      
      <Container>
        <HeroSection>
          <HeroTitle>Professional Consultation Booking</HeroTitle>
          <HeroSubtitle>
            Book your confidential consultation with Recovery Office experts
          </HeroSubtitle>
        </HeroSection>

        <BookingContent>
          <ProfessionalBookingWizard />
        </BookingContent>
      </Container>
    </>
  );
};

export default BookingPageSimple; 