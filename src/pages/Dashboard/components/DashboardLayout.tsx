/**
 * Dashboard Layout Component
 * Main layout wrapper with sidebar navigation for Recovery Office admin panel
 */

import React, { useState } from 'react';
import styled from 'styled-components';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardTopBar } from './DashboardTopBar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

// Styled Components
const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f7fafc;
`;

const SidebarContainer = styled.div<{ $isCollapsed: boolean }>`
  width: ${props => props.$isCollapsed ? '80px' : '280px'};
  transition: width 0.3s ease;
  background: #1a365d;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  position: fixed;
  height: 100vh;
  z-index: 1000;
  overflow: hidden;

  @media (max-width: 768px) {
    width: ${props => props.$isCollapsed ? '0' : '280px'};
    transform: translateX(${props => props.$isCollapsed ? '-100%' : '0'});
  }
`;

const MainContent = styled.div<{ $sidebarCollapsed: boolean }>`
  flex: 1;
  margin-left: ${props => props.$sidebarCollapsed ? '80px' : '280px'};
  transition: margin-left 0.3s ease;
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const ContentArea = styled.main`
  flex: 1;
  overflow-y: auto;
`;

const MobileOverlay = styled.div<{ $show: boolean }>`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: ${props => props.$show ? 1 : 0};
  visibility: ${props => props.$show ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease, visibility 0.3s ease;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <LayoutContainer>
      {/* Mobile Overlay */}
      <MobileOverlay $show={mobileMenuOpen} onClick={closeMobileMenu} />

      {/* Sidebar */}
      <SidebarContainer $isCollapsed={sidebarCollapsed && !mobileMenuOpen}>
        <DashboardSidebar 
          collapsed={sidebarCollapsed}
          onToggle={toggleSidebar}
          onMobileClose={closeMobileMenu}
        />
      </SidebarContainer>

      {/* Main Content */}
      <MainContent $sidebarCollapsed={sidebarCollapsed}>
        {/* Top Bar */}
        <DashboardTopBar 
          onMenuToggle={toggleMobileMenu}
          onSidebarToggle={toggleSidebar}
          sidebarCollapsed={sidebarCollapsed}
        />

        {/* Content Area */}
        <ContentArea>
          {children}
        </ContentArea>
      </MainContent>
    </LayoutContainer>
  );
};

export default DashboardLayout; 