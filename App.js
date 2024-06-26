// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import Login from './screens/Login';
import Merchant from './screens/Merchant';
import OrderPlacement from './screens/OrderPlacement';
import WelcomeScreen from './screens/WelcomeScreen';
import DashboardScreen from './screens/DashboardScreen';
import SignUp from './screens/SignUp';
import TrackRepair from './screens/TrackRepair';
import Contacts from './screens/Contacts';
import RecentBookings from './screens/RecentBookings';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from './screens/Profile';
import AdminDashboard from './screens/AdminDashboard';
import UserManagement from './screens/UserManagement';
import { AuthProvider } from './services/auth-context';
import MainNavigation from './navigation/MainNavigation';
import 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
// import AdminDashboard from './screens/AdminDashboard';
import { BookingProvider } from './services/booking-context';

const Stack = createNativeStackNavigator();

export default function App() {

  const theme = {
    colors: {
      primary: '#f93a13',
      secondary: '#333333',
      white: '#fff'
    },
  };
  

  return (
    <AuthProvider>
      <BookingProvider>
        <PaperProvider theme={theme}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
              <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <MainNavigation />
                </TouchableWithoutFeedback>
              </KeyboardAvoidingView>
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </PaperProvider>
      </BookingProvider>
    </AuthProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
