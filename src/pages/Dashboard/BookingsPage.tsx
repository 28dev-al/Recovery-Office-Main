/**
 * Bookings Management Page
 * Comprehensive booking administration for Recovery Office
 */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DashboardLayout } from './components/DashboardLayout';
import { dashboardApi, RecentBooking } from '../../services/dashboardApi';

// Types
interface BookingFilter {
  status: string;
  service: string;
  dateRange: string;
  search: string;
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

const BookingsTable = styled.div`
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
      case 'confirmed':
        return `
          background: rgba(56, 161, 105, 0.1);
          color: #38a169;
        `;
      case 'pending':
        return `
          background: rgba(214, 158, 46, 0.1);
          color: #d69e2e;
        `;
      case 'completed':
        return `
          background: rgba(128, 90, 213, 0.1);
          color: #805ad5;
        `;
      case 'cancelled':
        return `
          background: rgba(229, 62, 62, 0.1);
          color: #e53e3e;
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

const ServiceName = styled.div`
  font-size: 0.75rem;
  color: #718096;
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
  justify-content: between;
  gap: 16px;
`;

const PaginationInfo = styled.div`
  color: #718096;
  font-size: 0.875rem;
`;

const PaginationControls = styled.div`
  display: flex;
  gap: 8px;
  margin-left: auto;
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

export const BookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<RecentBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<BookingFilter>({
    status: 'all',
    service: 'all',
    dateRange: 'all',
    search: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch bookings data
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const data = await dashboardApi.getRecentBookings(50); // Get more for filtering
        setBookings(data);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Filter bookings
  const filteredBookings = bookings.filter(booking => {
    if (filters.status !== 'all' && booking.status !== filters.status) return false;
    if (filters.search && !booking.clientName.toLowerCase().includes(filters.search.toLowerCase()) &&
        !booking.serviceName.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  // Paginate bookings
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBookings = filteredBookings.slice(startIndex, startIndex + itemsPerPage);

  const handleFilterChange = (key: keyof BookingFilter, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleExport = () => {
    console.log('Export bookings data');
    // Implement export functionality
  };

  const handleNewBooking = () => {
    console.log('Create new booking');
    // Navigate to booking creation
  };

  const handleViewBooking = (bookingId: string) => {
    console.log('View booking:', bookingId);
    // Navigate to booking details
  };

  const handleEditBooking = (bookingId: string) => {
    console.log('Edit booking:', bookingId);
    // Navigate to booking edit
  };

  const handleCancelBooking = (bookingId: string) => {
    console.log('Cancel booking:', bookingId);
    // Implement booking cancellation
  };

  return (
    <DashboardLayout>
      <PageContainer>
        <PageHeader>
          <PageTitle>Bookings Management</PageTitle>
          <PageSubtitle>
            Manage and track all client bookings and appointments
          </PageSubtitle>
        </PageHeader>

        {/* Filters */}
        <FiltersCard>
          <FiltersGrid>
            <FilterGroup>
              <FilterLabel>Search</FilterLabel>
              <FilterInput
                type="text"
                placeholder="Search by client name or service..."
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
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Service</FilterLabel>
              <FilterSelect
                value={filters.service}
                onChange={(e) => handleFilterChange('service', e.target.value)}
              >
                <option value="all">All Services</option>
                <option value="crypto">Cryptocurrency Recovery</option>
                <option value="fraud">Investment Fraud Recovery</option>
                <option value="consultation">Initial Consultation</option>
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
              service: 'all',
              dateRange: 'all',
              search: ''
            })}>
              Clear
            </ActionButton>
          </FiltersGrid>
        </FiltersCard>

        {/* Bookings Table */}
        <BookingsTable>
          <TableHeader>
            <TableTitle>
              Bookings ({filteredBookings.length})
            </TableTitle>
            <TableActions>
              <ActionButton variant="secondary" onClick={handleExport}>
                Export
              </ActionButton>
              <ActionButton variant="primary" onClick={handleNewBooking}>
                New Booking
              </ActionButton>
            </TableActions>
          </TableHeader>

          {loading ? (
            <EmptyState>
              <EmptyIcon>⏳</EmptyIcon>
              <EmptyTitle>Loading Bookings</EmptyTitle>
              <EmptyDescription>Please wait while we fetch your booking data...</EmptyDescription>
            </EmptyState>
          ) : paginatedBookings.length === 0 ? (
            <EmptyState>
              <EmptyIcon>📅</EmptyIcon>
              <EmptyTitle>No Bookings Found</EmptyTitle>
              <EmptyDescription>
                {filters.search || filters.status !== 'all' || filters.service !== 'all' 
                  ? 'No bookings match your current filters. Try adjusting your search criteria.'
                  : 'No bookings have been created yet. Create your first booking to get started.'
                }
              </EmptyDescription>
            </EmptyState>
          ) : (
            <>
              <Table>
                <TableHead>
                  <tr>
                    <TableHeaderCell>Client & Service</TableHeaderCell>
                    <TableHeaderCell>Date & Time</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                    <TableHeaderCell>Value</TableHeaderCell>
                    <TableHeaderCell>Priority</TableHeaderCell>
                    <TableHeaderCell>Actions</TableHeaderCell>
                  </tr>
                </TableHead>
                <TableBody>
                  {paginatedBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>
                        <ClientInfo>
                          <ClientName>{booking.clientName}</ClientName>
                          <ServiceName>{booking.serviceName}</ServiceName>
                        </ClientInfo>
                      </TableCell>
                      <TableCell>
                        <div>{booking.date}</div>
                        <div style={{ fontSize: '0.75rem', color: '#718096' }}>
                          {booking.time}
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge $status={booking.status}>
                          {booking.status}
                        </StatusBadge>
                      </TableCell>
                      <TableCell>
                        £{booking.value.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <StatusBadge $status={booking.urgency}>
                          {booking.urgency}
                        </StatusBadge>
                      </TableCell>
                      <TableCell>
                        <ActionMenu>
                          <ActionMenuButton onClick={() => handleViewBooking(booking.id)}>
                            View
                          </ActionMenuButton>
                          <ActionMenuButton onClick={() => handleEditBooking(booking.id)}>
                            Edit
                          </ActionMenuButton>
                          <ActionMenuButton onClick={() => handleCancelBooking(booking.id)}>
                            Cancel
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
                  Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredBookings.length)} of {filteredBookings.length} bookings
                </PaginationInfo>
                <PaginationControls>
                  <PaginationButton
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
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
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </PaginationButton>
                </PaginationControls>
              </Pagination>
            </>
          )}
        </BookingsTable>
      </PageContainer>
    </DashboardLayout>
  );
};

export default BookingsPage; 