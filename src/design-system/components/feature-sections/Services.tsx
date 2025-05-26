/**
 * Services Component
 * 
 * A feature section for displaying services in a grid layout using Fibonacci-based spacing
 * and sacred geometry proportions. The component supports various display options and
 * integrates botanical elements for visual harmony.
 */

import * as React from 'react';
import styled from 'styled-components';
import { DefaultTheme } from 'styled-components';
import { getFibonacciByIndex } from '../../../constants/sacred-geometry';
import { PHI, PHI_INVERSE, FIBONACCI } from '../../../constants/sacred-geometry';
import { Box } from '../layout/Box';
import { Grid } from '../layout/Grid';
import { Heading } from '../typography/Heading';
import { Text } from '../typography/Text';
import { Button } from '../button/Button';
import { Section, SectionTitle } from '../layout/Section';
import Card from '../data-display/Card';
import { BotanicalElement } from '../botanical';
import { BotanicalPosition } from '../botanical/botanicalUtils';
import { FadeIn, ScaleFade } from '../animation';
import { ServicesProps, ServiceItem, FeatureCTA } from '../../types/feature-sections.types';
import { BotanicalDecoration, BotanicalElementType } from '../../types/botanical.types';

// Reexport the types for external use
export type { ServicesProps, ServiceItem } from '../../types/feature-sections.types';

const ServicesSection = styled(Section)<{ $backgroundColor?: string }>`
  position: relative;
  background: ${props => props.$backgroundColor || 'transparent'};
  padding: ${getFibonacciByIndex(8)}px 0;
  overflow: hidden;
`;

const ServiceGrid = styled(Grid)<{ $columns: number }>`
  /* 
   * Using Fibonacci-based spacing between grid items
   * and ensuring the grid follows sacred geometry proportions
   */
  gap: ${getFibonacciByIndex(6)}px;
  margin-top: ${getFibonacciByIndex(7)}px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}px) {
    gap: ${getFibonacciByIndex(5)}px;
  }
`;

const ServiceCard = styled(Card)<{ $accentColor?: string }>`
  height: 100%;
  transition: transform 0.3s cubic-bezier(${PHI_INVERSE}, 0, ${PHI_INVERSE}, 1);
  border-top: ${props => props.$accentColor ? `3px solid ${props.$accentColor}` : 'none'};
  
  /* Card dimensions follow golden ratio */
  padding: ${getFibonacciByIndex(6)}px;
  
  &:hover {
    transform: translateY(-${getFibonacciByIndex(3)}px);
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${getFibonacciByIndex(5)}px;
  
  /* Icon container uses golden ratio dimensions */
  width: ${getFibonacciByIndex(7)}px;
  height: ${getFibonacciByIndex(7)}px;
`;

const ServiceTitle = styled(Heading)`
  margin-bottom: ${getFibonacciByIndex(4)}px;
  
  /* Apply sacred geometry to line height */
  line-height: ${PHI};
`;

const ServiceDescription = styled(Text)`
  /* Apply golden ratio to opacity for visual harmony */
  opacity: ${PHI_INVERSE + 0.2};
  margin-bottom: ${getFibonacciByIndex(5)}px;
`;

const CTAContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${getFibonacciByIndex(7)}px;
`;

/**
 * Services component for displaying service offerings in various layouts,
 * following sacred geometry principles for spacing and proportions.
 */
const Services: React.FC<ServicesProps> = ({
  title,
  subtitle,
  services,
  displayStyle = 'grid',
  columns = 3,
  backgroundColor,
  animated = true,
  botanical,
  cta,
  className,
  style,
}) => {
  // Calculate optimal grid columns using Fibonacci sequence
  const getGridColumns = (): number => {
    // Default to specified columns
    if (columns) return columns;
    
    // If not specified, calculate based on number of services
    if (services.length <= 2) return services.length;
    if (services.length <= 4) return 2;
    return 3; // Default to 3 columns for larger sets
  };
  
  // Function to render a service item
  const renderServiceItem = (service: ServiceItem, index: number) => {
    const content = (
      <ServiceCard $accentColor={service.accentColor}>
        {service.icon && (
          <IconContainer>
            {service.icon}
          </IconContainer>
        )}
        
        <ServiceTitle variant="h4">{service.title}</ServiceTitle>
        <ServiceDescription variant="body1">{service.description}</ServiceDescription>
        
        {service.content}
        
        {service.url && (
          <Box mt={getFibonacciByIndex(4)}>
            <Button 
              variant="ghost" 
              href={service.url}
              rightIcon={
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 3L14 8L8 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 8H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
            >
              Learn more
            </Button>
          </Box>
        )}
        
        {service.botanicalAccent && service.botanicalAccent !== 'none' && (
          <Box position="absolute" bottom={getFibonacciByIndex(3)} right={getFibonacciByIndex(3)} opacity={0.1}>
            <BotanicalElement 
              variant={service.botanicalAccent} 
              size="sm" 
            />
          </Box>
        )}
      </ServiceCard>
    );
    
    // Wrap with animation if enabled
    if (animated) {
      return (
        <ScaleFade key={service.id} delay={0.1 * index}>
          {content}
        </ScaleFade>
      );
    }
    
    return <div key={service.id}>{content}</div>;
  };
  
  // Render services in a grid layout
  const renderGrid = () => {
    return (
      <ServiceGrid $columns={getGridColumns()}>
        {services.map((service, index) => renderServiceItem(service, index))}
      </ServiceGrid>
    );
  };
  
  // Render services in a featured layout
  const renderFeatured = () => {
    // Use window.matchMedia to apply responsive behavior
    const isMobile = window.innerWidth <= 768;
    
    return (
      <Box display="flex" flexDirection="column" gap={getFibonacciByIndex(7)}>
        {services.map((service, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <Box 
              key={service.id}
              display="flex" 
              flexDirection={isMobile ? "column" : isEven ? "row" : "row-reverse"}
              gap={getFibonacciByIndex(6)}
            >
              <Box flex={PHI_INVERSE}>
                {renderServiceItem(service, index)}
              </Box>
              <Box flex={1 - PHI_INVERSE} display="flex" alignItems="center" justifyContent="center">
                {service.icon && <div style={{ width: '100%', height: '100%', maxHeight: '300px' }}>{service.icon}</div>}
              </Box>
            </Box>
          );
        })}
      </Box>
    );
  };
  
  // Render services in an alternating layout
  const renderAlternating = () => {
    return (
      <Box display="flex" flexDirection="column" gap={getFibonacciByIndex(7)}>
        {services.map((service, index) => (
          <Box 
            key={service.id}
            borderLeft={service.accentColor ? `3px solid ${service.accentColor}` : undefined}
            pl={service.accentColor ? getFibonacciByIndex(5) : 0}
            py={getFibonacciByIndex(4)}
          >
            {renderServiceItem(service, index)}
          </Box>
        ))}
      </Box>
    );
  };
  
  // Render services based on display style
  const renderServices = () => {
    switch (displayStyle) {
      case 'featured':
        return renderFeatured();
      case 'alternating':
        return renderAlternating();
      case 'grid':
      default:
        return renderGrid();
    }
  };
  
  return (
    <ServicesSection
      $backgroundColor={backgroundColor}
      className={className}
      style={style}
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
      
      <SectionTitle title={title} subtitle={subtitle} align="center" />
      
      {renderServices()}
      
      {cta && (
        <CTAContainer>
          <Button variant={cta.variant || 'primary'} href={cta.url}>
            {cta.label}
          </Button>
        </CTAContainer>
      )}
    </ServicesSection>
  );
};

export default Services; 







