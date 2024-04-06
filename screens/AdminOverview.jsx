import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Title, Card, Divider, IconButton, Button, Chip } from 'react-native-paper'; // Importing necessary components from react-native-paper
import axios from 'axios';

const AdminManageOrders = ({ navigation }) => {
  // State variables
  const [orders, setOrders] = useState([]); // State variable to store orders
  const [rejectionReason, setRejectionReason] = useState(''); // State variable to store rejection reason
  const [selectedOrderId, setSelectedOrderId] = useState(null); // State variable to store the selected order ID

  // Fetch orders when component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('https://tech-care-server.vercel.app/auth/orders'); // Fetch orders from the server
        setOrders(response.data); // Update orders state with fetched data
      } catch (error) {
        console.log('Error fetching orders', error); // Log error if fetching fails
      }
    };

    fetchOrders(); // Call fetchOrders function when component mounts
  }, []);

  // Function to handle rejecting an order
const handleRejectOrder = async (orderId) => {
  try {
    if (!rejectionReason) {
      // If rejection reason is not provided, show an alert or return early
      alert('Please provide a reason for rejection.');
      return;
    }

    // Implement the logic to update the order status to 'Rejected' in the database
    // For example, send a PUT request to update the order status
    await axios.put(`https://tech-care-server.vercel.app/auth/orders/${orderId}`, { status: 'Rejected', rejectionReason });

    // Update the local orders state to reflect the change
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        return { ...order, status: 'Rejected' }; // Update the status of the rejected order
      } else {
        return order;
      }
    });
    setOrders(updatedOrders); // Update the orders state with the updated orders
    setSelectedOrderId(null); // Clear the selected order ID
    setRejectionReason(''); // Clear the rejection reason input
  } catch (error) {
    console.error('Error rejecting order:', error);
  }
};

// Function to handle accepting an order
const handleAcceptOrder = async (orderId) => {
  try {
    // Implement the logic to update the order status to 'Accepted' in the database
    // For example, send a PUT request to update the order status
    await axios.put(`https://tech-care-server.vercel.app/auth/orders/${orderId}`, { status: 'Accepted', rejectionReason });

    // Update the local orders state to reflect the change
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        return { ...order, status: 'Accepted' }; // Update the status of the accepted order
      } else {
        return order;
      }
    });
    setOrders(updatedOrders); // Update the orders state with the updated orders
  } catch (error) {
    console.error('Error accepting order:', error);
  }
};


  // Function to render each order item
  const renderItem = ({ item }) => (
    <Card style={styles.orderCard} key={item.id} mode='outlined'>
      <Card.Content>
        <ScrollView>
          <View style={styles.orderInfo}>
            <Text style={styles.infoText}>
              <Text style={styles.infoTitle}>Brand: </Text>
              {item.brand}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.infoTitle}>Model: </Text>
              {item.model}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.infoTitle}>Issue Description: </Text>
              {item.issueDescription}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.infoTitle}>Additional Instructions: </Text>
              {item.additionalInstructions}
            </Text>
            {/* <Text style={styles.infoText}>
              <Text style={styles.infoTitle}>Service Location: </Text>
              {item.serviceLocation}
            </Text> */}
            <Text style={styles.infoText}>
              <Text style={styles.infoTitle}>Delivery Options: </Text>
              {item.deliveryOptions}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.infoTitle}>Phone Number: </Text>
              {item.phoneNumber}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.infoTitle}>Service or Product: </Text>
              {item.serviceOrProduct}
            </Text>
          </View>
        </ScrollView>

        {/* Render action buttons based on order status */}
        {/* {item.status === 'Pending' && (
          <View style={styles.actionsContainer}>
            <TouchableOpacity onPress={() => handleAcceptOrder(item.id)}>
              <IconButton icon="check" size={20} color="#2ecc71" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedOrderId(item.id)}>
              <IconButton icon="close" size={20} color="#e74c3c" />
            </TouchableOpacity>
          </View>
        )} */}

        {/* Render rejection reason input and buttons */}
        {selectedOrderId !== item.id && (
          <View style={styles.rejectionContainer}>
            <View style={styles.actionButtonsContainer}>
              <Button mode="contained" onPress={() => handleAcceptOrder(item.id)} style={styles.acceptButton} textColor='white'>
                Accept
              </Button>
              <Button mode="contained" onPress={() => handleRejectOrder(item.id)} style={styles.rejectButton} textColor='white'>
                Reject
              </Button>
            </View>
            <TextInput
              label="Rejection Reason"
              value={rejectionReason}
              onChangeText={setRejectionReason}
              style={styles.reasonInput}
            />
          </View>
        )}

        {/* Render order status chip */}
        <Chip
          style={
            item.status !== 'Pending'
              ? styles.pendingChip
              : item.status === 'Accepted'
              ? styles.acceptedChip
              : styles.rejectedChip
          }>
          {item.status === 'Pending' ? 'Pending' : item.status === 'Accepted' ? 'Accepted' : 'Pending'}
        </Chip>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Manage Orders</Title>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.orderList}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: '#f93a13',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  orderCard: {
    marginBottom: 16,
    borderColor: '#f93a13',
  },
  orderInfo: {
    marginBottom: 8,
  },
  infoTitle: {
    fontWeight: 'bold',
    color: '#f93a13',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  rejectionContainer: {
    marginTop: 16,
  },
  reasonInput: {
    marginBottom: 8,
    borderColor: '#333333',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 12
  },
  rejectButton: {
    marginTop: 8,
    backgroundColor: '#e74c3c',
  },
  orderStatusBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  pendingChip: {
    backgroundColor: 'gray', // Gray color for pending status
  },
  acceptedChip: {
    backgroundColor: '#2ecc71', // Green color for accepted status
  },
  rejectedChip: {
    backgroundColor: '#e74c3c', // Red color for rejected status
  },
  orderList: {
    flex: 1,
  },
  infoText: {
    marginBottom: 8,
    color: '#333333',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  rejectionContainer: {
    marginTop: 16,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  acceptButton: {
    backgroundColor: '#2ecc71',
    flex: 1,
    marginRight: 4,
  },
  rejectButton: {
    backgroundColor: '#e74c3c',
    flex: 1,
    marginLeft: 4,
  },
  reasonInput: {
    marginBottom: 8,
    borderColor: '#333333',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
});

export default AdminManageOrders;
