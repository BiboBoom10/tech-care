import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Button, Snackbar, TextInput, Title } from 'react-native-paper';

import { useAuth } from '../services/auth-context';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [userType, setUserType] = useState('client');

  const navigation = useNavigation();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (email.trim() === '' || password.trim() === '') {
      setEmailError('Email cannot be empty');
      setPasswordError('Password cannot be empty');
      return;
    } else if (!email.includes('@')) {
      setEmailError('Invalid email format');
      return;
    }

    // Set loading state to true during login request
    setLoading(true);

    try {
      const isAdmin = userType.toLowerCase() === 'admin' ? false : true;
      const data = { email, password, isAdmin };
      const user = await login(data);

      // Update Snackbar message based on login result
      setMessage('Login successful');
      setVisible(true);

      // Check the user's role and navigate accordingly
      if (user.isAdmin) {
        navigation.navigate('AdminDashboardScreen');
      } else {
        navigation.navigate('DashboardScreen');
      }
    } catch (error) {
      // Handle login error
      setMessage('Login failed. Please check your credentials.');
      setVisible(true);
    } finally {
      // Set loading state back to false after login request completes
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Implement the logic to handle forgot password functionality.');
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../assets/Logo.png')} />
      </View>
      <Title style={styles.title}>Login</Title>
      <Text style={styles.subHeading}>Enter Your Details to Login</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
        onBlur={() => {
          if (!email.includes('@')) {
            setEmailError('Invalid email format');
          } else {
            setEmailError(null);
          }
        }}
      />
      {emailError && <Text style={styles.errorText}>{emailError}</Text>}

      <TextInput
        label="Password"
        value={password}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
        onBlur={() => {
          if (!password.trim() === '') {
            setPasswordError('Password cannot be empty');
          } else {
            setPasswordError(null);
          }
        }}
      />
      {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
      <Button mode="contained" onPress={handleLogin} style={styles.button} disabled={loading} textColor='white' labelStyle={{color: 'white'}}>
        {loading ? 'Logging In...' : 'Login'}
      </Button>
      {/* <Text style={styles.forgotPassword} onPress={handleForgotPassword}>
        Forgot Password?
      </Text> */}
      <Snackbar
        style={styles.snackbar}
        visible={visible}
        onDismiss={() => setVisible(false)}
        action={{
          label: 'OK',
          onPress: () => setVisible(false),
        }}
      >
        {message}
      </Snackbar>
    </View>
    </ScrollView>
  );
}

export default Login;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
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
    title: {
        textAlign: 'center',
        fontSize: 24
    },
    subHeading : {
        textAlign: 'center',
        marginBottom: 24,
        fontSize: 16,
    },
    input: {
      marginBottom: 10,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5
    },
    button: {
      marginTop: 10,
      paddingVertical: 2,
    },
    snackbar: {
        alignItems: 'center'
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
      },
      forgotPassword: {
        textAlign: 'center',
        marginTop: 10,
        textDecorationLine: 'underline',
        color: 'gray',
      },
      button: {
        marginTop: 10,
        paddingVertical: 2,
        backgroundColor: '#f93a13',
        justifyContent: 'center',
      }
  });