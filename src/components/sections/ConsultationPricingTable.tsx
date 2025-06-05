import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface ConsultationService {
  nameKey: string;
  name: string;
  descriptionKey: string;
  description: string;
  duration: string;
  initialPrice: string;
  followUpPrice: string;
  serviceId: string;
}

const ConsultationPricingTable: React.FC = () => {
  const { t, i18n } = useTranslation();
  
  const consultationServices: ConsultationService[] = [
    {
      nameKey: 'services.recoveryConsultation.title',
      name: 'Recovery Consultation',
      descriptionKey: 'services.recoveryConsultation.description',
      description: 'Personalized assessment and recovery planning',
      duration: '60-90',
      initialPrice: i18n.language === 'de' ? '€400' : '£350',
      followUpPrice: i18n.language === 'de' ? '€250' : '£220',
      serviceId: 'recovery-consultation'
    },
    {
      nameKey: 'services.investmentFraud.title',
      name: 'Investment Fraud Recovery',
      descriptionKey: 'services.investmentFraud.description',
      description: 'Specialized services for victims of investment fraud',
      duration: '75-90', 
      initialPrice: i18n.language === 'de' ? '€650' : '£550',
      followUpPrice: i18n.language === 'de' ? '€400' : '£350',
      serviceId: 'investment-fraud'
    },
    {
      nameKey: 'services.cryptocurrency.title',
      name: 'Cryptocurrency Recovery',
      descriptionKey: 'services.cryptocurrency.description',
      description: 'Expert services for recovering lost or stolen crypto assets',
      duration: '60-75',
      initialPrice: i18n.language === 'de' ? '€750' : '£650', 
      followUpPrice: i18n.language === 'de' ? '€450' : '£400',
      serviceId: 'cryptocurrency-recovery'
    },
    {
      nameKey: 'services.regulatoryComplaint.title',
      name: 'Regulatory Complaint Assistance',
      descriptionKey: 'services.regulatoryComplaint.description',
      description: 'Expert help navigating regulatory processes for recovery',
      duration: '45-60',
      initialPrice: i18n.language === 'de' ? '€350' : '£300',
      followUpPrice: i18n.language === 'de' ? '€200' : '£180',
      serviceId: 'regulatory-complaint'
    }
  ];
  
  return (
    <ConsultationTableContainer id="consultation-pricing-table">
      <TableHeader>
        <HeaderContent>
          <h2>{t('services.consultationPricing.title', 'Consultation Pricing')}</h2>
          <p>{t('services.consultationPricing.subtitle', 'Transparent pricing for all our financial recovery services')}</p>
        </HeaderContent>
      </TableHeader>
      
      <PricingTableWrapper>
        <PricingTable>
          <TableHeaderRow>
            <HeaderCell className="service-header">
              {t('services.consultationPricing.service', 'Service')}
            </HeaderCell>
            <HeaderCell className="duration-header">
              {t('services.consultationPricing.duration', 'Duration')}
            </HeaderCell>
            <HeaderCell className="price-header">
              {t('services.consultationPricing.initialSession', 'Initial Session')}
            </HeaderCell>
            <HeaderCell className="price-header">
              {t('services.consultationPricing.followUpSessions', 'Follow-Up Sessions')}
            </HeaderCell>
            <HeaderCell className="action-header">
              {t('services.consultationPricing.action', 'Action')}
            </HeaderCell>
          </TableHeaderRow>
          
          {consultationServices.map((service, index) => (
            <TableRow key={index}>
              <ServiceCell>
                <ServiceName>
                  {t(service.nameKey, service.name)}
                </ServiceName>
                <ServiceDescription>
                  {t(service.descriptionKey, service.description)}
                </ServiceDescription>
              </ServiceCell>
              <DurationCell>
                <DurationValue>
                  {service.duration} {t('services.serviceDetails.minutes', 'minutes')}
                </DurationValue>
              </DurationCell>
              <PriceCell>
                <PrimaryPrice>{service.initialPrice}</PrimaryPrice>
                <PriceLabel>{t('services.serviceDetails.consultationFee', 'Consultation Fee')}</PriceLabel>
              </PriceCell>
              <PriceCell>
                <SecondaryPrice>{service.followUpPrice}</SecondaryPrice>
                <PriceLabel>Per Session</PriceLabel>
              </PriceCell>
              <ActionCell>
                <BookButton as={Link} to="/booking">
                  {t('services.consultationPricing.bookConsultation', 'Book Consultation')}
                </BookButton>
              </ActionCell>
            </TableRow>
          ))}
        </PricingTable>
      </PricingTableWrapper>
      
      <TableFooter>
        <FooterContent>
          <FooterNote>
            {t('services.consultationPricing.note', 'All prices include VAT. Success-based fees available for qualifying cases.')}
          </FooterNote>
          <CredentialsNote>
            <strong>FCA Regulated</strong> - Firm Reference: <strong>836358</strong> | 
            <strong> £500M+ Recovered</strong> | 
            <strong> 98% Client Satisfaction</strong>
          </CredentialsNote>
        </FooterContent>
      </TableFooter>
    </ConsultationTableContainer>
  );
};

// Professional styled components with enhanced background stability
const ConsultationTableContainer = styled.div`
  max-width: 1200px;
  margin: 80px auto;
  padding: 0 20px;
  background: white;
  background-color: white !important;
  background-attachment: scroll;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  border: 1px solid #e2e8f0;
  position: relative;
  z-index: 10;
  
  /* Prevent background disappearing on mobile */
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  will-change: transform;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  
  /* Force background to stick */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: white;
    z-index: -1;
    border-radius: 20px;
  }
  
  @media (max-width: 768px) {
    margin: 40px auto;
    border-radius: 16px;
    
    /* Mobile background fixes */
    background-attachment: scroll !important;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    
    &::before {
      border-radius: 16px;
    }
  }
`;

const TableHeader = styled.div`
  background: linear-gradient(135deg, #1a365d 0%, #2c5282 50%, #1a365d 100%) !important;
  background-attachment: scroll;
  color: white;
  position: relative;
  overflow: hidden;
  z-index: 2;
  
  /* Prevent gradient disappearing */
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  
  /* Ensure gradient stays visible */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #1a365d 0%, #2c5282 50%, #1a365d 100%);
    z-index: -1;
  }
  
  /* Subtle grid pattern background */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>') repeat;
    opacity: 0.05;
    z-index: 1;
  }
`;

const HeaderContent = styled.div`
  text-align: center;
  padding: 50px 30px;
  position: relative;
  z-index: 2;
  
  h2 {
    font-size: 32px;
    margin-bottom: 16px;
    font-weight: 700;
    letter-spacing: -0.02em;
    
    @media (max-width: 768px) {
      font-size: 28px;
    }
  }
  
  p {
    font-size: 18px;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
    
    @media (max-width: 768px) {
      font-size: 16px;
    }
  }
`;

const PricingTableWrapper = styled.div`
  overflow-x: auto;
  background: white;
  background-color: white !important;
  position: relative;
  z-index: 2;
  
  /* Prevent background disappearing during scroll */
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  
  @media (max-width: 768px) {
    -webkit-overflow-scrolling: touch;
    background-attachment: scroll !important;
  }
`;

const PricingTable = styled.div`
  width: 100%;
  min-width: 800px;
  background: white;
  background-color: white !important;
  
  @media (max-width: 768px) {
    min-width: 900px;
  }
`;

const TableHeaderRow = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 1fr 1.3fr 1.3fr 1.2fr;
  background: #f8fafc;
  background-color: #f8fafc !important;
  border-bottom: 3px solid #e2e8f0;
  position: relative;
  z-index: 1;
  
  /* Prevent background disappearing */
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
`;

const HeaderCell = styled.div`
  padding: 24px 20px;
  font-weight: 700;
  font-size: 14px;
  color: #374151;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-align: left;
  background: inherit;
  
  &.duration-header,
  &.price-header,
  &.action-header {
    text-align: center;
  }
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 1fr 1.3fr 1.3fr 1.2fr;
  border-bottom: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  background: white;
  background-color: white !important;
  position: relative;
  z-index: 1;
  
  /* Prevent background disappearing */
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  
  &:hover {
    background: linear-gradient(90deg, #f8fafc 0%, #f1f5f9 100%) !important;
    transform: translateX(4px) translateZ(0);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const ServiceCell = styled.div`
  padding: 32px 20px;
  background: inherit;
`;

const ServiceName = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: #1a365d;
  margin-bottom: 8px;
  line-height: 1.3;
`;

const ServiceDescription = styled.p`
  font-size: 14px;
  color: #6b7280;
  line-height: 1.5;
  margin: 0;
`;

const DurationCell = styled.div`
  padding: 32px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: inherit;
`;

const DurationValue = styled.div`
  font-weight: 600;
  color: #374151;
  font-size: 15px;
  text-align: center;
`;

const PriceCell = styled.div`
  padding: 32px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: inherit;
`;

const PrimaryPrice = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #16a34a;
  margin-bottom: 4px;
`;

const SecondaryPrice = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #059669;
  margin-bottom: 4px;
`;

const PriceLabel = styled.div`
  font-size: 12px;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const ActionCell = styled.div`
  padding: 32px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: inherit;
`;

const BookButton = styled.button`
  background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  min-width: 120px;
  position: relative;
  z-index: 1;
  
  /* Prevent button background disappearing */
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  
  &:hover {
    background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
    transform: translateY(-2px) translateZ(0);
    box-shadow: 0 8px 16px rgba(26, 54, 93, 0.3);
  }
  
  &:active {
    transform: translateY(0) translateZ(0);
  }
`;

const TableFooter = styled.div`
  background: #f8fafc;
  background-color: #f8fafc !important;
  border-top: 1px solid #e2e8f0;
  position: relative;
  z-index: 2;
  
  /* Prevent background disappearing */
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
`;

const FooterContent = styled.div`
  padding: 40px 30px;
  text-align: center;
  background: inherit;
`;

const FooterNote = styled.p`
  font-size: 16px;
  color: #6b7280;
  margin-bottom: 16px;
  line-height: 1.5;
`;

const CredentialsNote = styled.p`
  font-size: 14px;
  color: #374151;
  margin: 0;
  
  strong {
    color: #1a365d;
  }
`;

export default ConsultationPricingTable; 