/**
 * Recent Bookings Component
 * Displays recent bookings in a professional table format
 */

import React, { useState } from 'react';
import styled from 'styled-components';
import { RecentBooking } from '../../../services/dashboardApi';

interface RecentBookingsProps {
  bookings: RecentBooking[];
  loading?: boolean;
}

// Styled Components
const BookingsContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  overflow: hidden;
`;

const BookingsHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderLeft = styled.div``;

const BookingsTitle = styled.h3`
  color: #1a365d;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 4px 0;
`;

const BookingsSubtitle = styled.p`
  color: #718096;
  font-size: 0.875rem;
  margin: 0;
`;

const ViewAllButton = styled.button`
  background: transparent;
  border: 2px solid #1a365d;
  color: #1a365d;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #1a365d;
    color: white;
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
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

const ClientName = styled.div`
  font-weight: 600;
  color: #1a365d;
  margin-bottom: 2px;
`;

const ServiceName = styled.div`
  font-size: 0.75rem;
  color: #718096;
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

const UrgencyIndicator = styled.div<{ $urgency: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 8px;
  
  ${props => {
    switch (props.$urgency) {
      case 'high':
        return 'background: #e53e3e;';
      case 'medium':
        return 'background: #d69e2e;';
      case 'low':
        return 'background: #38a169;';
      default:
        return 'background: #718096;';
    }
  }}
`;

const ValueCell = styled.div`
  display: flex;
  align-items: center;
`;

const ActionButton = styled.button`
  background: transparent;
  border: 1px solid #e2e8f0;
  color: #4a5568;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-right: 8px;

  &:hover {
    background: #f7fafc;
    border-color: #1a365d;
    color: #1a365d;
  }

  &:last-child {
    margin-right: 0;
  }
`;

const LoadingRow = styled.tr`
  td {
    padding: 20px 16px;
    text-align: center;
    color: #718096;
  }
`;

const EmptyState = styled.div`
  padding: 40px 24px;
  text-align: center;
  color: #718096;
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const EmptyTitle = styled.h4`
  color: #4a5568;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 8px 0;
`;

const EmptyDescription = styled.p`
  color: #718096;
  font-size: 0.875rem;
  margin: 0;
`;

// Format currency
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const RecentBookings: React.FC<RecentBookingsProps> = ({ 
  bookings, 
  loading = false 
}) => {
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);

  const handleViewBooking = (bookingId: string) => {
    setSelectedBooking(bookingId);
    console.log('View booking:', bookingId);
    // Navigate to booking details
  };

  const handleEditBooking = (bookingId: string) => {
    console.log('Edit booking:', bookingId);
    // Navigate to booking edit
  };

  if (loading) {
    return (
      <BookingsContainer>
        <BookingsHeader>
          <HeaderLeft>
            <BookingsTitle>Recent Bookings</BookingsTitle>
            <BookingsSubtitle>Loading recent booking data...</BookingsSubtitle>
          </HeaderLeft>
        </BookingsHeader>
        <Table>
          <TableBody>
            <LoadingRow>
              <td colSpan={6}>Loading bookings...</td>
            </LoadingRow>
          </TableBody>
        </Table>
      </BookingsContainer>
    );
  }

  if (bookings.length === 0) {
    return (
      <BookingsContainer>
        <BookingsHeader>
          <HeaderLeft>
            <BookingsTitle>Recent Bookings</BookingsTitle>
            <BookingsSubtitle>No recent bookings found</BookingsSubtitle>
          </HeaderLeft>
        </BookingsHeader>
        <EmptyState>
          <EmptyIcon>📅</EmptyIcon>
          <EmptyTitle>No Recent Bookings</EmptyTitle>
          <EmptyDescription>
            New bookings will appear here once clients start scheduling appointments.
          </EmptyDescription>
        </EmptyState>
      </BookingsContainer>
    );
  }

  return (
    <BookingsContainer>
      <BookingsHeader>
        <HeaderLeft>
          <BookingsTitle>Recent Bookings</BookingsTitle>
          <BookingsSubtitle>
            Latest {bookings.length} booking{bookings.length !== 1 ? 's' : ''} from clients
          </BookingsSubtitle>
        </HeaderLeft>
        <ViewAllButton onClick={() => console.log('View all bookings')}>
          View All
        </ViewAllButton>
      </BookingsHeader>

      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableHeaderCell>Client & Service</TableHeaderCell>
              <TableHeaderCell>Date & Time</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Value</TableHeaderCell>
              <TableHeaderCell>Priority</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </tr>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>
                  <ClientName>{booking.clientName}</ClientName>
                  <ServiceName>{booking.serviceName}</ServiceName>
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
                  <ValueCell>
                    <UrgencyIndicator $urgency={booking.urgency} />
                    {formatCurrency(booking.value)}
                  </ValueCell>
                </TableCell>
                <TableCell>
                  <StatusBadge $status={booking.urgency}>
                    {booking.urgency}
                  </StatusBadge>
                </TableCell>
                <TableCell>
                  <ActionButton onClick={() => handleViewBooking(booking.id)}>
                    View
                  </ActionButton>
                  <ActionButton onClick={() => handleEditBooking(booking.id)}>
                    Edit
                  </ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BookingsContainer>
  );
};

export default RecentBookings; 