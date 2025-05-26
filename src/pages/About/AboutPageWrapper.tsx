import * as React from 'react';
import { useState } from 'react';
import { ThemeProvider, useTheme } from '../../design-system/theme/ThemeProvider';
import AboutPage from './About';
import { ErrorBoundary } from '../../components/common/ErrorBoundary';
import { Box, Container } from '../../design-system/components/layout';
import { Heading, Text } from '../../design-system/components/typography';
import { Button } from '../../design-system/components/button/Button';
import { useNavigate } from 'react-router-dom';

// Component to check theme initialization
const ThemeInitCheck: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeError] = useState<Error | null>(null);
  
  // Always call useTheme hook, never conditionally
  const themeContext = useTheme();
  
  // Then handle the result
  if (!themeContext.theme) {
    return (
      <Box p={8} textAlign="center">
        <Heading as="h2" variant="h3">
          Theme Not Available
        </Heading>
        <Text variant="body1" my={4}>
          The application theme could not be initialized properly.
        </Text>
        <Button as="a" href="/" variant="primary">
          Return to Home
        </Button>
      </Box>
    );
  }
  
  // Catch any errors with the theme
  if (themeError) {
    return (
      <Box p={8} textAlign="center">
        <Heading as="h2" variant="h3" color="red">
          Theme Error
        </Heading>
        <Text variant="body1" my={4}>
          There was an error initializing the theme: {themeError.message}
        </Text>
        <Button as="a" href="/" variant="primary">
          Return to Home
        </Button>
      </Box>
    );
  }
  
  // Theme is available and no errors, render children
  return <>{children}</>;
};

/**
 * AboutPageWrapper
 * 
 * Wraps the AboutPage with the necessary providers and error handling
 * This ensures the AboutPage component has access to the theme context
 */
const AboutPageWrapper: React.FC = () => {
  const navigate = useNavigate();
  
  const handleNavigateHome = () => {
    navigate('/');
  };
  
  return (
    <ErrorBoundary
      fallback={
        <Container maxWidth="800px" py={10}>
          <Box textAlign="center">
            <Heading as="h1" variant="h2">
              Error Loading About Page
            </Heading>
            <Text variant="body1" my={4}>
              We encountered an unexpected error loading this page. 
              Our team has been notified and is working to resolve the issue.
            </Text>
            <Button onClick={handleNavigateHome} variant="primary">
              Return to Home
            </Button>
          </Box>
        </Container>
      }
    >
      <ThemeProvider initialMode="premium">
        <ThemeInitCheck>
          <AboutPage />
        </ThemeInitCheck>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default AboutPageWrapper; 