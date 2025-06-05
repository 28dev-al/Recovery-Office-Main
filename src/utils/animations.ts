/**
 * Professional Animation Utilities
 * Safe Framer Motion configurations that prevent easing errors
 */

export const PROFESSIONAL_ANIMATIONS = {
  // Safe easing functions - use string format instead of arrays
  easing: {
    smooth: "cubic-bezier(0.4, 0, 0.2, 1)", // Fix: String format instead of array
    bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    gentle: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    sharp: "cubic-bezier(0.4, 0, 1, 1)",
    standard: "cubic-bezier(0.4, 0, 0.2, 1)"
  },
  
  // Safe default transitions
  transitions: {
    default: {
      duration: 0.3,
      ease: "easeOut" // Use Framer Motion's built-in easing
    },
    gentle: {
      duration: 0.6,
      ease: "easeInOut"
    },
    bounce: {
      duration: 0.8,
      ease: "backOut"
    },
    sharp: {
      duration: 0.2,
      ease: "easeIn"
    },
    smooth: {
      duration: 0.4,
      ease: "easeInOut"
    }
  },
  
  // Safe animation variants
  variants: {
    fadeIn: {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.6,
          ease: "easeOut" // Fix: Use string easing
        }
      }
    },
    slideIn: {
      hidden: { opacity: 0, x: -30 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: {
          duration: 0.5,
          ease: "easeOut"
        }
      }
    },
    slideInRight: {
      hidden: { opacity: 0, x: 30 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: {
          duration: 0.5,
          ease: "easeOut"
        }
      }
    },
    scaleIn: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: {
          duration: 0.4,
          ease: "easeOut"
        }
      }
    },
    slideUp: {
      hidden: { opacity: 0, y: 40 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.6,
          ease: "easeOut"
        }
      }
    },
    staggerContainer: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: 0.3,
          ease: "easeOut",
          staggerChildren: 0.1,
          delayChildren: 0.2
        }
      }
    },
    staggerItem: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: "easeOut"
        }
      }
    }
  },
  
  // Safe scroll configurations
  scroll: {
    viewport: {
      once: true,
      margin: "-100px"
    },
    smoothViewport: {
      once: true,
      margin: "-50px",
      amount: 0.3
    }
  },
  
  // Hover animations
  hover: {
    scale: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    lift: {
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  },
  
  // Safe tap animations
  tap: {
    scale: {
      scale: 0.95,
      transition: {
        duration: 0.1,
        ease: "easeOut"
      }
    }
  }
};

export default PROFESSIONAL_ANIMATIONS; 