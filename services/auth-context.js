// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import axiosInstance from '../utils/axios';
import { getItem } from './async-storage';
import { isValidToken, setSession } from './decode-token';

const AuthContext = createContext({
    user: {},
    login: () => {},
    register: () => {},
    addOrder: () => {},
    updateUser: () => {},
});



export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(); 
  // const [user, setUser] = useState({ name: "Mike", email: "mike@test.com"  });
  // const [order, setOrder]= useState();

  const initialization = async () => {
    const accToken = await getItem('token');
    if (accToken) {
      const valid = await isValidToken(accToken);
      if (valid) {
        await setSession(accToken);
        const { data } = await axiosInstance.get('/auth/profile');
        setUser(data?.user);
      }
    }
  };

  useEffect(() => {
    initialization();
  }, [])

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
      console.log(responseData);
      setUser({ ...responseData.user, token: responseData?.accessToken });
      setSession(responseData?.accessToken);
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Rethrow the error for the caller to handle
    }
  };

  const register = async (data) => {
    try {
      const response = await axiosInstance.post('/auth/register', data);
      setUser({ ...response.data.user, token: response?.data?.accessToken });
      setSession(response?.data?.accessToken);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const updateUser = async (data) => {
    await axiosInstance.patch('/auth/update-profile', data);
    setUser(prev => ({ ...prev, ...data }))
  }

  const addOrder = async (data) => {
    try {
      const config = { headers: { 'Authorization': `Bearer ${user?.token}` } };
      console.log(data);
      const response = await axios.post('https://tech-care-server.vercel.app/auth/orders', data, config);
      console.log(response?.data?.order);
    } catch (error) {
      throw error?.response?.data?.content || error?.response?.data?.message || error?.message || 'Something went wrong';
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, addOrder, updateUser }}>
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
