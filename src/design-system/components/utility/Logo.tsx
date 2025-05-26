import React from 'react';
import styled from 'styled-components';

/**
 * Logo variant types
 */
export type LogoVariant = 'icon' | 'horizontal' | 'stacked';

/**
 * Logo size options
 */
export type LogoSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Props for the Logo component
 */
interface LogoProps {
  /**
   * Logo variant to display
   * @default 'horizontal'
   */
  variant?: LogoVariant;
  
  /**
   * Predefined size
   * @default 'md'
   */
  size?: LogoSize;
  
  /**
   * Custom width (overrides size)
   */
  width?: number | string;
  
  /**
   * Custom height (overrides size)
   */
  height?: number | string;
  
  /**
   * Alt text for the logo
   * @default "Recovery Office"
   */
  alt?: string;
  
  /**
   * Additional className
   */
  className?: string;
  
  /**
   * Additional inline style
   */
  style?: React.CSSProperties;
  
  /**
   * For retina display support
   * @default true
   */
  retina?: boolean;
}

/**
 * Size mappings for each variant (in pixels)
 */
const SIZE_MAP: Record<LogoVariant, Record<LogoSize, { width: number; height: number }>> = {
  icon: {
    xs: { width: 32, height: 32 },
    sm: { width: 40, height: 40 },
    md: { width: 48, height: 48 },
    lg: { width: 64, height: 64 },
    xl: { width: 96, height: 96 }
  },
  horizontal: {
    xs: { width: 140, height: 40 },
    sm: { width: 180, height: 50 },
    md: { width: 240, height: 67 },
    lg: { width: 320, height: 90 },
    xl: { width: 400, height: 112 }
  },
  stacked: {
    xs: { width: 60, height: 100 },
    sm: { width: 80, height: 120 },
    md: { width: 100, height: 150 },
    lg: { width: 120, height: 180 },
    xl: { width: 160, height: 240 }
  }
};

/**
 * URLs for each logo variant - Updated with professional Recovery Office branding
 */
const LOGO_URLS: Record<LogoVariant, string> = {
  icon: 'https://images2.imgbox.com/86/72/GE2VLjan_o.png', // Professional icon logo
  horizontal: 'https://images2.imgbox.com/35/e0/Cif1Ufej_o.png', // Main horizontal logo
  stacked: 'https://images2.imgbox.com/86/72/GE2VLjan_o.png' // Stacked variant
};

/**
 * Styled image
 */
const StyledImage = styled.img`
  display: block;
  object-fit: contain;
  transition: filter 0.2s ease, transform 0.2s ease;
`;

/**
 * Logo Component
 * 
 * Standardized logo implementation for brand consistency
 */
export const Logo: React.FC<LogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  width,
  height,
  alt = "Recovery Office",
  className,
  style,
  retina = true
}) => {
  // Get dimensions from size map
  const dimensions = SIZE_MAP[variant][size];
  
  // Use custom dimensions if provided
  const finalWidth = width || dimensions.width;
  const finalHeight = height || dimensions.height;
  
  // Get the URL for the selected variant
  const logoUrl = LOGO_URLS[variant];
  
  return (
    <StyledImage
      src={logoUrl}
      alt={alt}
      className={className}
      style={{ width: finalWidth, height: finalHeight, ...style }}
      srcSet={retina ? `${logoUrl} 1x, ${logoUrl} 2x` : undefined}
      loading="lazy"
    />
  );
};

export default Logo; 