import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Alert, StyleSheet, Text, View, Image } from 'react-native'
import { Button, Snackbar, TextInput, Title } from 'react-native-paper';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    const handleLogin = () => {
        if (email.trim() === '' || password.trim() === '') {
            setEmailError('Email cannot be empty');
            setPasswordError('Password cannot be empty');
            return;
          } else if (!email.includes('@')) {
            setEmailError('Invalid email format');
            return;
          }
          setVisible(true);
    }

  return (
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
    <Button mode="contained" onPress={handleLogin} style={styles.button} textColor='white'>
      Login
    </Button>
    <Snackbar
        style={styles.snackbar}
      visible={visible}
      onDismiss={() => setVisible(false)}
      action={{
        label: 'OK',
        onPress: () => setVisible(false),
      }}
    >
      Login logic will be implemented here.
    </Snackbar>
  </View>
  )
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
      }
  });