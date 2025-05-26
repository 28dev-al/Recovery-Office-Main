import React from 'react';
import styled from 'styled-components';
import PremiumHero from '../../components/sections/premium/PremiumHero';
import { PremiumServicesSection } from '../../components/sections/premium/PremiumServicesSection';
import { PremiumTestimonials } from '../../components/sections/premium/PremiumTestimonials';
import { PremiumTeam } from '../../components/sections/premium/PremiumTeam';
import { RecoveryTimeline } from '../../components/sections/premium/RecoveryTimeline';
import { RegulatoryPanel } from '../../components/sections/premium/RegulatoryPanel';
import { Box } from '../../design-system/components/layout/Box';
import { Container } from '../../design-system/components/layout/Container';

const TestContainer = styled.div`
  padding: 20px;
`;

const SectionTitle = styled.h2`
  margin: 40px 0 20px;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
`;

const NavbarDemo = styled.div`
  position: relative;
  height: 400px;
  background: linear-gradient(135deg, #0a214f 0%, #344a73 100%);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 40px;
`;

const NavbarPlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background-color: rgba(10, 33, 79, 0.9);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  
  h3 {
    color: white;
    margin: 0;
  }
`;

const ComponentTest: React.FC = () => {
  return (
    <Box as="main">
      <Container>
        <TestContainer>
          <h1>Component Tests</h1>
          
          <SectionTitle>Navigation Bar</SectionTitle>
          <Box mb={4}>
            <p>The navigation bar is implemented site-wide at the App level. Here&apos;s a visual representation:</p>
            <NavbarDemo>
              <NavbarPlaceholder>
                <h3>Premium Navigation Bar (Fixed Position)</h3>
              </NavbarPlaceholder>
            </NavbarDemo>
          </Box>
          
          <SectionTitle>Hero Section</SectionTitle>
          <Box mb={4}>
            <PremiumHero 
              title="Financial Asset Recovery Experts" 
              subtitle="Premium services to recover lost assets with proven methodology and expert guidance."
            />
          </Box>
          
          <SectionTitle>Services Section</SectionTitle>
          <Box mb={4}>
            <PremiumServicesSection />
          </Box>
          
          <SectionTitle>Recovery Timeline</SectionTitle>
          <Box mb={4}>
            <RecoveryTimeline />
          </Box>
          
          <SectionTitle>Team Section</SectionTitle>
          <Box mb={4}>
            <PremiumTeam />
          </Box>
          
          <SectionTitle>Testimonials Section</SectionTitle>
          <Box mb={4}>
            <PremiumTestimonials />
          </Box>
          
          <SectionTitle>Regulatory Panel</SectionTitle>
          <Box mb={4}>
            <RegulatoryPanel />
          </Box>
        </TestContainer>
      </Container>
    </Box>
  );
};

export default ComponentTest; 