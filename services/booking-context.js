// BookingContext.js
import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [recentBookings, setRecentBookings] = useState([]);

  const addBooking = (booking) => {
    setRecentBookings((prevBookings) => [booking, ...prevBookings]);
  };

  return (
    <BookingContext.Provider value={{ recentBookings, addBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
