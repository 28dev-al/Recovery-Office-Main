import React from 'react';

interface AppIconProps {
  size?: number;
  variant?: 'default' | 'white' | 'dark';
}

export const AppIcon: React.FC<AppIconProps> = ({
  size = 32,
  variant = 'default'
}) => {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <defs>
        <linearGradient id="appIconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a365d" />
          <stop offset="100%" stopColor="#d69e2e" />
        </linearGradient>
      </defs>

      {/* Background circle */}
      <circle
        cx="16"
        cy="16"
        r="15"
        fill={variant === 'white' ? '#ffffff' : 'url(#appIconGradient)'}
        stroke={variant === 'white' ? '#1a365d' : 'none'}
        strokeWidth={variant === 'white' ? '1' : '0'}
      />
      
      {/* "R" letterform */}
      <path
        d="M9 8h6c2.2 0 4 1.8 4 4 0 1.5-0.8 2.8-2 3.4L19 20h-3l-2-4h-3v4h-2V8z M11 10v4h4c1.1 0 2-0.9 2-2s-0.9-2-2-2h-4z"
        fill={variant === 'white' ? '#1a365d' : '#ffffff'}
      />
      
      {/* Accent dot */}
      <circle
        cx="21"
        cy="11"
        r="1.5"
        fill={variant === 'white' ? '#d69e2e' : '#d69e2e'}
      />
    </svg>
  );
}; 