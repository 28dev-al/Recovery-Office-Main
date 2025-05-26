# Recovery Office Import Conventions

This document outlines the conventions for managing import statements in the Recovery Office codebase.

## Path Aliases

The project uses TypeScript path aliases to simplify imports and make them more consistent. The following aliases are defined in `tsconfig.json`:

| Alias | Path |
|-------|------|
| `@/*` | `src/*` |
| `@components/*` | `src/components/*` |
| `@design-system/*` | `src/design-system/*` |
| `@constants/*` | `src/constants/*` |
| `@utils/*` | `src/utils/*` |
| `@hooks/*` | `src/hooks/*` |
| `@context/*` | `src/context/*` |
| `@types/*` | `src/types/*` |
| `@pages/*` | `src/pages/*` |
| `@services/*` | `src/services/*` |
| `@animation/*` | `src/animation/*` |

## Import Rules

1. **Always use path aliases for cross-directory imports**

   ```typescript
   // ✅ GOOD
   import { Button } from '@design-system/components/button';
   import { PHI } from '@constants/sacred-geometry';
   
   // ❌ BAD
   import { Button } from '../../design-system/components/button';
   import { PHI } from '../../../constants/sacred-geometry';
   ```

2. **Use relative imports only for files in the same directory or its immediate subdirectories**

   ```typescript
   // ✅ GOOD
   import { SubComponent } from './SubComponent';
   import { helpers } from './utils/helpers';
   
   // ❌ BAD
   import { helpers } from './utils/nested/deeply/helpers';
   ```

3. **Import components from their directory index files when available**

   ```typescript
   // ✅ GOOD
   import { Button, Card, Box } from '@design-system/components';
   
   // ❌ BAD
   import { Button } from '@design-system/components/button';
   import { Card } from '@design-system/components/card';
   import { Box } from '@design-system/components/box';
   ```

4. **Use consistent ordering for imports**

   ```typescript
   // External packages first
   import * as React from 'react';
   import { useEffect, useState } from 'react';
   import { useNavigate } from 'react-router-dom';
   
   // Path alias imports next, grouped by alias
   import { Button, Card } from '@design-system/components';
   import { PHI, FIBONACCI } from '@constants/sacred-geometry';
   import { useLocalStorage } from '@hooks/useLocalStorage';
   
   // Relative imports last
   import { SubComponent } from './SubComponent';
   import { helpers } from './utils';
   ```

5. **Destructure imports when importing multiple named exports**

   ```typescript
   // ✅ GOOD
   import { Box, Flex, Grid } from '@design-system/components/layout';
   
   // ❌ BAD
   import Box from '@design-system/components/layout/Box';
   import Flex from '@design-system/components/layout/Flex';
   import Grid from '@design-system/components/layout/Grid';
   ```

## Finding and Fixing Inconsistent Imports

We have a script to help find imports that don't follow these conventions:

```
node scripts/find-inconsistent-imports.js
```

This will scan the codebase and output a list of imports that should be converted to use path aliases.

## Common Examples

### Importing Design System Components

```typescript
// ✅ GOOD
import { Button } from '@design-system/components/button';
import { Box, Container } from '@design-system/components/layout';
import { FlowerOfLife } from '@design-system/botanical';
```

### Importing Constants

```typescript
// ✅ GOOD
import { PHI, PHI_INVERSE } from '@constants/sacred-geometry';
```

### Importing Utilities

```typescript
// ✅ GOOD
import { formatDate } from '@utils/dateUtils';
```

### Importing Hooks

```typescript
// ✅ GOOD
import { useBooking } from '@context/BookingContext';
import { useMediaQuery } from '@hooks/useMediaQuery';
```

### Importing Types

```typescript
// ✅ GOOD
import type { ButtonProps } from '@design-system/components/button';
``` 