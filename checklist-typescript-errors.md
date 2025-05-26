# TypeScript and ESLint Error Checklist

This document tracks all TypeScript and ESLint errors in the codebase that need to be fixed.
Each file with errors is listed below with its specific issues. As issues are fixed, they'll be checked off.

## Current ESLint Errors

### Animation Components

#### src/animation/ParallaxLayer.tsx
- [x] Line 14:43: 'MotionValue' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 92:14: React Hook "useTransform" is called in function "calculateYTransform" that is neither a React function component nor a custom React Hook function - react-hooks/rules-of-hooks

### Booking Components

#### src/components/booking/steps/ServiceSelection.tsx
- [x] Line 10:10: 'z' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 214:62: Unexpected any. Specify a different type - @typescript-eslint/no-explicit-any

#### src/components/booking/steps/ServiceSelectionStep.tsx
- [x] Line 47:3: 'onBack' is defined but never used - @typescript-eslint/no-unused-vars

### Premium Section Components

#### src/components/sections/premium/PremiumTestimonials.tsx
- [x] Line 4:10: 'Box' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 6:18: 'DSGrid' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 7:10: 'GridItem' is defined but never used - @typescript-eslint/no-unused-vars

#### src/components/sections/premium/RecoveryTimeline.tsx
- [x] Line 5:10: 'Box' is defined but never used - @typescript-eslint/no-unused-vars

### Context

#### src/context/BookingContext.tsx
- [x] Line 14:3: 'useMemo' is defined but never used - @typescript-eslint/no-unused-vars

### Design System - Botanical

#### src/design-system/botanical/PentaFlower.tsx
- [x] Line 17:7: 'PHI' is assigned a value but never used - @typescript-eslint/no-unused-vars

### Design System - Animation

#### src/design-system/components/animation/MorphingShape.tsx
- [x] Line 13:18: 'AnimatePresence' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 13:35: 'Variants' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 16:3: 'PHI' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 17:3: 'PHI_INVERSE' is defined but never used - @typescript-eslint/no-unused-vars

#### src/design-system/components/animation/ParallaxLayer.tsx
- [x] Line 39:5: 'useGoldenRatio' is assigned a value but never used - @typescript-eslint/no-unused-vars
- [x] Line 41:5: 'offset' is assigned a value but never used - @typescript-eslint/no-unused-vars
- [x] Line 43:5: 'as' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 92:14: React Hook "useTransform" is called in function "calculateYTransform" that is neither a React function component nor a custom React Hook function - react-hooks/rules-of-hooks

#### src/design-system/components/animation/ScaleFade.tsx
- [x] Line 15:8: 'Box' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 16:26: 'CustomEasingFunction' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 16:48: 'EasingValue' is defined but never used - @typescript-eslint/no-unused-vars

#### src/design-system/components/animation/ScrollReveal.tsx
- [x] Line 13:21: 'useRef' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 15:10: 'IntersectionOptions' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 17:29: 'ScrollRevealVariant' is defined but never used - @typescript-eslint/no-unused-vars

#### src/design-system/components/animation/Sequence.tsx
- [x] Line 11:45: 'Transition' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 13:10: 'PHI' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 14:10: 'Box' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 15:15: 'BoxProps' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 16:47: 'EasingValue' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 36:5: 'containerElement' is assigned a value but never used - @typescript-eslint/no-unused-vars
- [x] Line 37:5: 'allowOverlap' is assigned a value but never used - @typescript-eslint/no-unused-vars
- [ ] Line 193:92: Unexpected any. Specify a different type - @typescript-eslint/no-explicit-any

#### src/design-system/components/animation/SlideIn.tsx
- [x] Line 12:45: 'HTMLMotionProps' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 13:10: 'PHI' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 13:44: 'FIBONACCI' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 15:40: 'CustomEasingFunction' is defined but never used - @typescript-eslint/no-unused-vars

#### src/design-system/components/animation/useAnimationConfig.ts
- [x] Line 1:13: 'React' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 3:26: 'Transition' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 7:50: 'EasingValue' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 7:63: 'CustomEasingFunction' is defined but never used - @typescript-eslint/no-unused-vars

### Design System - Botanical Components

#### src/design-system/components/botanical/BotanicalDecorator.tsx
- [x] Line 15:10: 'PHI_INVERSE' is defined but never used - @typescript-eslint/no-unused-vars

#### src/design-system/components/botanical/BotanicalElement.tsx
- [x] Line 161:5: 'variant' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 162:5: 'colorScheme' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 163:5: 'withAnimation' is assigned a value but never used - @typescript-eslint/no-unused-vars
- [x] Line 164:5: 'size' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 173:36: Expected a `const` instead of a literal type assertion - @typescript-eslint/prefer-as-const
- [x] Line 174:26: Expected a `const` instead of a literal type assertion - @typescript-eslint/prefer-as-const

#### src/design-system/components/botanical/FibonacciSpiral.tsx
- [x] Line 14:10: 'FIBONACCI' is defined but never used - @typescript-eslint/no-unused-vars

#### src/design-system/components/botanical/FlowerOfLife.tsx
- [x] Line 243:9: Do not pass children as props. Instead, nest children between the opening and closing tags - react/no-children-prop

#### src/design-system/components/botanical/LeafPattern.tsx
- [x] Line 15:28: 'FIBONACCI' is defined but never used - @typescript-eslint/no-unused-vars

#### src/design-system/components/botanical/OliveBranch.tsx
- [x] Line 124:9: 'centerX' is assigned a value but never used - @typescript-eslint/no-unused-vars

#### src/design-system/components/botanical/SmallFlourish.tsx
- [x] Line 325:13: 'length' is assigned a value but never used - @typescript-eslint/no-unused-vars
- [x] Line 329:13: 'endY' is assigned a value but never used - @typescript-eslint/no-unused-vars

#### src/design-system/components/botanical/VesicaPiscis.tsx
- [x] Line 124:11: 'vesicaWidth' is assigned a value but never used - @typescript-eslint/no-unused-vars

#### src/design-system/components/botanical/botanicalUtils.ts
- [x] Line 4:3: 'PHI' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 6:3: 'SACRED_SPACING' is defined but never used - @typescript-eslint/no-unused-vars

### Design System - Button Components

#### src/design-system/components/button/ButtonGroup.tsx
- [x] Line 13:10: 'DefaultTheme' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 16:10: 'FIBONACCI' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 180:40: Unexpected any. Specify a different type - @typescript-eslint/no-explicit-any

#### src/design-system/components/button/LinkButton.tsx
- [x] Line 11:10: 'DefaultTheme' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 103:5: 'variant' is assigned a value but never used - @typescript-eslint/no-unused-vars

#### src/design-system/components/button/PremiumButton.tsx
- [x] Line 82:9: 'omittedProps' is assigned a value but never used - @typescript-eslint/no-unused-vars
- [ ] Line 123:19: Unexpected any. Specify a different type - @typescript-eslint/no-explicit-any

### Design System - Card Components

#### src/design-system/components/cards/PremiumServiceCard.tsx
- [x] Line 4:10: 'Box' is defined but never used - @typescript-eslint/no-unused-vars

### Design System - Data Display Components

#### src/design-system/components/data-display/PremiumTable.tsx
- [x] Line 15:10: 'PHI' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 15:28: 'SACRED_EASINGS' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 42:26: Unexpected any. Specify a different type - @typescript-eslint/no-explicit-any
- [x] Line 546:9: 'result' is never reassigned. Use 'const' instead - prefer-const

### Design System - Theme

#### src/design-system/theme/ThemeProvider.tsx
- [x] Line 16:38: Unexpected any. Specify a different type - @typescript-eslint/no-explicit-any
- [x] Line 16:67: Unexpected any. Specify a different type - @typescript-eslint/no-explicit-any
- [x] Line 31:40: Unexpected any. Specify a different type - @typescript-eslint/no-explicit-any
- [x] Line 59:44: Unexpected any. Specify a different type - @typescript-eslint/no-explicit-any
- [x] Line 59:52: Unexpected any. Specify a different type - @typescript-eslint/no-explicit-any

#### src/design-system/theme/globalStyles.ts
- [x] Line 9:10: 'ThemedProps' is defined but never used - @typescript-eslint/no-unused-vars

#### src/design-system/theme/theme.premium.ts
- [x] Line 275:6: Unexpected any. Specify a different type - @typescript-eslint/no-explicit-any

#### src/design-system/theme/theme.ts
- [x] Line 111:8: Unexpected any. Specify a different type - @typescript-eslint/no-explicit-any
- [x] Line 152:8: Unexpected any. Specify a different type - @typescript-eslint/no-explicit-any
- [x] Line 232:8: Unexpected any. Specify a different type - @typescript-eslint/no-explicit-any
- [x] Line 265:8: Unexpected any. Specify a different type - @typescript-eslint/no-explicit-any
- [x] Line 266:23: Unexpected any. Specify a different type - @typescript-eslint/no-explicit-any

### Design System - Tokens

#### src/design-system/tokens/breakpoints.ts
- [x] Line 11:10: 'FIBONACCI' is defined but never used - @typescript-eslint/no-unused-vars

#### src/design-system/tokens/colors.ts
- [x] Line 251:28: 'intensity' is assigned a value but never used - @typescript-eslint/no-unused-vars
- [x] Line 254:11: 'factors' is assigned a value but never used - @typescript-eslint/no-unused-vars
- [x] Line 271:27: 'intensity' is assigned a value but never used - @typescript-eslint/no-unused-vars
- [x] Line 272:11: 'factors' is assigned a value but never used - @typescript-eslint/no-unused-vars
- [x] Line 289:30: 'level' is defined but never used - @typescript-eslint/no-unused-vars

#### src/design-system/tokens/radius.ts
- [x] Line 10:10: 'pxToRem' is defined but never used - @typescript-eslint/no-unused-vars

#### src/design-system/tokens/shadows.ts
- [x] Line 9:10: 'FIBONACCI' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 9:21: 'PHI' is defined but never used - @typescript-eslint/no-unused-vars

#### src/design-system/tokens/spacing.ts
- [x] Line 9:10: 'FIBONACCI' is defined but never used - @typescript-eslint/no-unused-vars

#### src/design-system/tokens/typography.ts
- [x] Line 9:10: 'PHI' is defined but never used - @typescript-eslint/no-unused-vars

### Hooks

#### src/hooks/useAnimationSequence.ts
- [x] Line 10:13: 'React' is defined but never used - @typescript-eslint/no-unused-vars

#### src/hooks/useBookingStepValidation.ts
- [x] Line 1:13: 'React' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 121:14: 'error' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 151:14: 'error' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 167:14: 'error' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 178:14: 'error' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 186:14: 'error' is defined but never used - @typescript-eslint/no-unused-vars

#### src/hooks/useBreakpointValue.ts
- [x] Line 74:26: 'e' is defined but never used - @typescript-eslint/no-unused-vars

### Pages

#### src/index.tsx
- [x] Line 8:13: Unexpected any. Specify a different type - @typescript-eslint/no-explicit-any

#### src/pages/About/About.tsx
- [x] Line 4:26: 'GoldenSection' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 5:33: 'SectionContent' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 6:16: 'Paragraph' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 7:10: 'Button' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 8:10: 'Card' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 9:24: 'FadeIn' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 11:24: 'VesicaPiscis' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 11:38: 'OliveBranch' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 11:51: 'LeafPattern' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 11:64: 'SmallFlourish' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 13:10: 'RecoveryOfficeTheme' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 17:3: 'PhilosophySection' is defined but never used - @typescript-eslint/no-unused-vars

#### src/pages/About/AboutPageWrapper.tsx
- [x] Line 13:22: 'setThemeError' is assigned a value but never used - @typescript-eslint/no-unused-vars

#### src/pages/About/sections/PhilosophySection.tsx
- [x] Line 17:10: 'FadeIn' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 127:84: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;` - react/no-unescaped-entities
- [x] Line 128:23: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;` - react/no-unescaped-entities

#### src/pages/About/sections/ValuesSection.tsx
- [x] Line 12:16: 'Heading' is defined but never used - @typescript-eslint/no-unused-vars

#### src/pages/Blog/Blog.tsx
- [x] Line 7:10: 'motion' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 11:10: 'Link' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 15:10: 'Section' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 20:8: 'Grid' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 37:10: 'ThemedProps' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 444:21: 'headerInView' is assigned a value but never used - @typescript-eslint/no-unused-vars
- [x] Line 449:19: 'gridInView' is assigned a value but never used - @typescript-eslint/no-unused-vars
- [x] Line 518:38: 'index' is defined but never used - @typescript-eslint/no-unused-vars

#### src/pages/Booking/BookingPage.tsx
- [x] Line 84:22: React Hook "useBooking" is called conditionally. React Hooks must be called in the exact same order in every component render - react-hooks/rules-of-hooks

#### src/pages/Booking/BookingPageWrapper.tsx
- [x] Line 14:22: 'setThemeError' is assigned a value but never used - @typescript-eslint/no-unused-vars

#### src/pages/Contact/Contact.tsx
- [x] Line 2:27: 'ContactSection' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 34:9: 'contactFormSchema' is assigned a value but only used as a type - @typescript-eslint/no-unused-vars
- [x] Line 380:86: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;` - react/no-unescaped-entities
- [x] Line 391:42: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;` - react/no-unescaped-entities

#### src/pages/FAQ/FAQ.tsx
- [x] Line 3:10: 'Link' is defined but never used - @typescript-eslint/no-unused-vars
- [x] Line 311:30: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;` - react/no-unescaped-entities
- [x] Line 312:43: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;` - react/no-unescaped-entities