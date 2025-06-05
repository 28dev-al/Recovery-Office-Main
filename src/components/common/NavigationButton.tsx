import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { debugLog } from '../../utils/removeConsole';

interface NavigationButtonProps {
  to?: string;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'outline';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  disabled?: boolean;
  target?: string;
}

export const NavigationButton: React.FC<NavigationButtonProps> = ({
  to,
  href,
  onClick,
  children,
  variant = 'primary',
  size = 'medium',
  className,
  disabled = false,
  target
}) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      return;
    }

    debugLog('[NavigationButton] Button clicked:', { to, href, hasOnClick: !!onClick });

    if (onClick) {
      onClick();
    } else if (to) {
      debugLog('[NavigationButton] Navigating to:', to);
      navigate(to);
    } else if (href) {
      if (target === '_blank') {
        window.open(href, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = href;
      }
    }
  };

  // If it's an external link, render as anchor
  if (href && !to && !onClick) {
    return (
      <StyledButton
        as="a"
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        $variant={variant}
        $size={size}
        className={className}
        style={{ textDecoration: 'none' }}
      >
        {children}
      </StyledButton>
    );
  }

  return (
    <StyledButton
      onClick={handleClick}
      $variant={variant}
      $size={size}
      className={className}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<{ $variant: string; $size: string }>`
  border: none;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-family: inherit;
  white-space: nowrap;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  ${({ $variant }) => {
    switch ($variant) {
      case 'primary':
        return `
          background: linear-gradient(135deg, #d69e2e 0%, #f6ad3a 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(214, 158, 46, 0.3);
          
          &:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(214, 158, 46, 0.4);
          }
          
          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `;
      case 'secondary':
        return `
          background: transparent;
          color: white;
          border: 2px solid white;
          
          &:hover:not(:disabled) {
            background: white;
            color: #1a365d;
          }
          
          &:active:not(:disabled) {
            transform: scale(0.98);
          }
        `;
      case 'success':
        return `
          background: linear-gradient(135deg, #38a169 0%, #48bb78 100%);
          color: white;
          box-shadow: 0 4px 16px rgba(56, 161, 105, 0.2);
          
          &:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(56, 161, 105, 0.3);
          }
          
          &:active:not(:disabled) {
            transform: translateY(-1px);
          }
        `;
      case 'outline':
        return `
          background: transparent;
          color: #1a365d;
          border: 2px solid #1a365d;
          
          &:hover:not(:disabled) {
            background: #1a365d;
            color: white;
          }
          
          &:active:not(:disabled) {
            transform: scale(0.98);
          }
        `;
      default:
        return '';
    }
  }}

  ${({ $size }) => {
    switch ($size) {
      case 'small':
        return 'padding: 8px 16px; font-size: 14px;';
      case 'medium':
        return 'padding: 12px 24px; font-size: 16px;';
      case 'large':
        return 'padding: 16px 32px; font-size: 18px;';
      default:
        return '';
    }
  }}
`; 