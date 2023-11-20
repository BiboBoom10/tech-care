import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Title, Button, Text } from 'react-native-paper';

const WelcomeScreen = ({ navigation }) => {
  const handleLogin = () => {
    // Navigate to the login screen
    navigation.navigate('Login');
  };

  const handleSignUp = () => {
    // Navigate to the sign-up screen
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
        <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require('../assets/Logo.png')} />
        </View>
      <Title style={styles.title}>Welcome to Tech Care App</Title>
      <Text style={styles.motto}>Book Repairs with Ease!</Text>
      
      <Button mode="contained" onPress={handleLogin} style={styles.button} textColor='white'>
        Login
      </Button>

      <Button mode="outlined" onPress={handleSignUp} style={styles.button}>
        Sign Up
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    marginBottom: 24,
  },
  button: {
    marginVertical: 8,
    width: '100%',
  },
  motto: {
    marginBottom: 24,
    fontSize: 16,
    color: 'gray',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
    logo: {
    height: 150,
    width: 150,
    },
});

export default WelcomeScreen;
