/**
 * Dashboard Top Bar Component
 * Top navigation bar for Recovery Office admin panel
 */

import React, { useState } from 'react';
import styled from 'styled-components';

interface DashboardTopBarProps {
  onMenuToggle: () => void;
  onSidebarToggle: () => void;
  sidebarCollapsed: boolean;
}

// Styled Components
const TopBarContainer = styled.header`
  height: 64px;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const MenuButton = styled.button`
  display: none;
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  border-radius: 8px;
  cursor: pointer;
  color: #4a5568;
  font-size: 18px;
  transition: all 0.2s ease;

  &:hover {
    background: #f7fafc;
    color: #1a365d;
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const SidebarToggle = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  border-radius: 8px;
  cursor: pointer;
  color: #4a5568;
  font-size: 16px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #f7fafc;
    color: #1a365d;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  max-width: 400px;
  width: 100%;

  @media (max-width: 768px) {
    max-width: 200px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 16px 0 40px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  background: #f7fafc;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #1a365d;
    background: white;
    box-shadow: 0 0 0 3px rgba(26, 54, 93, 0.1);
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
  font-size: 16px;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const NotificationButton = styled.button`
  position: relative;
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  border-radius: 8px;
  cursor: pointer;
  color: #4a5568;
  font-size: 18px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #f7fafc;
    color: #1a365d;
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 8px;
  height: 8px;
  background: #e53e3e;
  border-radius: 50%;
  border: 2px solid white;
`;

const UserMenu = styled.div`
  position: relative;
`;

const UserButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: none;
  background: transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f7fafc;
  }
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #1a365d 0%, #2d3748 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 14px;
`;

const UserInfo = styled.div`
  text-align: left;

  @media (max-width: 768px) {
    display: none;
  }
`;

const UserName = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: #1a365d;
  line-height: 1.2;
`;

const UserRole = styled.div`
  font-size: 12px;
  color: #718096;
  line-height: 1.2;
`;

const DropdownIcon = styled.span`
  color: #a0aec0;
  font-size: 12px;
  transition: transform 0.2s ease;

  @media (max-width: 768px) {
    display: none;
  }
`;

const UserDropdown = styled.div<{ $show: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  width: 200px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  opacity: ${props => props.$show ? 1 : 0};
  visibility: ${props => props.$show ? 'visible' : 'hidden'};
  transform: translateY(${props => props.$show ? '0' : '-8px'});
  transition: all 0.2s ease;
  z-index: 1000;
`;

const DropdownItem = styled.button`
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: transparent;
  text-align: left;
  cursor: pointer;
  font-size: 14px;
  color: #4a5568;
  transition: background 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: #f7fafc;
  }

  &:first-child {
    border-radius: 8px 8px 0 0;
  }

  &:last-child {
    border-radius: 0 0 8px 8px;
    border-top: 1px solid #e2e8f0;
    color: #e53e3e;
  }
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #f0fff4;
  border-radius: 8px;
  font-size: 12px;
  color: #38a169;
  font-weight: 500;

  @media (max-width: 768px) {
    display: none;
  }
`;

const StatusDot = styled.div`
  width: 6px;
  height: 6px;
  background: #38a169;
  border-radius: 50%;
`;

export const DashboardTopBar: React.FC<DashboardTopBarProps> = ({
  onMenuToggle,
  onSidebarToggle,
  sidebarCollapsed
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search query:', searchQuery);
    // Implement search functionality
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  const handleUserAction = (action: string) => {
    console.log('User action:', action);
    setShowUserDropdown(false);
    // Implement user actions
  };

  return (
    <TopBarContainer>
      <LeftSection>
        {/* Mobile Menu Button */}
        <MenuButton onClick={onMenuToggle}>
          ☰
        </MenuButton>

        {/* Desktop Sidebar Toggle */}
        <SidebarToggle onClick={onSidebarToggle}>
          {sidebarCollapsed ? '→' : '←'}
        </SidebarToggle>

        {/* Search */}
        <SearchContainer>
          <form onSubmit={handleSearch}>
            <SearchIcon>🔍</SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search bookings, clients, services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </SearchContainer>
      </LeftSection>

      <RightSection>
        {/* System Status */}
        <StatusIndicator>
          <StatusDot />
          All Systems Operational
        </StatusIndicator>

        {/* Notifications */}
        <NotificationButton>
          🔔
          <NotificationBadge />
        </NotificationButton>

        {/* User Menu */}
        <UserMenu>
          <UserButton onClick={toggleUserDropdown}>
            <UserAvatar>A</UserAvatar>
            <UserInfo>
              <UserName>Admin User</UserName>
              <UserRole>Administrator</UserRole>
            </UserInfo>
            <DropdownIcon>▼</DropdownIcon>
          </UserButton>

          <UserDropdown $show={showUserDropdown}>
            <DropdownItem onClick={() => handleUserAction('profile')}>
              👤 Profile Settings
            </DropdownItem>
            <DropdownItem onClick={() => handleUserAction('preferences')}>
              ⚙️ Preferences
            </DropdownItem>
            <DropdownItem onClick={() => handleUserAction('help')}>
              ❓ Help & Support
            </DropdownItem>
            <DropdownItem onClick={() => handleUserAction('logout')}>
              🚪 Sign Out
            </DropdownItem>
          </UserDropdown>
        </UserMenu>
      </RightSection>
    </TopBarContainer>
  );
};

export default DashboardTopBar; 