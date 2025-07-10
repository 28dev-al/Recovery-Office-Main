/**
 * ContactInfo Section Component
 * 
 * Displays contact information for the Recovery Office company
 */

import * as React from 'react';
import styled from 'styled-components';
import { Box, Grid } from '../../../design-system/components/layout';
import { Text } from '../../../design-system/components/typography';
import { PHI } from '../../../constants/sacred-geometry';
import { FadeIn } from '../../../animation';
import { COMPANY_PROFILE_CA } from '../../../constants/companyProfile.ca';

// Styled components
const ContactInfoContainer = styled.div`
  padding: ${PHI * 8}px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  height: 100%;
`;

const ContactDepartmentHeading = styled(Text)`
  color: ${props => props.theme.colors.primary[700]};
  font-weight: 600;
  margin-bottom: ${PHI * 6}px;
  font-size: 1.125rem;
`;

const ContactInfoItem = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: ${PHI * 10}px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${props => props.theme.colors.primary[50]};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-right: ${PHI * 8}px;
  color: ${props => props.theme.colors.primary[600]};
  flex-shrink: 0;
`;

const HoursContainer = styled.div`
  margin-top: ${PHI * 16}px;
  padding-top: ${PHI * 16}px;
  border-top: 1px solid ${props => props.theme.colors.border.light};
`;

const HoursHeading = styled(Text)`
  color: ${props => props.theme.colors.primary[700]};
  font-weight: 600;
  margin-bottom: ${PHI * 8}px;
  font-size: 1.125rem;
`;

const HoursGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${PHI * 4}px;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}px) {
    grid-template-columns: 1fr;
  }
`;

const DayLabel = styled(Text)`
  font-weight: 500;
  min-width: 100px;
  color: ${props => props.theme.colors.text.secondary};
`;

const TimeText = styled(Text)`
  color: ${props => props.theme.colors.text.primary};
`;

const EmergencySupport = styled.div`
  margin-top: ${PHI * 16}px;
  padding: ${PHI * 12}px;
  background-color: ${props => props.theme.colors.primary[50]};
  border-radius: 8px;
  border-left: 4px solid ${props => props.theme.colors.primary[600]};
`;

const SupportHeading = styled(Text)`
  color: ${props => props.theme.colors.primary[700]};
  font-weight: 600;
  margin-bottom: ${PHI * 6}px;
  font-size: 1.125rem;
`;

// Icons
const EmailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface ContactInfoProps {
  /**
   * Override default styling
   */
  className?: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ className }) => {
  return (
    <FadeIn>
      <ContactInfoContainer className={className}>
        <Grid gridTemplateColumns={{ sm: '1fr', md: '1fr 1fr' }} gap={`${PHI * 24}px`}>
          {/* General Contact Information */}
          <div>
            <ContactDepartmentHeading as="h3">
              General Inquiries
            </ContactDepartmentHeading>
            
            <ContactInfoItem>
              <IconWrapper>
                <EmailIcon />
              </IconWrapper>
              <div>
                <Text 
                  color="text.secondary"
                  style={{
                    fontSize: '0.875rem',
                    marginBottom: '0.25rem'
                  }}
                >
                  Email
                </Text>
                <Text fontWeight={500}>{COMPANY_PROFILE_CA.email}</Text>
              </div>
            </ContactInfoItem>
            
            <ContactInfoItem>
              <IconWrapper>
                <LocationIcon />
              </IconWrapper>
              <div>
                <Text 
                  color="text.secondary"
                  style={{
                    fontSize: '0.875rem',
                    marginBottom: '0.25rem'
                  }}
                >
                  Address
                </Text>
                <Text fontWeight={500}>
                  {COMPANY_PROFILE_CA.address}
                </Text>
              </div>
            </ContactInfoItem>
          </div>
          
          {/* Financial Recovery Support */}
          <div>
            <ContactDepartmentHeading as="h3">
              Recovery Support
            </ContactDepartmentHeading>
            
            <ContactInfoItem>
              <IconWrapper>
                <EmailIcon />
              </IconWrapper>
              <div>
                <Text 
                  color="text.secondary"
                  style={{
                    fontSize: '0.875rem',
                    marginBottom: '0.25rem'
                  }}
                >
                  Recovery Support Email
                </Text>
                <Text fontWeight={500}>cases@recovery-office.com</Text>
                <Text 
                  style={{
                    fontSize: '0.875rem',
                    marginTop: '0.25rem'
                  }} 
                  color="text.secondary"
                >
                  24-hour response guaranteed for active cases
                </Text>
              </div>
            </ContactInfoItem>
            
            <EmergencySupport>
              <SupportHeading as="h3">
                Urgent Fraud Support
              </SupportHeading>
              <Text 
                style={{
                  fontSize: '0.875rem',
                  marginBottom: '0.5rem'
                }}
              >
                If you're experiencing an active fraud situation where immediate intervention may help:
              </Text>
              <Text fontWeight={500} style={{ marginBottom: '0.25rem' }}>Email: {COMPANY_PROFILE_CA.email}</Text>
              <Text 
                style={{
                  fontSize: '0.875rem'
                }} 
                color="text.secondary"
              >
                Available 24/7 for emergency recovery situations
              </Text>
            </EmergencySupport>
          </div>
        </Grid>
        
        {/* Business Hours */}
        <HoursContainer>
          <HoursHeading as="h3">Business Hours</HoursHeading>
          
          <HoursGrid>
            <DayLabel>Monday - Friday:</DayLabel>
            <TimeText>9:00 AM - 6:00 PM EST</TimeText>
            
            <DayLabel>Saturday:</DayLabel>
            <TimeText>10:00 AM - 2:00 PM EST</TimeText>
            
            <DayLabel>Sunday:</DayLabel>
            <TimeText>Closed</TimeText>
          </HoursGrid>
          
          <Box style={{ marginTop: '1rem' }}>
            <Text 
              style={{
                fontSize: '0.875rem'
              }} 
              color="text.secondary"
            >
              <strong>Note:</strong> Our emergency support email is available 24/7 for urgent financial fraud situations. 
              Initial consultations are available outside normal business hours by appointment.
            </Text>
          </Box>
        </HoursContainer>
      </ContactInfoContainer>
    </FadeIn>
  );
};

export default ContactInfo; 











