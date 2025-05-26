/**
 * Client Management Page
 * Comprehensive client administration for Recovery Office
 */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DashboardLayout } from './components/DashboardLayout';
import { apiClient } from '../../services/api';
import { LoadingOverlay } from '../../design-system/components/feedback';

// Types
interface Client {
  _id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone: string;
  caseType: string;
  lossAmount?: number;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  lastContact?: string;
  marketingConsent: boolean;
  notes?: string;
}

interface ClientFilter {
  status: string;
  caseType: string;
  search: string;
  dateRange: string;
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

const ClientsTable = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  overflow: hidden;
`;

const TableHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TableTitle = styled.h3`
  color: #1a365d;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
`;

const TableActions = styled.div`
  display: flex;
  gap: 12px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background: #f7fafc;
`;

const TableHeaderCell = styled.th`
  padding: 12px 16px;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 600;
  color: #4a5568;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid #e2e8f0;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  transition: background-color 0.2s ease;

  &:hover {
    background: #f7fafc;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #e2e8f0;
  }
`;

const TableCell = styled.td`
  padding: 16px;
  font-size: 0.875rem;
  color: #4a5568;
  vertical-align: middle;
`;

const StatusBadge = styled.span<{ $status: string }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
  
  ${props => {
    switch (props.$status) {
      case 'active':
        return `
          background: rgba(56, 161, 105, 0.1);
          color: #38a169;
        `;
      case 'pending':
        return `
          background: rgba(214, 158, 46, 0.1);
          color: #d69e2e;
        `;
      case 'inactive':
        return `
          background: rgba(113, 128, 150, 0.1);
          color: #718096;
        `;
      default:
        return `
          background: rgba(113, 128, 150, 0.1);
          color: #718096;
        `;
    }
  }}
`;

const ClientInfo = styled.div``;

const ClientName = styled.div`
  font-weight: 600;
  color: #1a365d;
  margin-bottom: 2px;
`;

const ClientEmail = styled.div`
  font-size: 0.75rem;
  color: #718096;
`;

const CaseValue = styled.div`
  font-weight: 600;
  color: #1a365d;
`;

const ActionMenu = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionMenuButton = styled.button`
  padding: 4px 8px;
  border: 1px solid #e2e8f0;
  background: white;
  color: #4a5568;
  border-radius: 4px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f7fafc;
    border-color: #1a365d;
    color: #1a365d;
  }
`;

const EmptyState = styled.div`
  padding: 60px 24px;
  text-align: center;
  color: #718096;
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

const Pagination = styled.div`
  padding: 16px 24px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const PaginationInfo = styled.div`
  color: #718096;
  font-size: 0.875rem;
`;

const PaginationControls = styled.div`
  display: flex;
  gap: 8px;
`;

const PaginationButton = styled.button<{ $active?: boolean }>`
  padding: 6px 12px;
  border: 1px solid ${props => props.$active ? '#1a365d' : '#e2e8f0'};
  background: ${props => props.$active ? '#1a365d' : 'white'};
  color: ${props => props.$active ? 'white' : '#4a5568'};
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #1a365d;
    background: ${props => props.$active ? '#1a365d' : '#f7fafc'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ClientsPage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ClientFilter>({
    status: 'all',
    caseType: 'all',
    search: '',
    dateRange: 'all'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch clients data
  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/clients`, {
          method: 'GET',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'omit',
        });
        const data = await response.json();
        const clientsData = data?.data || [];
        
        // Transform data to match our interface
        const transformedClients = clientsData.map((client: any) => ({
          _id: client._id,
          name: client.name || `${client.firstName || ''} ${client.lastName || ''}`.trim(),
          firstName: client.firstName,
          lastName: client.lastName,
          email: client.email,
          phone: client.phone,
          caseType: client.caseType || 'General',
          lossAmount: client.lossAmount,
          status: client.status || 'active',
          createdAt: client.createdAt,
          lastContact: client.lastContact,
          marketingConsent: client.marketingConsent || false,
          notes: client.notes
        }));
        
        setClients(transformedClients);
      } catch (error) {
        console.error('Failed to fetch clients:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  // Filter clients
  const filteredClients = clients.filter(client => {
    if (filters.status !== 'all' && client.status !== filters.status) return false;
    if (filters.search && 
        !client.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !client.email.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  // Paginate clients
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedClients = filteredClients.slice(startIndex, startIndex + itemsPerPage);

  const handleFilterChange = (key: keyof ClientFilter, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleExport = () => {
    console.log('Export clients data');
    // Implement export functionality
  };

  const handleNewClient = () => {
    console.log('Create new client');
    // Navigate to client creation
  };

  const handleViewClient = (clientId: string) => {
    console.log('View client:', clientId);
    // Navigate to client details
  };

  const handleEditClient = (clientId: string) => {
    console.log('Edit client:', clientId);
    // Navigate to client edit
  };

  const formatCurrency = (amount?: number) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  return (
    <DashboardLayout>
      <PageContainer>
        <PageHeader>
          <PageTitle>Client Management</PageTitle>
          <PageSubtitle>
            Manage and track all client records and case information
          </PageSubtitle>
        </PageHeader>

        {/* Filters */}
        <FiltersCard>
          <FiltersGrid>
            <FilterGroup>
              <FilterLabel>Search</FilterLabel>
              <FilterInput
                type="text"
                placeholder="Search by name or email..."
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
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Case Type</FilterLabel>
              <FilterSelect
                value={filters.caseType}
                onChange={(e) => handleFilterChange('caseType', e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="crypto">Cryptocurrency</option>
                <option value="fraud">Investment Fraud</option>
                <option value="scam">Financial Scam</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Date Range</FilterLabel>
              <FilterSelect
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </FilterSelect>
            </FilterGroup>

            <ActionButton variant="secondary" onClick={() => setFilters({
              status: 'all',
              caseType: 'all',
              search: '',
              dateRange: 'all'
            })}>
              Clear
            </ActionButton>
          </FiltersGrid>
        </FiltersCard>

        {/* Clients Table */}
        <ClientsTable>
          <TableHeader>
            <TableTitle>
              Clients ({filteredClients.length})
            </TableTitle>
            <TableActions>
              <ActionButton variant="secondary" onClick={handleExport}>
                Export
              </ActionButton>
              <ActionButton variant="primary" onClick={handleNewClient}>
                New Client
              </ActionButton>
            </TableActions>
          </TableHeader>

          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center' }}>
              <LoadingOverlay isActive={true} message="Loading clients..." />
            </div>
          ) : paginatedClients.length === 0 ? (
            <EmptyState>
              <EmptyIcon>👥</EmptyIcon>
              <EmptyTitle>No clients found</EmptyTitle>
              <EmptyDescription>
                {filters.search || filters.status !== 'all' || filters.caseType !== 'all'
                  ? 'Try adjusting your filters to see more results.'
                  : 'Get started by adding your first client.'}
              </EmptyDescription>
            </EmptyState>
          ) : (
            <>
              <Table>
                <TableHead>
                  <tr>
                    <TableHeaderCell>Client</TableHeaderCell>
                    <TableHeaderCell>Contact</TableHeaderCell>
                    <TableHeaderCell>Case Type</TableHeaderCell>
                    <TableHeaderCell>Loss Amount</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                    <TableHeaderCell>Registered</TableHeaderCell>
                    <TableHeaderCell>Actions</TableHeaderCell>
                  </tr>
                </TableHead>
                <TableBody>
                  {paginatedClients.map((client) => (
                    <TableRow key={client._id}>
                      <TableCell>
                        <ClientInfo>
                          <ClientName>{client.name}</ClientName>
                          <ClientEmail>{client.email}</ClientEmail>
                        </ClientInfo>
                      </TableCell>
                      <TableCell>{client.phone || 'N/A'}</TableCell>
                      <TableCell>{client.caseType}</TableCell>
                      <TableCell>
                        <CaseValue>{formatCurrency(client.lossAmount)}</CaseValue>
                      </TableCell>
                      <TableCell>
                        <StatusBadge $status={client.status}>
                          {client.status}
                        </StatusBadge>
                      </TableCell>
                      <TableCell>{formatDate(client.createdAt)}</TableCell>
                      <TableCell>
                        <ActionMenu>
                          <ActionMenuButton onClick={() => handleViewClient(client._id)}>
                            View
                          </ActionMenuButton>
                          <ActionMenuButton onClick={() => handleEditClient(client._id)}>
                            Edit
                          </ActionMenuButton>
                        </ActionMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <Pagination>
                <PaginationInfo>
                  Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredClients.length)} of {filteredClients.length} clients
                </PaginationInfo>
                <PaginationControls>
                  <PaginationButton
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </PaginationButton>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <PaginationButton
                      key={page}
                      $active={page === currentPage}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </PaginationButton>
                  ))}
                  <PaginationButton
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </PaginationButton>
                </PaginationControls>
              </Pagination>
            </>
          )}
        </ClientsTable>
      </PageContainer>
    </DashboardLayout>
  );
};

export default ClientsPage; 