// AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const AuthContext = createContext({
    user: {},
    login: () => {},
    register: () => {},
    addOrder: () => {},
});



export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  // const [user, setUser] = useState({ name: "Mike", email: "mike@test.com"  });
  // const [order, setOrder]= useState();

  const login = async (data) => {
    try {
      const response = await fetch('https://tech-care-server.vercel.app/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const responseData = await response.json();
      setUser(responseData.user);
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Rethrow the error for the caller to handle
    }
  };

  const register = async (data) => {
    try {
      const response = await axios.post('https://tech-care-server.vercel.app/auth/register', data);
      console.log(response.data)
      setUser(response.data.user)
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const addOrder = async (data) => {
    try {
      const response = await axios.post('https://tech-care-server.vercel.app/auth/orders', data);
      // setOrder(response.data.order);
    } catch (error) {
      console.error('Adding Order failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, addOrder }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
