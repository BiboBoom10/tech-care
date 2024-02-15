import React from 'react'
import { useAuth } from '../services/auth-context'
import ContentNavigation from './ContentNavigation';
import AuthNavigation from './AuthNavigation';

const MainNavigation = () => {

    const { user } = useAuth();

    if (user) return <ContentNavigation />

  return (
    <AuthNavigation />
  )
}

export default MainNavigation