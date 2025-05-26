/**
 * Card Component
 * 
 * A premium card component that extends Box with specific styling for cards.
 * Follows sacred geometry principles for harmonious proportions.
 */

import * as React from 'react';
import styled from 'styled-components';
import { Box } from '../layout';
import { BoxProps } from '../../types';
import { PHI_INVERSE } from '../../../constants/sacred-geometry';

export interface CardProps extends BoxProps {
  /**
   * Elevation level of the card (affects shadow depth)
   * @default 1
   */
  elevation?: 0 | 1 | 2 | 3 | 4;
}

/**
 * Card component
 * Extends Box with specific styling for cards
 */
const Card = styled(Box)<CardProps>`
  background-color: ${props => props.theme.colors.background.paper};
  border-radius: ${props => props.theme.radius.md}px;
  overflow: hidden;
  
  /* Box shadow based on elevation */
  box-shadow: ${props => {
    const { elevation = 1 } = props;
    
    switch (elevation) {
      case 0:
        return 'none';
      case 1:
        return props.theme.shadows.sm;
      case 2:
        return props.theme.shadows.md;
      case 3:
        return props.theme.shadows.lg;
      case 4:
        return props.theme.shadows.xl;
      default:
        return props.theme.shadows.sm;
    }
  }};
  
  /* Default padding based on golden ratio */
  padding: ${props => props.p ?? (props.theme.spacing.md * PHI_INVERSE)}px;
`;

Card.defaultProps = {
  elevation: 1,
  p: 4
};

export default Card; 