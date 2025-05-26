/**
 * Dashboard Sidebar Component
 * Navigation sidebar for Recovery Office admin panel
 */

import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

interface DashboardSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  onMobileClose: () => void;
}

interface MenuItem {
  label: string;
  icon: string;
  path: string;
  badge?: number;
}

// Menu Items Configuration
const menuItems: MenuItem[] = [
  { label: 'Overview', icon: '📊', path: '/dashboard' },
  { label: 'Bookings', icon: '📅', path: '/dashboard/bookings' },
  { label: 'Clients', icon: '👥', path: '/dashboard/clients' },
  { label: 'Services', icon: '💼', path: '/dashboard/services' },
  { label: 'Analytics', icon: '📈', path: '/dashboard/analytics' },
  { label: 'Calendar', icon: '🗓️', path: '/dashboard/calendar' },
  { label: 'Reports', icon: '📋', path: '/dashboard/reports' },
  { label: 'Settings', icon: '⚙️', path: '/dashboard/settings' }
];

// Styled Components
const SidebarContainer = styled.div<{ $collapsed: boolean }>`
  height: 100vh;
  background: linear-gradient(180deg, #1a365d 0%, #2d3748 100%);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

const SidebarHeader = styled.div<{ $collapsed: boolean }>`
  padding: 24px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 80px;
`;

const Logo = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #d69e2e 0%, #f6e05e 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  color: #1a365d;
  flex-shrink: 0;
`;

const BrandText = styled.div<{ $collapsed: boolean }>`
  opacity: ${props => props.$collapsed ? 0 : 1};
  transform: translateX(${props => props.$collapsed ? '-20px' : '0'});
  transition: opacity 0.3s ease, transform 0.3s ease;
  overflow: hidden;
  white-space: nowrap;
`;

const BrandTitle = styled.h1`
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
`;

const BrandSubtitle = styled.p`
  color: #a0aec0;
  font-size: 0.75rem;
  margin: 0;
  font-weight: 500;
`;

const Navigation = styled.nav`
  flex: 1;
  padding: 16px 0;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
  }
`;

const MenuSection = styled.div`
  padding: 0 16px;
`;

const MenuItemStyled = styled.div<{ $active: boolean; $collapsed: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  margin: 4px 0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  color: ${props => props.$active ? '#ffffff' : '#a0aec0'};
  background: ${props => props.$active ? 'rgba(214, 158, 46, 0.2)' : 'transparent'};
  
  &:hover {
    background: ${props => props.$active ? 'rgba(214, 158, 46, 0.3)' : 'rgba(255, 255, 255, 0.1)'};
    color: white;
    transform: translateX(4px);
  }

  ${props => props.$active && `
    &::before {
      content: '';
      position: absolute;
      left: -16px;
      top: 0;
      bottom: 0;
      width: 4px;
      background: #d69e2e;
      border-radius: 0 2px 2px 0;
    }
  `}
`;

const MenuIcon = styled.span`
  font-size: 20px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const MenuLabel = styled.span<{ $collapsed: boolean }>`
  font-weight: 500;
  font-size: 0.9rem;
  opacity: ${props => props.$collapsed ? 0 : 1};
  transform: translateX(${props => props.$collapsed ? '-20px' : '0'});
  transition: opacity 0.3s ease, transform 0.3s ease;
  overflow: hidden;
  white-space: nowrap;
`;

const MenuBadge = styled.span<{ $collapsed: boolean }>`
  background: #e53e3e;
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  opacity: ${props => props.$collapsed ? 0 : 1};
  transition: opacity 0.3s ease;
`;

const CollapseButton = styled.button`
  position: absolute;
  top: 50%;
  right: -12px;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  background: #1a365d;
  border: 2px solid #2d3748;
  border-radius: 50%;
  color: #a0aec0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  transition: all 0.2s ease;
  z-index: 10;

  &:hover {
    background: #2d3748;
    color: white;
    border-color: #4a5568;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const SidebarFooter = styled.div<{ $collapsed: boolean }>`
  padding: 16px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  opacity: ${props => props.$collapsed ? 0 : 1};
  transition: opacity 0.3s ease;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #a0aec0;
  font-size: 0.8rem;
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #d69e2e 0%, #f6e05e 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #1a365d;
  flex-shrink: 0;
`;

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  collapsed,
  onToggle,
  onMobileClose
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleMenuClick = (path: string) => {
    navigate(path);
    onMobileClose(); // Close mobile menu after navigation
  };

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <SidebarContainer $collapsed={collapsed}>
      {/* Collapse Button */}
      <CollapseButton onClick={onToggle}>
        {collapsed ? '→' : '←'}
      </CollapseButton>

      {/* Header */}
      <SidebarHeader $collapsed={collapsed}>
        <Logo>RO</Logo>
        <BrandText $collapsed={collapsed}>
          <BrandTitle>Recovery Office</BrandTitle>
          <BrandSubtitle>Admin Dashboard</BrandSubtitle>
        </BrandText>
      </SidebarHeader>

      {/* Navigation */}
      <Navigation>
        <MenuSection>
          {menuItems.map((item) => (
            <MenuItemStyled
              key={item.path}
              $active={isActive(item.path)}
              $collapsed={collapsed}
              onClick={() => handleMenuClick(item.path)}
            >
              <MenuIcon>{item.icon}</MenuIcon>
              <MenuLabel $collapsed={collapsed}>{item.label}</MenuLabel>
              {item.badge && (
                <MenuBadge $collapsed={collapsed}>{item.badge}</MenuBadge>
              )}
            </MenuItemStyled>
          ))}
        </MenuSection>
      </Navigation>

      {/* Footer */}
      <SidebarFooter $collapsed={collapsed}>
        <UserInfo>
          <UserAvatar>A</UserAvatar>
          <div>
            <div style={{ color: 'white', fontWeight: 600 }}>Admin User</div>
            <div>System Administrator</div>
          </div>
        </UserInfo>
      </SidebarFooter>
    </SidebarContainer>
  );
};

export default DashboardSidebar; 