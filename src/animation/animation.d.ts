/**
 * Animation Component Types
 * 
 * This file defines the TypeScript interfaces for all animation components
 * in the Recovery Office design system.
 */

import { BoxProps } from '../design-system/types';
import { SACRED_EASINGS } from '../constants/sacred-geometry';
import { ReactNode, CSSProperties } from 'react';
import { SacredGeometryConfig } from '../types/general.types';

/**
 * Animation Type Definitions
 * 
 * This file contains TypeScript interfaces and types for the animation system,
 * incorporating sacred geometry principles into motion and transitions.
 */

/**
 * Base animation props
 */
export interface AnimationProps {
  /** Whether the animation is enabled */
  isEnabled?: boolean;
  
  /** Animation duration in milliseconds */
  duration?: number;
  
  /** Animation delay in milliseconds */
  delay?: number;
  
  /** Animation easing function */
  easing?: 'standard' | 'easeIn' | 'easeOut' | 'botanical';
  
  /** Whether to use golden ratio timing */
  useGoldenRatio?: boolean;
  
  /** Whether to use Fibonacci sequence for timing */
  useFibonacciTiming?: boolean;
  
  /** Children elements to animate */
  children: ReactNode;
  
  /** Callback when animation starts */
  onStart?: () => void;
  
  /** Callback when animation completes */
  onComplete?: () => void;
}

/**
 * Fade animation props
 */
export interface FadeProps extends AnimationProps {
  /** Initial opacity */
  initialOpacity?: number;
  
  /** Final opacity */
  finalOpacity?: number;
}

/**
 * Slide animation props
 */
export interface SlideProps extends AnimationProps {
  /** Direction to slide from */
  direction?: 'up' | 'down' | 'left' | 'right';
  
  /** Distance to slide (px or % values) */
  distance?: string | number;
}

/**
 * Scale animation props
 */
export interface ScaleProps extends AnimationProps {
  /** Initial scale value */
  initialScale?: number;
  
  /** Final scale value */
  finalScale?: number;
  
  /** Origin point for scaling transformation */
  origin?: string;
}

/**
 * Rotate animation props
 */
export interface RotateProps extends AnimationProps {
  /** Rotation amount in degrees */
  degrees?: number;
  
  /** Origin point for rotation transformation */
  origin?: string;
}

/**
 * Golden spiral animation props
 */
export interface GoldenSpiralProps extends AnimationProps {
  /** Number of rotations */
  rotations?: number;
  
  /** Whether to animate in or out */
  direction?: 'in' | 'out';
  
  /** Scale amount */
  scale?: number;
}

/**
 * Stagger animation props
 */
export interface StaggerProps extends AnimationProps {
  /** Stagger delay between children */
  staggerDelay?: number;
  
  /** Whether to use Fibonacci sequence for stagger timing */
  useFibonacciStagger?: boolean;
}

/**
 * Scroll animation props
 */
export interface ScrollAnimationProps extends AnimationProps {
  /** Threshold for triggering animation (0-1) */
  threshold?: number;
  
  /** Whether to reset animation when scrolling out of view */
  reset?: boolean;
  
  /** Root margin for intersection observer */
  rootMargin?: string;
}

/**
 * Animation trigger options
 */
export type AnimationTrigger = 'onMount' | 'onScroll' | 'onHover' | 'onClick' | 'manual';

/**
 * Animation sequence step
 */
export interface AnimationStep {
  /** Animation type */
  type: 'fade' | 'slide' | 'scale' | 'rotate' | 'goldenSpiral';
  
  /** Animation properties */
  props: Partial<AnimationProps>;
  
  /** Animation duration */
  duration: number;
  
  /** Animation delay */
  delay?: number;
}

/**
 * Animation sequence props
 */
export interface AnimationSequenceProps {
  /** Animation steps to perform in sequence */
  steps: AnimationStep[];
  
  /** Whether the sequence is enabled */
  isEnabled?: boolean;
  
  /** Whether to loop the sequence */
  loop?: boolean;
  
  /** How many times to loop (if loop is true) */
  loopCount?: number;
  
  /** Whether to alternate direction on loop */
  yoyo?: boolean;
  
  /** Callback when sequence completes */
  onComplete?: () => void;
  
  /** Children to animate */
  children: ReactNode;
}

/**
 * Sacred geometry animation configuration
 */
export interface SacredAnimationConfig extends SacredGeometryConfig {
  /** Whether to use Fibonacci sequence for timing */
  useFibonacciTiming: boolean;
  
  /** Whether to use golden ratio for animation properties */
  useGoldenRatio: boolean;
  
  /** Whether to use sacred easing functions */
  useSacredEasing: boolean;
}

/**
 * Animation provider context
 */
export interface AnimationContextProps {
  /** Global animation configuration */
  config: SacredAnimationConfig;
  
  /** Whether animations are globally enabled */
  animationsEnabled: boolean;
  
  /** Whether to use reduced motion (for accessibility) */
  reducedMotion: boolean;
  
  /** Set global animation configuration */
  setConfig: (config: Partial<SacredAnimationConfig>) => void;
  
  /** Enable/disable animations globally */
  setAnimationsEnabled: (enabled: boolean) => void;
}

/**
 * Animation keyframes
 */
export type KeyframeObject = Record<string, CSSProperties>;

/**
 * Animation variants for framer-motion
 */
export interface AnimationVariants {
  initial: CSSProperties;
  animate: CSSProperties;
  exit?: CSSProperties;
}

/**
 * FadeIn component props
 */
export interface FadeInProps extends Omit<BoxProps, 'as' | 'ref'> {
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
  duration?: 'faster' | 'fast' | 'normal' | 'slow' | 'slower' | number;
  
  /**
   * Delay before animation starts (in seconds)
   * @default 0
   */
  delay?: number;
  
  /**
   * Easing function to use
   * @default 'standard'
   */
  easing?: keyof typeof SACRED_EASINGS;
  
  /**
   * Whether to use golden ratio applied to duration
   * @default true
   */
  useGoldenRatio?: boolean;
  
  /**
   * Initial opacity value
   * @default 0
   */
  initialOpacity?: number;
  
  /**
   * Whether to stay mounted when not visible
   * @default false
   */
  stayMounted?: boolean;

  /**
   * Optional scale effect applied during fade
   * @default undefined
   */
  scale?: number;
}

/**
 * ScaleFade component props
 */
export interface ScaleFadeProps extends Omit<BoxProps, 'as' | 'ref'> {
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
  duration?: 'faster' | 'fast' | 'normal' | 'slow' | 'slower' | number;
  
  /**
   * Delay before animation starts (in seconds)
   * @default 0
   */
  delay?: number;
  
  /**
   * Easing function to use
   * @default 'standard'
   */
  easing?: keyof typeof SACRED_EASINGS;
  
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
   * Whether to stay mounted when not visible
   * @default false
   */
  stayMounted?: boolean;
  
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
export interface SlideInProps extends Omit<BoxProps, 'as' | 'ref'> {
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
   * Animation duration in seconds
   * @default 'normal'
   */
  duration?: 'faster' | 'fast' | 'normal' | 'slow' | 'slower' | number;
  
  /**
   * Delay before animation starts (in seconds)
   * @default 0
   */
  delay?: number;
  
  /**
   * Easing function to use
   * @default 'standard'
   */
  easing?: keyof typeof SACRED_EASINGS;
  
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
  
  /**
   * Whether to stay mounted when not visible
   * @default false
   */
  stayMounted?: boolean;
}

/**
 * Variants for scroll reveal animations
 */
export type ScrollRevealVariant = 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 
                               'scale' | 'scale-fade' | 'none';

/**
 * ScrollReveal component props
 */
export interface ScrollRevealProps extends Omit<BoxProps, 'as' | 'ref'> {
  /**
   * The content to be animated
   */
  children: React.ReactNode;
  
  /**
   * Polymorphic as prop for rendering different HTML elements
   * or other React components
   */
  as?: React.ElementType;
  
  /**
   * Animation variant to use when revealed
   * @default 'fade'
   */
  variant?: ScrollRevealVariant;
  
  /**
   * Animation duration in seconds
   * @default 'normal'
   */
  duration?: 'faster' | 'fast' | 'normal' | 'slow' | 'slower' | number;
  
  /**
   * Delay before animation starts (in seconds)
   * @default 0
   */
  delay?: number;
  
  /**
   * Easing function to use
   * @default 'standard'
   */
  easing?: keyof typeof SACRED_EASINGS;
  
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
  
  /**
   * Whether to apply golden ratio to duration
   * @default true
   */
  useGoldenRatio?: boolean;
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
 * Animation variants for the Sequence component
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
  duration?: number;
  
  /**
   * Easing function to use
   * @default 'standard'
   */
  easing?: keyof typeof SACRED_EASINGS;
  
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
  duration?: 'faster' | 'fast' | 'normal' | 'slow' | 'slower' | number;
  
  /**
   * Delay before animation starts (in seconds)
   * @default 0
   */
  delay?: number;
  
  /**
   * Easing function to use
   * @default 'standard'
   */
  easing?: keyof typeof SACRED_EASINGS;
  
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
export interface MorphingShapeProps extends Omit<BoxProps, 'as' | 'ref'> {
  /**
   * Array of SVG path strings to morph between
   */
  paths: string[];
  
  /**
   * Active path index
   * @default 0
   */
  activeIndex?: number;
  
  /**
   * Animation duration in seconds
   * @default 'normal'
   */
  duration?: 'faster' | 'fast' | 'normal' | 'slow' | 'slower' | number;
  
  /**
   * Delay before animation starts (in seconds)
   * @default 0
   */
  delay?: number;
  
  /**
   * Easing function to use
   * @default 'standard'
   */
  easing?: keyof typeof SACRED_EASINGS;
  
  /**
   * Whether to use golden ratio applied to duration
   * @default true
   */
  useGoldenRatio?: boolean;
  
  /**
   * Fill color of the SVG
   * @default "currentColor"
   */
  fill?: string;
  
  /**
   * Stroke color of the SVG
   * @default "none"
   */
  stroke?: string;
  
  /**
   * Stroke width of the SVG
   * @default 0
   */
  strokeWidth?: number;
  
  /**
   * SVG viewBox attribute
   * @default "0 0 100 100"
   */
  viewBox?: string;
  
  /**
   * Whether to loop through shapes
   * @default false
   */
  loop?: boolean;
  
  /**
   * Interval between shape changes when looping (in seconds)
   * @default 3
   */
  loopInterval?: number;
} 














