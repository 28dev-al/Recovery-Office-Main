import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { PROFESSIONAL_ANIMATIONS } from '../../utils/animations';

interface SafeMotionProps extends MotionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorState {
  hasError: boolean;
  error?: Error;
}

/**
 * Error Boundary specifically for animation errors
 */
export class AnimationErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode }, 
  ErrorState
> {
  public state: ErrorState = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): ErrorState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('Animation error caught:', error.message, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div style={{ 
          padding: '10px', 
          opacity: 0.8,
          transition: 'opacity 0.3s ease'
        }}>
          {this.props.children}
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Error-safe motion wrapper
 */
export const SafeMotion: React.FC<SafeMotionProps> = ({ 
  children, 
  fallback = null,
  ...motionProps 
}) => {
  try {
    return (
      <AnimationErrorBoundary fallback={fallback}>
        <motion.div
          {...motionProps}
          transition={motionProps.transition || PROFESSIONAL_ANIMATIONS.transitions.default}
        >
          {children}
        </motion.div>
      </AnimationErrorBoundary>
    );
  } catch (error) {
    console.warn('Motion animation failed:', error);
    return <div style={{ opacity: 0.9 }}>{fallback || children}</div>;
  }
};

/**
 * Safe scroll-triggered animations
 */
export const SafeScrollMotion: React.FC<SafeMotionProps> = ({ 
  children, 
  fallback = null,
  ...motionProps 
}) => {
  return (
    <SafeMotion
      variants={PROFESSIONAL_ANIMATIONS.variants.fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={PROFESSIONAL_ANIMATIONS.scroll.viewport}
      fallback={fallback}
      {...motionProps}
    >
      {children}
    </SafeMotion>
  );
};

/**
 * Safe stagger animations for lists
 */
export const SafeStaggerMotion: React.FC<SafeMotionProps> = ({ 
  children, 
  fallback = null,
  ...motionProps 
}) => {
  return (
    <SafeMotion
      variants={PROFESSIONAL_ANIMATIONS.variants.staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={PROFESSIONAL_ANIMATIONS.scroll.smoothViewport}
      fallback={fallback}
      {...motionProps}
    >
      {children}
    </SafeMotion>
  );
};

/**
 * Safe stagger item for use within SafeStaggerMotion
 */
export const SafeStaggerItem: React.FC<SafeMotionProps> = ({ 
  children, 
  fallback = null,
  ...motionProps 
}) => {
  return (
    <SafeMotion
      variants={PROFESSIONAL_ANIMATIONS.variants.staggerItem}
      fallback={fallback}
      {...motionProps}
    >
      {children}
    </SafeMotion>
  );
};

/**
 * Safe hover animations
 */
export const SafeHoverMotion: React.FC<SafeMotionProps> = ({ 
  children, 
  fallback = null,
  ...motionProps 
}) => {
  return (
    <SafeMotion
      whileHover={PROFESSIONAL_ANIMATIONS.hover.lift}
      whileTap={PROFESSIONAL_ANIMATIONS.tap.scale}
      fallback={fallback}
      {...motionProps}
    >
      {children}
    </SafeMotion>
  );
};

export default SafeMotion; 