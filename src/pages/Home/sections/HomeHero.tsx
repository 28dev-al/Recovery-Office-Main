import * as React from 'react';
import PremiumHero from '../../../components/sections/premium/PremiumHero';

interface HomeHeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaUrl?: string;
}

const HomeHero: React.FC<HomeHeroProps> = ({
  title = "Financial Asset Recovery Experts",
  subtitle = "Professional services helping individuals and businesses recover lost financial assets with regulatory expertise and proven methodology.",
  ctaText = "Book a Consultation",
  ctaUrl = "/booking"
}) => {
  return (
    <PremiumHero
      title={title}
      subtitle={subtitle}
      primaryButtonText={ctaText}
      primaryButtonUrl={ctaUrl}
      secondaryButtonText="Learn More"
      secondaryButtonUrl="/services"
      showLogo={true}
    />
  );
};

export default HomeHero; 










