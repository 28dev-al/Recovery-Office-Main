# Animation Components

## Overview

The animation components in the Recovery Office design system provide a harmonious, natural-feeling motion experience based on sacred geometry principles. Each animation incorporates the Golden Ratio (PHI = 1.618), Fibonacci sequence, and carefully crafted easing functions to create visually pleasing transitions that reinforce the brand's values of renewal and balance.

All animation components are built with accessibility in mind, respecting user preferences for reduced motion when specified.

## Core Principles

1. **Sacred Timing**: All durations and delays are based on Fibonacci numbers and the Golden Ratio.
2. **Natural Easing**: Custom easing functions incorporate PHI for natural acceleration and deceleration.
3. **Harmonious Motion**: Movement paths and scale factors follow sacred geometry principles.
4. **Progressive Disclosure**: Staggered animations reveal content in a natural, rhythmic sequence.
5. **Accessibility First**: All animations respect user preferences for reduced motion.

## Components

### FadeIn

The FadeIn component gradually reveals its children with a smooth opacity transition.

```tsx
<FadeIn
  isVisible={true}
  duration="normal"
  easing="standard"
  useGoldenRatio
>
  <YourContent />
</FadeIn>
```

### ScaleFade

Combines scaling and fading effects for entrance/exit animations, using PHI_INVERSE (0.618) as the initial scale.

```tsx
<ScaleFade
  isVisible={true}
  initialScale={0.618} // PHI_INVERSE
  duration="normal"
  easing="easeOut"
>
  <YourContent />
</ScaleFade>
```

### SlideIn

Animates content entering from a specific direction with a distance typically based on Fibonacci numbers.

```tsx
<SlideIn
  isVisible={true}
  direction="up"
  distance={34} // Fibonacci number
  duration="normal"
  easing="standard"
>
  <YourContent />
</SlideIn>
```

### ScrollReveal

Triggers animations when elements enter the viewport, ideal for progressive disclosure of content.

```tsx
<ScrollReveal
  variant="fade"
  threshold={0.1}
  useGoldenRatio
>
  <YourContent />
</ScrollReveal>
```

### ParallaxLayer

Creates depth through parallax scrolling effects, with movement calculated using sacred geometry.

```tsx
<ParallaxLayer
  depth={1.618} // PHI
  direction="vertical"
  useGoldenRatioPhysics
>
  <YourContent />
</ParallaxLayer>
```

### Sequence

Animates multiple children in sequence with staggered timing based on Fibonacci sequences.

```tsx
<Sequence
  isVisible={true}
  variant="slide-up"
  useFibonacciStagger
  staggerDelay={0.1}
>
  <Item1 />
  <Item2 />
  <Item3 />
</Sequence>
```

### Morph

Animates between SVG paths with smooth transitions, ideal for botanical element animations.

```tsx
<Morph
  paths={svgPaths}
  activeIndex={0}
  duration="slow"
  easing="spring"
  useGoldenRatio
/>
```

## Sacred Timing

The animation system uses these timing constants based on sacred geometry:

```typescript
// Animation timing based on Fibonacci sequence (in milliseconds)
const ANIMATION_DURATIONS = {
  instant: 2,    // FIBONACCI[3]
  faster: 5,     // FIBONACCI[5]
  fast: 80,      // FIBONACCI[6] * 10
  normal: 130,   // FIBONACCI[7] * 10
  slow: 210,     // FIBONACCI[8] * 10
  slower: 340,   // FIBONACCI[9] * 10
  slowest: 550,  // FIBONACCI[10] * 10
};
```

## Sacred Easings

Custom easing functions derived from the Golden Ratio:

```typescript
// Animation easing based on Golden Ratio
const SACRED_EASINGS = {
  // Standard golden ratio cubic-bezier
  standard: [0.618, 0, 0.382, 1], // [PHI_INVERSE, 0, 1-PHI_INVERSE, 1]
  
  // Golden ratio inspired easings
  easeIn: [0.618, 0, 1, 1],       // [PHI_INVERSE, 0, 1, 1]
  easeOut: [0, 0, 0.618, 1],      // [0, 0, PHI_INVERSE, 1]
  easeInOut: [0.618, 0, 0.618, 1], // [PHI_INVERSE, 0, PHI_INVERSE, 1]
  
  // Natural spring effect
  spring: [0.618, -0.382, 0.382, 1], // [PHI_INVERSE, PHI_INVERSE-1, 1-PHI_INVERSE, 1]
};
```

## Accessibility

All animation components respect the `prefers-reduced-motion` media query, automatically adjusting or disabling animations for users who prefer reduced motion.

```tsx
// Example of reduced motion handling in animation components
const prefersReducedMotion = typeof window !== 'undefined' 
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
  : false;

// Apply simpler animation or none at all
const animationVariant = prefersReducedMotion 
  ? { opacity: [0, 1] } 
  : { opacity: [0, 1], y: [20, 0] };
```

## Examples

For a comprehensive showcase of all animation components, see the `AnimationExample.tsx` file in the examples directory.

## Best Practices

1. **Purpose Over Decoration**: Use animations to guide users and improve usability, not just for decoration.
2. **Subtle Over Flashy**: Prefer subtle animations that enhance without overwhelming.
3. **Consistent Timing**: Use the predefined `ANIMATION_DURATIONS` constants for consistency.
4. **Natural Easing**: Always use the sacred easing functions in `SACRED_EASINGS`.
5. **Group Related Animations**: Use the `Sequence` component for related elements.
6. **Optimize Performance**: Use GPU-accelerated properties (`transform`, `opacity`) when possible.
7. **Test on Low-End Devices**: Ensure animations perform well across device capabilities. 