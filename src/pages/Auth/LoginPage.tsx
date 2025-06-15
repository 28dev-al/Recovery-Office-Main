import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%);
`;

const LoginCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 48px;
  box-shadow: 0 20px 64px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;

const LogoText = styled.h1`
  font-size: 24px;
  font-weight: 800;
  color: #1a365d;
  margin-bottom: 8px;
`;

const LogoSubtext = styled.p`
  color: #4a5568;
  font-size: 14px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 600;
  color: #1a365d;
  font-size: 14px;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #d69e2e;
  }
`;

const LoginButton = styled.button`
  background: linear-gradient(135deg, #d69e2e 0%, #f6ad3a 100%);
  color: white;
  padding: 14px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(214, 158, 46, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.div`
  background: #fed7d7;
  color: #c53030;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
`;

export const LoginPage: React.FC = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // First, validate credentials locally
      if (credentials.username !== 'admin' || credentials.password !== 'recovery2025') {
        setError('Invalid credentials. Please try again.');
        setLoading(false);
        return;
      }

      // Then authenticate with backend to establish session
      console.log('[Login] Authenticating with backend...');
      const loginResponse = await fetch('https://recovery-office-backend-production.up.railway.app/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'admin@recovery-office.com',
          password: 'recovery2025'
        })
      });

      console.log('[Login] Backend response status:', loginResponse.status);

      if (loginResponse.ok) {
        const result = await loginResponse.json();
        console.log('[Login] Backend authentication successful:', result);
        
        // Store JWT/token if provided by backend
        if (result.token) {
          localStorage.setItem('recovery-office-token', result.token);
        }
        // Also store user data if returned
        if (result.data && result.data.user) {
          localStorage.setItem('recovery-office-user', JSON.stringify(result.data.user));
        }

        // Flag as authenticated for ProtectedRoute
        localStorage.setItem('recovery-office-auth', 'authenticated');
        
        navigate('/dashboard');
      } else {
        const errorResult = await loginResponse.json();
        console.error('[Login] Backend authentication failed:', errorResult);
        setError('Authentication failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('[Login] Authentication error:', error);
      setError('Login failed. Please try again.');
    }

    setLoading(false);
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Logo>
          <LogoText>RECOVERY OFFICE</LogoText>
          <LogoSubtext>Admin Dashboard Access</LogoSubtext>
        </Logo>

        <Form onSubmit={handleLogin}>
          <InputGroup>
            <Label>Username</Label>
            <Input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
              placeholder="Enter username"
              required
            />
          </InputGroup>
          
          <InputGroup>
            <Label>Password</Label>
            <Input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
              placeholder="Enter password"
              required
            />
          </InputGroup>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <LoginButton type="submit" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In to Dashboard'}
          </LoginButton>
        </Form>
      </LoginCard>
    </LoginContainer>
  );
}; 