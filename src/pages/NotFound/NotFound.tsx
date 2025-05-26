import * as React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container } from '../../design-system/components/layout';
import { Section } from '../../design-system/components/layout/Section';
import { Text, Paragraph, Heading } from '../../design-system/components/typography';
import { Button } from '../../design-system/components/button';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { PHI } from '../../constants/sacred-geometry';
import { FlowerOfLife, FibonacciSpiral } from '../../design-system/botanical';
import { GoldenSection } from '../../design-system/components/layout/GoldenSection';

import { FadeIn } from '../../animation';

/**
 * NotFound Page Component
 * 
 * This component represents the 404 page of the Recovery Office website.
 * It displays a friendly error message and provides navigation back to the main site.
 * Design follows sacred geometry principles throughout.
 */
const NotFoundPage: React.FC = () => {
  return (
    <Box 
      as={'main'} 
      minHeight="100vh" 
      display="flex" 
      alignItems="center" 
      backgroundColor="#f0f4f8"
    >
      <Container>
        <Section>
          <FadeIn>
            <GoldenSection direction="horizontal">
              <Box 
                display="flex" 
                flexDirection="column" 
                alignItems="flex-start" 
                justifyContent="center" 
                height="100%"
                pt={`${PHI * 24}px`}
                pb={`${PHI * 24}px`}
              >
                <Box 
                  mb={`${PHI * 16}px`} 
                  opacity={0.8}
                >
                  <FlowerOfLife size="md" primaryColor="#4a6eb3" />
                </Box>
                
                <Heading 
                  as="h1" 
                  display={true}
                  mb={`${PHI * 16}px`}
                  fontWeight={700}
                >
                  404 - Page Not Found
                </Heading>
                
                <Paragraph 
                  size="base"
                  mb={`${PHI * 24}px`}
                  opacity={0.8}
                  maxWidth={`${PHI * 400}px`}
                >
                  It seems you've ventured off the path of harmony. The page you're 
                  looking for may have moved, been deleted, or never existed in the 
                  first place. Let's guide you back to balance.
                </Paragraph>
                
                <Text 
                  weight="semiBold" 
                  size="md"
                  mb={`${PHI * 8}px`}
                >
                  Would you like to:
                </Text>
                
                <Box 
                  display="flex" 
                  flexDirection="column" 
                  gap={`${PHI * 8}px`}
                  mb={`${PHI * 24}px`}
                >
                  <Box display="flex" alignItems="center">
                    <Box 
                      width="8px" 
                      height="8px" 
                      borderRadius="50%" 
                      backgroundColor="#4a6eb3" 
                      mr={`${PHI * 8}px`}
                    />
                    <Text size="sm">Return to the <Link to="/" style={{ color: '#4a6eb3', fontWeight: 500 }}>home page</Link></Text>
                  </Box>
                  
                  <Box display="flex" alignItems="center">
                    <Box 
                      width="8px" 
                      height="8px" 
                      borderRadius="50%" 
                      backgroundColor="#4a6eb3" 
                      mr={`${PHI * 8}px`}
                    />
                    <Text size="sm">Explore our <Link to="/services" style={{ color: '#4a6eb3', fontWeight: 500 }}>services</Link></Text>
                  </Box>
                  
                  <Box display="flex" alignItems="center">
                    <Box 
                      width="8px" 
                      height="8px" 
                      borderRadius="50%" 
                      backgroundColor="#4a6eb3" 
                      mr={`${PHI * 8}px`}
                    />
                    <Text size="sm">Contact our <Link to="/contact" style={{ color: '#4a6eb3', fontWeight: 500 }}>support team</Link></Text>
                  </Box>
                </Box>
                
                <Button 
                  variant="primary" 
                  size="lg"
                  href="/"
                >
                  Return to Home
                </Button>
              </Box>
              <Box 
                position="relative" 
                width="100%" 
                height="100%" 
                display="flex" 
                alignItems="center" 
                justifyContent="center"
              >
                <FibonacciSpiral
                  size="xl"
                  color="#4a6eb3"
                  opacity={0.5}
                  iterations={7}
                  startSize={5}
                  style={{ transform: 'rotate(45deg)' }}
                />
              </Box>
            </GoldenSection>
          </FadeIn>
        </Section>
      </Container>
    </Box>
  );
};

export default NotFoundPage; 








