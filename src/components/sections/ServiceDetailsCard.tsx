import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface ServiceDetailsProps {
  duration: string;
  initialPrice: string;
  followUpPrice: string;
  location?: string;
  benefits?: string[];
}

const ServiceDetailsCard: React.FC<ServiceDetailsProps> = ({
  duration,
  initialPrice,
  followUpPrice,
  location = 'Manchester & Virtual',
  benefits = []
}) => {
  const { t } = useTranslation();
  
  return (
    <ServiceDetailsContainer>
      <ServiceDetailsHeader>
        <HeaderIcon>📋</HeaderIcon>
        <h3>{t('services.serviceDetails.title', 'Service Details')}</h3>
      </ServiceDetailsHeader>
      
      <ServiceDetailsList>
        <ServiceDetailItem>
          <DetailIcon>⏱️</DetailIcon>
          <DetailContent>
            <DetailLabel>{t('services.serviceDetails.duration', 'Duration')}:</DetailLabel>
            <DetailValue>{duration} {t('services.serviceDetails.minutes', 'minutes')}</DetailValue>
          </DetailContent>
        </ServiceDetailItem>
        
        <ServiceDetailItem>
          <DetailIcon>💰</DetailIcon>
          <DetailContent>
            <DetailLabel>{t('services.serviceDetails.pricing', 'Pricing')}:</DetailLabel>
            <PricingDetails>
              <PriceRow>
                <PriceLabel>{t('services.serviceDetails.initialSession', 'Initial Session')}:</PriceLabel>
                <PriceValue>{initialPrice}</PriceValue>
              </PriceRow>
              <PriceRow>
                <PriceLabel>{t('services.serviceDetails.followUpSessions', 'Follow-Up Sessions')}:</PriceLabel>
                <PriceValue>{followUpPrice}</PriceValue>
              </PriceRow>
            </PricingDetails>
          </DetailContent>
        </ServiceDetailItem>
        
        <ServiceDetailItem>
          <DetailIcon>📍</DetailIcon>
          <DetailContent>
            <DetailLabel>{t('services.serviceDetails.location', 'Location')}:</DetailLabel>
            <DetailValue>
              Recovery Office - {t('services.serviceDetails.inPersonOrVirtual', 'In-person or Virtual')}
            </DetailValue>
            <LocationNote>{location}</LocationNote>
          </DetailContent>
        </ServiceDetailItem>
        
        {benefits.length > 0 && (
          <ServiceDetailItem>
            <DetailIcon>✨</DetailIcon>
            <DetailContent>
              <DetailLabel>{t('services.serviceDetails.keyBenefits', 'Key Benefits')}:</DetailLabel>
              <BenefitsList>
                {benefits.map((benefit, index) => (
                  <BenefitItem key={index}>
                    <BenefitIcon>✓</BenefitIcon>
                    <BenefitText>{benefit}</BenefitText>
                  </BenefitItem>
                ))}
              </BenefitsList>
            </DetailContent>
          </ServiceDetailItem>
        )}
      </ServiceDetailsList>
      
      <ServiceDetailsFooter>
        <ComplianceNote>
          <strong>{t('services.serviceDetails.regulatedFirm', 'FCA Regulated Firm')}</strong> - 
          {t('services.serviceDetails.professionalService', 'Professional Service Delivery')}
        </ComplianceNote>
        <BookServiceButton as={Link} to="/booking">
          {t('services.serviceDetails.bookThisService', 'Book This Service')}
        </BookServiceButton>
      </ServiceDetailsFooter>
    </ServiceDetailsContainer>
  );
};

// Styled components
const ServiceDetailsContainer = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  }
`;

const ServiceDetailsHeader = styled.div`
  background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%);
  color: white;
  padding: 24px;
  text-align: center;
  position: relative;
  
  h3 {
    margin: 8px 0 0 0;
    font-size: 20px;
    font-weight: 600;
  }
`;

const HeaderIcon = styled.div`
  font-size: 24px;
  margin-bottom: 8px;
`;

const ServiceDetailsList = styled.div`
  padding: 0;
`;

const ServiceDetailItem = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 24px;
  border-bottom: 1px solid #f1f5f9;
  
  &:last-child {
    border-bottom: none;
  }
`;

const DetailIcon = styled.div`
  font-size: 20px;
  margin-right: 16px;
  margin-top: 2px;
  flex-shrink: 0;
`;

const DetailContent = styled.div`
  flex: 1;
`;

const DetailLabel = styled.div`
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const DetailValue = styled.div`
  color: #1a365d;
  font-weight: 500;
  font-size: 16px;
`;

const LocationNote = styled.div`
  color: #6b7280;
  font-size: 14px;
  margin-top: 4px;
`;

const PricingDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #f8fafc;
  border-radius: 8px;
  border-left: 4px solid #d69e2e;
`;

const PriceLabel = styled.span`
  color: #374151;
  font-weight: 500;
  font-size: 14px;
`;

const PriceValue = styled.span`
  color: #16a34a;
  font-weight: 700;
  font-size: 16px;
`;

const BenefitsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BenefitItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;

const BenefitIcon = styled.div`
  width: 16px;
  height: 16px;
  background: #16a34a;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
  flex-shrink: 0;
  margin-top: 2px;
`;

const BenefitText = styled.span`
  color: #374151;
  font-size: 14px;
  line-height: 1.5;
`;

const ServiceDetailsFooter = styled.div`
  padding: 24px;
  background: #f8fafc;
  text-align: center;
  border-top: 1px solid #e2e8f0;
`;

const ComplianceNote = styled.div`
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 16px;
  
  strong {
    color: #1a365d;
  }
`;

const BookServiceButton = styled.button`
  background: linear-gradient(135deg, #d69e2e 0%, #b7791f 100%);
  color: white;
  border: none;
  padding: 14px 32px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  min-width: 180px;
  
  &:hover {
    background: linear-gradient(135deg, #b7791f 0%, #975a16 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(214, 158, 46, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export default ServiceDetailsCard; 