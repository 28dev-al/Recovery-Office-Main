/**
 * Box Component
 *
 * The foundation of the Recovery Office layout system, implementing
 * sacred geometry principles in spacing, dimensions, and styling.
 *
 * This component serves as the base for all other layout components
 * and provides access to the full styling API through props.
 */

import * as React from 'react';
import { forwardRef } from 'react';
import styled from 'styled-components';
import {
  BoxProps,
  BoxStyleProps,
  ResponsiveProps,
  AsProps
} from '../../../design-system/types';
import { lightTheme } from '../../../design-system/theme';

/**
 * Helper function to generate CSS for responsive styling
 * Uses sacred geometry-based breakpoints for a natural progression
 */
const generateResponsiveStyles = (props: ResponsiveProps): string => {
  let styles = '';
  
  // Generate styles for each breakpoint using our Fibonacci-based breakpoint system
  Object.entries(props).forEach(([breakpointKey, breakpointStyles]) => {
    if (!breakpointStyles) return;
    
    // The breakpoint key will be _xs, _sm, etc.
    const key = breakpointKey.substring(1) as keyof typeof lightTheme.breakpoints;
    
    // Access the breakpoint through the theme object
    styles += `
      @media (min-width: ${lightTheme.breakpoints[key] ?? 1}px) {
        ${generateStyles(breakpointStyles as BoxStyleProps)}
      }
    `;
  });
  
  return styles;
};

/**
 * Helper function to convert prop values to CSS
 * Handles unit conversion for numeric values
 */
const handleValue = (value: string | number): string => {
  // If the value is a number, add 'px' suffix, otherwise use as is
  return typeof value === 'number' ? `${value}px` : value;
};

/**
 * Generates CSS styles from BoxStyleProps
 */
const generateStyles = (props: BoxStyleProps): string => {
  let styles = '';
  
  // Spacing properties (margin and padding)
  if (props.m !== undefined) styles += `margin: ${handleValue(props.m)};`;
  if (props.mt !== undefined) styles += `margin-top: ${handleValue(props.mt)};`;
  if (props.mr !== undefined) styles += `margin-right: ${handleValue(props.mr)};`;
  if (props.mb !== undefined) styles += `margin-bottom: ${handleValue(props.mb)};`;
  if (props.ml !== undefined) styles += `margin-left: ${handleValue(props.ml)};`;
  if (props.mx !== undefined) styles += `margin-left: ${handleValue(props.mx)}; margin-right: ${handleValue(props.mx)};`;
  if (props.my !== undefined) styles += `margin-top: ${handleValue(props.my)}; margin-bottom: ${handleValue(props.my)};`;
  if (props.margin !== undefined) styles += `margin: ${handleValue(props.margin)};`;
  if (props.marginTop !== undefined) styles += `margin-top: ${handleValue(props.marginTop)};`;
  if (props.marginRight !== undefined) styles += `margin-right: ${handleValue(props.marginRight)};`;
  if (props.marginBottom !== undefined) styles += `margin-bottom: ${handleValue(props.marginBottom)};`;
  if (props.marginLeft !== undefined) styles += `margin-left: ${handleValue(props.marginLeft)};`;
  
  if (props.p !== undefined) styles += `padding: ${handleValue(props.p)};`;
  if (props.pt !== undefined) styles += `padding-top: ${handleValue(props.pt)};`;
  if (props.pr !== undefined) styles += `padding-right: ${handleValue(props.pr)};`;
  if (props.pb !== undefined) styles += `padding-bottom: ${handleValue(props.pb)};`;
  if (props.pl !== undefined) styles += `padding-left: ${handleValue(props.pl)};`;
  if (props.px !== undefined) styles += `padding-left: ${handleValue(props.px)}; padding-right: ${handleValue(props.px)};`;
  if (props.py !== undefined) styles += `padding-top: ${handleValue(props.py)}; padding-bottom: ${handleValue(props.py)};`;
  if (props.padding !== undefined) styles += `padding: ${handleValue(props.padding)};`;
  if (props.paddingTop !== undefined) styles += `padding-top: ${handleValue(props.paddingTop)};`;
  if (props.paddingRight !== undefined) styles += `padding-right: ${handleValue(props.paddingRight)};`;
  if (props.paddingBottom !== undefined) styles += `padding-bottom: ${handleValue(props.paddingBottom)};`;
  if (props.paddingLeft !== undefined) styles += `padding-left: ${handleValue(props.paddingLeft)};`;
  
  // Display properties
  if (props.display !== undefined) styles += `display: ${props.display};`;
  
  // Dimension properties
  if (props.width !== undefined) styles += `width: ${handleValue(props.width)};`;
  if (props.height !== undefined) styles += `height: ${handleValue(props.height)};`;
  if (props.minWidth !== undefined) styles += `min-width: ${handleValue(props.minWidth)};`;
  if (props.maxWidth !== undefined) styles += `max-width: ${handleValue(props.maxWidth)};`;
  if (props.minHeight !== undefined) styles += `min-height: ${handleValue(props.minHeight)};`;
  if (props.maxHeight !== undefined) styles += `max-height: ${handleValue(props.maxHeight)};`;
  
  // Flex properties
  if (props.flex !== undefined) styles += `flex: ${props.flex};`;
  if (props.flexDirection !== undefined) styles += `flex-direction: ${props.flexDirection};`;
  if (props.flexWrap !== undefined) styles += `flex-wrap: ${props.flexWrap};`;
  if (props.justifyContent !== undefined) styles += `justify-content: ${props.justifyContent};`;
  if (props.alignItems !== undefined) styles += `align-items: ${props.alignItems};`;
  if (props.alignContent !== undefined) styles += `align-content: ${props.alignContent};`;
  if (props.gap !== undefined) styles += `gap: ${handleValue(props.gap)};`;
  
  // Grid properties
  if (props.gridTemplateColumns !== undefined) styles += `grid-template-columns: ${props.gridTemplateColumns};`;
  if (props.gridTemplateRows !== undefined) styles += `grid-template-rows: ${props.gridTemplateRows};`;
  if (props.gridTemplateAreas !== undefined) styles += `grid-template-areas: ${props.gridTemplateAreas};`;
  if (props.gridGap !== undefined) styles += `grid-gap: ${handleValue(props.gridGap)};`;
  if (props.gridRowGap !== undefined) styles += `grid-row-gap: ${handleValue(props.gridRowGap)};`;
  if (props.gridColumnGap !== undefined) styles += `grid-column-gap: ${handleValue(props.gridColumnGap)};`;
  
  // Text properties
  if (props.textAlign !== undefined) styles += `text-align: ${props.textAlign};`;
  if (props.textTransform !== undefined) styles += `text-transform: ${props.textTransform};`;
  if (props.fontWeight !== undefined) styles += `font-weight: ${props.fontWeight};`;
  if (props.fontStyle !== undefined) styles += `font-style: ${props.fontStyle};`;
  if (props.letterSpacing !== undefined) styles += `letter-spacing: ${handleValue(props.letterSpacing)};`;
  if (props.lineHeight !== undefined) styles += `line-height: ${props.lineHeight};`;
  
  // Color properties
  if (props.color !== undefined) styles += `color: ${props.color};`;
  if (props.bg !== undefined) styles += `background: ${props.bg};`;
  if (props.backgroundColor !== undefined) styles += `background-color: ${props.backgroundColor};`;
  if (props.opacity !== undefined) styles += `opacity: ${props.opacity};`;
  
  // Border properties
  if (props.border !== undefined) styles += `border: ${props.border};`;
  if (props.borderTop !== undefined) styles += `border-top: ${props.borderTop};`;
  if (props.borderRight !== undefined) styles += `border-right: ${props.borderRight};`;
  if (props.borderBottom !== undefined) styles += `border-bottom: ${props.borderBottom};`;
  if (props.borderLeft !== undefined) styles += `border-left: ${props.borderLeft};`;
  if (props.borderColor !== undefined) styles += `border-color: ${props.borderColor};`;
  if (props.borderRadius !== undefined) styles += `border-radius: ${handleValue(props.borderRadius)};`;
  
  // Shadow properties
  if (props.boxShadow !== undefined) styles += `box-shadow: ${props.boxShadow};`;
  
  // Position properties
  if (props.position !== undefined) styles += `position: ${props.position};`;
  if (props.top !== undefined) styles += `top: ${handleValue(props.top)};`;
  if (props.right !== undefined) styles += `right: ${handleValue(props.right)};`;
  if (props.bottom !== undefined) styles += `bottom: ${handleValue(props.bottom)};`;
  if (props.left !== undefined) styles += `left: ${handleValue(props.left)};`;
  if (props.zIndex !== undefined) styles += `z-index: ${props.zIndex};`;
  if (props.transform !== undefined) styles += `transform: ${props.transform};`;
  if (props.cursor !== undefined) styles += `cursor: ${props.cursor};`;
  
  return styles;
};

/**
 * Get responsive props without ESLint warnings
 */
const getResponsiveProps = (props: BoxProps): ResponsiveProps => {
  const responsiveProps: ResponsiveProps = {};
  
  // Only include keys that exist in the props
  if ('_xs' in props && props._xs) responsiveProps._xs = props._xs;
  if ('_sm' in props && props._sm) responsiveProps._sm = props._sm;
  if ('_md' in props && props._md) responsiveProps._md = props._md;
  if ('_lg' in props && props._lg) responsiveProps._lg = props._lg;
  if ('_xl' in props && props._xl) responsiveProps._xl = props._xl;
  if ('_xxl' in props && props._xxl) responsiveProps._xxl = props._xxl;
  
  return responsiveProps;
};

/**
 * Get style props without unused variable warnings
 */
const getBoxStyleProps = (props: BoxProps): BoxStyleProps => {
  // Create a copy of props to modify
  const allProps = { ...props };
  
  // Remove non-style props
  const nonStyleProps = [
    'className', 'children', 
    '_xs', '_sm', '_md', '_lg', '_xl', '_xxl',
    'as', 'forwardedAs', 'style',
  ];
  
  nonStyleProps.forEach(prop => {
    if (prop in allProps) {
      delete allProps[prop as keyof BoxProps];
    }
  });
  
  return allProps as BoxStyleProps;
};

/**
 * Styled div implementing the Box component
 * Uses sacred geometry principles for styling
 */
const StyledBox = styled.div<BoxProps>`
  /* Apply base styles from props */
  ${(props) => generateStyles(getBoxStyleProps(props))}
  
  /* Apply responsive styles from props */
  ${(props) => generateResponsiveStyles(getResponsiveProps(props))}
`;

/**
 * Box Component with ref forwarding
 * The fundamental building block of the layout system
 */
export const Box = forwardRef<HTMLDivElement, AsProps<HTMLDivElement>>(
  (props, ref) => {
    // Destructure props safely to avoid type errors
    const { as, style, ...rest } = props;
    
    // More flexible approach that properly handles any component for 'as'
    return <StyledBox ref={ref} as={as} style={style} {...rest} />;
  }
);

Box.displayName = 'Box';

export default Box;






