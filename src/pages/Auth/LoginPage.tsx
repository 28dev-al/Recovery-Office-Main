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
  const [attempts, setAttempts] = useState(0);
  const [showResetOption, setShowResetOption] = useState(false);

  // Test backend connectivity before attempting login
  const testBackendConnection = async () => {
    try {
      const healthEndpoint = 'https://recovery-office-backend-production.up.railway.app/api/health';
      console.log('[Login] Testing backend connectivity:', healthEndpoint);
      
      const response = await fetch(healthEndpoint, { 
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        // Use a controller instead of AbortSignal.timeout which might not be available in all browsers
        signal: (() => {
          const controller = new AbortController();
          setTimeout(() => controller.abort(), 5000);
          return controller.signal;
        })()
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('[Login] Backend health check:', data);
        return true;
      } else {
        console.error('[Login] Backend health check failed:', response.status);
        return false;
      }
    } catch (error) {
      console.error('[Login] Backend connection test failed:', error);
      return false;
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setAttempts(prev => prev + 1);

    // First test backend connectivity
    const isBackendAvailable = await testBackendConnection();
    if (!isBackendAvailable) {
      console.error('[Login] Backend unavailable, cannot proceed with login');
      setError('Cannot connect to authentication server. Please try again later.');
      setLoading(false);
      return;
    }

    try {
      // Always authenticate with backend to establish session
      console.log('[Login] Authenticating with backend...', {
        email: credentials.username.trim().toLowerCase(),
        url: 'https://recovery-office-backend-production.up.railway.app/api/auth/login'
      });
      const loginResponse = await fetch('https://recovery-office-backend-production.up.railway.app/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': process.env.REACT_APP_ADMIN_API_KEY || 'recovery-office-admin-key-2024',
        },
        body: JSON.stringify({
          email: credentials.username.trim().toLowerCase(),
          password: credentials.password
        })
      });

      console.log('[Login] Backend response status:', loginResponse.status, 'OK:', loginResponse.ok);

      // Get response body regardless of status to see error details
      let responseData;
      try {
        responseData = await loginResponse.json();
        console.log('[Login] Response data:', responseData);
      } catch (parseError) {
        console.error('[Login] Failed to parse response:', parseError);
        const textResponse = await loginResponse.text();
        console.log('[Login] Raw response text:', textResponse);
      }

      if (loginResponse.ok) {
        // We already parsed the response above
        const result = responseData;
        console.log('[Login] Backend authentication successful, token present:', !!result.token || !!(result.data && result.data.tokens && result.data.tokens.accessToken));
        
        // Store JWT/token if provided by backend
        if (result.token) {
          localStorage.setItem('recovery-office-token', result.token);
        } else if (result.data && result.data.tokens && result.data.tokens.accessToken) {
          // Handle nested token structure from backend
          localStorage.setItem('recovery-office-token', result.data.tokens.accessToken);
          console.log('[Login] Stored nested token from result.data.tokens');
        }
        // Also store user data if returned
        if (result.data && result.data.user) {
          localStorage.setItem('recovery-office-user', JSON.stringify(result.data.user));
        }

        // Reset attempts counter on success
        setAttempts(0);
        setShowResetOption(false);
        
        // Flag as authenticated for ProtectedRoute
        localStorage.setItem('recovery-office-auth', 'authenticated');
        
        navigate('/dashboard');
      } else {
        // We already parsed the response above
        const errorResult = responseData;
        console.error('[Login] Backend authentication failed:', errorResult, 'Status:', loginResponse.status);
        
        if (loginResponse.status === 401) {
          setError('Invalid email or password. Please try again.');
        } else if (loginResponse.status === 403) {
          setError('Your account has been deactivated. Please contact an administrator.');
        } else {
          setError(`Authentication failed: ${errorResult?.message || 'Unknown error'}`);
        }

        // After 3 failed attempts, show reset option
        if (attempts >= 2) {
          setShowResetOption(true);
        }
      }
    } catch (error) {
      console.error('[Login] Authentication error:', error instanceof Error ? error.message : error);
      setError('Connection error. Please check your internet connection and try again.');
    }

    setLoading(false);
  };

  // Function to handle password reset request
  const handleResetRequest = () => {
    // In a real implementation, this would call a password reset API
    // For now, just show a message with instructions
    setError('');
    alert(`Password reset instructions: \n\n1. Contact your system administrator\n2. Email: admin@recovery-office.com\n3. Reference: Dashboard Access`);
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
            <Label>Email</Label>
            <Input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
              placeholder="Enter email"
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
          
          {showResetOption && (
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <button 
                type="button" 
                onClick={handleResetRequest}
                style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  color: '#4a5568', 
                  textDecoration: 'underline',
                  cursor: 'pointer'
                }}
              >
                Forgot password?
              </button>
            </div>
          )}
          
          <LoginButton type="submit" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In to Dashboard'}
          </LoginButton>
        </Form>
      </LoginCard>
    </LoginContainer>
  );
}; 