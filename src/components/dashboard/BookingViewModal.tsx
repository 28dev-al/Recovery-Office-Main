import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 64px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e2e8f0;
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #1a365d;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #4a5568;
  padding: 8px;
  border-radius: 4px;

  &:hover {
    background: #f7fafc;
  }
`;

const DetailSection = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1a365d;
  margin-bottom: 16px;
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const DetailLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #4a5568;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const DetailValue = styled.span`
  font-size: 16px;
  color: #1a365d;
  font-weight: 500;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;

  ${({ status }) => {
    switch (status) {
      case 'confirmed':
        return 'background: #c6f6d5; color: #2f855a;';
      case 'pending':
        return 'background: #fed7d7; color: #c53030;';
      case 'completed':
        return 'background: #bee3f8; color: #2b6cb0;';
      default:
        return 'background: #e2e8f0; color: #4a5568;';
    }
  }}
`;

interface BookingViewModalProps {
  booking: any;
  isOpen: boolean;
  onClose: () => void;
}

export const BookingViewModal: React.FC<BookingViewModalProps> = ({
  booking,
  isOpen,
  onClose
}) => {
  if (!isOpen || !booking) return null;

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Date not available';
    }
  };

  const formatTime = (timeString: string) => {
    if (!timeString || timeString === 'Time not available') {
      return 'Time to be confirmed';
    }
    return timeString;
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Booking Details</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>

        <DetailSection>
          <SectionTitle>Client Information</SectionTitle>
          <DetailGrid>
            <DetailItem>
              <DetailLabel>Client Name</DetailLabel>
              <DetailValue>{booking.clientName || 'Not provided'}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Email</DetailLabel>
              <DetailValue>{booking.email || 'Not provided'}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Phone</DetailLabel>
              <DetailValue>{booking.phone || 'Not provided'}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Reference</DetailLabel>
              <DetailValue>{booking.reference || 'Not assigned'}</DetailValue>
            </DetailItem>
          </DetailGrid>
        </DetailSection>

        <DetailSection>
          <SectionTitle>Booking Information</SectionTitle>
          <DetailGrid>
            <DetailItem>
              <DetailLabel>Service</DetailLabel>
              <DetailValue>{booking.serviceName}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Date</DetailLabel>
              <DetailValue>{formatDate(booking.date)}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Time</DetailLabel>
              <DetailValue>{formatTime(booking.timeSlot)}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Status</DetailLabel>
              <StatusBadge status={booking.status}>{booking.status}</StatusBadge>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Urgency</DetailLabel>
              <DetailValue>{booking.urgencyLevel || 'Standard'}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Estimated Value</DetailLabel>
              <DetailValue>
                {booking.value > 0 ? `£${booking.value.toLocaleString()}` : 'Quote required'}
              </DetailValue>
            </DetailItem>
          </DetailGrid>
        </DetailSection>

        {booking.notes && (
          <DetailSection>
            <SectionTitle>Notes</SectionTitle>
            <DetailValue>{booking.notes}</DetailValue>
          </DetailSection>
        )}

        <DetailSection>
          <SectionTitle>System Information</SectionTitle>
          <DetailGrid>
            <DetailItem>
              <DetailLabel>Created</DetailLabel>
              <DetailValue>
                {new Date(booking.createdAt).toLocaleDateString('en-GB')} at{' '}
                {new Date(booking.createdAt).toLocaleTimeString('en-GB')}
              </DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Payment Status</DetailLabel>
              <DetailValue>{booking.paymentStatus || 'Unpaid'}</DetailValue>
            </DetailItem>
          </DetailGrid>
        </DetailSection>
      </ModalContent>
    </ModalOverlay>
  );
}; 