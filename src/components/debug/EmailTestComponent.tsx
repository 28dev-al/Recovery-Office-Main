import React, { useState } from 'react';
import styled from 'styled-components';

const TestContainer = styled.div`
  background: white;
  border: 2px solid #d69e2e;
  border-radius: 12px;
  padding: 24px;
  margin: 24px 0;
  max-width: 600px;
`;

const TestTitle = styled.h3`
  color: #d69e2e;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TestForm = styled.form`
  display: flex;
  flex-direction: column;
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
  
  &:focus {
    outline: none;
    border-color: #d69e2e;
  }
`;

const TestButton = styled.button`
  background: linear-gradient(135deg, #d69e2e 0%, #f6ad3a 100%);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(214, 158, 46, 0.3);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const StatusBox = styled.div<{ status: 'success' | 'error' | 'info' }>`
  padding: 12px;
  border-radius: 8px;
  margin-top: 16px;
  font-size: 14px;
  
  ${({ status }) => {
    switch (status) {
      case 'success':
        return 'background: #c6f6d5; color: #2f855a; border: 1px solid #38a169;';
      case 'error':
        return 'background: #fed7d7; color: #c53030; border: 1px solid #e53e3e;';
      case 'info':
        return 'background: #bee3f8; color: #2b6cb0; border: 1px solid #3182ce;';
      default:
        return 'background: #e2e8f0; color: #4a5568;';
    }
  }}
`;

const ConfigSection = styled.div`
  background: #f7fafc;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

const ConfigTitle = styled.h4`
  color: #1a365d;
  font-size: 16px;
  margin-bottom: 12px;
`;

const ConfigItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
  font-size: 12px;
  color: #4a5568;
  
  .label {
    font-weight: 600;
  }
  
  .value {
    font-family: 'Courier New', monospace;
  }
`;

interface EmailTestData {
  clientEmail: string;
  clientName: string;
  serviceName: string;
  emailType: 'client' | 'internal' | 'both';
}

export const EmailTestComponent: React.FC = () => {
  const [testData, setTestData] = useState<EmailTestData>({
    clientEmail: '',
    clientName: '',
    serviceName: 'Cryptocurrency Recovery',
    emailType: 'both'
  });
  
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    status: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTestData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTestEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setTesting(true);
    setTestResult(null);

    try {
      console.log('[Email Test] Testing email system with data:', testData);

      // This would be the actual API call when backend is ready
      const testBookingData = {
        firstName: testData.clientName.split(' ')[0] || 'Test',
        lastName: testData.clientName.split(' ').slice(1).join(' ') || 'Client',
        email: testData.clientEmail,
        phone: '+44 7451 263472',
        serviceName: testData.serviceName,
        selectedDate: new Date().toISOString().split('T')[0],
        selectedTimeSlot: '10:00-11:00',
        reference: `TEST-${Date.now()}`,
        sendConfirmationEmail: testData.emailType === 'client' || testData.emailType === 'both',
        sendInternalNotification: testData.emailType === 'internal' || testData.emailType === 'both'
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // For now, show success (when backend is ready, this will be real)
      setTestResult({
        status: 'info',
        message: `Email test prepared for: ${testData.clientEmail}. Backend integration needed for actual sending.`
      });

      console.log('[Email Test] Test booking data prepared:', testBookingData);

    } catch (error) {
      console.error('[Email Test] Error:', error);
      setTestResult({
        status: 'error',
        message: 'Email test failed. Check console for details.'
      });
    } finally {
      setTesting(false);
    }
  };

  const testEmailConnection = async () => {
    setTesting(true);
    try {
      console.log('[Email Test] Testing email service connection...');
      
      // This would test the actual SMTP connection when backend is ready
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setTestResult({
        status: 'info',
        message: 'Email connection test ready. Implement backend emailService.verifyConnection() method.'
      });
    } catch (error) {
      console.error('[Email Test] Connection test error:', error);
      setTestResult({
        status: 'error',
        message: 'Connection test failed.'
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <TestContainer>
      <TestTitle>
        📧 Email System Test Center
      </TestTitle>

      <ConfigSection>
        <ConfigTitle>Current Email Configuration</ConfigTitle>
        <ConfigItem>
          <span className="label">SMTP Server:</span>
          <span className="value">smtp.protonmail.ch:587</span>
        </ConfigItem>
        <ConfigItem>
          <span className="label">From Address:</span>
          <span className="value">contact@recovery-office.com</span>
        </ConfigItem>
        <ConfigItem>
          <span className="label">Encryption:</span>
          <span className="value">STARTTLS</span>
        </ConfigItem>
        <ConfigItem>
          <span className="label">Backend Status:</span>
          <span className="value" style={{ color: '#d69e2e' }}>Implementation Pending</span>
        </ConfigItem>
      </ConfigSection>

      <TestForm onSubmit={handleTestEmail}>
        <FormGroup>
          <Label>Test Client Email</Label>
          <Input
            type="email"
            name="clientEmail"
            value={testData.clientEmail}
            onChange={handleInputChange}
            placeholder="Enter client email address"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Test Client Name</Label>
          <Input
            type="text"
            name="clientName"
            value={testData.clientName}
            onChange={handleInputChange}
            placeholder="Enter client full name"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Service Type</Label>
          <Select
            name="serviceName"
            value={testData.serviceName}
            onChange={handleInputChange}
          >
            <option value="Cryptocurrency Recovery">Cryptocurrency Recovery</option>
            <option value="Investment Fraud Recovery">Investment Fraud Recovery</option>
            <option value="Financial Scam Recovery">Financial Scam Recovery</option>
            <option value="Regulatory Complaint Assistance">Regulatory Complaint Assistance</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Email Type to Test</Label>
          <Select
            name="emailType"
            value={testData.emailType}
            onChange={handleInputChange}
          >
            <option value="both">Both (Client + Internal)</option>
            <option value="client">Client Confirmation Only</option>
            <option value="internal">Internal Notification Only</option>
          </Select>
        </FormGroup>

        <div style={{ display: 'flex', gap: '12px' }}>
          <TestButton type="submit" disabled={testing}>
            {testing ? 'Testing...' : 'Test Email System'}
          </TestButton>
          
          <TestButton 
            type="button" 
            onClick={testEmailConnection}
            disabled={testing}
            style={{ background: '#4299e1' }}
          >
            Test Connection
          </TestButton>
        </div>
      </TestForm>

      {testResult && (
        <StatusBox status={testResult.status}>
          <strong>{testResult.status.toUpperCase()}:</strong> {testResult.message}
        </StatusBox>
      )}

      <div style={{ 
        marginTop: '16px', 
        padding: '12px', 
        background: '#fff5f5', 
        borderRadius: '8px',
        fontSize: '12px',
        color: '#c53030'
      }}>
        <strong>Note:</strong> This is a testing interface for when the backend email service is implemented. 
        The actual nodemailer integration with ProtonMail will be handled server-side.
      </div>
    </TestContainer>
  );
}; 