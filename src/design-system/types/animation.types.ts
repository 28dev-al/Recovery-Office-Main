/**
 * Animation Type Definitions
 * 
 * This file defines TypeScript interfaces for animation components
 * that follow sacred geometry principles throughout the application.
 */

import * as React from 'react';
import { HTMLMotionProps } from 'framer-motion';
import { BoxProps } from './styled.types';
import { SACRED_EASINGS, ANIMATION_TIMING } from '../../constants/sacred-geometry';

// Base animation timing types
export type AnimationDuration = 'faster' | 'fast' | 'normal' | 'slow' | 'slower' | number;
export type AnimationDirection = 'up' | 'down' | 'left' | 'right';

// Custom easing function type
export type CustomEasingFunction = (t: number) => number;

// Combined easing type - can be a string key or a function
export type EasingType = keyof typeof SACRED_EASINGS;
export type EasingValue = EasingType | CustomEasingFunction;

/**
 * Base animation props shared by all animation components
 * Combines BoxProps with essential animation props, removing 'as' and 'ref'
 */
export interface BaseAnimationProps extends Omit<BoxProps, 'as' | 'ref'> {
  /**
   * The content to be animated
   */
  children: React.ReactNode;
  
  /**
   * Whether the content is visible/shown
   * @default true
   */
  isVisible?: boolean;
  
  /**
   * Animation duration in seconds
   * @default 'normal'
   */
  duration?: AnimationDuration;
  
  /**
   * Delay before animation starts (in seconds)
   * @default 0
   */
  delay?: number;
  
  /**
   * Easing function to use
   * @default 'standard'
   */
  easing?: EasingValue;
  
  /**
   * Whether to use golden ratio applied to duration
   * @default true
   */
  useGoldenRatio?: boolean;
  
  /**
   * Whether to stay mounted when not visible
   * @default false
   */
  stayMounted?: boolean;
}

/**
 * FadeIn component props - extends BaseAnimationProps and adds framer-motion compatibility
 */
export interface FadeInProps extends BaseAnimationProps, Omit<HTMLMotionProps<"div">, keyof BaseAnimationProps> {
  /**
   * Initial opacity value
   * @default 0
   */
  initialOpacity?: number;

  /**
   * Optional scale effect applied during fade
   * @default undefined
   */
  scale?: number;
}

/**
 * ScaleFade component props
 */
export interface ScaleFadeProps extends BaseAnimationProps {
  /**
   * Initial scale factor when hidden
   * Using PHI_INVERSE (0.618) creates a natural scale effect
   * @default PHI_INVERSE (0.618)
   */
  initialScale?: number;
  
  /**
   * Final scale factor when visible
   * @default 1
   */
  finalScale?: number;
  
  /**
   * Initial opacity value
   * @default 0
   */
  initialOpacity?: number;
  
  /**
   * Origin point for the scale animation
   * @default 'center'
   */
  transformOrigin?: string;
  
  /**
   * Whether to reverse the animation (zoom out instead of zoom in)
   * @default false
   */
  reverse?: boolean;
}

/**
 * Direction for the slide animation
 */
export type SlideDirection = 'up' | 'down' | 'left' | 'right';

/**
 * SlideIn component props
 */
export interface SlideInProps extends BaseAnimationProps {
  /**
   * Direction for the slide animation
   * @default 'up'
   */
  direction?: SlideDirection;
  
  /**
   * Distance to slide in pixels
   * @default 34 (Fibonacci number)
   */
  distance?: number;
  
  /**
   * Whether to fade in/out during slide
   * @default true
   */
  withFade?: boolean;
  
  /**
   * Initial opacity value when hidden
   * @default 0
   */
  initialOpacity?: number;
}

/**
 * Variants for scroll reveal animations
 */
export type ScrollRevealVariant = 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 
                               'scale' | 'scale-fade' | 'none';

/**
 * ScrollReveal component props
 */
export interface ScrollRevealProps extends BaseAnimationProps {
  /**
   * Animation variant to use when revealed
   * @default 'fade'
   */
  variant?: ScrollRevealVariant;
  
  /**
   * Threshold for when element is considered in view (0-1)
   * @default 0.2 (20% visible)
   */
  threshold?: number;
  
  /**
   * Distance to move when using slide variants (in pixels)
   * @default 34 (Fibonacci number)
   */
  distance?: number;
  
  /**
   * Whether to reset animation when element leaves viewport
   * @default false
   */
  resetOnExit?: boolean;
  
  /**
   * Margin around the root used for intersection checking
   * Format: "top right bottom left" in pixels
   * @default "0px"
   */
  rootMargin?: string;
  
  /**
   * Initial scale for scale animations
   * @default PHI_INVERSE (0.618)
   */
  initialScale?: number;
}

/**
 * Sequence variants for animation
 */
export type SequenceVariant = 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'none';

/**
 * Sequence component props
 */
export interface SequenceProps extends Omit<BoxProps, 'as' | 'ref'> {
  /**
   * The children to animate in sequence
   */
  children: React.ReactNode;
  
  /**
   * Whether the sequence is visible
   * @default true
   */
  isVisible?: boolean;
  
  /**
   * Animation variant for child elements
   * @default 'fade'
   */
  variant?: SequenceVariant;
  
  /**
   * Delay between child animations in seconds
   * @default 0.1
   */
  staggerDelay?: number;
  
  /**
   * Whether to use Fibonacci sequence for stagger timing
   * @default true
   */
  useFibonacciStagger?: boolean;
  
  /**
   * Animation duration for each child in seconds
   * @default 0.5
   */
  duration?: number | AnimationDuration;
  
  /**
   * Easing function to use
   * @default 'standard'
   */
  easing?: EasingValue;
  
  /**
   * Distance to move when using slide variants (in pixels)
   * @default 34 (Fibonacci number)
   */
  distance?: number;
  
  /**
   * Whether to animate on mount
   * @default true
   */
  animateOnMount?: boolean;
  
  /**
   * Container element to use
   * @default 'div'
   */
  containerElement?: keyof JSX.IntrinsicElements;
  
  /**
   * Whether to allow animations to overlap
   * @default false
   */
  allowOverlap?: boolean;
  
  /**
   * Whether to disable animations
   * @default false
   */
  disableAnimation?: boolean;
  
  /**
   * Direction of the sequence
   * @default 'forward'
   */
  direction?: 'forward' | 'reverse';
}

/**
 * Morph component props
 */
export interface MorphProps extends Omit<BoxProps, 'as' | 'ref'> {
  /**
   * SVG path data strings to morph between
   */
  paths: string[];
  
  /**
   * Current active path index to display
   * @default 0
   */
  activeIndex?: number;
  
  /**
   * Animation duration in seconds
   * @default 'normal'
   */
  duration?: AnimationDuration;
  
  /**
   * Delay before animation starts (in seconds)
   * @default 0
   */
  delay?: number;
  
  /**
   * Easing function to use
   * @default 'standard'
   */
  easing?: EasingValue;
  
  /**
   * Whether to fill the SVG
   * @default false
   */
  fill?: boolean;
  
  /**
   * Fill color for the SVG
   * @default "currentColor"
   */
  fillColor?: string;
  
  /**
   * Stroke color for the SVG
   * @default "currentColor"
   */
  strokeColor?: string;
  
  /**
   * Stroke width for the SVG
   * @default 2
   */
  strokeWidth?: number;
  
  /**
   * Width of the SVG element
   * @default "100%"
   */
  width?: string | number;
  
  /**
   * Height of the SVG element
   * @default "100%"
   */
  height?: string | number;
  
  /**
   * SVG viewBox attribute
   * @default "0 0 100 100"
   */
  viewBox?: string;
  
  /**
   * Whether to preserve aspect ratio
   * @default "xMidYMid meet"
   */
  preserveAspectRatio?: string;
  
  /**
   * Whether to apply golden ratio to duration
   * @default true
   */
  useGoldenRatio?: boolean;
  
  /**
   * Whether to cycle through paths automatically
   * @default false
   */
  cycle?: boolean;
  
  /**
   * Interval for cycling through paths (in seconds)
   * @default 5
   */
  cycleInterval?: number;
}

/**
 * MorphingShape component props
 */
export interface MorphingShapeProps extends Omit<MorphProps, 'paths'> {
  /**
   * Shape type to morph between
   * @default 'rectangle'
   */
  shapes?: ('circle' | 'rectangle' | 'triangle' | 'hexagon' | 'star' | 'spiral')[];
  
  /**
   * Custom SVG paths to use instead of predefined shapes
   */
  customPaths?: string[];
}

/**
 * ParallaxLayer component props
 */
export interface ParallaxLayerProps extends Omit<BoxProps, 'as' | 'ref'> {
  /**
   * The content to be animated with parallax effect
   */
  children: React.ReactNode;
  
  /**
   * Speed factor for the parallax effect
   * - Positive values: element moves slower than scroll (background effect)
   * - Negative values: element moves faster than scroll (foreground effect)
   * - 0: element moves at normal scroll speed
   * @default -0.5
   */
  speed?: number;
  
  /**
   * Whether to apply the effect on the horizontal axis instead of vertical
   * @default false
   */
  horizontal?: boolean;
  
  /**
   * Whether to apply golden ratio principles to the parallax effect
   * @default true
   */
  useGoldenRatio?: boolean;
  
  /**
   * Range of motion in pixels for the parallax effect
   * @default 100
   */
  range?: number;
  
  /**
   * Offset for where the parallax effect starts (0-1)
   * 0 = top of viewport, 1 = bottom of viewport
   * @default 0.5
   */
  offset?: number;
  
  /**
   * Whether to enable or disable the parallax effect
   * @default true
   */
  enabled?: boolean;
  
  /**
   * Optional HTML tag to render for accessibility reasons
   * @default 'div'
   */
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Parallax component props
 */
export interface ParallaxProps extends BoxProps {
  /**
   * Whether to enable the parallax effect.
   * When disabled, all layers will move at normal scroll speed.
   * @default true
   */
  enabled?: boolean;
  
  /**
   * Whether to use sacred geometry proportions for calculating depths
   * @default true
   */
  useSacredGeometry?: boolean;
  
  /**
   * Whether to apply golden ratio principles to the parallax effect
   * @default true
   */
  useGoldenRatio?: boolean;
  
  /**
   * Custom perspective value for 3D effect (in pixels)
   * If not provided, a Fibonacci-based value will be used
   */
  perspective?: number;
  
  /**
   * Children elements, typically ParallaxLayer components
   */
  children: React.ReactNode;
}

/**
 * Animation config for useAnimationConfig hook
 */
export interface AnimationConfigOptions {
  type: 'fadeIn' | 'fadeOut' | 'scaleIn' | 'scaleOut' | 'slideIn' | 'slideOut' | 'rotate' | 'path';
  direction?: SlideDirection;
  duration?: keyof typeof ANIMATION_TIMING | number;
  easing?: EasingValue;
  distance?: number;
  initialScale?: number;
  reducedMotionConfig?: any;
} 