/**
 * ContactInfo Section Component
 * 
 * Displays contact information for the Recovery Office company
 */

import * as React from 'react';
import styled from 'styled-components';
import { Box, Flex, Grid } from '../../../design-system/components/layout';
import { Text } from '../../../design-system/components/typography';
import { PHI } from '../../../constants/sacred-geometry';
import { FadeIn } from '../../../animation';

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
const PhoneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7294C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6422 21.8227C20.3799 21.9119 20.1026 21.9451 19.827 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27097 2.11999 4.17997C2.095 3.90498 2.12787 3.62829 2.21649 3.36661C2.3051 3.10493 2.44763 2.86322 2.63476 2.65823C2.82188 2.45325 3.0498 2.28958 3.30379 2.17761C3.55777 2.06565 3.83233 2.00791 4.10999 1.99997H7.10999C7.59524 1.9952 8.06574 2.16705 8.43369 2.48351C8.80164 2.79996 9.04201 3.23942 9.10999 3.71997C9.23662 4.68004 9.47144 5.6227 9.80999 6.53997C9.94454 6.8879 9.97366 7.27114 9.89391 7.63659C9.81415 8.00203 9.62886 8.33456 9.35999 8.59997L8.08999 9.86997C9.51355 12.3729 11.6271 14.4864 14.13 15.91L15.4 14.64C15.6654 14.3711 15.9979 14.1858 16.3634 14.1061C16.7288 14.0263 17.1121 14.0555 17.46 14.19C18.3773 14.5285 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

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

const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
                <PhoneIcon />
              </IconWrapper>
              <div>
                <Text 
                  color="text.secondary"
                  style={{
                    fontSize: '0.875rem',
                    marginBottom: '0.25rem'
                  }}
                >
                  Phone
                </Text>
                <Text fontWeight={500}>+44 20 7946 0523</Text>
              </div>
            </ContactInfoItem>
            
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
                <Text fontWeight={500}>contact@recoveryoffice.com</Text>
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
                  1 Financial Recovery Plaza<br />
                  Canary Wharf<br />
                  London E14 5AB<br />
                  United Kingdom
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
                <ShieldIcon />
              </IconWrapper>
              <div>
                <Text 
                  color="text.secondary"
                  style={{
                    fontSize: '0.875rem',
                    marginBottom: '0.25rem'
                  }}
                >
                  Case Support Hotline
                </Text>
                <Text fontWeight={500}>+44 20 7946 0524</Text>
                <Text 
                  style={{
                    fontSize: '0.875rem',
                    marginTop: '0.25rem'
                  }} 
                  color="text.secondary"
                >
                  For existing clients with active recovery cases
                </Text>
              </div>
            </ContactInfoItem>
            
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
                <Text fontWeight={500}>cases@recoveryoffice.com</Text>
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
              <Text fontWeight={500} style={{ marginBottom: '0.25rem' }}>+44 20 7946 0599</Text>
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
            <TimeText>9:00 AM - 6:00 PM GMT</TimeText>
            
            <DayLabel>Saturday:</DayLabel>
            <TimeText>10:00 AM - 2:00 PM GMT</TimeText>
            
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
              <strong>Note:</strong> Our emergency support line is available 24/7 for urgent financial fraud situations. 
              Initial consultations are available outside normal business hours by appointment.
            </Text>
          </Box>
        </HoursContainer>
      </ContactInfoContainer>
    </FadeIn>
  );
};

export default ContactInfo; 











