import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Title, TextInput, Button, Snackbar } from 'react-native-paper';

const Contacts = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleContactNow = async () => {
    try {
      await fetch('https://tech-care-server.vercel.app/auth/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      setSnackbarVisible(true);
    } catch (error) {
      console.error('Error sending email:', error.message);
    }
  };


  const onSnackbarDismiss = () => {
    setSnackbarVisible(false);
    // You can navigate to another screen or perform other actions here
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Contact Now</Title>
        <Text style={styles.subHeading}>Feel free to reach out to us! To assist you better, please provide the following details in your message.
        We strive to respond to your inquiries as quickly as possible. Thank you for contacting us!
        </Text>

      <TextInput
        label="Your Name"
        value={name}
        onChangeText={text => setName(text)}
        style={styles.input}
      />

      <TextInput
        label="Your Email"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        label="Your Message"
        value={message}
        onChangeText={text => setMessage(text)}
        multiline
        numberOfLines={3}
        style={styles.input}
      />

      <Button mode="contained" onPress={handleContactNow} style={styles.button} textColor='white'>
        Submit Message
      </Button>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={onSnackbarDismiss}
        action={{
          label: 'OK',
          onPress: onSnackbarDismiss,
        }}
      >
        Message submitted! (Snackbar for demo)
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center'
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
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5
      },
  button: {
    marginTop: 16,
  },
});

export default Contacts;
