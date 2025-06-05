import React, { useState, useRef } from 'react';
import styled from 'styled-components';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

const ImageContainer = styled.div<{ 
  width?: number; 
  height?: number; 
  $isLoading: boolean;
}>`
  position: relative;
  display: inline-block;
  ${({ width }) => width && `width: ${width}px;`}
  ${({ height }) => height && `height: ${height}px;`}
  overflow: hidden;
  
  ${({ $isLoading }) => $isLoading && `
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
  `}
  
  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

const Image = styled.img<{ $isLoaded: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
  opacity: ${({ $isLoaded }) => $isLoaded ? 1 : 0};
`;

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  loading = 'lazy',
  sizes,
  priority = false,
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };
  
  const handleError = () => {
    setHasError(true);
    onError?.();
  };
  
  // Calculate responsive sizes if not provided
  const responsiveSizes = sizes || (width ? 
    `(max-width: 768px) 100vw, (max-width: 1200px) 50vw, ${width}px` : 
    '100vw'
  );
  
  if (hasError) {
    return (
      <ImageContainer 
        width={width} 
        height={height} 
        className={className}
        $isLoading={false}
      >
        <div style={{ color: '#666', fontSize: '14px', textAlign: 'center' }}>
          Image unavailable
        </div>
      </ImageContainer>
    );
  }
  
  return (
    <ImageContainer 
      width={width} 
      height={height} 
      className={className}
      $isLoading={!isLoaded && !hasError}
    >
      <Image
        ref={imgRef}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        sizes={responsiveSizes}
        src={src}
        onLoad={handleLoad}
        onError={handleError}
        $isLoaded={isLoaded}
        decoding="async"
      />
    </ImageContainer>
  );
};

export default OptimizedImage; 