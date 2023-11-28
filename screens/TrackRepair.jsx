import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Subheading, Paragraph, Button, Snackbar, Card } from 'react-native-paper';

const TrackRepair = () => {
  const [status, setStatus] = useState('In Progress');
  const [completionTime, setCompletionTime] = useState('2 hours');
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleNotifyCompletion = () => {
    // Perform logic to notify user of repair completion
    // For demonstration purposes, just show a snackbar
    setSnackbarVisible(true);
  };

  const onSnackbarDismiss = () => {
    setSnackbarVisible(false);
    // You can navigate to another screen or perform other actions here
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Track Repair</Title>
      <Subheading style={styles.subHeading}>Service Information</Subheading>
      <Card mode='contained' style={styles.card}>
      <Paragraph>Service: Laptop Repair</Paragraph>

      <Subheading>Current Status:</Subheading>
      <Paragraph>{status}</Paragraph>

      <Subheading>Estimated Completion Time:</Subheading>
      <Paragraph>{completionTime}</Paragraph>
      </Card>
      {status === 'In Progress' && (
        <Button mode="contained" onPress={handleNotifyCompletion} style={styles.button} textColor='white'>
          Notify Completion
        </Button>
      )}

      <Snackbar
        visible={snackbarVisible}
        onDismiss={onSnackbarDismiss}
        action={{
          label: 'OK',
          onPress: onSnackbarDismiss,
        }}
      >
        User notified of repair completion! (Snackbar for demo)
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
  button: {
    marginTop: 16,
  },
});

export default TrackRepair;
