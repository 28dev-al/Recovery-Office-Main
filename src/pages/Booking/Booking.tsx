import * as React from 'react';
import BookingInterface from "../../components/booking/BookingInterface";
import { BookingProvider } from '../../context/BookingContext';
import styled from 'styled-components';

const BookingPageContainer = styled.main`
  min-height: 100vh;
  padding-top: 80px;
  background: #F8F7F0;
`;

const BookingPage = () => {
  return (
    <BookingPageContainer>
      <BookingProvider>
        <BookingInterface />
      </BookingProvider>
    </BookingPageContainer>
  );
};

export default BookingPage; 






