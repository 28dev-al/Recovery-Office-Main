import React, { useState, useEffect } from 'react';
import RecoveryOfficeLogo from './RecoveryOfficeLogo';

interface ResponsiveLogoProps {
  variant?: 'default' | 'horizontal' | 'symbol' | 'full' | 'white';
  showText?: boolean;
  showCredentials?: boolean;
}

const ResponsiveLogo: React.FC<ResponsiveLogoProps> = (props) => {
  const [logoSize, setLogoSize] = useState<'small' | 'medium' | 'large' | 'xl'>('medium');

  useEffect(() => {
    const updateLogoSize = () => {
      if (window.innerWidth < 768) {
        setLogoSize('small');
      } else if (window.innerWidth < 1024) {
        setLogoSize('medium');
      } else if (window.innerWidth < 1440) {
        setLogoSize('large');
      } else {
        setLogoSize('xl');
      }
    };

    updateLogoSize();
    window.addEventListener('resize', updateLogoSize);
    return () => window.removeEventListener('resize', updateLogoSize);
  }, []);

  return <RecoveryOfficeLogo size={logoSize} {...props} />;
};

export default ResponsiveLogo; 