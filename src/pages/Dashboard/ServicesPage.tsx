/**
 * Service Administration Page
 * Comprehensive service management for Recovery Office
 */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DashboardLayout } from './components/DashboardLayout';
import { apiClient } from '../../services/api';
import { LoadingOverlay } from '../../design-system/components/feedback';

// Types
interface Service {
  _id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  isActive: boolean;
  features: string[];
  createdAt: string;
  updatedAt: string;
  bookingCount?: number;
  revenue?: number;
}

interface ServiceFilter {
  category: string;
  status: string;
  search: string;
  priceRange: string;
}

// Styled Components
const PageContainer = styled.div`
  padding: 24px;
  background: #f7fafc;
  min-height: 100vh;
`;

const PageHeader = styled.div`
  margin-bottom: 32px;
`;

const PageTitle = styled.h1`
  color: #1a365d;
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 8px 0;
  font-family: 'Inter', system-ui, sans-serif;
`;

const PageSubtitle = styled.p`
  color: #718096;
  font-size: 1rem;
  margin: 0;
`;

const FiltersCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
`;

const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr auto;
  gap: 16px;
  align-items: end;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const FilterLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a5568;
`;

const FilterInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #1a365d;
    box-shadow: 0 0 0 3px rgba(26, 54, 93, 0.1);
  }
`;

const FilterSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.875rem;
  background: white;
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #1a365d;
    box-shadow: 0 0 0 3px rgba(26, 54, 93, 0.1);
  }
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 8px 16px;
  border: 2px solid ${props => props.variant === 'primary' ? '#1a365d' : '#e2e8f0'};
  background: ${props => props.variant === 'primary' ? '#1a365d' : 'white'};
  color: ${props => props.variant === 'primary' ? 'white' : '#4a5568'};
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: ${props => props.variant === 'primary' ? '#2d3748' : '#f7fafc'};
    border-color: ${props => props.variant === 'primary' ? '#2d3748' : '#1a365d'};
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const ServiceCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
`;

const ServiceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const ServiceInfo = styled.div`
  flex: 1;
`;

const ServiceName = styled.h3`
  color: #1a365d;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 8px 0;
`;

const ServiceCategory = styled.div`
  color: #718096;
  font-size: 0.875rem;
  margin-bottom: 4px;
`;

const ServicePrice = styled.div`
  color: #d69e2e;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 4px;
`;

const ServiceDuration = styled.div`
  color: #718096;
  font-size: 0.875rem;
`;

const ServiceStatus = styled.div<{ $isActive: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
  
  ${props => props.$isActive ? `
    background: rgba(56, 161, 105, 0.1);
    color: #38a169;
  ` : `
    background: rgba(113, 128, 150, 0.1);
    color: #718096;
  `}
`;

const ServiceDescription = styled.p`
  color: #4a5568;
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 16px 0;
`;

const ServiceFeatures = styled.div`
  margin: 16px 0;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 8px 0 0 0;
`;

const FeatureItem = styled.li`
  color: #4a5568;
  font-size: 0.875rem;
  padding: 4px 0;
  position: relative;
  padding-left: 16px;

  &:before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #38a169;
    font-weight: 600;
  }
`;

const ServiceMetrics = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin: 16px 0;
  padding: 16px;
  background: #f7fafc;
  border-radius: 8px;
`;

const MetricItem = styled.div`
  text-align: center;
`;

const MetricValue = styled.div`
  color: #1a365d;
  font-size: 1.25rem;
  font-weight: 600;
`;

const MetricLabel = styled.div`
  color: #718096;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ServiceActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

const ServiceActionButton = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid ${props => {
    switch (props.variant) {
      case 'primary': return '#1a365d';
      case 'danger': return '#e53e3e';
      default: return '#e2e8f0';
    }
  }};
  background: ${props => {
    switch (props.variant) {
      case 'primary': return '#1a365d';
      case 'danger': return '#e53e3e';
      default: return 'white';
    }
  }};
  color: ${props => {
    switch (props.variant) {
      case 'primary':
      case 'danger': return 'white';
      default: return '#4a5568';
    }
  }};
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

const EmptyState = styled.div`
  background: white;
  border-radius: 12px;
  padding: 60px 24px;
  text-align: center;
  color: #718096;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
`;

const EmptyIcon = styled.div`
  font-size: 64px;
  margin-bottom: 16px;
`;

const EmptyTitle = styled.h3`
  color: #4a5568;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 8px 0;
`;

const EmptyDescription = styled.p`
  color: #718096;
  font-size: 0.875rem;
  margin: 0;
  line-height: 1.5;
`;

const StatsCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  color: #1a365d;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  color: #718096;
  font-size: 0.875rem;
  font-weight: 500;
`;

export const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ServiceFilter>({
    category: 'all',
    status: 'all',
    search: '',
    priceRange: 'all'
  });

  // Fetch services data
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const [servicesResponse, analyticsResponse] = await Promise.all([
          fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/services`, {
            method: 'GET',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'omit',
          }).then(res => res.json()),
          fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/analytics/service-popularity`, {
            method: 'GET',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'omit',
          }).then(res => res.json()).catch(() => ({ data: [] }))
        ]);
        
        const servicesData = servicesResponse.data?.data || [];
        const analyticsData = analyticsResponse.data?.data || [];
        
        // Merge services with analytics data
        const servicesWithMetrics = servicesData.map((service: any) => {
          const analytics = analyticsData.find((a: any) => a.serviceId === service._id);
          return {
            _id: service._id,
            name: service.name,
            description: service.description,
            price: service.price,
            duration: service.duration,
            category: service.category || 'Recovery Services',
            isActive: service.isActive !== false,
            features: service.features || [],
            createdAt: service.createdAt,
            updatedAt: service.updatedAt,
            bookingCount: analytics?.bookingCount || 0,
            revenue: analytics?.revenue || 0
          };
        });
        
        setServices(servicesWithMetrics);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Filter services
  const filteredServices = services.filter(service => {
    if (filters.status !== 'all') {
      const isActive = filters.status === 'active';
      if (service.isActive !== isActive) return false;
    }
    if (filters.search && 
        !service.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !service.description.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.priceRange !== 'all') {
      const price = service.price;
      switch (filters.priceRange) {
        case 'low':
          if (price >= 500) return false;
          break;
        case 'medium':
          if (price < 500 || price >= 1000) return false;
          break;
        case 'high':
          if (price < 1000) return false;
          break;
      }
    }
    return true;
  });

  const handleFilterChange = (key: keyof ServiceFilter, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleNewService = () => {
    console.log('Create new service');
    // Navigate to service creation
  };

  const handleEditService = (serviceId: string) => {
    console.log('Edit service:', serviceId);
    // Navigate to service edit
  };

  const handleToggleService = async (serviceId: string, currentStatus: boolean) => {
    try {
      // Toggle service active status using the API client
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/services/${serviceId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ isActive: !currentStatus })
      });
      
      if (!response.ok) {
        throw new Error(`Failed to update service: ${response.status}`);
      }
      
      // Update local state
      setServices(prev => prev.map(service => 
        service._id === serviceId 
          ? { ...service, isActive: !currentStatus }
          : service
      ));
    } catch (error) {
      console.error('Failed to toggle service status:', error);
    }
  };

  const handleDeleteService = async (serviceId: string) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/services/${serviceId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to delete service: ${response.status}`);
      }
      
      setServices(prev => prev.filter(service => service._id !== serviceId));
    } catch (error) {
      console.error('Failed to delete service:', error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount);
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  // Calculate stats
  const totalServices = services.length;
  const activeServices = services.filter(s => s.isActive).length;
  const totalRevenue = services.reduce((sum, s) => sum + (s.revenue || 0), 0);
  const totalBookings = services.reduce((sum, s) => sum + (s.bookingCount || 0), 0);

  return (
    <DashboardLayout>
      <PageContainer>
        <PageHeader>
          <PageTitle>Service Administration</PageTitle>
          <PageSubtitle>
            Manage and configure all recovery services and pricing
          </PageSubtitle>
        </PageHeader>

        {/* Service Statistics */}
        <StatsCard>
          <StatsGrid>
            <StatItem>
              <StatValue>{totalServices}</StatValue>
              <StatLabel>Total Services</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{activeServices}</StatValue>
              <StatLabel>Active Services</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{formatCurrency(totalRevenue)}</StatValue>
              <StatLabel>Total Revenue</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{totalBookings}</StatValue>
              <StatLabel>Total Bookings</StatLabel>
            </StatItem>
          </StatsGrid>
        </StatsCard>

        {/* Filters */}
        <FiltersCard>
          <FiltersGrid>
            <FilterGroup>
              <FilterLabel>Search</FilterLabel>
              <FilterInput
                type="text"
                placeholder="Search by name or description..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Status</FilterLabel>
              <FilterSelect
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="all">All Services</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Price Range</FilterLabel>
              <FilterSelect
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              >
                <option value="all">All Prices</option>
                <option value="low">Under £500</option>
                <option value="medium">£500 - £1000</option>
                <option value="high">Over £1000</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Category</FilterLabel>
              <FilterSelect
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="crypto">Cryptocurrency</option>
                <option value="fraud">Investment Fraud</option>
                <option value="scam">Financial Scam</option>
              </FilterSelect>
            </FilterGroup>

            <ActionButton variant="primary" onClick={handleNewService}>
              New Service
            </ActionButton>
          </FiltersGrid>
        </FiltersCard>

        {/* Services Grid */}
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <LoadingOverlay isActive={true} message="Loading services..." />
          </div>
        ) : filteredServices.length === 0 ? (
          <EmptyState>
            <EmptyIcon>🛠️</EmptyIcon>
            <EmptyTitle>No services found</EmptyTitle>
            <EmptyDescription>
              {filters.search || filters.status !== 'all' || filters.priceRange !== 'all'
                ? 'Try adjusting your filters to see more results.'
                : 'Get started by creating your first service.'}
            </EmptyDescription>
          </EmptyState>
        ) : (
          <ServicesGrid>
            {filteredServices.map((service) => (
              <ServiceCard key={service._id}>
                <ServiceHeader>
                  <ServiceInfo>
                    <ServiceName>{service.name}</ServiceName>
                    <ServiceCategory>{service.category}</ServiceCategory>
                    <ServicePrice>{formatCurrency(service.price)}</ServicePrice>
                    <ServiceDuration>{formatDuration(service.duration)}</ServiceDuration>
                  </ServiceInfo>
                  <ServiceStatus $isActive={service.isActive}>
                    {service.isActive ? 'Active' : 'Inactive'}
                  </ServiceStatus>
                </ServiceHeader>

                <ServiceDescription>
                  {service.description}
                </ServiceDescription>

                {service.features && service.features.length > 0 && (
                  <ServiceFeatures>
                    <FeaturesList>
                      {service.features.slice(0, 3).map((feature, index) => (
                        <FeatureItem key={index}>{feature}</FeatureItem>
                      ))}
                      {service.features.length > 3 && (
                        <FeatureItem>+{service.features.length - 3} more features</FeatureItem>
                      )}
                    </FeaturesList>
                  </ServiceFeatures>
                )}

                <ServiceMetrics>
                  <MetricItem>
                    <MetricValue>{service.bookingCount || 0}</MetricValue>
                    <MetricLabel>Bookings</MetricLabel>
                  </MetricItem>
                  <MetricItem>
                    <MetricValue>{formatCurrency(service.revenue || 0)}</MetricValue>
                    <MetricLabel>Revenue</MetricLabel>
                  </MetricItem>
                </ServiceMetrics>

                <ServiceActions>
                  <ServiceActionButton 
                    variant="primary" 
                    onClick={() => handleEditService(service._id)}
                  >
                    Edit
                  </ServiceActionButton>
                  <ServiceActionButton 
                    variant="secondary"
                    onClick={() => handleToggleService(service._id, service.isActive)}
                  >
                    {service.isActive ? 'Deactivate' : 'Activate'}
                  </ServiceActionButton>
                  <ServiceActionButton 
                    variant="danger"
                    onClick={() => handleDeleteService(service._id)}
                  >
                    Delete
                  </ServiceActionButton>
                </ServiceActions>
              </ServiceCard>
            ))}
          </ServicesGrid>
        )}
      </PageContainer>
    </DashboardLayout>
  );
};

export default ServicesPage; 