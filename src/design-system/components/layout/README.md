# Layout Components

Layout components provide the structural foundation for the Recovery Office design system.
All layout components are built with sacred geometry principles in mind,
ensuring proper proportions, spacing, and visual harmony.

## Components

### Box

The fundamental layout component that provides spacing, positioning, and styling capabilities.

```tsx
import { Box } from '../layout/Box';

<Box padding={5} margin={8}>
  Content with sacred geometry spacing
</Box>
```

### Container

A centered container with max-width constraints based on golden ratio proportions.

```tsx
import { Container } from '../layout/Container';

<Container maxWidth="md">
  Centered content with golden ratio proportions
</Container>
```

### Grid

A grid layout system with columns that follow Fibonacci sequence proportions.

```tsx
import { Grid, GridItem } from '../layout/Grid';

<Grid columns={3} spacing={5}>
  <GridItem colSpan={1}>Item 1</GridItem>
  <GridItem colSpan={2}>Item 2 (golden ratio proportion)</GridItem>
</Grid>
```

### Section

A section component for page structure with support for botanical decorations and various layout options.

```tsx
import { Section, SectionTitle, SectionContent } from '../layout/Section';
import { LeafPattern } from '../botanical/LeafPattern';

<Section
  variant="primary"
  botanicalPosition="top-right"
  botanicalElement={<LeafPattern size="large" />}
>
  <SectionTitle 
    title="Welcome to Recovery Office" 
    subtitle="Healing through sacred geometry"
    align="center"
    size="large"
  />
  <SectionContent columns={3} columnGap={5}>
    {/* Content goes here */}
  </SectionContent>
</Section>
```

#### Section Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'primary' \| 'secondary' \| 'tertiary' \| 'accent' \| 'light' \| 'dark' \| 'transparent' | 'light' | Visual style variant |
| fullWidth | boolean | false | Whether section spans the entire viewport width |
| minHeight | number | undefined | Minimum height in vh units |
| hasPadding | boolean | true | Whether section has padding |
| botanicalPosition | 'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right' \| 'center-left' \| 'center-right' \| 'top-center' \| 'bottom-center' \| 'none' | 'none' | Position of botanical element |
| botanicalElement | React.ReactNode | undefined | Custom botanical element to render |
| textAlign | 'left' \| 'center' \| 'right' | 'left' | Text alignment within section |
| backgroundImage | string | undefined | Background image URL |

#### SectionTitle Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | string | required | Main title text |
| subtitle | string | undefined | Optional subtitle text |
| align | 'left' \| 'center' \| 'right' | 'left' | Alignment of the title and subtitle |
| size | 'small' \| 'medium' \| 'large' | 'medium' | Size of the title text |
| decoratorBefore | React.ReactNode | undefined | Element to display before the title |
| decoratorAfter | React.ReactNode | undefined | Element to display after the title |

#### SectionContent Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| align | 'left' \| 'center' \| 'right' | 'left' | Alignment of the content |
| fullWidth | boolean | false | Whether content should span full width |
| columns | 1 \| 2 \| 3 \| 5 \| 8 | 1 | Number of columns (using Fibonacci values) |
| columnGap | 1 \| 2 \| 3 \| 5 \| 8 \| 13 | 3 | Gap between columns |

### Stack

A component for stacking children with consistent spacing along a single axis.

```tsx
import { Stack } from '../layout/Stack';

<Stack direction="vertical" spacing={5}>
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>
```

## Sacred Geometry Principles

All layout components follow these sacred geometry principles:

1. **Golden Ratio (PHI) Proportions**: Components maintain width-to-height ratios of 1:1.618 where applicable.

2. **Fibonacci Spacing**: All spacing values are derived from the Fibonacci sequence (1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89).

3. **Harmonic Relationships**: Components maintain mathematically harmonic relationships in their proportions.

4. **Natural Flow**: Layouts follow natural flow patterns found in nature, creating a visually pleasing experience.

## GoldenSection

The `GoldenSection` component implements layouts based on the Golden Ratio (Φ ≈ 1.618), creating visually harmonious divisions of space. This component allows for content to be arranged in sections that follow divine proportions.

### Sacred Geometry Principles

The Golden Ratio (Φ) is a mathematical ratio found throughout nature and considered aesthetically pleasing to the human eye. It occurs when a line is divided into two parts so that the ratio of the whole line to the longer part equals the ratio of the longer part to the shorter part.

In the `GoldenSection` component:
- The primary section takes up 61.8% (Φ⁻¹) of the available space
- The secondary section takes up 38.2% (1-Φ⁻¹) of the available space

These proportions create a natural, balanced, and harmonious layout that subconsciously communicates stability and trustworthiness.

### Usage

```tsx
import { GoldenSection } from 'src/design-system/components/layout/GoldenSection';

// Horizontal golden section (default)
<GoldenSection>
  <div>Primary content (61.8% width)</div>
  <div>Secondary content (38.2% width)</div>
</GoldenSection>

// Vertical golden section
<GoldenSection direction="vertical" height={500}>
  <div>Primary content (61.8% height)</div>
  <div>Secondary content (38.2% height)</div>
</GoldenSection>

// Reversed order (minor section first)
<GoldenSection reverseOrder>
  <div>Secondary content (38.2% width, displayed first)</div>
  <div>Primary content (61.8% width, displayed second)</div>
</GoldenSection>
```

### API Reference

#### Props

The `GoldenSection` component accepts all props from the `Box` component, plus:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `'horizontal'` \| `'vertical'` | `'horizontal'` | Determines whether the golden ratio should be applied horizontally or vertically |
| `reverseOrder` | `boolean` | `false` | When true, reverses the order of the sections |
| `children` | `ReactNode` | Required | Exactly two child components are required; the first will be placed in the primary section (61.8%) and the second in the secondary section (38.2%) |

### Implementation Details

The `GoldenSection` component:

1. Uses the CSS Grid system for precise layout control
2. Sets up either `gridTemplateColumns` or `gridTemplateRows` based on the `direction` prop
3. Uses the `PHI_INVERSE` constant (0.618033988749895) from sacred geometry to calculate exact proportions
4. Requires exactly two children to maintain golden ratio proportions
5. Supports all styling props from the `Box` component for customization

### Best Practices

- Use the `GoldenSection` for important content areas to create visual harmony
- Place the most important content in the primary section (61.8%)
- Consider using horizontal golden sections for desktop layouts and vertical ones for mobile
- Maintain appropriate spacing within each section to preserve harmony
- When using multiple nested golden sections, follow a consistent direction for balanced composition

### Related Components

- **Grid**: For more complex grid layouts based on sacred geometry
- **Box**: The fundamental building block for all layout components
- **Flex**: For flexible box layouts with sacred geometry spacing

## Container

The `Container` component provides a centered wrapper with width constraints based on sacred geometry principles. The maximum widths follow Fibonacci-based values and golden ratio proportions to create harmonious, balanced layouts.

### Sacred Geometry Principles

The Container component applies sacred geometry principles in several ways:

1. **Width constraints**: The predefined maximum widths are derived from sacred mathematics:
   - XS: 1/3 of the sacred grid width (480px)
   - SM: 1/2 of the sacred grid width (720px)
   - MD: Golden ratio (61.8%) of the sacred grid width (890px)
   - LG: Fibonacci ratio (89%) of the sacred grid width (1282px)
   - XL: Full sacred grid width (1440px)
  
2. **Responsive padding**: The padding scales according to the Fibonacci sequence (13px, 21px, 34px) as viewport size increases

### Usage

```tsx
import { Container } from 'src/design-system/components/layout/Container';

// Default container (maximum width of 1282px)
<Container>
  <div>Content goes here</div>
</Container>

// Fluid container (takes up 100% of parent width)
<Container fluid>
  <div>Full-width content</div>
</Container>

// Container with specific maximum width
<Container maxWidth="md">
  <div>Content with golden ratio width (61.8% of maximum)</div>
</Container>

// Container with centered content
<Container centerContent>
  <div>This content will be centered horizontally and vertically</div>
</Container>

// Container with custom width
<Container maxWidth="800px">
  <div>Custom width container</div>
</Container>
```

### API Reference

#### Props

The `Container` component accepts all props from the `Box` component, plus:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `maxWidth` | `'xs'` \| `'sm'` \| `'md'` \| `'lg'` \| `'xl'` \| `string` \| `number` | `'lg'` | Maximum width of the container, can be a predefined size or custom value |
| `fluid` | `boolean` | `false` | When true, container takes up 100% of parent width |
| `centerContent` | `boolean` | `false` | When true, centers content horizontally and vertically |

### Predefined Maximum Widths

| Size | Width | Basis |
|------|-------|-------|
| `xs` | 480px | 1/3 of sacred grid maximum width |
| `sm` | 720px | 1/2 of sacred grid maximum width |
| `md` | 890px | Golden ratio (61.8%) of maximum width |
| `lg` | 1282px | Fibonacci ratio (89/100) of maximum width |
| `xl` | 1440px | Full sacred grid maximum width |

### Implementation Details

The `Container` component:

1. Uses the `Box` component as its foundation for styling
2. Calculates appropriate maximum width based on sacred geometry principles
3. Applies responsive padding that scales with Fibonacci sequence values
4. Centers itself horizontally with `margin: 0 auto`
5. Can optionally center its content with flexbox

### Best Practices

- Use the appropriate container size for the content's purpose
- Use fluid containers for full-width sections like heroes and banners
- Use centered containers for focused content like forms and dialogs
- Consider using the golden ratio-based `md` container for text-heavy content
- Apply responsive padding when nesting containers to maintain consistent spacing

## Stack

The `Stack` component arranges its children in a vertical or horizontal stack with spacing based on Fibonacci sequence values for harmonious visual rhythm. It simplifies the creation of common layout patterns while adhering to sacred geometry principles.

### Sacred Geometry Principles

The Stack component applies sacred geometry in several ways:

1. **Spacing**: Uses Fibonacci-based spacing values (8px, 13px, 21px, 34px, 55px) for consistent and harmonious visual rhythm
2. **Direction**: Supports both vertical and horizontal orientations to create balanced compositions
3. **Alignment**: Implements proper alignment to maintain visual harmony in the layout

### Usage

```tsx
import { Stack } from 'src/design-system/components/layout/Stack';

// Vertical stack (default)
<Stack>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>

// Horizontal stack
<Stack direction="horizontal">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>

// Custom spacing
<Stack spacing="lg">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>

// With alignment
<Stack align="center" justify="space-between">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>

// With dividers
<Stack divider={<Divider />}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>

// Wrapping stack
<Stack direction="horizontal" shouldWrap>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>
```

### API Reference

#### Props

The `Stack` component accepts all props from the `Box` component, plus:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `'vertical'` \| `'horizontal'` | `'vertical'` | Direction of the stack |
| `spacing` | `string` \| `number` | `'md'` | Spacing between items, can use tokens or custom value |
| `align` | `'flex-start'` \| `'flex-end'` \| `'center'` \| `'stretch'` \| `'baseline'` | Based on direction | Alignment of items along the cross axis |
| `justify` | `'flex-start'` \| `'flex-end'` \| `'center'` \| `'space-between'` \| `'space-around'` \| `'space-evenly'` | `'flex-start'` | Alignment of items along the main axis |
| `divider` | `ReactElement` | `undefined` | Element to render between each child |
| `shouldWrap` | `boolean` | `false` | Whether the items should wrap when they run out of space |

### Implementation Details

The `Stack` component:

1. Uses the `Flex` component as its foundation, inheriting all its capabilities
2. Sets appropriate flex direction based on the stack direction
3. Applies spacing using the gap property with Fibonacci-based values
4. Sets sensible alignment defaults based on the stack direction
5. Optionally adds dividers between items

### Best Practices

- Use vertical stacks for lists, forms, and sections
- Use horizontal stacks for buttons, navigation, and toolbars
- Choose appropriate spacing based on the content type and density
- Match the visual weight of dividers to the spacing (larger spacing with heavier dividers)
- Consider responsive behavior and use wrapping when needed

## Box

The foundational layout component that provides a comprehensive styling API.

[See Box documentation]

## Flex

Extends the Box component with flexbox capabilities following sacred geometry principles.

[See Flex documentation]

## Grid

Creates grid layouts using Fibonacci sequences and Golden Ratio proportions.

[See Grid documentation] 