// BookingContext.js
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [recentBookings, setRecentBookings] = useState([]);

  const addBooking = (booking) => {
    setRecentBookings((prevBookings) => [booking, ...prevBookings]);
  };

  const addOrder = async (data) => {
    try {
      const response = await axios.post('https://tech-care-server.vercel.app/auth/orders', data);
      // setOrder(response.data.order);
    } catch (error) {
      // console.error('Adding Order failed:', error);
      throw error?.response?.data?.content || error?.response?.data?.message || error?.message || 'Something went wrong';
    }
  };

  return (
    <BookingContext.Provider value={{ recentBookings, addBooking, addOrder }}>
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
