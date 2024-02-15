// NotificationScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: '1', message: 'Your laptop repair is complete', timestamp: new Date() },
    { id: '2', message: 'Scheduled pickup for phone repair tomorrow', timestamp: new Date() },
    { id: '3', message: 'Repair technician assigned for your order', timestamp: new Date() },
  ]);

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Notifications</Text> */}
      {notifications.length === 0 ? (
        <Text style={styles.emptyText}>No notifications</Text>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.notificationItem}>
              <Text style={styles.message}>{item.message}</Text>
              <Text style={styles.timestamp}>{item.timestamp.toDateString()}</Text>
            </View>
          )}
        />
      )}
      <Button mode="contained" onPress={clearNotifications} style={styles.clearButton} textColor='white'>
        Clear Notifications
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
  },
  notificationItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    marginVertical: 4,
    borderRadius: 8
  },
  message: {
    fontSize: 16,
  },
  timestamp: {
    color: 'gray',
    marginTop: 4,
  },
  clearButton: {
    marginTop: 16,
  },
});

export default Notifications;
