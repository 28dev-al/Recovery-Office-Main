import * as React from 'react';
import styled from 'styled-components';
import { Box } from '../layout';
import { PHI_INVERSE } from '../../../constants/sacred-geometry';
import { getFibonacciByIndex } from '../../../utils/getFibonacciByIndex';

// Import sacred geometry constants



// Import design system components

// TypeScript interfaces
export interface ListProps {
  /** The list items */
  children: React.ReactNode;
  /** List variant */
  variant?: 'ordered' | 'unordered' | 'custom';
  /** Spacing between list items */
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Marker type for the list items */
  markerType?: 'disc' | 'circle' | 'square' | 'decimal' | 'botanical' | 'none';
  /** Color scheme for list markers */
  markerColor?: 'primary' | 'secondary' | 'accent';
  /** Optional custom marker element for custom lists */
  customMarker?: React.ReactNode;
  /** Whether the list should display inline (horizontal) */
  inline?: boolean;
  /** Additional className */
  className?: string;
  /** Test ID for testing */
  'data-testid'?: string;
}

/**
 * List Component with ref forwarding
 * 
 * A component for displaying ordered or unordered lists with
 * sacred geometry proportions for spacing and markers.
 */
const List = React.forwardRef<HTMLUListElement | HTMLOListElement, ListProps>(
  ({
    children,
    variant = 'unordered',
    spacing = 'md',
    markerType = 'disc',
    markerColor = 'primary',
    customMarker,
    inline = false,
    className,
    'data-testid': testId = 'sacred-list',
  }, ref) => {
    // Determine the HTML element based on variant
    const as = variant === 'ordered' ? 'ol' : 'ul';
    
    // If custom variant with a custom marker, wrap children to add markers
    if (variant === 'custom' && customMarker) {
      return (
        <StyledList
          as={as}
          $spacing={spacing}
          $markerType="none"
          $markerColor={markerColor}
          $inline={inline}
          className={className}
          data-testid={testId}
          ref={ref}
        >
          {React.Children.map(children, child => (
            <ListItem $spacing={spacing} $inline={inline}>
              <MarkerWrapper>{customMarker}</MarkerWrapper>
              <Box display="inline-block">{child}</Box>
            </ListItem>
          ))}
        </StyledList>
      );
    }
    
    // For standard lists
    return (
      <StyledList
        as={as}
        $spacing={spacing}
        $markerType={markerType}
        $markerColor={markerColor}
        $inline={inline}
        className={className}
        data-testid={testId}
        ref={ref}
      >
        {children}
      </StyledList>
    );
  }
);

List.displayName = 'List';

// Helper function to get spacing value from design tokens
const getSpacingValue = (spacing: string): number => {
  switch (spacing) {
    case 'xs': return getFibonacciByIndex(4); // 3
    case 'sm': return getFibonacciByIndex(5); // 5
    case 'md': return getFibonacciByIndex(6); // 8
    case 'lg': return getFibonacciByIndex(7); // 13
    case 'xl': return getFibonacciByIndex(8); // 21
    default: return getFibonacciByIndex(6); // 8
  }
};

// Styled components
interface StyledListProps {
  $spacing: string;
  $markerType: string;
  $markerColor: string;
  $inline: boolean;
}

const StyledList = styled.ul<StyledListProps>`
  list-style-type: ${({ $markerType }) => 
    $markerType === 'none' ? 'none' :
    $markerType === 'botanical' ? 'none' :
    $markerType
  };
  
  padding: 0;
  margin: 0;
  padding-left: ${({ $markerType }) => 
    $markerType === 'none' ? '0' : '1.25em'
  };
  
  /* Custom styling for botanical markers */
  ${({ $markerType, theme, $markerColor }) => 
    $markerType === 'botanical' ? `
      list-style: none;
      padding-left: 0;
      
      li {
        position: relative;
        padding-left: ${getFibonacciByIndex(7)}px;
        
        &:before {
          content: '•';
          position: absolute;
          left: 0;
          color: ${
            $markerColor === 'primary' ? theme.colors.primary[500] ?? 1 :
            $markerColor === 'secondary' ? theme.colors.secondary[500] ?? 1 :
            theme.colors.accent.gold
          };
          font-size: 1.2em;
          line-height: 1;
          transform: scale(${PHI_INVERSE * 1.5});
        }
      }
    `
    : ''
  }
  
  /* Inline styling */
  ${({ $inline }) => 
    $inline ? `
      display: flex;
      flex-wrap: wrap;
      
      li {
        display: inline-block;
      }
    `
    : ''
  }
  
  /* Color styling */
  color: ${({ theme, $markerColor }) => 
    $markerColor === 'primary' ? theme.colors.text.primary :
    $markerColor === 'secondary' ? theme.colors.text.secondary :
    theme.colors.accent.gold
  };
`;

interface ListItemProps {
  $spacing: string;
  $inline: boolean;
}

const ListItem = styled.li<ListItemProps>`
  margin-bottom: ${({ $spacing, $inline }) => 
    $inline ? '0' : `${getSpacingValue($spacing)}px`
  };
  
  margin-right: ${({ $spacing, $inline }) => 
    $inline ? `${getSpacingValue($spacing)}px` : '0'
  };
  
  display: ${({ $inline }) => $inline ? 'inline-flex' : 'flex'};
  align-items: flex-start;
`;

const MarkerWrapper = styled.span`
  display: inline-flex;
  margin-right: ${getFibonacciByIndex(5)}px;
  align-items: center;
`;

export default List; 










