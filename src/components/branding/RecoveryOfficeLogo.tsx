import React from 'react';
import styled from 'styled-components';

export interface LogoProps {
  size?: 'small' | 'medium' | 'large' | 'xl';
  variant?: 'default' | 'horizontal' | 'symbol' | 'full' | 'white';
  showText?: boolean;
  showCredentials?: boolean;
}

const RecoveryOfficeLogo: React.FC<LogoProps> = ({ 
  size = 'medium', 
  variant = 'default',
  showText = true,
  showCredentials = false
}) => {
  const logoSizes = {
    small: { width: 32, height: 32, fontSize: '14px' },
    medium: { width: 48, height: 48, fontSize: '18px' },
    large: { width: 64, height: 64, fontSize: '24px' },
    xl: { width: 80, height: 80, fontSize: '28px' }
  };

  const currentSize = logoSizes[size];
  const isWhiteVariant = variant === 'white';

  return (
    <LogoContainer variant={variant}>
      {/* Professional geometric symbol */}
      <LogoSymbol 
        width={currentSize.width} 
        height={currentSize.height}
        viewBox="0 0 80 80"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="recoveryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a365d" />
            <stop offset="100%" stopColor="#2c5282" />
          </linearGradient>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d69e2e" />
            <stop offset="100%" stopColor="#f6d55c" />
          </linearGradient>
        </defs>

        {/* Circular background for stability */}
        <circle
          cx="40"
          cy="40"
          r="36"
          fill={isWhiteVariant ? 'white' : 'url(#recoveryGradient)'}
          stroke="#d69e2e"
          strokeWidth="2"
        />
        
        {/* Stylized "R" for Recovery */}
        <path
          d="M25 20h15c5 0 9 4 9 9 0 4-2.5 7-6 8l7 13h-7l-6-12h-5v12h-7V20z M32 26v8h8c2 0 3.5-1.5 3.5-4s-1.5-4-3.5-4h-8z"
          fill={isWhiteVariant ? '#1a365d' : 'white'}
          strokeWidth="0.5"
          stroke={isWhiteVariant ? 'rgba(26, 54, 93, 0.2)' : 'rgba(255,255,255,0.2)'}
        />
        
        {/* Gold accent element */}
        <circle cx="52" cy="24" r="3" fill="url(#goldGradient)" />
        
        {/* Subtle shield element for protection/security */}
        <path
          d="M40 12 L50 16 L50 28 Q50 34 40 38 Q30 34 30 28 L30 16 Z"
          fill="rgba(214, 158, 46, 0.1)"
          stroke="rgba(214, 158, 46, 0.3)"
          strokeWidth="1"
        />
      </LogoSymbol>
      
      {/* Professional typography */}
      {showText && variant !== 'symbol' && (
        <LogoText>
          <CompanyName isWhite={isWhiteVariant}>Recovery Office</CompanyName>
          <Tagline>Financial Recovery Specialists</Tagline>
          {showCredentials && (
            <Credentials>FCA Regulated • Manchester, UK</Credentials>
          )}
        </LogoText>
      )}
    </LogoContainer>
  );
};

// Styled Components
const LogoContainer = styled.div<{ variant: string }>`
  display: flex;
  align-items: center;
  gap: ${props => props.variant === 'horizontal' ? '16px' : '12px'};
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  flex-direction: ${props => props.variant === 'full' ? 'column' : 'row'};
`;

const LogoSymbol = styled.svg`
  flex-shrink: 0;
  filter: drop-shadow(0 2px 8px rgba(26, 54, 93, 0.15));
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-1px);
    filter: drop-shadow(0 4px 12px rgba(26, 54, 93, 0.2));
  }
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.2;
`;

const CompanyName = styled.div<{ isWhite?: boolean }>`
  font-weight: 700;
  font-size: 20px;
  color: ${props => props.isWhite ? 'white' : '#1a365d'};
  letter-spacing: -0.02em;
  margin-bottom: 2px;
`;

const Tagline = styled.div`
  font-weight: 500;
  font-size: 11px;
  color: #d69e2e;
  text-transform: uppercase;
  letter-spacing: 0.8px;
`;

const Credentials = styled.div`
  font-weight: 400;
  font-size: 10px;
  color: #6b7280;
  margin-top: 4px;
  letter-spacing: 0.3px;
`;

export default RecoveryOfficeLogo; 