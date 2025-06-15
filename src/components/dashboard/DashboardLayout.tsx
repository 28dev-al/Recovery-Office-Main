import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f8fafc;
`;

const Sidebar = styled.div<{ collapsed: boolean }>`
  width: ${props => props.collapsed ? '80px' : '280px'};
  background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%);
  transition: all 0.3s ease;
  position: relative;
  box-shadow: 4px 0 12px rgba(0, 0, 0, 0.1);
`;

const SidebarHeader = styled.div`
  padding: 24px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div<{ collapsed: boolean }>`
  color: white;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.5px;
  opacity: ${props => props.collapsed ? '0' : '1'};
  transition: opacity 0.3s ease;
`;

const CollapseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const NavMenu = styled.nav`
  padding: 20px 0;
`;

const NavItem = styled.div<{ active: boolean; collapsed: boolean }>`
  margin: 4px 16px;
  border-radius: 8px;
  overflow: hidden;
`;

const NavLink = styled.button<{ active: boolean; collapsed: boolean }>`
  width: 100%;
  background: ${props => props.active ? 'rgba(214, 158, 46, 0.2)' : 'none'};
  border: none;
  color: white;
  padding: 12px 16px;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  border-radius: 8px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .icon {
    font-size: 18px;
    width: 20px;
    text-align: center;
    flex-shrink: 0;
  }

  .text {
    opacity: ${props => props.collapsed ? '0' : '1'};
    white-space: nowrap;
    transition: opacity 0.3s ease;
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const TopBar = styled.header`
  background: white;
  padding: 16px 24px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #1a365d;
  margin: 0;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
`;

const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #d69e2e 0%, #f6ad3a 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 14px;
`;

const UserName = styled.span`
  font-weight: 600;
  color: #1a365d;
`;

const LogoutButton = styled.button`
  background: none;
  border: 1px solid #e2e8f0;
  color: #4a5568;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    border-color: #d69e2e;
    color: #d69e2e;
  }
`;

const ContentArea = styled.main`
  flex: 1;
  overflow-y: auto;
`;

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: '📊', label: 'Overview', key: 'overview' },
    { path: '/dashboard/bookings', icon: '📅', label: 'Bookings', key: 'bookings' },
    { path: '/dashboard/clients', icon: '👥', label: 'Clients', key: 'clients' },
    { path: '/dashboard/services', icon: '🛠️', label: 'Services', key: 'services' },
    { path: '/dashboard/google-ads-leads', icon: '🎯', label: 'Google Ads Leads', key: 'google-ads-leads' },
    { path: '/dashboard/analytics', icon: '📈', label: 'Analytics', key: 'analytics' },
  ];

  const getPageTitle = () => {
    const currentPath = location.pathname;
    const menuItem = menuItems.find(item => item.path === currentPath);
    return menuItem ? menuItem.label : 'Dashboard';
  };

  const handleLogout = () => {
    // Add logout logic here
    navigate('/');
  };

  return (
    <DashboardContainer>
      <Sidebar collapsed={sidebarCollapsed}>
        <SidebarHeader>
          <Logo collapsed={sidebarCollapsed}>RECOVERY OFFICE</Logo>
          <CollapseButton onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
            {sidebarCollapsed ? '→' : '←'}
          </CollapseButton>
        </SidebarHeader>

        <NavMenu>
          {menuItems.map(item => (
            <NavItem 
              key={item.key} 
              active={location.pathname === item.path}
              collapsed={sidebarCollapsed}
            >
              <NavLink
                active={location.pathname === item.path}
                collapsed={sidebarCollapsed}
                onClick={() => navigate(item.path)}
              >
                <span className="icon">{item.icon}</span>
                <span className="text">{item.label}</span>
              </NavLink>
            </NavItem>
          ))}
        </NavMenu>
      </Sidebar>
      
      <MainContent>
        <TopBar>
          <PageTitle>{getPageTitle()}</PageTitle>
          <UserSection>
            <UserName>Alex Bianchi</UserName>
            <UserAvatar>AB</UserAvatar>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </UserSection>
        </TopBar>
        
        <ContentArea>
          {children}
        </ContentArea>
      </MainContent>
    </DashboardContainer>
  );
}; 