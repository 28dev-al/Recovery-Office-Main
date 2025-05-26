import * as React from 'react';
import { SEO } from '../../components/common';
import { Box, Container } from '../../design-system/components/layout';
import { Section } from '../../design-system/components/layout/Section';
import { Text, Heading } from '../../design-system/components/typography';
import { Button } from '../../design-system/components/button';

import { ServicesHero } from './sections/ServicesHero';
import ServicesOverview, { Service } from './sections/ServicesOverview';
import ServicesProcess from './sections/ServicesProcess';
import ServicesDetails from './sections/ServicesDetails';
import ServicesRegulatorySection from './sections/RegulatorySection';

import { PHI } from '../../constants/sacred-geometry';

// Service data - mapped to be compatible with the Service interface
const services: Service[] = [
  {
    id: 'recovery-consultation',
    title: 'Recovery Consultation',
    description: 'Personalized assessment and recovery planning',
    longDescription: `Our Recovery Consultation service provides a comprehensive assessment of your financial situation and recovery goals. Our experienced consultants use industry best practices to create a strategic approach to your asset recovery journey. During this initial consultation, we will explore your financial history, current challenges, and objectives to develop a personalized recovery plan that aligns with your specific circumstances.`,
    icon: 'chart',
    path: '/services/recovery-consultation',
    benefits: [
      'Comprehensive financial assessment',
      'Personalized recovery plan development',
      'Integration of regulatory compliance principles',
      'Expert guidance from specialized consultants',
      'Strategic approach addressing all recovery options'
    ],
    duration: '60-90 minutes',
    pricing: {
      initial: 150,
      followUp: 90
    },
    accentColor: '#4a6eb3'
  },
  {
    id: 'investment-fraud',
    title: 'Investment Fraud Recovery',
    description: 'Specialized services for victims of investment fraud',
    longDescription: `Our Investment Fraud Recovery service offers expert assistance for victims of investment scams, Ponzi schemes, and securities fraud. Our specialists have extensive experience working with regulatory bodies and legal systems to maximize your chances of recovering lost assets. We provide a comprehensive approach that includes documentation analysis, regulatory reporting, and strategic planning to help you navigate the complex recovery process.`,
    icon: 'heart',
    path: '/services/investment-fraud',
    benefits: [
      'Specialized fraud investigation',
      'Regulatory compliance expertise',
      'Strategic recovery planning',
      'Assistance with documentation and evidence',
      'Coordination with relevant authorities',
      'Maximized recovery potential'
    ],
    duration: '50-60 minutes',
    pricing: {
      initial: 120,
      followUp: 100
    },
    accentColor: '#62a388'
  },
  {
    id: 'crypto-recovery',
    title: 'Cryptocurrency Recovery',
    description: 'Expert services for recovering lost or stolen crypto assets',
    longDescription: `Our Cryptocurrency Recovery service provides specialized assistance for individuals who have lost access to digital assets or been victims of cryptocurrency fraud. Our team combines technical blockchain expertise with financial recovery strategies to trace and potentially recover your assets. We work with relevant authorities, exchanges, and forensic analysts to maximize your recovery chances while maintaining strict confidentiality.`,
    icon: 'leaf',
    path: '/services/crypto-recovery',
    benefits: [
      'Blockchain transaction analysis',
      'Cryptocurrency fraud investigation',
      'Exchange and wallet recovery assistance',
      'Strategic recovery planning',
      'Technical and regulatory expertise',
      'Confidential and secure process'
    ],
    duration: '60-75 minutes',
    pricing: {
      initial: 130,
      followUp: 110
    },
    accentColor: '#b47e4a'
  },
  {
    id: 'regulatory-assistance',
    title: 'Regulatory Complaint Assistance',
    description: 'Expert help navigating regulatory processes for recovery',
    longDescription: `Our Regulatory Complaint Assistance service helps you navigate the complex landscape of financial regulations and reporting requirements. We provide expert guidance on filing complaints with relevant authorities such as the FCA, BaFin, SEC, and other regulatory bodies. Our specialists help you prepare proper documentation, understand procedural requirements, and maximize the effectiveness of your regulatory complaints.`,
    icon: 'geometry',
    path: '/services/regulatory-assistance',
    benefits: [
      'Expert regulatory knowledge',
      'Complaint preparation assistance',
      'Documentation review and improvement',
      'Strategic approach to regulatory filing',
      'Ongoing support throughout the process',
      'Maximized regulatory effectiveness'
    ],
    duration: 'Varies (initial review: 2-4 hours, follow-up: 60 minutes)',
    pricing: {
      initialReview: 75,
      followUp: 135
    },
    accentColor: '#8e67b0'
  }
];

/**
 * Services Page Component
 * 
 * This component represents the services page of the Recovery Office website.
 * It displays the various services offered by Recovery Office, including
 * descriptions, benefits, and pricing information.
 */
const ServicesPage: React.FC = () => {
  return (
    <Box as={'main'}>
      {/* Hero Section */}
      <ServicesHero />
      
      {/* Services Overview */}
      <ServicesOverview services={services} />
      
      {/* Services Process */}
      <ServicesProcess />
      
      {/* Services Details */}
      <ServicesDetails services={services} />
      
      {/* Regulatory Section */}
      <ServicesRegulatorySection />
      
      {/* CTA Section */}
      <Section 
        backgroundColor="#4a6eb3"
        style={{
          paddingTop: `${PHI * 48}px`,
          paddingBottom: `${PHI * 48}px`
        }}
      >
        <Container>
          <Heading as="h2" mb={`${PHI * 16}px`} color="white" textAlign="center">
            Ready to Begin Your Financial Recovery?
          </Heading>
          <Text
            size="base"
            maxWidth={`${PHI * 500}px`}
            m="0 auto"
            mb={`${PHI * 32}px`}
            color="white"
            textAlign="center"
          >
            Our team of experienced specialists is ready to guide you through the financial recovery process.
            Schedule your consultation today and take the first step toward recovering your assets.
          </Text>
          <Box display="flex" justifyContent="center">
            <Button 
              variant="accent" 
              size="lg"
              href="/booking"
            >
              Book Your Consultation
            </Button>
          </Box>
        </Container>
      </Section>
    </Box>
  );
};

export default ServicesPage; 







