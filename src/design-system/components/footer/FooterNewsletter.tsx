/**
 * FooterNewsletter Component
 * 
 * A component that allows users to sign up for a newsletter in the footer.
 * Follows sacred geometry principles for spacing, proportions, and animation.
 */

import * as React from 'react';
import { useState } from 'react';;
import styled from 'styled-components';
import { DefaultTheme } from 'styled-components';
import { getFibonacciByIndex } from '../../../utils/getFibonacciByIndex';
import { PHI, PHI_INVERSE, FIBONACCI } from '../../../constants/sacred-geometry';
import { Heading } from '../typography/Heading';
import { Text } from '../typography/Text';
import { Button } from '../button/Button';
import { Input } from '../form/Input';

interface FooterNewsletterProps {
  /** Title for the newsletter section */
  title: string;
  
  /** Description text */
  description: string;
  
  /** Optional CSS class name */
  className?: string;
}

// Newsletter container with styling
const NewsletterContainer = styled.div`
  padding: ${getFibonacciByIndex(6)}px;
  background-color: ${props => props.theme.colors.primary[800] ?? 1};
  border-radius: ${getFibonacciByIndex(3)}px;
`;

// Newsletter title with appropriate spacing
const Title = styled(Heading)`
  margin-bottom: ${getFibonacciByIndex(4)}px;
  position: relative;
  font-size: 1.2rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -${getFibonacciByIndex(2)}px;
    left: 0;
    width: ${PHI_INVERSE * 100}%;
    height: 2px;
    background-color: ${props => props.theme.colors.primary[300] ?? 1};
    opacity: 0.6;
  }
`;

// Newsletter description with reduced opacity
const Description = styled(Text)`
  margin-bottom: ${getFibonacciByIndex(5)}px;
  opacity: ${PHI_INVERSE};
`;

// Form layout with golden ratio proportions
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${getFibonacciByIndex(3)}px;
  
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: row;
  }
`;

// Input container with flex ratio
const InputContainer = styled.div`
  flex: ${PHI};
`;

// Button container with flex ratio
const ButtonContainer = styled.div`
  flex: ${PHI_INVERSE};
`;

// Success message with animation
const SuccessMessage = styled.div<{ $visible: boolean }>`
  display: flex;
  align-items: center;
  margin-top: ${getFibonacciByIndex(4)}px;
  opacity: ${props => props.$visible ? 1 : 0};
  transform: translateY(${props => props.$visible ? 0 : `${getFibonacciByIndex(2)}px`});
  transition: all 0.3s cubic-bezier(${PHI_INVERSE}, 0, ${PHI_INVERSE}, 1);
`;

// Success icon
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
  </svg>
);

/**
 * FooterNewsletter component for the footer area with sacred geometry principles
 * for spacing and animations.
 */
const FooterNewsletter: React.FC<FooterNewsletterProps> = ({
  title,
  description,
  className
}) => {
  // State for form handling
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Simulate API call with timeout based on Fibonacci sequence
      await new Promise(resolve => setTimeout(resolve, getFibonacciByIndex(8)));
      
      // Show success state
      setIsSuccess(true);
      setEmail('');
      
      // Reset success state after delay
      setTimeout(() => {
        setIsSuccess(false);
      }, getFibonacciByIndex(10) * 100); // ~5.5 seconds
      
    } catch (err) {
      setError('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <NewsletterContainer className={className}>
      <Title as="h4">{title}</Title>
      <Description>{description}</Description>
      
      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <Input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null);
            }}
            placeholder="Your email address"
            disabled={isSubmitting || isSuccess}
            isInvalid={!!error}
          />
          {error && (
            <Text color="error.500" variant="caption" mt={2}>
              {error}
            </Text>
          )}
        </InputContainer>
        
        <ButtonContainer>
          <Button
            type="submit"
            variant="accent"
            isLoading={isSubmitting}
            isDisabled={isSuccess}
            isFullWidth
          >
            Subscribe
          </Button>
        </ButtonContainer>
      </Form>
      
      <SuccessMessage $visible={isSuccess}>
        <Text 
          color="success.500" 
          variant="caption"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <span style={{ marginRight: `${getFibonacciByIndex(3)}px`, color: 'currentColor' }}>
            <CheckIcon />
          </span>
          Thank you for subscribing!
        </Text>
      </SuccessMessage>
    </NewsletterContainer>
  );
};

export default FooterNewsletter; 







