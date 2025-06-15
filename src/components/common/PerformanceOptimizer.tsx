import React, { useEffect, Suspense } from 'react';

// Performance optimizer for Desktop PageSpeed improvements
export const PerformanceOptimizer: React.FC = () => {
  useEffect(() => {
    // Preload critical images with WebP support
    const preloadImages = () => {
      const criticalImages = [
        'https://i.ibb.co/Vc4TspzX/t7tfrkvh59pn66ehpqnu.png' // Logo
      ];

      criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });
    };

    // Load critical fonts safely via Google Fonts CSS API
    const loadFontsSafely = () => {
      // Check if fonts are already loaded
      if (document.querySelector('link[href*="fonts.googleapis.com/css2"]')) {
        return;
      }

      // Create preconnect links
      const preconnectGoogle = document.createElement('link');
      preconnectGoogle.rel = 'preconnect';
      preconnectGoogle.href = 'https://fonts.googleapis.com';
      document.head.appendChild(preconnectGoogle);

      const preconnectGstatic = document.createElement('link');
      preconnectGstatic.rel = 'preconnect';
      preconnectGstatic.href = 'https://fonts.gstatic.com';
      preconnectGstatic.crossOrigin = 'anonymous';
      document.head.appendChild(preconnectGstatic);

      // Load fonts via CSS API
      const fontLink = document.createElement('link');
      fontLink.rel = 'stylesheet';
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Open+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap';
      document.head.appendChild(fontLink);
    };

    // Prefetch DNS for external resources (0.1-0.2s savings)
    const prefetchDNS = () => {
      const domains = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://recovery-office-backend-production.up.railway.app'
      ];

      domains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = domain;
        if (!document.head.querySelector(`link[href="${domain}"]`)) {
          document.head.appendChild(link);
        }
      });
    };

    // Preconnect to critical domains for faster connection
    const preconnectDomains = () => {
      const domains = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com'
      ];

      domains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        link.crossOrigin = '';
        if (!document.head.querySelector(`link[rel="preconnect"][href="${domain}"]`)) {
          document.head.appendChild(link);
        }
      });
    };

    // Lazy load non-critical images on scroll
    const setupLazyLoading = () => {
      const images = document.querySelectorAll('img[data-src]');
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src || '';
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px'
      });

      images.forEach(img => imageObserver.observe(img));
    };

    preloadImages();
    loadFontsSafely();
    prefetchDNS();
    preconnectDomains();
    
    // Setup lazy loading after initial load
    setTimeout(setupLazyLoading, 100);

  }, []);

  return null;
};

// Lazy loading wrapper for components
export const LazyComponentWrapper: React.FC<{
  children: React.ReactNode;
  fallback?: React.ReactNode;
}> = ({ children, fallback = <div>Loading...</div> }) => {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
};

export default PerformanceOptimizer; 