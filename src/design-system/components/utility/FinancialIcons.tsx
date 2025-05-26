import React from 'react';

export interface FinancialIconProps {
  size?: 'sm' | 'md' | 'lg';
  opacity?: number;
  className?: string;
  style?: React.CSSProperties;
}

// Shield icon representing security/protection
export const SecurityShield: React.FC<FinancialIconProps> = ({ 
  size = 'md', 
  opacity = 1,
  style,
  className,
  ...rest 
}) => {
  const sizeMap = {
    sm: 24,
    md: 32,
    lg: 48,
  };
  
  const iconSize = sizeMap[size];
  
  return (
    <svg 
      width={iconSize}
      height={iconSize}
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
      style={{ opacity, ...style }}
      {...rest}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
};

// Represents regulatory compliance (like FCA/BaFin badges)
export const ComplianceBadge: React.FC<FinancialIconProps> = ({ 
  size = 'md', 
  opacity = 1,
  style,
  className,
  ...rest 
}) => {
  const sizeMap = {
    sm: 24,
    md: 32,
    lg: 48,
  };
  
  const iconSize = sizeMap[size];
  
  return (
    <svg 
      width={iconSize}
      height={iconSize}
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
      style={{ opacity, ...style }}
      {...rest}
    >
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  );
};

// Recovery/reclaiming assets icon
export const AssetRecovery: React.FC<FinancialIconProps> = ({ 
  size = 'md', 
  opacity = 1,
  style,
  className,
  ...rest 
}) => {
  const sizeMap = {
    sm: 24,
    md: 32,
    lg: 48,
  };
  
  const iconSize = sizeMap[size];
  
  return (
    <svg 
      width={iconSize}
      height={iconSize}
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
      style={{ opacity, ...style }}
      {...rest}
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <path d="M12 5v14" />
    </svg>
  );
}; 