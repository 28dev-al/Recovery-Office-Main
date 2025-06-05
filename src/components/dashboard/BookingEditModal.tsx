import React, { useState } from 'react';
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
  max-width: 700px;
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1a365d;
  margin: 0;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #1a365d;
`;

const Input = styled.input`
  padding: 12px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #d69e2e;
  }
`;

const Select = styled.select`
  padding: 12px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #d69e2e;
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  min-height: 80px;
  resize: vertical;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #d69e2e;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;

  ${({ variant }) => variant === 'primary' ? `
    background: linear-gradient(135deg, #d69e2e 0%, #f6ad3a 100%);
    color: white;
    border: none;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(214, 158, 46, 0.3);
    }
  ` : `
    background: white;
    color: #4a5568;
    border: 2px solid #e2e8f0;

    &:hover {
      border-color: #d69e2e;
      color: #d69e2e;
    }
  `}
`;

interface BookingEditModalProps {
  booking: any;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedBooking: any) => void;
}

export const BookingEditModal: React.FC<BookingEditModalProps> = ({
  booking,
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState({
    clientName: booking?.clientName || '',
    email: booking?.email || '',
    phone: booking?.phone || '',
    serviceName: booking?.serviceName || '',
    date: booking?.date ? booking.date.split('T')[0] : '',
    timeSlot: booking?.timeSlot || '',
    status: booking?.status || 'confirmed',
    urgencyLevel: booking?.urgencyLevel || 'standard',
    estimatedValue: booking?.value || booking?.estimatedValue || 0,
    notes: booking?.notes || ''
  });

  if (!isOpen || !booking) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedBooking = {
      ...booking,
      ...formData,
      value: parseFloat(formData.estimatedValue.toString()) || 0,
      estimatedValue: parseFloat(formData.estimatedValue.toString()) || 0
    };

    console.log('[Edit Modal] Saving updated booking:', updatedBooking);
    onSave(updatedBooking);
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Edit Booking</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>

        <Form onSubmit={handleSubmit}>
          <FormSection>
            <SectionTitle>Client Information</SectionTitle>
            <FormGrid>
              <FormGroup>
                <Label>Client Name</Label>
                <Input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Phone</Label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </FormGroup>
            </FormGrid>
          </FormSection>

          <FormSection>
            <SectionTitle>Booking Details</SectionTitle>
            <FormGrid>
              <FormGroup>
                <Label>Service</Label>
                <Select
                  name="serviceName"
                  value={formData.serviceName}
                  onChange={handleChange}
                  required
                >
                  <option value="Cryptocurrency Recovery">Cryptocurrency Recovery</option>
                  <option value="Investment Fraud Recovery">Investment Fraud Recovery</option>
                  <option value="Financial Scam Recovery">Financial Scam Recovery</option>
                  <option value="Regulatory Complaint Assistance">Regulatory Complaint Assistance</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Date</Label>
                <Input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Time Slot</Label>
                <Select
                  name="timeSlot"
                  value={formData.timeSlot}
                  onChange={handleChange}
                >
                  <option value="Time not available">Time not available</option>
                  <option value="09:00-10:00">09:00-10:00</option>
                  <option value="10:00-11:00">10:00-11:00</option>
                  <option value="11:00-12:00">11:00-12:00</option>
                  <option value="12:00-13:00">12:00-13:00</option>
                  <option value="14:00-15:00">14:00-15:00</option>
                  <option value="15:00-16:00">15:00-16:00</option>
                  <option value="16:00-17:00">16:00-17:00</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Status</Label>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Urgency Level</Label>
                <Select
                  name="urgencyLevel"
                  value={formData.urgencyLevel}
                  onChange={handleChange}
                >
                  <option value="low">Low</option>
                  <option value="standard">Standard</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Estimated Value (£)</Label>
                <Input
                  type="number"
                  name="estimatedValue"
                  value={formData.estimatedValue}
                  onChange={handleChange}
                  min="0"
                  step="1000"
                />
              </FormGroup>
            </FormGrid>
          </FormSection>

          <FormSection>
            <FormGroup>
              <Label>Notes</Label>
              <TextArea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Additional notes about this booking..."
              />
            </FormGroup>
          </FormSection>

          <ButtonGroup>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </ButtonGroup>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
}; 