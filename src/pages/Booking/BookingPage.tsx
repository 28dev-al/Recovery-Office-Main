import * as React from 'react';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useBooking } from '../../context/BookingContext';
import { BookingStepId, BookingTimeSlot, ServiceOption } from '../../types/booking.types';
import { Box, Container, Stack } from '../../design-system/components/layout';
import { Heading, Text } from '../../design-system/components/typography';
import { Button } from '../../design-system/components/button/Button';
import { LoadingOverlay } from '../../design-system/components/feedback/LoadingOverlay';
import { ErrorDisplay } from '../../design-system/components/feedback/ErrorDisplay';
import Card from '../../design-system/components/cards/Card';
import { BotanicalBackground } from '../../design-system/botanical';
import { PREMIUM_COLORS } from '../../design-system/tokens/colors.premium';
import { ServiceSelectionStep, DateSelectionStep, ConfirmationStep } from "../../components/booking/steps";
import { SACRED_TIMING } from '../../constants/sacred-geometry';
import { AnimatePresence, motion } from 'framer-motion';
import { BookingErrorBoundary, SimpleLoader } from '../../components/booking/BookingErrorBoundary';

// Premium styled components for the booking page
const BookingContainer = styled(Container)`
  max-width: 1100px;
  margin: 0 auto;
  padding: 64px 24px;
  
  @media (min-width: ${props => props.theme.breakpoints.values.md}px) {
    padding: 80px 32px;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const PremiumCard = styled(Card)`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  padding: 40px;
  margin-bottom: 32px;
  animation: ${fadeIn} 0.6s ease-out;
  
  @media (max-width: ${props => props.theme.breakpoints.values.sm}px) {
    padding: 24px;
  }
`;

const StepperContainer = styled(Box)`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;

const StepLine = styled(Box)<{ $completed: boolean }>`
  height: 2px;
  flex: 1;
  background-color: ${props => props.$completed ? 
    PREMIUM_COLORS.BASE_COLORS.forest[500] : 
    PREMIUM_COLORS.BASE_COLORS.ivory[300]};
  transition: all 0.3s ease;
  align-self: center;
`;

const StepLabel = styled(Text)<{ $active: boolean }>`
  font-size: 14px;
  font-weight: ${props => props.$active ? 600 : 400};
  color: ${props => props.$active ? 
    PREMIUM_COLORS.BASE_COLORS.gray[800] : 
    PREMIUM_COLORS.BASE_COLORS.gray[600]};
  margin-top: 8px;
  text-align: center;
  
  @media (max-width: ${props => props.theme.breakpoints.values.md}px) {
    display: none;
  }
`;

const PremiumHeading = styled(Heading)`
  font-family: 'Playfair Display', serif;
  margin-bottom: 16px;
  text-align: center;
`;

// Regulatory badge styles
const BadgesContainer = styled(Box)`
  display: flex;
  justify-content: center;
  margin-top: 40px;
  flex-wrap: wrap;
  gap: 16px;
`;

const Badge = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: ${PREMIUM_COLORS.BASE_COLORS.ivory[100]};
  border-radius: 4px;
  border: 1px solid ${PREMIUM_COLORS.BASE_COLORS.ivory[300]};
`;

// Booking success animation
const checkmarkAnimation = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const SuccessIcon = styled(Box)`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${PREMIUM_COLORS.BASE_COLORS.forest[500]};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  animation: ${checkmarkAnimation} 0.8s cubic-bezier(0.65, 0, 0.35, 1) forwards;
  
  svg {
    width: 40px;
    height: 40px;
    color: white;
  }
`;

// Custom step component for the stepper
const Step = styled(Box)<{
  $active: boolean;
  $completed: boolean;
  onClick?: () => void;
}>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  background-color: ${props => 
    props.$completed ? PREMIUM_COLORS.BASE_COLORS.forest[500] : 
    props.$active ? PREMIUM_COLORS.BASE_COLORS.gold[500] : 
    PREMIUM_COLORS.BASE_COLORS.ivory[300]};
  color: ${props => 
    props.$completed || props.$active ? '#fff' : 
    PREMIUM_COLORS.BASE_COLORS.gray[600]};
  
  @media (max-width: ${props => props.theme.breakpoints.values.sm}px) {
    width: 32px;
    height: 32px;
    font-size: 14px;
  }
  
  cursor: ${props => props.$completed || props.$active ? 'pointer' : 'default'};
`;

// Safe Error Display for better UX
const SafeErrorDisplay = styled(Box)`
  background: #fff8f8;
  border: 1px solid #ffdddd;
  border-radius: 8px;
  padding: 24px;
  margin: 16px 0;
  text-align: center;
`;

/**
 * PremiumBookingPage component
 * 
 * A complete redesign of the booking experience with a premium look and feel,
 * emphasizing trust, sophistication, and professionalism.
 * Now includes error boundaries and defensive rendering.
 */
const PremiumBookingPage: React.FC = () => {
  const navigate = useNavigate();
  const [contextError, setContextError] = useState<Error | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Always call useBooking at the top level - React hooks rule
  const bookingContext = useBooking();
  
  // Handle any booking context initialization errors
  useEffect(() => {
  try {
    console.log("[BookingPage] Attempting to access BookingContext");
    
      if (bookingContext && !isInitialized) {
      console.log("[BookingPage] BookingContext accessed successfully:", {
        currentStep: bookingContext.state.currentStep,
        hasSelectedService: !!bookingContext.state.selectedService,
        hasLoadingState: !!bookingContext.state.loadingState,
        completedSteps: Array.from(bookingContext.state.completedSteps || [])
      });
      setIsInitialized(true);
    }
  } catch (error) {
    console.error("[BookingPage] Error accessing BookingContext:", error);
    if (!contextError) {
        setContextError(error instanceof Error ? error : new Error(String(error)));
      }
    }
  }, [bookingContext, isInitialized, contextError]);

  // Create formatted booking data for confirmation step
  const formattedBookingData = useMemo(() => {
    if (!bookingContext || !bookingContext.state.selectedService || !bookingContext.state.selectedDate || !bookingContext.state.clientInfo) {
      return null;
    }
    
    const timeSlot: BookingTimeSlot = bookingContext.state.selectedTimeSlot || { 
      id: 'default',
      startTime: bookingContext.state.selectedTime || '',
      endTime: '',
      duration: 60,
      available: true
    };
    
    return {
      service: bookingContext.state.selectedService,
      date: bookingContext.state.selectedDate,
      timeSlot,
      clientInfo: bookingContext.state.clientInfo
    };
  }, [bookingContext]);
  
  // Initial data fetching with enhanced error logging
  const fetchInitialData = useCallback(async () => {
    if (!bookingContext) return;
    
    try {
      console.log("[BookingPage] Fetching initial services data");
      await bookingContext.fetchAvailableServices();
      console.log("[BookingPage] Services data fetched successfully");
    } catch (error) {
      console.error("[BookingPage] Error fetching services:", error);
    }
  }, [bookingContext]);
  
  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  // If context error occurred, show safe error message
  if (contextError || !bookingContext) {
    return (
      <BookingErrorBoundary componentName="BookingPage" fallback={
        <SafeErrorDisplay>
          <Heading as="h3" style={{ marginBottom: '16px', color: '#dc3545' }}>
            Booking System Temporarily Unavailable
            </Heading>
          <Text mb={4}>
            We apologize for the inconvenience. Our booking system is currently experiencing issues.
            Please try refreshing the page or contact us directly.
            </Text>
            <Button 
              as="a" 
              href="/" 
              variant="primary" 
              size="lg"
              style={{ 
                backgroundColor: PREMIUM_COLORS.BASE_COLORS.forest[500],
              padding: '12px 28px',
              marginRight: '12px'
              }}
            >
              Return to Home
            </Button>
          <Button 
            onClick={() => window.location.reload()}
            variant="outline" 
            size="lg"
            style={{ 
              padding: '12px 28px'
            }}
          >
            Refresh Page
          </Button>
        </SafeErrorDisplay>
      }>
        <Box position="relative" minHeight="100vh" bg={PREMIUM_COLORS.BASE_COLORS.ivory[50]}>
          <BotanicalBackground variant="default" opacity={0.07} />
          <Container py={10} px={4} textAlign="center">
            <SimpleLoader message="Loading booking system..." />
        </Container>
      </Box>
      </BookingErrorBoundary>
    );
  }
  
  // Access context state and methods safely
  const { 
    state, 
    goToStep, 
    fetchAvailableServices, 
    resetForm,
    isResourceLoading,
    hasApiError,
    getApiErrorForResource,
    recoverFromError,
    selectService
  } = bookingContext;
  
  const currentStep = state.currentStep ?? BookingStepId.SERVICE_SELECTION;
  
  // Handle service selection
  const handleServiceSelect = (service: ServiceOption) => {
    console.log('[BookingPage] Service selected:', service.name);
    selectService(service);
  };

  // Get API errors
  const serviceError = getApiErrorForResource('services');
  
  // Handle back to home
  const handleBackToHome = () => {
    navigate('/');
  };
  
  // Handle retry after error
  const handleRetry = async () => {
    try {
      await fetchAvailableServices(true);
    } catch (error) {
      console.error("[BookingPage] Service fetch retry failed:", error);
    }
  };
  
  // Handle reset booking
  const handleResetBooking = () => {
    try {
    const recovered = recoverFromError();
    if (!recovered) {
      resetForm();
      goToStep(BookingStepId.SERVICE_SELECTION);
    }
    } catch (error) {
      console.error("[BookingPage] Error during booking reset:", error);
    }
  };
  
  // Stepper component with premium styling
  const PremiumStepper = () => {
    const steps = [
      { id: BookingStepId.SERVICE_SELECTION, label: 'Service' },
      { id: BookingStepId.DATE_SELECTION, label: 'Date & Time' },
      { id: BookingStepId.CLIENT_INFORMATION, label: 'Your Details' },
      { id: BookingStepId.CONFIRMATION, label: 'Confirm' }
    ];
    
    return (
      <BookingErrorBoundary componentName="PremiumStepper" fallback={<div>Loading step indicator...</div>}>
      <StepperContainer>
        <Stack direction="vertical" spacing="sm" width="100%" maxWidth="700px">
          <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
            {steps.map((step, index) => {
              const isActive = currentStep === step.id;
              const isCompleted = state.completedSteps?.has(step.id) || currentStep > step.id;
              
              return (
                <React.Fragment key={step.id}>
                  <Box display="flex" flexDirection="column" alignItems="center">
                    <Step 
                      $active={isActive} 
                      $completed={isCompleted}
                      onClick={() => {
                        if (isCompleted || step.id === currentStep + 1) {
                          goToStep(step.id);
                        }
                      }}
                    >
                      {isCompleted ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="currentColor" />
                        </svg>
                      ) : (
                        step.id + 1
                      )}
                    </Step>
                    <StepLabel $active={isActive}>{step.label}</StepLabel>
                  </Box>
                  
                  {index < steps.length - 1 && (
                    <StepLine $completed={isCompleted} />
                  )}
                </React.Fragment>
              );
            })}
          </Box>
        </Stack>
      </StepperContainer>
      </BookingErrorBoundary>
    );
  };
  
  // Success step component
  const SuccessStep = () => (
    <BookingErrorBoundary componentName="SuccessStep" fallback={<SimpleLoader message="Loading confirmation..." />}>
    <Box textAlign="center" py={6}>
      <SuccessIcon>
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="currentColor" />
        </svg>
      </SuccessIcon>
      
      <PremiumHeading as="h2" style={{ marginBottom: '16px' }}>
        Booking Confirmed
      </PremiumHeading>
      
      <Text mb={4} color={PREMIUM_COLORS.BASE_COLORS.gray[700]}>
        Your consultation has been scheduled successfully. A confirmation email has been sent to your registered email address with all the details.
      </Text>
      
      <Box mb={6} p={4} borderRadius="md" bg={PREMIUM_COLORS.BASE_COLORS.ivory[100]} display="inline-block">
        <Text color={PREMIUM_COLORS.BASE_COLORS.gray[600]} mb={1} style={{ fontSize: '14px' }}>
          Reference Number
        </Text>
        <Text fontWeight="bold" color={PREMIUM_COLORS.BASE_COLORS.forest[600]}>
          {state.bookingReference || 'N/A'}
      </Text>
      </Box>
      
      <Box>
        <Button 
          variant="primary" 
          size="lg" 
          onClick={handleBackToHome}
          style={{ 
            backgroundColor: PREMIUM_COLORS.BASE_COLORS.forest[500],
            padding: '12px 32px',
            marginRight: '16px'
          }}
        >
        Return to Home
      </Button>
        
        <Button 
          variant="outline" 
          size="lg" 
          onClick={() => resetForm()}
          style={{ 
            borderColor: PREMIUM_COLORS.BASE_COLORS.forest[500],
            color: PREMIUM_COLORS.BASE_COLORS.forest[500],
            padding: '12px 32px'
          }}
        >
          Make Another Booking
        </Button>
      </Box>
    </Box>
    </BookingErrorBoundary>
  );
  
  // Determine which step component to render with error handling
  const renderStepComponent = () => {
    try {
    switch (currentStep) {
      case BookingStepId.SERVICE_SELECTION:
          return (
            <BookingErrorBoundary componentName="ServiceSelectionStep" fallback={<SimpleLoader message="Loading services..." />}>
              <ServiceSelectionStep onServiceSelect={handleServiceSelect} />
            </BookingErrorBoundary>
          );
        
      case BookingStepId.DATE_SELECTION:
          if (!state.selectedService) {
            return (
          <Box textAlign="center" p={4}>
                <Text mb={4}>Please select a service before choosing a date.</Text>
            <Button 
              variant="primary" 
              mt={4} 
              onClick={() => goToStep(BookingStepId.SERVICE_SELECTION)}
                  style={{ backgroundColor: PREMIUM_COLORS.BASE_COLORS.forest[500] }}
            >
              Go to Service Selection
            </Button>
          </Box>
        );
          }
          return (
            <BookingErrorBoundary componentName="DateSelectionStep" fallback={<SimpleLoader message="Loading available dates..." />}>
              <DateSelectionStep selectedService={state.selectedService} />
            </BookingErrorBoundary>
          );
        
      case BookingStepId.CLIENT_INFORMATION:
          return (
            <BookingErrorBoundary componentName="ClientInformationStep" fallback={<SimpleLoader message="Loading form..." />}>
              <Box textAlign="center" p={4}>
                <Text mb={4}>Client information step will be implemented here.</Text>
                <Button 
                  variant="primary" 
                  onClick={() => goToStep(BookingStepId.CONFIRMATION)}
                  style={{ backgroundColor: PREMIUM_COLORS.BASE_COLORS.forest[500] }}
                >
                  Continue to Confirmation
                </Button>
              </Box>
            </BookingErrorBoundary>
          );
        
      case BookingStepId.CONFIRMATION:
          if (!formattedBookingData) {
            return (
          <Box textAlign="center" p={4}>
                <Text mb={4}>
                  Some required booking information is missing. Please complete all previous steps.
                </Text>
            <Button 
              variant="primary" 
              mt={4} 
              onClick={() => goToStep(BookingStepId.SERVICE_SELECTION)}
                  style={{ backgroundColor: PREMIUM_COLORS.BASE_COLORS.forest[500] }}
            >
                  Restart Booking Process
            </Button>
          </Box>
        );
          }
          return (
            <BookingErrorBoundary componentName="ConfirmationStep" fallback={<SimpleLoader message="Loading confirmation..." />}>
              <ConfirmationStep bookingData={formattedBookingData} />
            </BookingErrorBoundary>
          );
        
      case BookingStepId.SUCCESS:
        return <SuccessStep />;
        
      default:
        return <Text>Invalid step</Text>;
      }
    } catch (error) {
      console.error("[BookingPage] Error rendering step component:", error);
      return (
        <SafeErrorDisplay>
          <Heading as="h3" color="feedback.error.main" mb={4}>
            Step Rendering Error
          </Heading>
          <Text mb={4}>
            We encountered an error rendering this step. Please try refreshing the page.
          </Text>
          <Button 
            variant="primary" 
            mt={4} 
            onClick={handleResetBooking}
            style={{ backgroundColor: PREMIUM_COLORS.BASE_COLORS.forest[500] }}
          >
            Reset Booking Process
          </Button>
        </SafeErrorDisplay>
      );
    }
  };
  
  // Regulatory badges component
  const RegulatoryBadges = () => (
    <BookingErrorBoundary componentName="RegulatoryBadges" fallback={null}>
    <BadgesContainer>
      <Badge>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7v9c0 5 5 8 10 8s10-3 10-8V7L12 2z" stroke={PREMIUM_COLORS.BASE_COLORS.gray[700]} strokeWidth="2" fill="none" />
          <path d="M9 12l2 2 4-4" stroke={PREMIUM_COLORS.BASE_COLORS.forest[500]} strokeWidth="2" />
        </svg>
        <Text fontWeight={500} style={{ fontSize: '12px' }}>FCA Regulated</Text>
      </Badge>
      
      <Badge>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={PREMIUM_COLORS.BASE_COLORS.gray[700]} strokeWidth="2" fill="none" />
          <path d="M9 12l2 2 4-4" stroke={PREMIUM_COLORS.BASE_COLORS.forest[500]} strokeWidth="2" />
        </svg>
        <Text fontWeight={500} style={{ fontSize: '12px' }}>BaFin Certified</Text>
      </Badge>
      
      <Badge>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M4 6h16v12H4V6z" stroke={PREMIUM_COLORS.BASE_COLORS.gray[700]} strokeWidth="2" fill="none" />
          <path d="M12 14.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" stroke={PREMIUM_COLORS.BASE_COLORS.forest[500]} strokeWidth="2" fill="none" />
        </svg>
        <Text fontWeight={500} style={{ fontSize: '12px' }}>Cyber Essentials</Text>
      </Badge>
    </BadgesContainer>
    </BookingErrorBoundary>
  );

  return (
    <BookingErrorBoundary componentName="BookingPageMain">
    <Box 
      position="relative" 
      minHeight="100vh" 
      bg={PREMIUM_COLORS.BASE_COLORS.ivory[50]}
      overflow="hidden"
    >
      {/* Premium botanical background */}
        <BookingErrorBoundary componentName="BotanicalBackground" fallback={null}>
      <BotanicalBackground variant="default" opacity={0.07} animated={true} />
        </BookingErrorBoundary>
      
      <BookingContainer>
        {/* Header section */}
        <Box textAlign="center" width="100%" mb={8}>
          <PremiumHeading as="h1" style={{ marginBottom: '16px' }} color={PREMIUM_COLORS.BASE_COLORS.forest[500]}>
            Book Your Consultation
          </PremiumHeading>
          
          <Text 
            mb={4}
            color={PREMIUM_COLORS.BASE_COLORS.gray[700]} 
            maxWidth="700px" 
            mx="auto"
          >
            Take the first step towards recovering your financial assets. Our team of expert advisors will evaluate your case and develop a tailored recovery strategy.
          </Text>
          
          <Text 
            color={PREMIUM_COLORS.BASE_COLORS.gray[600]} 
            style={{ fontSize: '14px' }}
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              style={{ marginRight: '6px', verticalAlign: 'middle' }}
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
            All information is encrypted and protected under our confidentiality policy
            </Text>
          </Box>
          
          {/* Stepper - only show if not on success page */}
          {currentStep !== BookingStepId.SUCCESS && (
          <PremiumStepper />
          )}
          
          {/* Main content */}
        <PremiumCard
          style={{
            borderTop: `4px solid ${currentStep === BookingStepId.SUCCESS 
              ? PREMIUM_COLORS.BASE_COLORS.forest[500] 
              : PREMIUM_COLORS.BASE_COLORS.gold[500]}`
          }}
          >
            {/* Show loading overlay when loading services */}
            {isResourceLoading('services') && (
              <BookingErrorBoundary componentName="LoadingOverlay" fallback={<SimpleLoader message="Loading..." />}>
            <LoadingOverlay 
              message="Loading available services..." 
              backgroundColor="rgba(255, 255, 255, 0.9)"
              spinnerColor={PREMIUM_COLORS.BASE_COLORS.forest[500]} 
            />
              </BookingErrorBoundary>
            )}
            
            {/* Display error message if API error occurred */}
            {hasApiError() && serviceError && (
              <BookingErrorBoundary componentName="ErrorDisplay" fallback={<SimpleLoader message="Retrying..." />}>
              <ErrorDisplay
              title="Unable to Load Booking Services"
                message={serviceError}
                onRetry={handleRetry}
              />
              </BookingErrorBoundary>
            )}
            
            {/* Show step content if no loading or error */}
            {!isResourceLoading('services') && !hasApiError() && (
              <BookingErrorBoundary componentName="StepContent" fallback={<SimpleLoader message="Loading step..." />}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ 
                      duration: SACRED_TIMING.standard / 1000,
                  ease: [0.25, 0.1, 0.25, 1.0]
                    }}
                    style={{ width: '100%' }}
                  >
                    {renderStepComponent()}
                  </motion.div>
                </AnimatePresence>
              </BookingErrorBoundary>
          )}
        </PremiumCard>
        
        {/* Regulatory badges - show on all steps */}
        <RegulatoryBadges />
      </BookingContainer>
    </Box>
    </BookingErrorBoundary>
  );
};

export default PremiumBookingPage; 