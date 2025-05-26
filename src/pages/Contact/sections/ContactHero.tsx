/**
 * ContactHero Section Component
 * 
 * Hero section for the Contact page following sacred geometry principles.
 * Features background image with overlay and botanical decorations.
 */

import * as React from 'react';
import { Hero } from '../../../design-system/components/feature-sections';
import { Text } from '../../../design-system/components/typography';
import { PHI } from '../../../constants/sacred-geometry';

interface ContactHeroProps {
  /**
   * Optional background image URL, will use default if not provided
   */
  backgroundImage?: string;
}

const ContactHero: React.FC<ContactHeroProps> = ({ 
  backgroundImage = 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1920&q=80'
}) => {
  return (
    <Hero
      heading="Contact Us"
      subheading="Connect with our team of specialists"
      background={{
        image: backgroundImage,
        overlay: 'rgba(21, 45, 85, 0.7)'
      }}
      align="center"
      minHeight="50vh" // Height follows golden ratio proportions of the viewport
      animated={true}
      botanical={{
        type: 'flowerOfLife',
        position: 'bottomRight',
        opacity: 0.15,
        animated: true
      }}
    >
      <Text 
        variant="body1" 
        style={{ 
          maxWidth: `${PHI * 400}px`, // Width using golden ratio
          margin: '0 auto', 
          color: 'white' 
        }}
      >
        Reach out to us with any questions about our services or to schedule 
        a consultation with one of our specialists.
      </Text>
    </Hero>
  );
};

export default ContactHero; 











