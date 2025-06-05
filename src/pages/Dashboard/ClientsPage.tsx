/**
 * Client Management Page
 * Comprehensive client administration for Recovery Office
 */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ClientsContainer = styled.div`
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1a365d;
  margin: 0;
`;

const ClientsTable = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr 1fr;
  gap: 16px;
  padding: 20px 24px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  font-weight: 700;
  color: #1a365d;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr 1fr;
  gap: 16px;
  padding: 20px 24px;
  border-bottom: 1px solid #f1f5f9;

  &:hover {
    background: #f8fafc;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
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
  padding: 40px;
  text-align: center;
  color: #4a5568;
`;

interface ClientData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: string;
  createdAt: string;
  name?: string;
  caseType?: string;
}

interface ClientDisplayData {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  status: string;
  joinDate: string;
}

const ClientsPage: React.FC = () => {
  const [clients, setClients] = useState<ClientDisplayData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        console.log('[Clients] Fetching clients directly from clients collection...');
        
        // Use the new dedicated clients endpoint
        const response = await fetch('https://recovery-office-backend-production.up.railway.app/api/dashboard/clients?limit=50');
        const data = await response.json();
        
        console.log('[Clients] Clients API response:', data);
        
        if (data.status === 'success' && data.data) {
          console.log(`[Clients] Found ${data.data.length} clients from clients collection`);
          
          // Format the client data properly
          const formattedClients: ClientDisplayData[] = data.data.map((client: ClientData) => ({
            id: client._id,
            name: client.name || `${client.firstName || ''} ${client.lastName || ''}`.trim(),
            email: client.email || 'Email not provided',
            phone: client.phone || 'Phone not provided',
            service: client.caseType || 'Case type not specified',
            status: client.status || 'pending',
            joinDate: client.createdAt
          }));
          
          setClients(formattedClients);
        } else {
          console.error('[Clients] Invalid API response:', data);
        }
      } catch (error) {
        console.error('[Clients] Error fetching clients:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) {
    return (
      <ClientsContainer>
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      </ClientsContainer>
    );
  }

  return (
    <ClientsContainer>
      <Header>
        <Title>Client Management ({clients.length})</Title>
      </Header>

      <ClientsTable>
        <TableHeader>
          <div>CLIENT NAME</div>
          <div>EMAIL</div>
          <div>PHONE</div>
          <div>SERVICE</div>
          <div>STATUS</div>
        </TableHeader>
        
        {clients.length > 0 ? (
          clients.map((client) => (
            <TableRow key={client.id}>
              <div style={{ fontWeight: '600', color: '#1a365d' }}>
                {client.name}
              </div>
              <div style={{ color: '#4a5568' }}>
                {client.email}
              </div>
              <div style={{ color: '#4a5568' }}>
                {client.phone}
              </div>
              <div style={{ color: '#4a5568' }}>
                {client.service}
              </div>
              <div>
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  backgroundColor: client.status === 'confirmed' ? '#c6f6d5' : '#fed7d7',
                  color: client.status === 'confirmed' ? '#2f855a' : '#c53030'
                }}>
                  {client.status}
                </span>
              </div>
            </TableRow>
          ))
        ) : (
          <EmptyState>
            <h3>No clients found</h3>
            <p>No client data available from current bookings.</p>
          </EmptyState>
        )}
      </ClientsTable>
    </ClientsContainer>
  );
};

export default ClientsPage; 
