// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
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
    <PaperProvider theme={theme}>
      {/* <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" options={{ headerShown: false }} component={WelcomeScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="DashboardScreen" component={DashboardScreen} options={{title: 'Tech Care Dashboard'}} />
          <Stack.Screen name="Merchant" component={Merchant} />
          <Stack.Screen name="OrderPlacement" component={OrderPlacement} />
          <Stack.Screen name="TrackRepair" component={TrackRepair} />
          <Stack.Screen name="Contacts" component={Contacts} />
          <Stack.Screen name="RecentBookings" component={RecentBookings} />
        </Stack.Navigator>
      </NavigationContainer> */}
      {/* <Login /> */}
      {/* <SignUp /> */}
      {/* <Merchant /> */}
      {/* <OrderPlacement /> */}
      {/* <WelcomeScreen /> */}
      {/* <DashboardScreen /> */}
      {/* <TrackRepair /> */}
      {/* <Contacts /> */}
      {/* <RecentBookings /> */}
      <Profile />
    </PaperProvider>
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
