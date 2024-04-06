import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, ScrollView } from 'react-native';
import { Title, TextInput, Button, Snackbar } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../services/auth-context';


const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('Client'); // Default is 'client'
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('');

  const navigation = useNavigation();

  const { register } = useAuth();

  const handleSignUp = async () => {
    try {
      setLoading(true);
      // const isAdmin = userType.toLowerCase() === 'client' ? false : true;
      const data = { name, email, password, phone, isTechnician: userType === 'Technician' };
      
      // Ensure that you await the register function to get the user data
      await register(data);

      setLoading(false);

    } catch (error) {
      console.error('Registration failed:', error);
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };
  
  const onSnackbarDismiss = () => {
    // You might want to add additional logic here if needed
    setSnackbarVisible(false);
  };

  return (
    <ScrollView>
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
          label="Phone Number"
          value={phone}
          onChangeText={text => setPhone(text)}
          keyboardType="phone-pad"
          style={styles.input}
        />

      <TextInput
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />

      

      <Text style={styles.userTypeLabel}>Choose User Type:</Text>
      <RNPickerSelect
        placeholder={{ label: 'Select User Type', value: null }}
        items={[
          { label: 'Client', value: 'User' },
          { label: 'Techy', value: 'Technician' },
        ]}
        onValueChange={(value) => setUserType(value)}
        style={pickerSelectStyles}
        value={userType}
      />

    <Button
      mode="contained"
      onPress={handleSignUp}
      style={styles.button}
      disabled={loading}
      labelStyle={{ color: 'white' }}
    >
      {loading ? 'Signing Up...' : 'Sign Up'}
    </Button>

      {/* <Snackbar
        visible={snackbarVisible}
        onDismiss={onSnackbarDismiss}
        action={{
          label: 'OK',
          onPress: onSnackbarDismiss,
        }}
      >
        Sign-up successful! (Snackbar for demo)
      </Snackbar> */}
    </View>
    </ScrollView>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

const styles = StyleSheet.create({
  // ... (previous styles)

  container: {
    // flex: 1,
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
    backgroundColor: '#f93a13',
    justifyContent: 'center',
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
  userTypeLabel: {
    marginTop: 16,
    marginBottom: 8,
    fontSize: 16,
  },
});

export default SignUp;
