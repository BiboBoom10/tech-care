import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Rating } from 'react-native-ratings';
import axiosInstance from '../utils/axios';

const RatingScreen = ({ route, navigation }) => {
  // Assuming you have the technician's details in the route params
  const { technicianName, notificationId } = route.params;

  const [rating, setRating] = useState(0);

  const handleRatingSubmit = async () => {
    if (rating === 0) {
      Alert.alert('Please select a rating', 'Please provide a rating before submitting.');
      return;
    }

    // TODO: Implement logic to submit the rating to the backend
    // You can use the 'rating' state and the technician details from the route params

    await axiosInstance.patch('/auth/rate-order', { orderId: notificationId, rating })
    // For demonstration purposes, alert the user
    // Alert.alert('Rating Submitted', `Thank you for rating ${technicianName} with ${rating} stars!`);
    Alert.alert('Rating Submitted', `Thank you for rating: ${rating} stars!`);
    
    // You can also navigate back to the previous screen or any other screen
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rate {technicianName}</Text>
      <Rating
        showRating
        onFinishRating={(value) => setRating(value)}
        style={styles.rating}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleRatingSubmit}>
        <Text style={styles.submitButtonText}>Submit Rating</Text>
      </TouchableOpacity>
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
    textAlign: 'center',
  },
  rating: {
    paddingVertical: 16,
  },
  submitButton: {
    backgroundColor: '#f93a13',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RatingScreen;
