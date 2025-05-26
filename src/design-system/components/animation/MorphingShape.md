# MorphingShape Component

The MorphingShape component enables fluid transition animations between SVG paths. It's built using sacred geometry principles for timing and easing, creating natural and visually pleasing morphing effects.

## Sacred Geometry Implementation

The MorphingShape component incorporates several sacred geometry principles:

- **Golden Ratio Timing**: Animation durations are adjusted using the Golden Ratio (PHI ≈ 1.618) and its inverse (PHI_INVERSE ≈ 0.618) to create naturally flowing transitions.
- **Sacred Easing Functions**: Utilizes easing functions derived from the golden ratio for smooth, organic motion.
- **Fibonacci-Based Intervals**: When in auto-cycling mode, intervals between transitions can follow the Fibonacci sequence.

## Properties

| Property        | Type                 | Default       | Description                                       |
|-----------------|----------------------|---------------|---------------------------------------------------|
| `paths`         | `string[]`           | (Required)    | Array of SVG path strings to morph between        |
| `activeIndex`   | `number`             | `0`           | Index of the currently active path                |
| `duration`      | `string \| number`   | `'normal'`    | Animation duration (predefined or seconds)        |
| `delay`         | `number`             | `0`           | Delay before animation starts (seconds)           |
| `easing`        | `string`             | `'standard'`  | Easing function to use                            |
| `useGoldenRatio`| `boolean`            | `true`        | Whether to apply golden ratio to duration         |
| `fill`          | `string`             | `'currentColor'` | Fill color of the SVG                          |
| `stroke`        | `string`             | `'none'`      | Stroke color of the SVG                           |
| `strokeWidth`   | `number`             | `0`           | Stroke width of the SVG                           |
| `viewBox`       | `string`             | `'0 0 100 100'` | SVG viewBox attribute                           |
| `loop`          | `boolean`            | `false`       | Whether to loop through shapes                    |
| `loopInterval`  | `number`             | `3`           | Interval between shape changes when looping (seconds) |

## Basic Usage

```tsx
import { MorphingShape } from '../design-system/components/animation';

// Basic usage with a single path
const CircleExample = () => (
  <MorphingShape
    paths={["M50,50 m-40,0 a40,40 0 1,0 80,0 a40,40 0 1,0 -80,0"]}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
  />
);

// Morphing between multiple paths
const MorphingExample = () => {
  const paths = [
    "M50,50 m-40,0 a40,40 0 1,0 80,0 a40,40 0 1,0 -80,0", // Circle
    "M10,10 L90,10 L90,90 L10,90 Z" // Square
  ];
  
  return (
    <MorphingShape
      paths={paths}
      activeIndex={0}
      duration="slow"
      easing="goldenEaseInOut"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    />
  );
};
```

## Controlled Morphing Example

```tsx
import React, { useState } from 'react';
import { MorphingShape } from '../design-system/components/animation';
import { Button } from '../design-system/components/button';

const ControlledMorphing = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const paths = [
    // Circle
    "M50,50 m-40,0 a40,40 0 1,0 80,0 a40,40 0 1,0 -80,0",
    // Square
    "M10,10 L90,10 L90,90 L10,90 Z",
    // Triangle
    "M50,10 L90,85 L10,85 Z"
  ];
  
  return (
    <div>
      <div style={{ width: "200px", height: "200px" }}>
        <MorphingShape
          paths={paths}
          activeIndex={activeIndex}
          duration="slow"
          easing="goldenEaseInOut"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        />
      </div>
      
      <div>
        <Button 
          onClick={() => setActiveIndex(prev => (prev - 1 + paths.length) % paths.length)}
        >
          Previous
        </Button>
        <Button 
          onClick={() => setActiveIndex(prev => (prev + 1) % paths.length)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
```

## Auto-Cycling Example

```tsx
import React, { useState } from 'react';
import { MorphingShape } from '../design-system/components/animation';
import { Button } from '../design-system/components/button';

const AutoCyclingExample = () => {
  const [isCycling, setIsCycling] = useState(false);
  
  const paths = [
    "M50,50 m-40,0 a40,40 0 1,0 80,0 a40,40 0 1,0 -80,0", // Circle
    "M10,10 L90,10 L90,90 L10,90 Z", // Square
    "M50,10 L90,85 L10,85 Z" // Triangle
  ];
  
  return (
    <div>
      <div style={{ width: "200px", height: "200px" }}>
        <MorphingShape
          paths={paths}
          loop={isCycling}
          loopInterval={2}
          duration="slow"
          easing="goldenEaseInOut"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        />
      </div>
      
      <Button 
        onClick={() => setIsCycling(!isCycling)}
      >
        {isCycling ? 'Stop Cycling' : 'Start Cycling'}
      </Button>
    </div>
  );
};
```

## Accessibility Considerations

- The MorphingShape component is primarily decorative. For meaningful graphics, consider adding proper ARIA attributes or using an `<img>` with appropriate alt text.
- When using the `loop` property, ensure the animation doesn't distract users who may be sensitive to motion.
- The component respects user's motion preferences through the AnimationContext, so it will reduce or disable animations for users who have set their system preferences to reduce motion.

## Performance Notes

- SVG path morphing can be computationally expensive, especially for complex paths.
- For optimal performance:
  - Keep SVG paths simple and with similar number of points.
  - Limit the number of concurrent morphing animations on a page.
  - Use the `useGoldenRatio` property to create smoother, more natural transitions.
  - Consider disabling the animation for users on low-powered devices.

## Sacred Geometry Notes

The MorphingShape component follows sacred geometry principles in several ways:

1. **Golden Ratio Timing**: Animation durations are multiplied by PHI_INVERSE (0.618) when `useGoldenRatio` is true, creating more natural timing.
2. **Natural Easing**: The default easing function follows the golden ratio curve for organic motion.
3. **Harmonic Looping**: When cycling automatically, the animations create a continuous, harmonious flow based on the golden ratio principles. 