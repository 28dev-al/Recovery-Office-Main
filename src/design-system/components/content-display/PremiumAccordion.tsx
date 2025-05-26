/**
 * PremiumAccordion Component
 * 
 * A premium accordion component for displaying financial FAQs and expandable content
 * with professional financial styling.
 */

import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { 
  PROFESSIONAL_EASINGS, 
  ANIMATION_DURATION,
  TIMING_PATTERNS
} from '../../../constants/professional-animations';

// Types for accordion items
export interface AccordionItem {
  /**
   * Unique identifier for the accordion item
   */
  id: string;
  
  /**
   * The title or question to display in the header
   */
  title: React.ReactNode;
  
  /**
   * The content or answer to display when expanded
   */
  content: React.ReactNode;
  
  /**
   * Optional icon to display in the header
   */
  icon?: React.ReactNode;
  
  /**
   * Whether this item is initially expanded
   * @default false
   */
  initiallyExpanded?: boolean;
  
  /**
   * Whether this item is disabled
   * @default false
   */
  disabled?: boolean;
}

// Props for the accordion component
export interface PremiumAccordionProps {
  /**
   * Array of accordion items
   */
  items: AccordionItem[];
  
  /**
   * Whether multiple items can be expanded simultaneously
   * @default false
   */
  allowMultiple?: boolean;
  
  /**
   * Variant of the accordion
   * @default 'default'
   */
  variant?: 'default' | 'outline' | 'filled';
  
  /**
   * Spacing between accordion items
   * @default 'md'
   */
  spacing?: 'xs' | 'sm' | 'md' | 'lg';
  
  /**
   * Size of the accordion items
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Whether to animate the accordion expansion
   * @default true
   */
  animated?: boolean;
  
  /**
   * Callback when an item is expanded or collapsed
   */
  onChange?: (expandedIds: string[]) => void;
  
  /**
   * Additional class name
   */
  className?: string;
  
  /**
   * Data attribute for testing
   */
  'data-testid'?: string;
}

// Styled accordion container
const AccordionContainer = styled.div<{
  $spacing: 'xs' | 'sm' | 'md' | 'lg';
}>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${props => {
    switch (props.$spacing) {
      case 'xs': return props.theme.spacing.xs;
      case 'sm': return props.theme.spacing.sm;
      case 'lg': return props.theme.spacing.lg;
      case 'md':
      default: return props.theme.spacing.md;
    }
  }}px;
`;

// Styled accordion item
const AccordionItemContainer = styled.div<{
  $variant: 'default' | 'outline' | 'filled';
  $isExpanded: boolean;
  $disabled: boolean;
}>`
  width: 100%;
  border-radius: ${props => props.theme.radius.md}px;
  overflow: hidden;
  transition: all ${ANIMATION_DURATION.standard}s cubic-bezier(${PROFESSIONAL_EASINGS.standard.join(', ')});
  
  ${props => {
    switch (props.$variant) {
      case 'outline':
        return `
          border: 1px solid ${props.theme.colors.background[300]};
          ${props.$isExpanded ? `
            box-shadow: ${props.theme.shadows.sm};
          ` : ''}
        `;
      case 'filled':
        return `
          background-color: ${props.theme.colors.background[50]};
          ${props.$isExpanded ? `
            box-shadow: ${props.theme.shadows.sm};
            background-color: ${props.theme.colors.background[100]};
          ` : ''}
        `;
      case 'default':
      default:
        return `
          border-bottom: 1px solid ${props.theme.colors.background[200]};
          border-radius: 0;
        `;
    }
  }}
  
  ${props => props.$disabled && `
    opacity: 0.6;
    cursor: not-allowed;
  `}
`;

// Styled accordion header
const AccordionHeader = styled.button<{
  $variant: 'default' | 'outline' | 'filled';
  $isExpanded: boolean;
  $disabled: boolean;
  $size: 'sm' | 'md' | 'lg';
}>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: none;
  border: none;
  padding: ${props => {
    switch (props.$size) {
      case 'sm': return `${props.theme.spacing.sm}px ${props.theme.spacing.md}px`;
      case 'lg': return `${props.theme.spacing.lg}px ${props.theme.spacing.xl}px`;
      case 'md':
      default: return `${props.theme.spacing.md}px ${props.theme.spacing.lg}px`;
    }
  }};
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  text-align: left;
  user-select: none;
  font-family: ${props => props.theme.typography.fontFamily.heading};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.text.primary};
  transition: all ${ANIMATION_DURATION.fast}s cubic-bezier(${PROFESSIONAL_EASINGS.sharp.join(', ')});
  
  ${props => {
    switch (props.$size) {
      case 'sm': return `font-size: ${props.theme.typography.fontSize.sm}px;`;
      case 'lg': return `font-size: ${props.theme.typography.fontSize.lg}px;`;
      case 'md':
      default: return `font-size: ${props.theme.typography.fontSize.md}px;`;
    }
  }}
  
  ${props => {
    switch (props.$variant) {
      case 'outline':
      case 'filled':
        return `
          &:hover {
            background-color: ${props.theme.colors.background[100]};
          }
        `;
      case 'default':
      default:
        return `
          &:hover {
            background-color: ${props.theme.colors.background[50]};
          }
        `;
    }
  }}
  
  ${props => props.$isExpanded && `
    font-weight: ${props.theme.typography.fontWeight.semiBold};
    color: ${props.theme.colors.primary[700]};
  `}
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary[200]};
  }
`;

// Header title container
const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm}px;
`;

// Icon container
const IconContainer = styled.div<{
  $size: 'sm' | 'md' | 'lg';
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  ${props => {
    switch (props.$size) {
      case 'sm': return `
        width: ${props.theme.spacing.lg}px;
        height: ${props.theme.spacing.lg}px;
      `;
      case 'lg': return `
        width: ${props.theme.spacing.xl}px;
        height: ${props.theme.spacing.xl}px;
      `;
      case 'md':
      default: return `
        width: ${props.theme.spacing.lg * 1.25}px;
        height: ${props.theme.spacing.lg * 1.25}px;
      `;
    }
  }}
`;

// Plus/Minus icon for expand/collapse
const ExpandIcon = styled.div<{
  $isExpanded: boolean;
  $size: 'sm' | 'md' | 'lg';
}>`
  position: relative;
  width: ${props => {
    switch (props.$size) {
      case 'sm': return props.theme.spacing.md;
      case 'lg': return props.theme.spacing.lg;
      case 'md':
      default: return props.theme.spacing.md * 1.25;
    }
  }}px;
  height: ${props => {
    switch (props.$size) {
      case 'sm': return props.theme.spacing.md;
      case 'lg': return props.theme.spacing.lg;
      case 'md':
      default: return props.theme.spacing.md * 1.25;
    }
  }}px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.text.secondary};
  transition: transform ${ANIMATION_DURATION.standard}s cubic-bezier(${PROFESSIONAL_EASINGS.standard.join(', ')});
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    background-color: currentColor;
    transition: transform ${ANIMATION_DURATION.standard}s cubic-bezier(${PROFESSIONAL_EASINGS.standard.join(', ')});
  }
  
  /* Horizontal line */
  &::before {
    width: 100%;
    height: 2px;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
  
  /* Vertical line */
  &::after {
    width: 2px;
    height: 100%;
    left: 50%;
    top: 0;
    transform: translateX(-50%) ${props => props.$isExpanded ? 'scaleY(0)' : 'scaleY(1)'};
  }
`;

// Styled content container
const ContentContainer = styled.div<{
  $isExpanded: boolean;
  $animated: boolean;
  $height: number;
}>`
  overflow: hidden;
  transition: ${props => props.$animated ? `height ${TIMING_PATTERNS.accordion.expand}ms cubic-bezier(${PROFESSIONAL_EASINGS.standard.join(', ')})` : 'none'};
  height: ${props => props.$isExpanded ? `${props.$height}px` : '0'};
`;

// Styled content inner
const ContentInner = styled.div<{
  $variant: 'default' | 'outline' | 'filled';
  $size: 'sm' | 'md' | 'lg';
}>`
  padding: ${props => {
    switch (props.$size) {
      case 'sm': return `0 ${props.theme.spacing.md}px ${props.theme.spacing.md}px`;
      case 'lg': return `0 ${props.theme.spacing.xl}px ${props.theme.spacing.xl}px`;
      case 'md':
      default: return `0 ${props.theme.spacing.lg}px ${props.theme.spacing.lg}px`;
    }
  }};
  color: ${props => props.theme.colors.text.secondary};
  font-family: ${props => props.theme.typography.fontFamily.body};
  
  ${props => {
    switch (props.$size) {
      case 'sm': return `font-size: ${props.theme.typography.fontSize.sm}px;`;
      case 'lg': return `font-size: ${props.theme.typography.fontSize.md}px;`;
      case 'md':
      default: return `font-size: ${props.theme.typography.fontSize.base}px;`;
    }
  }}
  
  /* Add appropriate line height for readability */
  line-height: 1.5;
`;

/**
 * Premium Accordion Item Component
 */
const AccordionItemComponent: React.FC<{
  item: AccordionItem;
  isExpanded: boolean;
  onToggle: () => void;
  variant: 'default' | 'outline' | 'filled';
  size: 'sm' | 'md' | 'lg';
  animated: boolean;
}> = ({
  item,
  isExpanded,
  onToggle,
  variant,
  size,
  animated
}) => {
  const [contentHeight, setContentHeight] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Update content height when expanded state changes
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isExpanded, item.content]);
  
  return (
    <AccordionItemContainer
      $variant={variant}
      $isExpanded={isExpanded}
      $disabled={!!item.disabled}
    >
      <AccordionHeader
        $variant={variant}
        $isExpanded={isExpanded}
        $disabled={!!item.disabled}
        $size={size}
        onClick={() => !item.disabled && onToggle()}
        aria-expanded={isExpanded}
        disabled={item.disabled}
        aria-controls={`accordion-content-${item.id}`}
        id={`accordion-header-${item.id}`}
      >
        <HeaderContent>
          {item.icon && (
            <IconContainer $size={size}>
              {item.icon}
            </IconContainer>
          )}
          {item.title}
        </HeaderContent>
        <ExpandIcon $isExpanded={isExpanded} $size={size} />
      </AccordionHeader>
      
      <ContentContainer 
        $isExpanded={isExpanded}
        $animated={animated}
        $height={contentHeight}
        id={`accordion-content-${item.id}`}
        aria-labelledby={`accordion-header-${item.id}`}
        role="region"
      >
        <ContentInner 
          ref={contentRef}
          $variant={variant}
          $size={size}
        >
          {item.content}
        </ContentInner>
      </ContentContainer>
    </AccordionItemContainer>
  );
};

/**
 * Premium Accordion Component
 * 
 * A premium accordion component for displaying financial FAQs and expandable content
 * with professional styling for financial services websites.
 */
export const PremiumAccordion: React.FC<PremiumAccordionProps> = ({
  items,
  allowMultiple = false,
  variant = 'default',
  spacing = 'md',
  size = 'md',
  animated = true,
  onChange,
  className,
  'data-testid': testId = 'premium-accordion',
}) => {
  // Track expanded state of each accordion item
  const [expandedItems, setExpandedItems] = useState<string[]>(() => 
    items.filter(item => item.initiallyExpanded).map(item => item.id)
  );
  
  // Handle toggling an accordion item
  const handleToggle = (id: string) => {
    setExpandedItems(prevExpanded => {
      let newExpanded: string[];
      
      if (prevExpanded.includes(id)) {
        // Item is currently expanded, collapse it
        newExpanded = prevExpanded.filter(itemId => itemId !== id);
      } else {
        // Item is currently collapsed, expand it
        if (allowMultiple) {
          // Allow multiple expansions
          newExpanded = [...prevExpanded, id];
        } else {
          // Only allow one expansion at a time
          newExpanded = [id];
        }
      }
      
      // Call onChange callback if provided
      if (onChange) {
        onChange(newExpanded);
      }
      
      return newExpanded;
    });
  };
  
  return (
    <AccordionContainer 
      className={className} 
      data-testid={testId}
      $spacing={spacing}
    >
      {items.map(item => (
        <AccordionItemComponent
          key={item.id}
          item={item}
          isExpanded={expandedItems.includes(item.id)}
          onToggle={() => handleToggle(item.id)}
          variant={variant}
          size={size}
          animated={animated}
        />
      ))}
    </AccordionContainer>
  );
};

export default PremiumAccordion; 