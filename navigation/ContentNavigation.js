import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/DashboardScreen';
import AdminDashboard from '../screens/AdminDashboard';
import Merchant from '../screens/Merchant';
import OrderPlacement from '../screens/OrderPlacement';
import TrackRepair from '../screens/TrackRepair';
import Contacts from '../screens/Contacts';
import RecentBookings from '../screens/RecentBookings';
import Profile from '../screens/Profile';
import { useAuth } from '../services/auth-context';
import Analytics from '../screens/Analytics';
import MapScreen from '../screens/MapScreen';
import Notifications from '../screens/Notifications';

const Stack = createNativeStackNavigator();

const ContentNavigation = () => {
  const { user } = useAuth();
  return (
    <NavigationContainer>
        <Stack.Navigator>
          {user.isAdmin && <>
            <Stack.Screen name="AdminDashboardScreen" component={AdminDashboard} options={{title: 'Tech Care Dashboard'}} />
            <Stack.Screen name="Analytics" component={Analytics} />
          </>}
          {!user.isAdmin && <>
            <Stack.Screen name="DashboardScreen" component={DashboardScreen} options={{title: 'Tech Care Dashboard'}} />
            <Stack.Screen name="Merchant" component={Merchant} />
            <Stack.Screen name="OrderPlacement" component={OrderPlacement} />
            <Stack.Screen name="Map" component={MapScreen} />
            <Stack.Screen name="TrackRepair" component={TrackRepair} />
            <Stack.Screen name="Contacts" component={Contacts} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="RecentBookings" component={RecentBookings} />
            {/* <Stack.Screen name="Profile" component={Profile} /> */}
          </>}
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default ContentNavigation