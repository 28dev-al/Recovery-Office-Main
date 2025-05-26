/**
 * Animation Performance Monitoring Utilities
 * 
 * This module provides utilities for monitoring and optimizing animation performance,
 * ensuring smooth animations that follow sacred geometry principles.
 */

/**
 * Represents a performance measurement for an animation
 */
export interface AnimationPerformanceMetrics {
  /**
   * Animation name or identifier
   */
  name: string;
  
  /**
   * Start time of the animation in milliseconds
   */
  startTime: number;
  
  /**
   * End time of the animation in milliseconds
   */
  endTime?: number;
  
  /**
   * Duration of the animation in milliseconds
   */
  duration?: number;
  
  /**
   * Number of frames rendered during the animation
   */
  frames?: number;
  
  /**
   * Average frames per second during the animation
   */
  fps?: number;
  
  /**
   * Whether the animation dropped frames
   */
  droppedFrames?: boolean;
  
  /**
   * Number of frames dropped during the animation
   */
  droppedFrameCount?: number;
  
  /**
   * Whether the animation used GPU-accelerated properties
   */
  gpuAccelerated?: boolean;
  
  /**
   * Whether the animation was optimized for performance
   */
  optimized?: boolean;
}

/**
 * Animation performance measurements store
 */
const performanceMeasurements: Record<string, AnimationPerformanceMetrics> = {};

/**
 * Starts measuring the performance of an animation
 * 
 * @param name - Unique identifier for the animation
 * @param gpuAccelerated - Whether the animation uses GPU-accelerated properties
 * @returns The animation identifier to be used to stop the measurement
 */
export const startMeasuringAnimation = (
  name: string, 
  gpuAccelerated = true
): string => {
  const id = `${name}_${Date.now()}`;
  
  performanceMeasurements[id] = {
    name,
    startTime: performance.now(),
    gpuAccelerated,
    frames: 0,
    droppedFrameCount: 0
  };
  
  // Setup frame counting
  const countFrame = () => {
    if (!performanceMeasurements[id] || performanceMeasurements[id]?.endTime) {
      return;
    }
    
    performanceMeasurements[id].frames = (performanceMeasurements[id]?.frames || 0) + 1;
    
    // Check if frame rate drops below 60fps
    const currentTime = performance.now();
    const elapsedTime = currentTime - performanceMeasurements[id].startTime;
    const expectedFrames = elapsedTime / (1000 / 60); // Expected frames at 60fps
    
    if ((performanceMeasurements[id]?.frames || 0) < expectedFrames - 1) {
      performanceMeasurements[id].droppedFrames = true;
      performanceMeasurements[id].droppedFrameCount = 
        (performanceMeasurements[id]?.droppedFrameCount || 0) + 1;
    }
    
    requestAnimationFrame(countFrame);
  };
  
  requestAnimationFrame(countFrame);
  
  return id;
};

/**
 * Stops measuring the performance of an animation and returns the metrics
 * 
 * @param id - The animation identifier returned by startMeasuringAnimation
 * @returns The performance metrics for the animation
 */
export const stopMeasuringAnimation = (id: string): AnimationPerformanceMetrics | null => {
  if (!performanceMeasurements[id]) {
    console.warn(`No animation measurement found with id: ${id}`);
    return null;
  }
  
  const endTime = performance.now();
  const measurement = performanceMeasurements[id];
  
  measurement.endTime = endTime;
  measurement.duration = endTime - measurement.startTime;
  
  // Calculate FPS
  if (measurement.frames && measurement.duration) {
    measurement.fps = (measurement.frames / measurement.duration) * 1000;
  }
  
  // Determine if animation was optimized
  measurement.optimized = Boolean(
    measurement.gpuAccelerated && 
    measurement.fps && 
    measurement.fps > 55 && // Over 55fps is considered optimized
    !measurement.droppedFrames
  );
  
  return measurement;
};

/**
 * Gets all performance measurements
 * 
 * @returns All animation performance measurements
 */
export const getAllAnimationMeasurements = (): Record<string, AnimationPerformanceMetrics> => {
  return { ...performanceMeasurements };
};

/**
 * Clears all performance measurements
 */
export const clearAnimationMeasurements = (): void => {
  Object.keys(performanceMeasurements).forEach(key => {
    delete performanceMeasurements[key];
  });
};

/**
 * Gets performance recommendations based on measurements
 * 
 * @returns Array of performance recommendations
 */
export const getAnimationPerformanceRecommendations = (): string[] => {
  const recommendations: string[] = [];
  const measurements = Object.values(performanceMeasurements);
  
  // Check for non-GPU accelerated animations
  const nonGpuAccelerated = measurements.filter(m => !m.gpuAccelerated);
  if (nonGpuAccelerated.length > 0) {
    recommendations.push(
      'Use GPU-accelerated properties (transform, opacity) instead of properties that cause layout recalculation'
    );
  }
  
  // Check for animations with dropped frames
  const droppedFrames = measurements.filter(m => m.droppedFrames);
  if (droppedFrames.length > 0) {
    recommendations.push(
      'Some animations are dropping frames. Consider simplifying animations or reducing the number of animated elements.'
    );
  }
  
  // Check for low FPS animations
  const lowFps = measurements.filter(m => m.fps && m.fps < 30);
  if (lowFps.length > 0) {
    recommendations.push(
      'Some animations are running at low frame rates. Consider using simpler animations or optimizing rendering.'
    );
  }
  
  return recommendations;
};

/**
 * Creates a wrapper component or function to measure animation performance
 * 
 * @param animationFn - The animation function to measure
 * @param name - Name for the animation
 * @returns A wrapped function that measures performance
 */
export function withPerformanceMeasurement<T extends (...args: any[]) => any>(
  animationFn: T,
  name: string
): (...args: Parameters<T>) => ReturnType<T> {
  return (...args: Parameters<T>): ReturnType<T> => {
    const id = startMeasuringAnimation(name);
    
    try {
      const result = animationFn(...args);
      
      // If the result is a Promise, handle async results
      if (result instanceof Promise) {
        return result.finally(() => {
          stopMeasuringAnimation(id);
        }) as ReturnType<T>;
      }
      
      stopMeasuringAnimation(id);
      return result;
    } catch (error) {
      stopMeasuringAnimation(id);
      throw error;
    }
  };
} 





