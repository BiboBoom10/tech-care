import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Button, Chip } from 'react-native-paper'; // Import Chip component
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import axiosInstance from '../utils/axios';

const Notifications = () => {
  const navigation = useNavigation();
  
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axiosInstance.get('/auth/notifications');
      setNotifications(response.data.notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const handleReviewNotification = (notificationId) => {
    // Navigate to the review screen with the notification ID
    // navigation.navigate('RatingScreen', { notificationId });
    navigation.navigate('RatingScreen', {notificationId});
  };

  return (
    <View style={styles.container}>
      {notifications.length === 0 ? (
        <Text style={styles.emptyText}>No notifications</Text>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.notificationItem}>
              <Text style={styles.message}>{item.message}</Text>
              <Text style={styles.timestamp}>{new Date(item.createdAt).toDateString()}</Text>
              <Chip style={styles.chip}>{item.orderId?.status}</Chip>
              <Text style={styles.technician}>Technician: {item.orderId?.recepient?.name}</Text>
              {/* <Text style={styles.description}>{item.description}</Text> */}
              <View style={styles.buttonPosition}>
              <Button mode="contained" onPress={() => handleReviewNotification(item.orderId?._id)} style={styles.reviewButton} textColor='red'>
                Review
              </Button>
              </View>
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
  emptyText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center'
  },
  notificationItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    marginVertical: 4,
    borderRadius: 8,
  },
  message: {
    fontSize: 16,
  },
  timestamp: {
    color: 'gray',
    marginTop: 4,
  },
  chip: {
    marginTop: 4,
    marginBottom: 8,
    backgroundColor: 'lightblue',
  },
  technician: {
    fontSize: 14,
    marginTop: 4,
  },
  description: {
    fontSize: 14,
    color: 'gray',
  },
  clearButton: {
    marginTop: 16,
    backgroundColor: 'red',
  },
  reviewButton: {
    marginTop: 8,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'red',
    width: '50%',
    flex: 1,
    justifyContent: 'flex-end'
  },
  buttonPosition: {
    flex: 1,
    display: 'flex',
    alignItems: 'flex-end'
  },
});

export default Notifications;