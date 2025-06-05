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

    // Preload critical fonts to eliminate render-blocking
    const preloadFonts = () => {
      const criticalFonts = [
        'https://fonts.gstatic.com/s/opensans/v40/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsg-1x4iaVQUwaEQbjB_mQ.woff2'
      ];

      criticalFonts.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
        link.href = src;
        document.head.appendChild(link);
      });
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
    preloadFonts();
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