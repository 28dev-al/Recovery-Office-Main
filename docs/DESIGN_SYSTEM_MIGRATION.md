# Design System Migration Guide

This guide outlines the process for migrating existing components to the design system, standardizing prop names, and improving documentation across the Recovery Office project.

## Component Migration Steps

### 1. Moving UI Components to Design System

For each component that needs to be migrated:

1. **Assessment Phase**
   - Analyze the component's usage patterns
   - Identify all props and features required
   - Document current API and behavior

2. **Design System Adaptation**
   - Create an equivalent component in the design system 
   - Implement sacred geometry principles (PHI, Fibonacci, etc.)
   - Ensure it supports all required functionality

3. **Integration Phase**
   - Update imports across the codebase to use the new component
   - Fix any TypeScript errors that arise
   - Test all functionality after changes

### 2. Standardizing Prop Names

To ensure consistency across all components:

1. **Spacing Props**
   - Use `mb` instead of `marginBottom`
   - Use `mt` instead of `marginTop`
   - Use `mr` instead of `marginRight`
   - Use `ml` instead of `marginLeft` 
   - Use `mx` for horizontal margins
   - Use `my` for vertical margins
   - Apply the same pattern to padding (`p`, `pt`, `pb`, etc.)

2. **Boolean Props**
   - Use `is-` prefix for boolean states (e.g., `isDisabled`, `isLoading`)
   - Avoid negated props (`isHidden` vs `isVisible`)

3. **Size and Variant Props**
   - Use string literals for size values (`size="sm" | "md" | "lg"`)
   - Use descriptive variant names (`variant="primary" | "secondary" | "outline"`)

4. **Event Handler Props**
   - Prefix with `on` (e.g., `onClick`, `onChange`)
   - Use descriptive names for custom events (`onSelectDate` vs `onSelect`)

### 3. Documentation Improvements

For each component in the design system:

1. **Component Documentation**
   - Add JSDoc comments with detailed descriptions
   - Document each prop with description and default value
   - Include accessibility information
   - Reference sacred geometry principles being used

2. **Code Examples**
   - Include usage examples in the JSDoc comments
   - Show common use cases
   - Demonstrate responsive behaviors

3. **README Files**
   - Create README.md files in key folders
   - Explain the purpose and pattern of components in each folder
   - Include any folder-specific conventions or practices

## Common Migration Challenges

During migration, we've encountered several recurring challenges:

1. **Styled Components Type Issues**
   - TypeScript struggles with props types on styled components
   - Solution: Use explicit type parameters and remove type annotations inside template literals
   - Example: `${(props) => props.isActive ? 'value' : 'other'}` instead of `${(props: Props) => ...}`

2. **Theme Typing Discrepancies**
   - Theme object structure changed between components
   - Solution: Standardize on using array notation for theme colors (e.g., `theme.colors.background[200]`)
   - Avoid using dot notation for variable properties (e.g., `theme.colors.background.medium`)

3. **Design System Integration**
   - Components often use hardcoded values instead of theme tokens
   - Solution: Replace all hardcoded values with theme tokens and constants
   - Use sacred geometry constants (PHI, FIBONACCI, etc.) for visual proportions

4. **Props Interface Alignment**
   - Component props don't match the types defined in booking.types.ts
   - Solution: Always use the interface from booking.types.ts as the source of truth
   - Update component implementation to work with the standard interface

## Implementation Progress

| Component | Status | Notes |
|-----------|--------|-------|
| DateSelectionStep | ✅ Complete | Fixed TypeScript errors, improved component structure |
| BookingNavControls | ✅ Complete | Fixed TypeScript errors, improved accessibility |
| ProgressIndicator | 🟠 In Progress | Updating to use proper typings, encountering styled-components issues |
| Other booking components | 🟡 Pending | Need to be reviewed and fixed |

## Testing Strategy

After each migration:

1. Run TypeScript type checking (`npx tsc --noEmit`)
2. Verify component works in all supported viewport sizes
3. Test interactions behave as expected
4. Confirm responsive design is working properly

## Sacred Geometry Principles

Always maintain these principles during migration:

- Use PHI (1.618033988749895) and PHI_INVERSE for proportions
- Use FIBONACCI sequence values for spacing
- Maintain golden ratio relationships in layouts
- Apply appropriate animation timing from SACRED_TIMING constants 