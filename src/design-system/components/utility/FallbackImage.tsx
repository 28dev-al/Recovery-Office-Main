import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

interface FallbackImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  fallbackComponent?: React.ReactNode;
  onImageError?: (error: Error) => void;
}

const StyledImage = styled.img`
  max-width: 100%;
  display: block;
`;

const FallbackContainer = styled.div<{ $width?: string | number; $height?: string | number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  border-radius: 4px;
  width: ${props => props.$width || '100%'};
  height: ${props => props.$height || '100%'};
  min-height: 32px;
  min-width: 32px;
  color: #6c757d;
  font-size: 12px;
`;

/**
 * Default SVG to show when an image fails to load
 */
const DefaultFallbackIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="2"
      stroke="#6c757d"
      strokeWidth="2"
    />
    <path
      d="M3 16l5-5 6 6"
      stroke="#6c757d"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M14 14l3-3 4 4"
      stroke="#6c757d"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="15.5" cy="8.5" r="1.5" fill="#6c757d" />
  </svg>
);

/**
 * FallbackImage Component
 * 
 * A component that handles image loading errors gracefully by showing
 * a fallback image or component when the primary image fails to load.
 */
const FallbackImage: React.FC<FallbackImageProps> = ({
  src,
  alt,
  fallbackSrc,
  fallbackComponent,
  onImageError,
  width,
  height,
  ...props
}) => {
  const [error, setError] = useState<boolean>(false);
  
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const imgError = new Error(`Failed to load image: ${src}`);
    console.warn(imgError.message);
    
    // Call the onError prop if provided
    if (onImageError) {
      onImageError(imgError);
    }
    
    // Set the error state to show fallback
    setError(true);
    
    // Prevent the default error handling
    e.preventDefault();
  };
  
  if (error) {
    // Use fallback image if provided
    if (fallbackSrc) {
      return (
        <StyledImage
          src={fallbackSrc}
          alt={alt || "Image"}
          width={width}
          height={height}
          {...props}
        />
      );
    }
    
    // Use custom fallback component if provided
    if (fallbackComponent) {
      return <>{fallbackComponent}</>;
    }
    
    // Use default fallback
    return (
      <FallbackContainer $width={width} $height={height}>
        <DefaultFallbackIcon />
      </FallbackContainer>
    );
  }
  
  // Render the image normally if no error
  return (
    <StyledImage
      src={src}
      alt={alt || ""}
      onError={handleError}
      width={width}
      height={height}
      {...props}
    />
  );
};

export default FallbackImage; 