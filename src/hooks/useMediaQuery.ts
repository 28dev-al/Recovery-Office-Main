// TODO: This file contains direct window access without SSR checks
import { useState, useEffect } from 'react';

/**
 * Custom hook for responsive design that utilizes media queries
 * Returns a boolean indicating whether the given media query matches
 * 
 * @param query - CSS media query string (e.g., '(min-width: 768px)')
 * @returns Boolean indicating if the media query matches
 */
const useMediaQuery = (query: string): boolean => {
  // Initialize with a default value (based on sacred geometry principles)
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // Check if window is defined (to handle SSR)
    if (typeof window === 'undefined') {
      return;
    }
    
    // Create a media query list to observe
    const mediaQueryList = window.matchMedia(query);
    
    // Initial check
    setMatches(mediaQueryList.matches);

    // Handler function
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add event listener with proper browser support check
    if (mediaQueryList.addEventListener) {
      if (mediaQueryList.addEventListener) {
        mediaQueryList.addEventListener('change', handleChange);
      } else {
        // Fallback for older browsers
        mediaQueryList.addListener(() => setMatches(mediaQueryList.matches));
      }
    } else {
      // For older browsers
      mediaQueryList.addListener(handleChange);
    }

    // Clean up function
    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener('change', handleChange);
      } else {
        // For older browsers
        mediaQueryList.removeListener(handleChange);
      }
    };
  }, [query]); // Only re-run if the query changes

  return matches;
};

export default useMediaQuery; 






