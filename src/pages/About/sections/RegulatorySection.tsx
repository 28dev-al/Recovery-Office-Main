import React from 'react';
import { ScrollReveal } from '../../../animation';
import PremiumRegulatory from '../../../components/sections/premium/PremiumRegulatory';

const RegulatorySection: React.FC = () => {
  return (
    <ScrollReveal>
      <PremiumRegulatory 
        title="Our Regulatory Compliance" 
        description="We adhere to the highest regulatory standards in financial recovery, ensuring your assets are in safe hands"
      />
    </ScrollReveal>
  );
};

export default RegulatorySection; 