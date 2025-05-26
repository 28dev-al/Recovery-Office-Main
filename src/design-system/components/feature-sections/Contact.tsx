/**
 * Contact Component
 * 
 * A feature section for displaying a contact form and information, following sacred
 * geometry principles for layout and spacing. Includes support for various configurations
 * and botanical accents for visual harmony.
 */

import * as React from 'react';
import styled from 'styled-components';
import { DefaultTheme } from 'styled-components';

import { PHI, PHI_INVERSE, getFibonacciByIndex } from '../../../constants/sacred-geometry';
import { Box } from '../layout/Box';
import { Section, SectionTitle } from '../layout/Section';
import { Input } from '../form/Input';
import { TextArea } from '../form/TextArea';
import { Button } from '../button/Button';
import { Text } from '../typography/Text';
import { BotanicalElement } from '../botanical';
import { BotanicalPosition } from '../botanical/botanicalUtils';
import { FadeIn, SlideIn } from '../animation';
import { ContactProps, ContactOption, ContactFormField } from '../../types/feature-sections.types';
import { BotanicalDecoration } from '../../types/botanical.types';

// Reexport the types for external use
export type { ContactProps, ContactOption, ContactFormField } from '../../types/feature-sections.types';

// Section container with background styling
const ContactSection = styled(Section)<{ $backgroundColor?: string }>`
  position: relative;
  background: ${props => props.$backgroundColor || 'transparent'};
  padding: ${getFibonacciByIndex(8)}px 0;
  overflow: hidden;
`;

// Container for form and contact information in split layout
const SplitContainer = styled.div`
  display: grid;
  grid-template-columns: ${PHI_INVERSE * 100}% ${(1 - PHI_INVERSE) * 100}%;
  gap: ${getFibonacciByIndex(6)}px;
  margin-top: ${getFibonacciByIndex(7)}px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}px) {
    grid-template-columns: 1fr;
  }
`;

// Container for stacked layout
const StackedContainer = styled.div`
  margin-top: ${getFibonacciByIndex(7)}px;
  
  & > * + * {
    margin-top: ${getFibonacciByIndex(6)}px;
  }
`;

// Form container
const FormContainer = styled.div`
  padding: ${getFibonacciByIndex(6)}px;
  background-color: rgba(255, 255, 255, 0.03);
  border-radius: ${getFibonacciByIndex(4)}px;
  box-shadow: 0 ${getFibonacciByIndex(2)}px ${getFibonacciByIndex(5)}px rgba(0, 0, 0, 0.05);
`;

// Contact information container
const ContactInfoContainer = styled.div`
  padding: ${getFibonacciByIndex(5)}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

// Form styling
const Form = styled.form`
  display: flex;
  flex-direction: column;
  
  & > * + * {
    margin-top: ${getFibonacciByIndex(5)}px;
  }
`;

// Field container with proper spacing
const FieldContainer = styled.div`
  margin-bottom: ${getFibonacciByIndex(5)}px;
`;

// Field label with sacred typography
const FieldLabel = styled.label`
  display: block;
  margin-bottom: ${getFibonacciByIndex(3)}px;
  font-weight: 500;
`;

// Field help text
const FieldHelpText = styled(Text)`
  margin-top: ${getFibonacciByIndex(2)}px;
  opacity: ${PHI_INVERSE};
  font-size: 0.8rem;
`;

// Contact option item
const ContactOptionItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${getFibonacciByIndex(5)}px;
`;

// Contact option icon container
const ContactOptionIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${getFibonacciByIndex(6)}px;
  height: ${getFibonacciByIndex(6)}px;
  margin-right: ${getFibonacciByIndex(4)}px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.05);
  color: ${props => props.theme.colors.primary[500] ?? 1};
`;

// Contact option content
const ContactOptionContent = styled.div`
  display: flex;
  flex-direction: column;
`;

// Contact option label
const ContactOptionLabel = styled(Text)`
  font-weight: 500;
  margin-bottom: ${getFibonacciByIndex(2)}px;
`;

// Contact option value
const ContactOptionValue = styled(Text)`
  opacity: ${PHI_INVERSE + 0.2};
`;

// Submit button container
const SubmitContainer = styled.div`
  margin-top: ${getFibonacciByIndex(5)}px;
  text-align: right;
`;

/**
 * Contact component for displaying a contact form and information,
 * following sacred geometry principles for spacing and proportions.
 */
const Contact: React.FC<ContactProps> = ({
  title,
  subtitle,
  formFields = [],
  contactOptions = [],
  layout = 'split',
  formAction = '#',
  submitText = 'Send Message',
  backgroundColor,
  animated = true,
  botanical,
  className,
  onSubmit,
  minHeight,
  textAlign,
  ...boxProps
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (onSubmit) {
      onSubmit(event);
    }
  };
  
  const renderField = (field: ContactFormField) => {
    return (
      <FieldContainer key={field.name}>
        <FieldLabel htmlFor={field.name}>{field.label}</FieldLabel>
        
        {field.type === 'textarea' ? (
          <TextArea
            id={field.name}
            name={field.name}
            placeholder={field.placeholder}
            required={field.required}
          />
        ) : (
          <Input
            id={field.name}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            required={field.required}
          />
        )}
        
        {field.helpText && <FieldHelpText>{field.helpText}</FieldHelpText>}
      </FieldContainer>
    );
  };
  
  const renderContactInfo = () => {
    if (contactOptions.length === 0) return null;
    
    return (
      <ContactInfoContainer>
        {contactOptions.map((option, index) => (
          <ContactOptionItem key={index}>
            <ContactOptionIcon>
              {option.icon}
            </ContactOptionIcon>
            
            <ContactOptionContent>
              <ContactOptionLabel>{option.label}</ContactOptionLabel>
              {option.url ? (
                <ContactOptionValue as="a" href={option.url}>
                  {option.value}
                </ContactOptionValue>
              ) : (
                <ContactOptionValue>{option.value}</ContactOptionValue>
              )}
            </ContactOptionContent>
          </ContactOptionItem>
        ))}
      </ContactInfoContainer>
    );
  };
  
  const renderForm = () => {
    return (
      <FormContainer>
        <Form action={formAction} method="post" onSubmit={handleSubmit}>
          {formFields.map(renderField)}
          
          <SubmitContainer>
            <Button type="submit" variant="primary">
              {submitText}
            </Button>
          </SubmitContainer>
        </Form>
      </FormContainer>
    );
  };
  
  const renderContent = () => {
    if (layout === 'split') {
      return (
        <SplitContainer>
          {animated ? (
            <FadeIn>
              {renderForm()}
            </FadeIn>
          ) : (
            renderForm()
          )}
          
          {animated ? (
            <SlideIn direction="right">
              {renderContactInfo()}
            </SlideIn>
          ) : (
            renderContactInfo()
          )}
        </SplitContainer>
      );
    }
    
    return (
      <StackedContainer>
        {animated ? (
          <FadeIn>
            {renderForm()}
          </FadeIn>
        ) : (
          renderForm()
        )}
        
        {animated ? (
          <FadeIn delay={0.3}>
            {renderContactInfo()}
          </FadeIn>
        ) : (
          renderContactInfo()
        )}
      </StackedContainer>
    );
  };
  
  // Convert textAlign to allowed values
  const sectionTextAlign = textAlign === 'justify' ? 'left' : textAlign;

  return (
    <Section 
      backgroundColor={backgroundColor}
      className={className}
      minHeight={typeof minHeight === 'number' ? minHeight : undefined}
      textAlign={sectionTextAlign as 'left' | 'center' | 'right' | undefined}
      {...boxProps}
    >
      {botanical && typeof botanical !== 'boolean' && (
        <BotanicalElement
          variant={botanical.type}
          size={botanical.size || 'lg'}
          opacity={botanical.opacity || 0.1}
        />
      )}
      
      {botanical && typeof botanical === 'boolean' && (
        <BotanicalElement
          variant="oliveBranch"
          size="lg"
          opacity={0.1}
        />
      )}
      
      <SectionTitle
        title={title}
        subtitle={subtitle}
        align="center"
      />
      
      {renderContent()}
    </Section>
  );
};

export default Contact; 








