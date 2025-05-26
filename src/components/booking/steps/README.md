# Booking Component Cleanup

## Approach for Component Cleanup

We've taken a careful, file-by-file approach to clean up the booking components:

1. **DateSelectionStep.tsx** - Fixed and properly typed
2. **Other components** - Need to be reviewed and fixed individually

## Common TypeScript Issues Found

1. **Import Path Conventions**
   - Use `@design-system/components/...` instead of relative paths
   - Use `@types/...` for type imports
   - Use `@constants/...` for constants

2. **Styling Issues**
   - Replace `background.paper` with hard-coded values when needed
   - Use styled-components for consistent margins
   - Avoid inline `style` props

3. **Type Definitions**
   - Ensure proper types for BookingTimeSlot and other interfaces
   - Define explicit return types for helper functions
   - Fix component prop types to match design system

## Next Steps

Each file needs individual attention:

1. Review component
2. Fix TypeScript errors
3. Test functionality
4. Update imports to use design system

Do NOT use automated scripts to make changes. Each file requires careful review of its unique requirements and challenges.

## Design System Integration

As we clean up components, we're integrating them more fully with the design system. This includes:

- Using design system components where possible
- Following spacing and layout conventions from sacred geometry
- Ensuring consistent styling approaches

## Testing Approach

After fixing each component:

1. Verify TypeScript compilation succeeds
2. Run component tests if available
3. Test integration with parent components 