# Botanical Components

Botanical components represent natural forms, patterns, and elements using sacred geometry principles. 
These components provide decorative elements that enhance the visual experience while maintaining
mathematical harmony in their proportions.

## Components

### BotanicalElement

The base component for all botanical SVG elements, providing consistent styling and functionality.

```tsx
import { BotanicalElement } from '../botanical/BotanicalElement';

<BotanicalElement viewBox="0 0 100 100">
  {/* Custom SVG content */}
</BotanicalElement>
```

### LeafPattern

A decorative pattern component that arranges multiple olive leaves in a harmonious pattern
based on sacred geometry principles.

```tsx
import { LeafPattern } from '../botanical/LeafPattern';

<LeafPattern 
  size="large" 
  density="medium" 
  spiralArrangement={true}
  animated={true}
/>
```

#### LeafPattern Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| density | 'low' \| 'medium' \| 'high' | 'medium' | The density of leaves in the pattern |
| size | 'small' \| 'medium' \| 'large' | 'medium' | The overall size of the pattern |
| animated | boolean | false | Whether to animate the pattern subtly |
| rotation | number | 0 | Optional rotation of the entire pattern in degrees |
| spiralArrangement | boolean | true | Whether to use a spiral arrangement based on golden ratio |

### OliveLeaf

A component that renders a single olive leaf, designed according to sacred geometry principles.

```tsx
import { OliveLeaf } from '../botanical/OliveLeaf';

<OliveLeaf 
  leafSize={1.5}
  slenderness={0.3}
  rotation={45}
  mirror={false}
/>
```

### OliveBranch

A component that renders an olive branch, a symbol of peace and harmony, designed according
to sacred geometry principles.

```tsx
import { OliveBranch } from '../botanical/OliveBranch';

<OliveBranch 
  leafCount={5}
  leafSize={1}
  curvature={0.3}
  includeOlives={true}
/>
```

### FlowerOfLife

A component that renders the Flower of Life sacred geometry pattern.

```tsx
import { FlowerOfLife } from '../botanical/FlowerOfLife';

<FlowerOfLife 
  rings={3}
  radius={10}
  showSeedOfLife={true}
/>
```

## Sacred Geometry in Botanical Elements

All botanical components incorporate sacred geometry principles:

1. **Golden Ratio Proportions**: Elements utilize the golden ratio (PHI = 1.618...) in their
   proportions and arrangements.

2. **Fibonacci Sequence**: Spacing, sizes, and counts often follow the Fibonacci sequence
   (1, 1, 2, 3, 5, 8, 13, 21...) to create harmonious patterns.

3. **Spiral Arrangements**: Spiral patterns are based on the golden angle (~137.5°), which
   creates optimal spacing and is found throughout nature.

4. **Sacred Geometric Patterns**: Some components directly represent sacred geometry patterns
   like the Flower of Life, which have been used in various spiritual traditions.

## Usage in Layout Components

Botanical elements can be incorporated into Section components via the `botanicalElement`
and `botanicalPosition` props:

```tsx
import { Section } from '../layout/Section';
import { LeafPattern } from '../botanical/LeafPattern';

<Section
  botanicalElement={<LeafPattern size="large" />}
  botanicalPosition="top-right"
>
  {/* Section content */}
</Section>
``` 