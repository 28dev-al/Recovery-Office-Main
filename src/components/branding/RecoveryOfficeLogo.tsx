import React from 'react';
import styled from 'styled-components';

interface LogoProps {
  variant?: 'default' | 'white' | 'dark' | 'minimal';
  size?: 'small' | 'medium' | 'large' | 'xl';
  showText?: boolean;
  className?: string;
}

export const RecoveryOfficeLogo: React.FC<LogoProps> = ({
  variant = 'default',
  size = 'medium',
  showText = true,
  className
}) => {
  const logoSizes = {
    small: { width: 32, height: 32, fontSize: '14px' },
    medium: { width: 40, height: 40, fontSize: '18px' },
    large: { width: 48, height: 48, fontSize: '22px' },
    xl: { width: 64, height: 64, fontSize: '28px' }
  };

  const currentSize = logoSizes[size];

  return (
    <LogoContainer className={className} variant={variant}>
      <LogoIcon width={currentSize.width} height={currentSize.height} viewBox="0 0 48 48" variant={variant}>
        {/* Professional "R" monogram with financial styling */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={variant === 'white' ? '#ffffff' : '#1a365d'} />
            <stop offset="100%" stopColor={variant === 'white' ? '#f7fafc' : '#d69e2e'} />
          </linearGradient>
        </defs>

        {/* Circular background for professional appearance */}
        <circle
          cx="24"
          cy="24"
          r="22"
          fill={variant === 'white' ? 'rgba(255,255,255,0.1)' : 'url(#logoGradient)'}
          stroke={variant === 'white' ? '#ffffff' : '#d69e2e'}
          strokeWidth="2"
        />
        
        {/* Modern "R" letterform */}
        <path
          d="M14 12h8c3.3 0 6 2.7 6 6 0 2.2-1.2 4.1-3 5.1L28 30h-4l-2.5-6H16v6h-2V12z M16 14v8h6c2.2 0 4-1.8 4-4s-1.8-4-4-4h-6z"
          fill={variant === 'white' ? '#ffffff' : variant === 'dark' ? '#1a365d' : '#ffffff'}
          strokeWidth="0.5"
          stroke={variant === 'white' ? 'rgba(255,255,255,0.2)' : 'rgba(26, 54, 93, 0.1)'}
        />
        
        {/* Small accent dot for premium feel */}
        <circle
          cx="32"
          cy="16"
          r="2"
          fill={variant === 'white' ? '#ffffff' : '#d69e2e'}
        />
      </LogoIcon>
      
      {showText && (
        <LogoText variant={variant} fontSize={currentSize.fontSize}>
          <CompanyName variant={variant} fontSize={currentSize.fontSize}>Recovery Office</CompanyName>
          <Tagline variant={variant} fontSize={currentSize.fontSize}>Financial Recovery Specialists</Tagline>
        </LogoText>
      )}
    </LogoContainer>
  );
};

const LogoContainer = styled.div<{ variant: string }>`
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

const LogoIcon = styled.svg<{ variant: string }>`
  flex-shrink: 0;
  transition: all 0.3s ease;
  filter: ${({ variant }) => 
    variant === 'white' 
      ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' 
      : 'drop-shadow(0 2px 8px rgba(0,0,0,0.15))'
  };
`;

const LogoText = styled.div<{ variant: string; fontSize: string }>`
  display: flex;
  flex-direction: column;
  line-height: 1.2;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`;

const CompanyName = styled.div<{ variant?: string; fontSize: string }>`
  font-weight: 700;
  font-size: ${({ fontSize }) => fontSize};
  color: ${({ variant }) => {
    switch (variant) {
      case 'white': return '#ffffff';
      case 'dark': return '#1a365d';
      default: return '#1a365d';
    }
  }};
  letter-spacing: -0.02em;
`;

const Tagline = styled.div<{ variant?: string; fontSize: string }>`
  font-weight: 500;
  font-size: calc(${({ fontSize }) => fontSize} * 0.6);
  color: ${({ variant }) => {
    switch (variant) {
      case 'white': return 'rgba(255,255,255,0.8)';
      case 'dark': return '#718096';
      default: return '#d69e2e';
    }
  }};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`; 