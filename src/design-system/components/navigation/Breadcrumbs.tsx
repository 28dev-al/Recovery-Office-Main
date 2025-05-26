import * as React from 'react';
import { useState, useEffect } from 'react';
import styled, { DefaultTheme } from 'styled-components';

// Import sacred geometry constants
import { PHI_INVERSE } from '../../../constants/sacred-geometry';
import { getFibonacciByIndex } from '../../../utils/getFibonacciByIndex';

// Import components
import Link from './Link';
import { OliveBranch } from '../botanical';

// TypeScript interfaces
export interface BreadcrumbItem {
  /** The breadcrumb label */
  label: string;
  /** The breadcrumb URL */
  path: string;
  /** Whether the breadcrumb is active (current page) */
  isActive?: boolean;
}

export interface BreadcrumbsProps {
  /** The array of breadcrumb items */
  items: BreadcrumbItem[];
  /** Whether to show a home icon for the first item */
  showHomeIcon?: boolean;
  /** Whether to use a botanical element as separator */
  botanicalSeparator?: boolean;
  /** Custom separator element */
  separator?: React.ReactNode;
  /** Whether to truncate long paths */
  truncate?: boolean;
  /** Maximum width for each breadcrumb (for truncation) */
  maxItemWidth?: number | string;
  /** Whether to use micro animations */
  animated?: boolean;
  /** Additional className */
  className?: string;
  /** Max items to show before collapsing (responsive) */
  maxVisibleItems?: number;
  /** Test ID for testing */
  'data-testid'?: string;
}

/**
 * Breadcrumbs Component
 * 
 * A component for displaying breadcrumb navigation with sacred geometry 
 * spacing and optional botanical separators.
 */
const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  showHomeIcon = true,
  botanicalSeparator = false,
  separator,
  truncate = false,
  maxItemWidth = '200px',
  animated = true,
  className,
  maxVisibleItems,
  'data-testid': testId = 'sacred-breadcrumbs',
}) => {
  const [visibleItems, setVisibleItems] = useState<BreadcrumbItem[]>(items);
  
  // Responsive handling
  useEffect(() => {
    if (!maxVisibleItems) {
      setVisibleItems(items);
      return;
    }
    
    // If we need to collapse items
    if (items.length > maxVisibleItems) {
      const firstItem = items[0];
      const lastItems = items.slice(-Math.max(1, maxVisibleItems - 1));
      
      if (firstItem) {
        // Create a collapsed version
        setVisibleItems([
          firstItem, 
          { label: '...', path: '', isActive: false }, 
          ...lastItems
        ]);
      }
    } else {
      setVisibleItems(items);
    }
  }, [items, maxVisibleItems]);
  
  // Default separator
  const defaultSeparator = (
    <DefaultSeparator aria-hidden="true">/</DefaultSeparator>
  );
  
  // Botanical separator
  const botanicalSep = (
    <BotanicalSeparator aria-hidden="true">
      <OliveBranch 
        size="xs" 
        opacity={0.7}
        colorScheme="primary"
      />
    </BotanicalSeparator>
  );
  
  // Determine which separator to use
  const activeSeparator = botanicalSeparator 
    ? botanicalSep 
    : separator || defaultSeparator;
  
  // Home icon
  const homeIcon = (
    <HomeIcon viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M9 22V12h6v10" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </HomeIcon>
  );
  
  return (
    <Container className={className} data-testid={testId} $animated={animated}>
      <List>
        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1;
          
          return (
            <React.Fragment key={`${item.label}-${index}`}>
              <ListItem $truncate={truncate}>
                <Link
                  href={item.path}
                  isActive={item.isActive || isLast}
                  variant={isLast ? 'primary' : 'subtle'}
                  underline="none"
                  size="sm"
                  withHoverEffect={!isLast}
                >
                  {index === 0 && showHomeIcon && item.label.toLowerCase() === 'home' ? (
                    <span aria-label="Home">
                      {homeIcon}
                    </span>
                  ) : (
                    <ItemText $truncate={truncate} $maxWidth={maxItemWidth}>
                      {item.label}
                    </ItemText>
                  )}
                </Link>
              </ListItem>
              
              {/* Don't show separator after the last item */}
              {!isLast && activeSeparator}
            </React.Fragment>
          );
        })}
      </List>
    </Container>
  );
};

// Styled components
interface ContainerProps {
  $animated: boolean;
}

const Container = styled.nav<ContainerProps>`
  /* Base styles */
  display: flex;
  align-items: center;
  font-size: ${getFibonacciByIndex(6)}px; /* 8px */
  color: ${props => props.theme.colors.text.secondary};
  
  /* Animation */
  ${({ $animated }) => $animated && `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(${getFibonacciByIndex(4)}px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    animation: fadeIn 0.3s cubic-bezier(${PHI_INVERSE}, 0, ${1 - PHI_INVERSE}, 1);
  `}
`;

const List = styled.ol`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
`;

interface ListItemProps {
  $truncate: boolean;
}

const ListItem = styled.li<ListItemProps>`
  display: inline-flex;
  align-items: center;
  margin: 0;
  padding: 0;
  
  /* Truncate */
  ${({ $truncate }) => $truncate && `
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `}
`;

interface ItemTextProps {
  $truncate: boolean;
  $maxWidth: number | string;
}

const ItemText = styled.span<ItemTextProps>`
  ${({ $truncate, $maxWidth }) => $truncate && `
    display: inline-block;
    max-width: ${typeof $maxWidth === 'number' ? `${$maxWidth}px` : $maxWidth};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `}
`;

const DefaultSeparator = styled.span`
  display: inline-flex;
  align-items: center;
  margin: 0 ${getFibonacciByIndex(5)}px; /* 0 5px */
  color: ${props => props.theme.colors.text.tertiary};
  font-size: ${getFibonacciByIndex(6)}px; /* 8px */
`;

const BotanicalSeparator = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0 ${getFibonacciByIndex(4)}px; /* 0 3px */
  transform: rotate(${PHI_INVERSE * 90}deg);
  width: ${getFibonacciByIndex(6)}px; /* 8px */
  height: ${getFibonacciByIndex(6)}px; /* 8px */
`;

const HomeIcon = styled.svg`
  width: ${getFibonacciByIndex(7)}px; /* 13px */
  height: ${getFibonacciByIndex(7)}px; /* 13px */
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
`;

export default Breadcrumbs; 









