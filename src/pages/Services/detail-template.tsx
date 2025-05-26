import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import BotanicalDecorator from '../../design-system/botanical/BotanicalDecorator';
import SectionTitle from '../../design-system/components/layout/Section/SectionTitle';
import { Paragraph } from '../../design-system/components/typography/Paragraph';
import { Box } from '../../design-system/components/layout/Box';
import { Container } from '../../design-system/components/layout/Container';
import { Grid, GridItem } from '../../design-system/components/layout/Grid';
import { Button } from '../../design-system/components/button/Button';
import Card from '../../design-system/components/data-display/Card';

// Define accordion types
interface AccordionProps {
  children: React.ReactNode;
  allowMultiple?: boolean;
}

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  toggleItem?: () => void;
  itemIndex?: number;
}

// Simple Accordion components for our service pages
const Accordion: React.FC<AccordionProps> = ({ children, allowMultiple = false }) => {
  const [openItems, setOpenItems] = React.useState<number[]>([]);
  
  const toggleItem = (index: number) => {
    if (allowMultiple) {
      setOpenItems(prev => 
        prev.includes(index) 
          ? prev.filter(i => i !== index) 
          : [...prev, index]
      );
    } else {
      setOpenItems(prev => 
        prev.includes(index) ? [] : [index]
      );
    }
  };
  
  return (
    <div className="premium-accordion">
      {React.Children.map(children, (child, index) => 
        React.isValidElement(child) 
          ? React.cloneElement(child as React.ReactElement<AccordionItemProps>, { 
              isOpen: openItems.includes(index),
              toggleItem: () => toggleItem(index),
              itemIndex: index
            })
          : child
      )}
    </div>
  );
};

const AccordionItem: React.FC<AccordionItemProps> = ({ 
  title, 
  children, 
  isOpen = false, 
  toggleItem = () => {} 
}) => {
  return (
    <div 
      style={{ 
        marginBottom: '1rem', 
        overflow: 'hidden',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
        borderLeft: isOpen ? '4px solid #4a6eb3' : '1px solid #e0e0e0',
        background: 'white',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}
    >
      <div 
        style={{ 
          padding: '1rem', 
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
        onClick={toggleItem}
      >
        {title}
        <span style={{ transition: 'transform 0.3s ease' }}>
          {isOpen ? '−' : '+'}
        </span>
      </div>
      <div 
        style={{ 
          padding: isOpen ? '0 1rem 1rem' : '0 1rem', 
          maxHeight: isOpen ? '1000px' : '0',
          opacity: isOpen ? 1 : 0,
          overflow: 'hidden',
          transition: 'all 0.3s ease'
        }}
      >
        {children}
      </div>
    </div>
  );
};

// Service detail page header
const ServiceHeader = styled.div`
  background-color: ${props => props.theme.colors.primary[900]};
  color: white;
  padding: 6rem 0 4rem;
  position: relative;
  overflow: hidden;
`;

const HeaderContent = styled.div`
  position: relative;
  z-index: 2;
`;

const ServiceTitle = styled.h1`
  font-size: 3rem;
  margin: 0 0 1.5rem;
  color: white;
`;

const ServiceTagline = styled.h2`
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0 0 2rem;
  opacity: 0.9;
`;

const ServiceHeaderImage = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 40%;
  z-index: 1;
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to right, ${props => props.theme.colors.primary[900]}, transparent);
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// Process section
const ProcessSection = styled.section`
  padding: 5rem 0;
  background-color: ${props => props.theme.colors.background.light};
`;

const ProcessStep = styled.div`
  display: flex;
  margin-bottom: 3rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const StepNumber = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.primary[700]};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.25rem;
  flex-shrink: 0;
  margin-right: 1.5rem;
`;

const StepContent = styled.div`
  flex-grow: 1;
`;

const StepTitle = styled.h3`
  font-size: 1.25rem;
  margin: 0 0 0.75rem;
  color: ${props => props.theme.colors.text.primary};
`;

// Benefits section
const BenefitsSection = styled.section`
  padding: 5rem 0;
  background-color: #f9fafb;
`;

const BenefitCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  height: 100%;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const BenefitIcon = styled.div`
  width: 60px;
  height: 60px;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.primary[600]};
`;

const BenefitTitle = styled.h3`
  font-size: 1.25rem;
  margin: 0 0 1rem;
  color: ${props => props.theme.colors.text.primary};
`;

// Pricing section
const PricingSection = styled.section`
  padding: 5rem 0;
  background-color: ${props => props.theme.colors.background.light};
`;

const PricingCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid ${props => props.theme.colors.border.light};
  text-align: center;
`;

const PricingTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0 0 0.5rem;
`;

const PricingRate = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary[700]};
  margin: 1.5rem 0;
`;

const PricingFeature = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  
  svg {
    margin-right: 0.75rem;
    color: ${props => props.theme.colors.primary[500]};
  }
`;

// FAQ section
const FAQSection = styled.section`
  padding: 5rem 0;
  background-color: #f9fafb;
`;

// Related services section
const RelatedSection = styled.section`
  padding: 5rem 0;
  background-color: white;
`;

const ServiceCard = styled(Link)`
  display: block;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const CardImage = styled.div`
  height: 180px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  ${ServiceCard}:hover & img {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  margin: 0 0 0.75rem;
  color: ${props => props.theme.colors.text.primary};
`;

interface ServiceDetailProps {
  title: string;
  tagline: string;
  headerImage: string;
  description: string;
  process: Array<{
    step: number;
    title: string;
    description: string;
  }>;
  benefits: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
  }>;
  pricing: {
    title: string;
    rate: string;
    description: string;
    features: Array<string>;
  };
  faq: Array<{
    question: string;
    answer: string;
  }>;
  relatedServices: Array<{
    id: string;
    title: string;
    description: string;
    image: string;
  }>;
}

const ServiceDetailTemplate: React.FC<ServiceDetailProps> = ({
  title,
  tagline,
  headerImage,
  description,
  process,
  benefits,
  pricing,
  faq,
  relatedServices
}) => {
  return (
    <div>
      <ServiceHeader>
        <Container>
          <HeaderContent>
            <ServiceTitle>{title}</ServiceTitle>
            <ServiceTagline>{tagline}</ServiceTagline>
            <Button variant="primary" size="lg">Book a Consultation</Button>
          </HeaderContent>
        </Container>
        <ServiceHeaderImage>
          <img src={headerImage} alt={title} />
        </ServiceHeaderImage>
        <BotanicalDecorator position="bottomLeft" botanicalType="oliveLeaf" opacity={0.1}>
          <div></div>
        </BotanicalDecorator>
      </ServiceHeader>
      
      <Container>
        <Box padding="5rem 0">
          <Grid templateColumns={{ base: '1fr', md: '2fr 1fr' }} gap="3rem">
            <GridItem>
              <Paragraph size="lg">{description}</Paragraph>
            </GridItem>
            <GridItem>
              <Box padding="2rem" backgroundColor="primary.50" borderRadius="8px">
                <SectionTitle title="Ready to Recover Your Losses?" size="medium" />
                <Paragraph>Our experts are standing by to assist with your case. Book a free initial consultation today.</Paragraph>
                <Button variant="primary" width="100%" marginTop="1rem">Book a Consultation</Button>
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </Container>
      
      <ProcessSection>
        <Container>
          <SectionTitle title="Our Recovery Process" align="center" marginBottom="3rem" />
          
          {process.map((step) => (
            <ProcessStep key={step.step}>
              <StepNumber>{step.step}</StepNumber>
              <StepContent>
                <StepTitle>{step.title}</StepTitle>
                <Paragraph>{step.description}</Paragraph>
              </StepContent>
            </ProcessStep>
          ))}
        </Container>
      </ProcessSection>
      
      <BenefitsSection>
        <Container>
          <SectionTitle title="Benefits & Features" align="center" marginBottom="3rem" />
          
          <Grid templateColumns={{ base: '1fr', sm: '1fr 1fr', lg: 'repeat(3, 1fr)' }} gap="2rem">
            {benefits.map((benefit, index) => (
              <GridItem key={index}>
                <BenefitCard>
                  <BenefitIcon>{benefit.icon}</BenefitIcon>
                  <BenefitTitle>{benefit.title}</BenefitTitle>
                  <Paragraph>{benefit.description}</Paragraph>
                </BenefitCard>
              </GridItem>
            ))}
          </Grid>
        </Container>
      </BenefitsSection>
      
      <PricingSection>
        <Container>
          <SectionTitle title="Fee Structure" align="center" marginBottom="3rem" />
          
          <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap="2rem" maxWidth="800px" margin="0 auto">
            <GridItem>
              <PricingCard>
                <PricingTitle>{pricing.title}</PricingTitle>
                <Paragraph>{pricing.description}</Paragraph>
                <PricingRate>{pricing.rate}</PricingRate>
                
                {pricing.features.map((feature, index) => (
                  <PricingFeature key={index}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12L10 17L19 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {feature}
                  </PricingFeature>
                ))}
                
                <Button variant="primary" marginTop="2rem" width="100%">Book a Consultation</Button>
              </PricingCard>
            </GridItem>
            <GridItem>
              <Box padding="2.5rem" backgroundColor="primary.50" borderRadius="8px" height="100%" display="flex" flexDirection="column" justifyContent="center">
                <SectionTitle title="No Recovery, No Fee" size="medium" />
                <Paragraph>For many cases, we work on a contingency basis - meaning you only pay if we successfully recover your losses.</Paragraph>
                <Paragraph marginTop="1rem">Contact us to discuss the specifics of your case and the most appropriate fee structure.</Paragraph>
              </Box>
            </GridItem>
          </Grid>
        </Container>
      </PricingSection>
      
      <FAQSection>
        <Container>
          <SectionTitle title="Frequently Asked Questions" align="center" marginBottom="3rem" />
          
          <Box maxWidth="800px" margin="0 auto">
            <Accordion allowMultiple>
              {faq.map((item, index) => (
                <AccordionItem key={index} title={item.question}>
                  <Paragraph>{item.answer}</Paragraph>
                </AccordionItem>
              ))}
            </Accordion>
          </Box>
        </Container>
      </FAQSection>
      
      <RelatedSection>
        <Container>
          <SectionTitle title="Related Services" align="center" marginBottom="3rem" />
          
          <Grid templateColumns={{ base: '1fr', sm: '1fr 1fr', lg: 'repeat(3, 1fr)' }} gap="2rem">
            {relatedServices.map((service) => (
              <GridItem key={service.id}>
                <ServiceCard to={`/services/${service.id}`}>
                  <CardImage>
                    <img src={service.image} alt={service.title} />
                  </CardImage>
                  <CardContent>
                    <CardTitle>{service.title}</CardTitle>
                    <Paragraph>{service.description}</Paragraph>
                  </CardContent>
                </ServiceCard>
              </GridItem>
            ))}
          </Grid>
          
          <Box textAlign="center" marginTop="3rem">
            <Button variant="outline" as={Link} to="/services">View All Services</Button>
          </Box>
        </Container>
      </RelatedSection>
    </div>
  );
};

export default ServiceDetailTemplate; 