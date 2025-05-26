import React from 'react';
import { Global, css } from '@emotion/react';
import { createGlobalStyle } from 'styled-components';

/**
 * Props for the GlobalStyles component
 */
export interface GlobalStylesProps {
  /**
   * CSS styles as a string or template literal
   */
  styles: string;
}

/**
 * GlobalStyles component that works with both @emotion/react and styled-components
 * This component renders global styles using emotion's Global component
 */
export const GlobalStyles: React.FC<GlobalStylesProps> = ({ styles }) => {
  return (
    <Global 
      styles={css`
        ${styles}
      `}
    />
  );
};

/**
 * Alternative way to create global styles using styled-components
 * This creates a component that can be rendered directly
 * 
 * Usage:
 * const MyGlobalStyle = createGlobalStyleComponent`
 *   body { margin: 0; }
 * `;
 * 
 * <MyGlobalStyle />
 */
export const createGlobalStyleComponent = createGlobalStyle;

export default GlobalStyles; 