import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { dashboardApi, type RecentBooking } from '../../services/dashboardApi';
import { BookingViewModal } from '../../components/dashboard/BookingViewModal';
import { BookingEditModal } from '../../components/dashboard/BookingEditModal';
import { debugLog } from '../../utils/removeConsole';

const BookingsContainer = styled.div`
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const PageTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1a365d;
  margin: 0;
`;

const AddButton = styled.button`
  background: linear-gradient(135deg, #d69e2e 0%, #f6ad3a 100%);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(214, 158, 46, 0.3);
  }
`;

const TableContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
`;

const TableHeaderCell = styled.th`
  padding: 16px 20px;
  text-align: left;
  font-weight: 600;
  color: #1a365d;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  border-bottom: 1px solid #e2e8f0;
  transition: background-color 0.3s ease;

  &:hover {
    background: #f8fafc;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.td`
  padding: 16px 20px;
  font-size: 14px;
  color: #4a5568;
`;

const ClientInfo = styled.div`
  .name {
    font-weight: 600;
    color: #1a365d;
    margin-bottom: 4px;
  }
  .service {
    font-size: 12px;
    color: #4a5568;
  }
`;

const DateTimeInfo = styled.div`
  .date {
    font-weight: 500;
    color: #1a365d;
    margin-bottom: 4px;
  }
  .time {
    font-size: 12px;
    color: #4a5568;
  }
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;

  ${({ status }) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'background: #c6f6d5; color: #2f855a;';
      case 'pending':
        return 'background: #fed7d7; color: #c53030;';
      case 'completed':
        return 'background: #bee3f8; color: #2b6cb0;';
      case 'cancelled':
        return 'background: #e2e8f0; color: #4a5568;';
      default:
        return 'background: #fef5e7; color: #d69e2e;';
    }
  }}
`;

const ValueDisplay = styled.div`
  font-weight: 600;
  color: #1a365d;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button<{ variant?: 'danger' }>`
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${props => props.variant === 'danger' ? `
    background: #e53e3e;
    color: white;
    &:hover { background: #c53030; }
  ` : `
    background: #d69e2e;
    color: white;
    &:hover { background: #b8851f; }
  `}
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  background: white;
  border-radius: 12px;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid #e2e8f0;
  border-top: 3px solid #d69e2e;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #4a5568;
`;

// Enhanced booking interface for better type safety
interface ExtendedBooking extends RecentBooking {
  firstName?: string;
  lastName?: string;
  client?: {
    name?: string;
    firstName?: string;
    lastName?: string;
  };
  email?: string;
  clientId?: string;
  price?: number;
  totalAmount?: number;
  estimatedValue?: number;
  timeSlot?: string;
  urgencyLevel?: string;
  notes?: string;
}

// Utility functions for data formatting
const formatDate = (dateString: string) => {
  if (!dateString) return 'Not set';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch {
    return 'Invalid date';
  }
};

const formatTime = (timeString: string) => {
  if (!timeString || timeString === 'TBD') return 'To be confirmed';
  return timeString;
};

const getClientName = (booking: ExtendedBooking) => {
  debugLog('[BookingsPage] Extracting client name from booking:', booking);

  // Method 1: Direct clientName field (now populated by backend)
  if (booking.clientName && booking.clientName !== 'Unknown Client' && booking.clientName !== 'Client information pending') {
    debugLog('[BookingsPage] Using populated clientName:', booking.clientName);
    return booking.clientName;
  }

  // Method 2: firstName + lastName (now populated by backend)
  const firstName = booking.firstName;
  const lastName = booking.lastName;
  if (firstName && lastName) {
    const fullName = `${firstName} ${lastName}`.trim();
    debugLog('[BookingsPage] Using populated firstName+lastName:', fullName);
    return fullName;
  }

  // Method 3: Populated client object
  const client = booking.client;
  if (client?.name) {
    debugLog('[BookingsPage] Using populated client.name:', client.name);
    return client.name;
  }

  // Method 4: Email as fallback
  const email = booking.email;
  if (email) {
    debugLog('[BookingsPage] Using email as identifier:', email);
    return email;
  }

  const clientId = booking.clientId;
  debugLog('[BookingsPage] No client name found, using clientId:', clientId);
  return `Client ID: ${clientId?.substring(0, 8)}...`;
};

const getBookingValue = (booking: ExtendedBooking) => {
  debugLog('[BookingsPage] Extracting booking value from:', booking);

  // Try the value fields that backend now populates
  const value = booking.value || 
                booking.price || 
                booking.totalAmount || 
                booking.estimatedValue;

  if (value && value > 0) {
    debugLog('[BookingsPage] Found booking value:', value);
    return `£${value.toLocaleString()}`;
  }

  debugLog('[BookingsPage] No booking value found, showing quote required');
  return 'Quote required';
};

export const BookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<RecentBooking[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [selectedBooking, setSelectedBooking] = useState<RecentBooking | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await dashboardApi.getRecentBookings(50); // Get more bookings for full list
        if (response?.data) {
          setBookings(Array.isArray(response.data) ? response.data : []);
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleView = (bookingId: string) => {
    debugLog('[BookingsPage] Viewing booking:', bookingId);
    const booking = bookings.find(b => b._id === bookingId);
    if (booking) {
      setSelectedBooking(booking);
      setShowViewModal(true);
    }
  };

  const handleEdit = (bookingId: string) => {
    debugLog('[BookingsPage] Editing booking:', bookingId);
    const booking = bookings.find(b => b._id === bookingId);
    if (booking) {
      setSelectedBooking(booking);
      setShowEditModal(true);
    }
  };

  const handleSave = async (updatedBooking: ExtendedBooking) => {
    try {
      debugLog('[BookingsPage] Saving booking changes:', updatedBooking);

      // For now, update local state (in production, make API call to update)
      setBookings(prev => prev.map(booking => 
        booking._id === updatedBooking._id ? updatedBooking : booking
      ));
      
      setShowEditModal(false);
      setSelectedBooking(null);
      
      debugLog('[BookingsPage] Booking updated successfully');
    } catch (error) {
      console.error('[BookingsPage] Error updating booking:', error);
    }
  };

  const handleCancel = async (bookingId: string) => {
    const booking = bookings.find(b => b._id === bookingId);
    const confirmMessage = `Are you sure you want to cancel the booking for ${booking?.clientName}?`;

    if (window.confirm(confirmMessage)) {
      try {
        debugLog('[BookingsPage] Cancelling booking:', bookingId);
        
        // Update booking status to cancelled
        setBookings(prev => prev.map(b => 
          b._id === bookingId ? { ...b, status: 'cancelled' } : b
        ));
        
        debugLog('[BookingsPage] Booking cancelled successfully');
      } catch (error) {
        console.error('[BookingsPage] Error cancelling booking:', error);
      }
    }
  };

  const closeModals = () => {
    setShowViewModal(false);
    setShowEditModal(false);
    setSelectedBooking(null);
  };

  const handleAddNew = () => {
    debugLog('Adding new booking');
    // Navigate to booking creation form
  };

  if (loading) {
    return (
      <BookingsContainer>
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      </BookingsContainer>
    );
  }

  return (
    <BookingsContainer>
      <PageHeader>
        <PageTitle>Bookings Management ({bookings.length})</PageTitle>
        <AddButton onClick={handleAddNew}>Add New Booking</AddButton>
      </PageHeader>

      <TableContainer>
        {bookings.length > 0 ? (
          <Table>
            <TableHeader>
              <tr>
                <TableHeaderCell>Client & Service</TableHeaderCell>
                <TableHeaderCell>Date & Time</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Value</TableHeaderCell>
                <TableHeaderCell>Urgency</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </tr>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell>
                    <ClientInfo>
                      <div className="name">{getClientName(booking as ExtendedBooking)}</div>
                      <div className="service">{booking.serviceName}</div>
                    </ClientInfo>
                  </TableCell>
                  <TableCell>
                    <DateTimeInfo>
                      <div className="date">{formatDate(booking.date)}</div>
                      <div className="time">{formatTime(booking.time)}</div>
                    </DateTimeInfo>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={booking.status}>
                      {booking.status}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>
                    <ValueDisplay>{getBookingValue(booking as ExtendedBooking)}</ValueDisplay>
                  </TableCell>
                  <TableCell>{booking.urgency || 'Standard'}</TableCell>
                  <TableCell>
                    <ActionButtons>
                      <ActionButton onClick={() => handleView(booking._id)}>
                        View
                      </ActionButton>
                      <ActionButton onClick={() => handleEdit(booking._id)}>
                        Edit
                      </ActionButton>
                      <ActionButton 
                        onClick={() => handleCancel(booking._id)} 
                        variant="danger"
                      >
                        Cancel
                      </ActionButton>
                    </ActionButtons>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <EmptyState>
            <h3>No bookings found</h3>
            <p>Start by adding your first booking or check your filters.</p>
          </EmptyState>
        )}
      </TableContainer>

      {showViewModal && selectedBooking && (
        <BookingViewModal
          booking={selectedBooking}
          isOpen={showViewModal}
          onClose={closeModals}
        />
      )}

      {showEditModal && selectedBooking && (
        <BookingEditModal
          booking={selectedBooking}
          isOpen={showEditModal}
          onSave={handleSave}
          onClose={closeModals}
        />
      )}
    </BookingsContainer>
  );
}; 