/**
 * Styled System Utilities
 * 
 * This file provides utilities for creating styled components with a consistent API
 * for styling props, responsive values, and sacred geometry principles.
 */

import { css } from 'styled-components';
import spacing from '../tokens/spacing';
import { BoxStyleProps } from '../types/styled.types';

type SpacingRecord = Record<string, string | number>;

/**
 * Extract spacing values from the spacing object, excluding the 'values' property
 */
const extractSpacingValues = (): SpacingRecord => {
  const spacingObj: SpacingRecord = {};
  
  // Copy only key-value pairs where value is string or number
  Object.entries(spacing).forEach(([key, value]) => {
    if (key !== 'values' && (typeof value === 'string' || typeof value === 'number')) {
      spacingObj[key] = value;
    }
  });
  
  return spacingObj;
};

/**
 * Process a style value, converting it to a proper CSS value
 * 
 * @param value - The value to process
 * @param tokenMap - Optional token map to look up values from
 * @returns Processed CSS value as a string
 */
const processValue = (
  value: string | number | undefined | null,
  tokenMap?: SpacingRecord
): string => {
  if (value === undefined || value === null) {
    return '';
  }
  
  if (tokenMap && typeof value === 'string' && value in tokenMap) {
    return String(tokenMap[value]);
  }
  
  if (typeof value === 'number' && !Number.isNaN(value)) {
    return `${value}px`;
  }
  
  return String(value);
};

/**
 * Creates a styled-system component configuration with all the styling props
 * from BoxStyleProps interface.
 * 
 * This function handles spacing, layout, flexbox, grid, and other CSS properties
 * in a consistent way, accounting for responsive values and theme integration.
 * 
 * @returns A function that generates CSS from BoxStyleProps
 */
export const createStyledSystemComponent = () => (props: BoxStyleProps): ReturnType<typeof css> => {
  let styles = '';
  const spacingValues = extractSpacingValues();

  // Process margin and padding properties
  const spacingProperties: Record<string, string> = {
    m: 'margin',
    mt: 'margin-top',
    mr: 'margin-right',
    mb: 'margin-bottom',
    ml: 'margin-left',
    mx: 'margin-left/margin-right',
    my: 'margin-top/margin-bottom',
    p: 'padding',
    pt: 'padding-top',
    pr: 'padding-right',
    pb: 'padding-bottom',
    pl: 'padding-left',
    px: 'padding-left/padding-right',
    py: 'padding-top/padding-bottom',
  };

  Object.entries(spacingProperties).forEach(([prop, cssProps]) => {
    const propKey = prop as keyof BoxStyleProps;
    if (props[propKey] !== undefined) {
      const value = processValue(props[propKey] as string | number, spacingValues);
      
      if (prop === 'mx') {
        styles += `
          margin-left: ${value};
          margin-right: ${value};
        `;
      } else if (prop === 'my') {
        styles += `
          margin-top: ${value};
          margin-bottom: ${value};
        `;
      } else if (prop === 'px') {
        styles += `
          padding-left: ${value};
          padding-right: ${value};
        `;
      } else if (prop === 'py') {
        styles += `
          padding-top: ${value};
          padding-bottom: ${value};
        `;
      } else {
        styles += `${cssProps}: ${value};`;
      }
    }
  });
  
  // Layout properties (width, height, display, etc.)
  if (props.width !== undefined) {
    styles += `width: ${processValue(props.width)};`;
  }
  
  if (props.height !== undefined) {
    styles += `height: ${processValue(props.height)};`;
  }
  
  if (props.minWidth !== undefined) {
    styles += `min-width: ${processValue(props.minWidth)};`;
  }
  
  if (props.minHeight !== undefined) {
    styles += `min-height: ${processValue(props.minHeight)};`;
  }
  
  if (props.maxWidth !== undefined) {
    styles += `max-width: ${processValue(props.maxWidth)};`;
  }
  
  if (props.maxHeight !== undefined) {
    styles += `max-height: ${processValue(props.maxHeight)};`;
  }
  
  if (props.display !== undefined) {
    styles += `display: ${props.display};`;
  }
  
  // Flexbox properties
  if (props.flexDirection !== undefined) {
    styles += `flex-direction: ${props.flexDirection};`;
  }
  
  if (props.flexWrap !== undefined) {
    styles += `flex-wrap: ${props.flexWrap};`;
  }
  
  if (props.alignItems !== undefined) {
    styles += `align-items: ${props.alignItems};`;
  }
  
  if (props.justifyContent !== undefined) {
    styles += `justify-content: ${props.justifyContent};`;
  }
  
  if (props.flex !== undefined) {
    styles += `flex: ${props.flex};`;
  }
  
  // Ensure flexGrow is part of FlexItemProps and BoxStyleProps
  if (props.flexGrow !== undefined) {
    styles += `flex-grow: ${props.flexGrow};`;
  }
  
  if (props.flexShrink !== undefined) {
    styles += `flex-shrink: ${props.flexShrink};`;
  }
  
  if (props.flexBasis !== undefined) {
    styles += `flex-basis: ${processValue(props.flexBasis)};`;
  }
  
  if (props.justifySelf !== undefined) {
    styles += `justify-self: ${props.justifySelf};`;
  }
  
  if (props.alignSelf !== undefined) {
    styles += `align-self: ${props.alignSelf};`;
  }
  
  if (props.order !== undefined) {
    styles += `order: ${props.order};`;
  }
  
  // Grid properties
  if (props.gap !== undefined) {
    styles += `gap: ${processValue(props.gap, spacingValues)};`;
  }
  
  if (props.gridGap !== undefined) {
    styles += `grid-gap: ${processValue(props.gridGap, spacingValues)};`;
  }
  
  if (props.gridColumnGap !== undefined) {
    styles += `grid-column-gap: ${processValue(props.gridColumnGap, spacingValues)};`;
  }
  
  if (props.gridRowGap !== undefined) {
    styles += `grid-row-gap: ${processValue(props.gridRowGap, spacingValues)};`;
  }
  
  if (props.gridTemplateColumns !== undefined) {
    styles += `grid-template-columns: ${props.gridTemplateColumns};`;
  }
  
  if (props.gridTemplateRows !== undefined) {
    styles += `grid-template-rows: ${props.gridTemplateRows};`;
  }
  
  if (props.gridTemplateAreas !== undefined) {
    styles += `grid-template-areas: ${props.gridTemplateAreas};`;
  }
  
  // Position properties
  if (props.position !== undefined) {
    styles += `position: ${props.position};`;
  }
  
  if (props.zIndex !== undefined) {
    styles += `z-index: ${props.zIndex};`;
  }
  
  if (props.top !== undefined) {
    styles += `top: ${processValue(props.top)};`;
  }
  
  if (props.right !== undefined) {
    styles += `right: ${processValue(props.right)};`;
  }
  
  if (props.bottom !== undefined) {
    styles += `bottom: ${processValue(props.bottom)};`;
  }
  
  if (props.left !== undefined) {
    styles += `left: ${processValue(props.left)};`;
  }
  
  // Color and background properties
  if (props.color !== undefined) {
    styles += `color: ${props.color};`;
  }
  
  if (props.bg !== undefined) {
    styles += `background-color: ${props.bg};`;
  }
  
  if (props.backgroundColor !== undefined) {
    styles += `background-color: ${props.backgroundColor};`;
  }
  
  if (props.opacity !== undefined) {
    styles += `opacity: ${props.opacity};`;
  }
  
  // Border properties
  if (props.border !== undefined) {
    styles += `border: ${props.border};`;
  }
  
  if (props.borderTop !== undefined) {
    styles += `border-top: ${props.borderTop};`;
  }
  
  if (props.borderRight !== undefined) {
    styles += `border-right: ${props.borderRight};`;
  }
  
  if (props.borderBottom !== undefined) {
    styles += `border-bottom: ${props.borderBottom};`;
  }
  
  if (props.borderLeft !== undefined) {
    styles += `border-left: ${props.borderLeft};`;
  }
  
  if (props.borderColor !== undefined) {
    styles += `border-color: ${props.borderColor};`;
  }
  
  if (props.borderRadius !== undefined) {
    styles += `border-radius: ${processValue(props.borderRadius)};`;
  }
  
  // Typography properties
  if (props.fontWeight !== undefined) {
    styles += `font-weight: ${props.fontWeight};`;
  }
  
  if (props.lineHeight !== undefined) {
    styles += `line-height: ${props.lineHeight};`;
  }
  
  if (props.letterSpacing !== undefined) {
    styles += `letter-spacing: ${processValue(props.letterSpacing)};`;
  }
  
  if (props.textAlign !== undefined) {
    styles += `text-align: ${props.textAlign};`;
  }
  
  if (props.fontStyle !== undefined) {
    styles += `font-style: ${props.fontStyle};`;
  }
  
  // Other common properties
  if (props.overflow !== undefined) {
    styles += `overflow: ${props.overflow};`;
  }
  
  if (props.overflowX !== undefined) {
    styles += `overflow-x: ${props.overflowX};`;
  }
  
  if (props.overflowY !== undefined) {
    styles += `overflow-y: ${props.overflowY};`;
  }
  
  if (props.cursor !== undefined) {
    styles += `cursor: ${props.cursor};`;
  }
  
  // Custom css prop for direct CSS injection
  if ((props as any).css) {
    return css`
      ${styles}
      ${(props as any).css}
    `;
  }

  return css`${styles}`;
};

export default createStyledSystemComponent; 





