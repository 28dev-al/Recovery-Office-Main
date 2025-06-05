import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PREMIUM_SPACING } from '../../../design-system/tokens';
import { Container } from '../../../design-system/components/layout/Container';
import { FadeIn } from '../../../animation';
import { useTranslation } from 'react-i18next';

const TestimonialsSection = styled.section`
  padding: ${PREMIUM_SPACING.xxl}px 0;
  background-color: ${props => props.theme.colors.background[50]};
  position: relative;
  overflow: hidden;
  
  /* Subtle background pattern for depth */
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: radial-gradient(circle at 50% 50%, rgba(74, 110, 179, 0.03) 0%, rgba(74, 110, 179, 0) 50%);
    z-index: 0;
  }
`;

const TestimonialsHeader = styled.div`
  text-align: center;
  max-width: 700px;
  margin: 0 auto ${PREMIUM_SPACING.xl}px;
  position: relative;
  z-index: 1;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: ${PREMIUM_SPACING.md}px;
  color: ${props => props.theme.colors.primary[700]};
  font-family: ${props => props.theme.typography.fontFamily.heading};
  
  @media (max-width: ${props => props.theme.breakpoints.md}px) {
    font-size: 2rem;
  }
`;

const SectionDescription = styled.p`
  font-size: 1.125rem;
  color: ${props => props.theme.colors.text.secondary};
  line-height: 1.6;
  margin: 0 auto;
`;

const CarouselContainer = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  z-index: 1;
`;

const TestimonialCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: ${PREMIUM_SPACING.xl}px;
  box-shadow: 0 4px 20px rgba(10, 64, 33, 0.08);
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.03);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 16px 32px rgba(10, 64, 33, 0.12);
  }
  
  /* Gold accent top border */
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 16px;
    right: 16px;
    height: 3px;
    background: ${props => props.theme.colors.accent.gold};
    border-radius: 3px 3px 0 0;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}px) {
    padding: ${PREMIUM_SPACING.md}px;
  }
`;

const QuoteMark = styled.div`
  font-size: 4rem;
  line-height: 1;
  color: ${props => props.theme.colors.accent.gold};
  font-family: Georgia, serif;
  height: 40px;
  margin-bottom: ${PREMIUM_SPACING.sm}px;
  opacity: 0.5;
`;

const TestimonialContent = styled.blockquote`
  font-size: 1.05rem;
  line-height: 1.6;
  flex-grow: 1;
  margin: 0 0 32px 0;
  font-style: italic;
  color: ${props => props.theme.colors.text.primary};
  
  /* Ensure consistent height */
  min-height: 140px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}px) {
    min-height: 0;
  }
`;

const ClientInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
  position: relative;
  padding-top: ${PREMIUM_SPACING.md}px;
  
  /* Separator line */
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: rgba(0, 0, 0, 0.08);
  }
`;

const ClientAvatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: ${PREMIUM_SPACING.md}px;
  border: 2px solid #F8F7F0; /* Ivory border for premium look */
  box-shadow: 0 2px 8px rgba(10, 64, 33, 0.08);
  position: relative;
  background-color: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: ${props => props.theme.breakpoints.md}px) {
    width: 64px;
    height: 64px;
  }
`;

const ClientAvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
  transition: transform 0.3s ease;
  
  /* Enhanced image quality and positioning */
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  
  ${TestimonialCard}:hover & {
    transform: scale(1.05);
  }
`;

const ClientInitial = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A4021;
  opacity: 0.5;
`;

const ClientDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ClientName = styled.div`
  font-weight: 700;
  font-size: 1.15em;
  color: #333333;
  margin-bottom: 4px;
`;

const ClientRole = styled.div`
  font-size: 0.9rem;
  color: #3A5A40;
  margin-bottom: 4px;
`;

const VerificationBadge = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  color: ${props => props.theme.colors.accent.gold};
  font-weight: 600;
  background: rgba(212, 175, 55, 0.1);
  padding: 2px 8px;
  border-radius: 12px;
  display: inline-flex;
  
  svg {
    margin-right: 4px;
    color: ${props => props.theme.colors.accent.gold};
    width: 14px;
    height: 14px;
  }
`;

const ResultTag = styled.div`
  display: inline-flex;
  align-items: center;
  position: absolute;
  top: ${PREMIUM_SPACING.sm}px;
  right: ${PREMIUM_SPACING.sm}px;
  background: ${props => props.theme.colors.primary[50]};
  color: ${props => props.theme.colors.primary[700]};
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 4px;
  
  svg {
    margin-right: 4px;
    color: ${props => props.theme.colors.accent.gold};
  }
`;

const Rating = styled.div`
  display: flex;
  margin-bottom: ${PREMIUM_SPACING.sm}px;
  
  svg {
    width: 16px;
    height: 16px;
    margin-right: 2px;
    color: ${props => props.theme.colors.accent.gold};
    flex-shrink: 0;
  }
`;

const CarouselControls = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${PREMIUM_SPACING.xl}px;
  gap: ${PREMIUM_SPACING.xs}px;
`;

const NavigationButton = styled.button`
  background: none;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.primary[600]};
  cursor: pointer;
  transition: all 0.2s ease;
  margin: 0 ${PREMIUM_SPACING.sm}px;
  
  &:hover {
    background: rgba(74, 110, 179, 0.1);
  }
  
  &:disabled {
    color: ${props => props.theme.colors.text.disabled};
    cursor: not-allowed;
    
    &:hover {
      background: none;
    }
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary[200]};
  }
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

const CarouselDot = styled.button<{ $active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => props.$active ? props.theme.colors.primary[500] : 'transparent'};
  border: 1px solid ${props => props.theme.colors.primary[500]};
  margin: 0;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;
  
  &:hover {
    background: ${props => props.$active ? props.theme.colors.primary[500] : props.theme.colors.primary[200]};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary[200]};
  }
`;

const CarouselWrapper = styled.div`
  transition: opacity 0.3s ease;
`;

// VerifiedIcon component
const VerifiedIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill="rgba(212, 175, 55, 0.15)"
    />
    <path 
      d="M9 12L11 14L15 10" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Recovery success icon
const RecoverySuccessIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 12L12 8M12 8L8 12M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Previous arrow icon
const PrevIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Next arrow icon
const NextIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Star component for ratings
const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
      fill={filled ? "currentColor" : "none"} 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Financial recovery-focused testimonial data
const TESTIMONIALS = [
  {
    id: 1,
    contentKey: 'testimonials.testimonial1',
    defaultContent: "The Recovery Office approach to recovering my lost investments has been transformative. Their regulatory process gave me confidence, and they recovered funds I thought were gone forever.",
    clientName: "Michael Thompson",
    clientRoleKey: 'testimonials.investmentVictim',
    defaultClientRole: "Investment Fraud Victim",
    rating: 5,
    verified: true,
    recoveryResultKey: 'testimonials.recovery80',
    defaultRecoveryResult: "80% Recovery",
    avatar: "https://images2.imgbox.com/96/8c/4AyJzKGD_o.jpg"
  },
  {
    id: 2,
    contentKey: 'testimonials.testimonial2',
    defaultContent: "As a financial advisor, I was skeptical at first. But after seeing their recovery process firsthand, I now recommend Recovery Office to my own clients who face similar situations.",
    clientName: "Sarah Johnson",
    clientRoleKey: 'testimonials.financialAdvisor',
    defaultClientRole: "Financial Advisor",
    rating: 5,
    verified: true,
    recoveryResultKey: 'testimonials.fullSettlement',
    defaultRecoveryResult: "Full Settlement",
    avatar: "https://thumbs2.imgbox.com/85/83/6t4Dd0oN_t.jpg"
  },
  {
    id: 3,
    contentKey: 'testimonials.testimonial3',
    defaultContent: "After losing significant cryptocurrency assets to a scam, the Recovery Office team provided expert guidance through the complex recovery process. They helped me recover a substantial portion of my assets.",
    clientName: "David Lee",
    clientRoleKey: 'testimonials.cryptoInvestor',
    defaultClientRole: "Crypto Investor",
    rating: 5,
    verified: true,
    recoveryResultKey: 'testimonials.recovery65',
    defaultRecoveryResult: "65% Recovery",
    avatar: "https://images2.imgbox.com/71/95/3yc7WdRn_o.jpg"
  },
  {
    id: 4,
    content: "I had been defrauded by an online trading platform. Recovery Office's team was thorough with documentation and relentless in pursuing my case. Their expertise in regulatory frameworks was impressive.",
    clientName: "Rebecca Miller",
    clientRole: "Retired Teacher",
    rating: 5,
    verified: true,
    recoveryResult: "Full Refund",
    avatar: "https://images2.imgbox.com/eb/a6/5rr0sR0i_o.jpg"
  },
  {
    id: 5,
    content: "When my investment turned out to be fraudulent, I thought all was lost. Recovery Office's specialists navigated the complex legal process and helped me get a significant portion of my money back.",
    clientName: "James Wilson",
    clientRole: "Business Owner",
    rating: 4,
    verified: true,
    recoveryResult: "Partial Recovery",
    avatar: "https://images2.imgbox.com/10/0e/nl37l1f4_o.jpg"
  }
];

interface PremiumTestimonialsProps {
  title?: string;
  description?: string;
  testimonials?: typeof TESTIMONIALS;
  itemsPerPage?: number;
}

interface ClientAvatarProps {
  src: string;
  alt: string;
}

const ClientAvatarComponent: React.FC<ClientAvatarProps> = ({ src, alt }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  // Get the first letter of the name for the fallback
  const initial = alt ? alt.charAt(0).toUpperCase() : 'C';
  
  return (
    <ClientAvatar>
      {!imageError ? (
        <ClientAvatarImage 
          src={src} 
          srcSet={`${src} 1x, ${src} 2x`}
          alt={`${alt} - Verified Client`} 
          onLoad={handleImageLoad} 
          onError={handleImageError}
          style={{ opacity: imageLoaded ? 1 : 0 }}
          loading="lazy"
        />
      ) : (
        <ClientInitial>{initial}</ClientInitial>
      )}
    </ClientAvatar>
  );
};

// Rename to TestimonialGrid
const TestimonialGrid = styled.div<{ $itemCount?: number }>`
  display: grid;
  grid-template-columns: repeat(${props => Math.min(props.$itemCount || 3, 3)}, 1fr);
  gap: ${PREMIUM_SPACING.lg}px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: ${PREMIUM_SPACING.md}px;
  }
`;

export const PremiumTestimonials: React.FC<PremiumTestimonialsProps> = ({
  title = "Client Success Stories",
  description = "Real results from our financial recovery specialists",
  testimonials = TESTIMONIALS,
  itemsPerPage = 3
}) => {
  const { t } = useTranslation();
  const [activePage, setActivePage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const pageCount = Math.ceil(testimonials.length / itemsPerPage);
  
  // Change page with animation
  const changePage = (newPage: number) => {
    if (newPage === activePage || isAnimating) return;
    
    setIsAnimating(true);
    
    // After a short delay, change the page
    setTimeout(() => {
      setActivePage(newPage);
      
      // Reset animation state after transition
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }, 150);
  };
  
  // Navigate to previous page
  const goToPrevPage = () => {
    if (activePage > 0) {
      changePage(activePage - 1);
    }
  };
  
  // Navigate to next page
  const goToNextPage = () => {
    if (activePage < pageCount - 1) {
      changePage(activePage + 1);
    }
  };
  
  // Handle keyboard navigation for accessibility
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        goToPrevPage();
      } else if (event.key === 'ArrowRight') {
        goToNextPage();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePage, pageCount, goToPrevPage, goToNextPage]);
  
  const renderStars = (count: number) => {
    return Array(5).fill(0).map((_, i) => (
      <StarIcon key={i} filled={i < count} />
    ));
  };
  
  const displayTestimonials = testimonials.slice(
    activePage * itemsPerPage,
    (activePage + 1) * itemsPerPage
  );

  return (
    <TestimonialsSection>
      <Container>
        <TestimonialsHeader>
          <SectionTitle>{title}</SectionTitle>
          <SectionDescription>{description}</SectionDescription>
        </TestimonialsHeader>
        
        <CarouselContainer>
          <CarouselWrapper style={{ opacity: isAnimating ? 0.5 : 1 }}>
            <TestimonialGrid $itemCount={Math.min(itemsPerPage, displayTestimonials.length)}>
              {displayTestimonials.map((testimonial, index) => (
                <FadeIn key={testimonial.id} delay={index * 0.1}>
                  <TestimonialCard>
                    {(testimonial.recoveryResultKey || testimonial.recoveryResult) && (
                      <ResultTag>
                        <RecoverySuccessIcon />
                        {testimonial.recoveryResultKey 
                          ? t(testimonial.recoveryResultKey, testimonial.defaultRecoveryResult || '') 
                          : testimonial.recoveryResult || ''
                        }
                      </ResultTag>
                    )}
                  
                    <QuoteMark>&quot;</QuoteMark>
                    <Rating aria-label={`${testimonial.rating} out of 5 stars`}>
                      {renderStars(testimonial.rating)}
                    </Rating>
                    
                    <TestimonialContent>
                      {testimonial.contentKey 
                        ? t(testimonial.contentKey, testimonial.defaultContent || '') 
                        : testimonial.content || ''
                      }
                    </TestimonialContent>
                    
                    <ClientInfo>
                      <ClientAvatarComponent src={testimonial.avatar} alt={testimonial.clientName} />
                      
                      <ClientDetails>
                        <ClientName>{testimonial.clientName}</ClientName>
                        <ClientRole>
                          {testimonial.clientRoleKey 
                            ? t(testimonial.clientRoleKey, testimonial.defaultClientRole || '') 
                            : testimonial.clientRole || ''
                          }
                        </ClientRole>
                        {testimonial.verified && (
                          <VerificationBadge>
                            <VerifiedIcon />
                            <span>{t('testimonials.verifiedClient', 'Verified Client')}</span>
                          </VerificationBadge>
                        )}
                      </ClientDetails>
                    </ClientInfo>
                  </TestimonialCard>
                </FadeIn>
              ))}
            </TestimonialGrid>
          </CarouselWrapper>
          
          {pageCount > 1 && (
            <CarouselControls>
              <NavigationButton 
                onClick={goToPrevPage} 
                disabled={activePage === 0 || isAnimating}
                aria-label="Previous testimonials"
              >
                <PrevIcon />
              </NavigationButton>
              
              {Array(pageCount).fill(0).map((_, i) => (
                <CarouselDot 
                  key={i} 
                  $active={i === activePage} 
                  onClick={() => changePage(i)}
                  aria-label={`Page ${i + 1} of ${pageCount}`}
                  aria-current={i === activePage ? 'page' : undefined}
                />
              ))}
              
              <NavigationButton 
                onClick={goToNextPage} 
                disabled={activePage === pageCount - 1 || isAnimating}
                aria-label="Next testimonials"
              >
                <NextIcon />
              </NavigationButton>
            </CarouselControls>
          )}
        </CarouselContainer>
      </Container>
    </TestimonialsSection>
  );
};

export default PremiumTestimonials; 