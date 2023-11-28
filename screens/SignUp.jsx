import React, { useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Title, TextInput, Button, Snackbar } from 'react-native-paper';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleSignUp = () => {
    // Perform sign-up logic here
    // For demonstration purposes, just show a snackbar
    setSnackbarVisible(true);
  };

  const onSnackbarDismiss = () => {
    setSnackbarVisible(false);
    // You can navigate to another screen or perform other actions here
  };

  return (
    <View style={styles.container}>
        <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require('../assets/Logo.png')} />
        </View>
      <Title style={styles.title}>Sign Up</Title>
      <Text style={styles.subHeading}>Enter Your Details to Sign up</Text>
      <TextInput
        label="Name"
        value={name}
        onChangeText={text => setName(text)}
        style={styles.input}
      />

      <TextInput
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />

      <Button mode="contained" onPress={handleSignUp} style={styles.button} textColor='white'>
        Sign Up
      </Button>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={onSnackbarDismiss}
        action={{
          label: 'OK',
          onPress: onSnackbarDismiss,
        }}
      >
        Sign-up successful! (Snackbar for demo)
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center'
  },
  subHeading : {
    textAlign: 'center',
    marginBottom: 24,
    fontSize: 16,
    },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 16,
  },
  input: {
    marginBottom: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5
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

export default SignUp;
