/**
 * PremiumBookingCTA Component
 * 
 * A visually striking, premium call-to-action section encouraging users
 * to book a consultation with Recovery Office specialists.
 */

import * as React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../../design-system/components/layout';
import { FadeIn, SlideIn } from '../../../animation';

// Background with subtle pattern
const SectionBackground = styled.section`
  background-color: #F8F7F0;
  background-image: radial-gradient(rgba(10, 64, 33, 0.03) 1px, transparent 1px);
  background-size: 20px 20px;
  padding: 80px 0;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 48px 0;
  }
`;

// Gold accent bar
const AccentBar = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 4px;
  background: #D4AF37;
  border-radius: 0 0 2px 2px;
  
  @media (max-width: 768px) {
    width: 80px;
  }
`;

// Premium white card
const CTACard = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(10, 64, 33, 0.08);
  padding: 48px;
  max-width: 580px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  border: 1px solid rgba(10, 64, 33, 0.04);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 24px;
    right: 24px;
    height: 3px;
    background: #D4AF37;
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    padding: 40px 32px;
  }
  
  @media (max-width: 480px) {
    padding: 32px 24px;
    border-radius: 8px;
  }
`;

// Premium headline
const Headline = styled.h2`
  font-family: 'Playfair Display', ${props => props.theme.typography.fontFamily.heading};
  color: #0A4021;
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 24px 0;
  letter-spacing: 0.01em;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.75rem;
    margin-bottom: 16px;
  }
`;

// Elegant subheadline
const Subheadline = styled.p`
  color: #333333;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.5;
  margin: 0 0 40px 0;
  max-width: 440px;
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
    margin-bottom: 32px;
  }
`;

// Premium gold button
const ConsultationButton = styled.button`
  background: #D4AF37;
  background-image: linear-gradient(to right, #D4AF37, #E5C158);
  color: #fff;
  font-weight: 700;
  font-size: 1.125rem;
  border: none;
  border-radius: 8px;
  padding: 16px 36px;
  min-width: 240px;
  box-shadow: 0 4px 16px rgba(212, 175, 55, 0.2);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.25s ease;
  outline: none;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0);
    transition: all 0.25s ease;
  }
  
  &:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 8px 24px rgba(212, 175, 55, 0.3);
    
    &::after {
      background: rgba(255, 255, 255, 0.1);
    }
  }
  
  &:active {
    transform: translateY(1px);
  }
  
  &:focus-visible {
    outline: 3px solid rgba(10, 64, 33, 0.5);
    outline-offset: 2px;
  }
  
  @media (max-width: 480px) {
    width: 100%;
    padding: 16px 24px;
    font-size: 1.05rem;
  }
`;

// Calendar icon
const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="2"/>
    <path d="M16 2V6M8 2V6M3 10H21M8 14H9M12 14H13M16 14H17M8 18H9M12 18H13M16 18H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Reassurance text
const Reassurance = styled.p`
  color: #666666;
  font-size: 0.95rem;
  margin: 24px 0 0 0;
  letter-spacing: 0.01em;
  
  @media (max-width: 480px) {
    font-size: 0.875rem;
  }
`;

/**
 * PremiumBookingCTA Component
 * 
 * A premium, visually striking call-to-action section for booking consultations
 */
const PremiumBookingCTA: React.FC = () => {
  const navigate = useNavigate();
  
  const handleBooking = () => {
    navigate('/booking');
  };

  return (
    <SectionBackground>
      <AccentBar />
      <Container>
        <SlideIn direction="up" delay={0.1}>
          <CTACard>
            <Headline>Begin Your Recovery Process</Headline>
            <Subheadline>
              Schedule a consultation with our specialists
            </Subheadline>
            <ConsultationButton
              onClick={handleBooking}
              aria-label="Book a Consultation"
            >
              <CalendarIcon />
              Book a Consultation
            </ConsultationButton>
            <Reassurance>No obligation. 100% confidential.</Reassurance>
          </CTACard>
        </SlideIn>
      </Container>
    </SectionBackground>
  );
};

export default PremiumBookingCTA; 