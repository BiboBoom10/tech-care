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
import AdminManageOrders from '../screens/AdminManageOrders';
import AdminUserReports from '../screens/AdminUserReports';
// import AddSkillsScreen from '../screens/AddSkillsScreen';
import TechnicianListScreen from '../screens/TechnicianListScreen';
import AdminOverview from '../screens/AdminOverview';
import EachOrder from '../screens/EachOrder';
import AddServiceDetails from '../screens/AddServiceDetails';
import DisplayService from '../screens/DisplayService';
import RatingScreen from '../screens/RatingScreen';

const Stack = createNativeStackNavigator();

const ContentNavigation = () => {
  const { user } = useAuth();
  return (
    <NavigationContainer>
        <Stack.Navigator>
          {user.role === 'Technician' && <>
            {/* <Stack.Screen name="AdminDashboardScreen" component={AdminDashboard} options={{title: 'Tech Care Dashboard'}} /> */}
            <Stack.Screen name="AdminDashboardScreen" component={AdminDashboard} options={{title: 'Tech Care Dashboard'}} />
            <Stack.Screen name="Analytics" component={Analytics} />
            <Stack.Screen name='AdminManageOrders' component={AdminManageOrders} />
            <Stack.Screen name='AdminOverview' component={AdminOverview} />
            <Stack.Screen name='DisplayService' component={DisplayService} />
            <Stack.Screen name='AdminUserReports' component={AdminUserReports} />
            <Stack.Screen
              name="AddServiceDetails"
              component={AddServiceDetails}
              options={{ presentation: 'modal', stack: 'modal' }}
            />
          </>}
          {user.role === 'User' && <>
            <Stack.Screen name="DashboardScreen" component={DashboardScreen} options={{title: 'Tech Care Dashboard'}} />
            <Stack.Screen name="Merchant" component={Merchant} />
            <Stack.Screen name="OrderPlacement" component={OrderPlacement} />
            <Stack.Screen name="Map" component={MapScreen} />
            <Stack.Screen name="TrackRepair" component={TrackRepair} />
            <Stack.Screen name="Contacts" component={Contacts} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="RecentBookings" component={RecentBookings} />
            <Stack.Screen name="TechnicianListScreen" component={TechnicianListScreen} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="EachOrder" component={EachOrder} />
            <Stack.Screen name='RatingScreen' component={RatingScreen} />
          </>}
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default ContentNavigation