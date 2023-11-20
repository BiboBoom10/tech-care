// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import Login from './screens/Login';
import Merchant from './screens/Merchant';
import OrderPlacement from './screens/OrderPlacement';
import WelcomeScreen from './screens/WelcomeScreen';
import DashboardScreen from './screens/DashboardScreen';

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
      {/* <Login /> */}
      {/* <Merchant /> */}
      {/* <OrderPlacement /> */}
      {/* <WelcomeScreen /> */}
      <DashboardScreen />
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
