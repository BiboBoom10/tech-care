import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, TextInput } from 'react-native';
import { Title, Card, Divider, IconButton, Button } from 'react-native-paper';

// Dummy data for orders (replace this with actual order data)
const dummyOrders = [
  {
    id: '1',
    deviceType: 'Laptop',
    brand: 'HP',
    model: 'EliteBook',
    issueDescription: 'Screen not working',
    additionalInstructions: 'Handle with care',
    serviceLocation: '123 Main Street, City',
    deliveryOptions: 'Express',
    phoneNumber: '123-456-7890',
    serviceOrProduct: 'Service',
  },
  // Add more orders as needed
];

const AdminOverview = ({ navigation }) => {
  const [orders, setOrders] = useState(dummyOrders);

  const [rejectionReason, setRejectionReason] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    // Fetch orders from the backend or update the state as needed
    // Example: fetchOrdersFromAPI().then(data => setOrders(data));
  }, []);

  const handleEditOrder = (orderId) => {
    // Implement logic to navigate to the order editing screen
    console.log(`Editing order with ID: ${orderId}`);
  };

  const handleDeleteOrder = (orderId) => {
    // Implement logic to delete the order
    // Example: deleteOrderFromAPI(orderId).then(() => setOrders(orders.filter(order => order.id !== orderId)));
    console.log(`Deleting order with ID: ${orderId}`);
  };

  const handleAcceptOrder = (orderId) => {
    // Implement logic to mark the order as accepted
    console.log(`Accepting order with ID: ${orderId}`);
  };

  const handleRejectOrder = () => {
    // Implement logic to reject the selected order with a reason
    if (selectedOrderId) {
      console.log(`Rejecting order with ID: ${selectedOrderId} for reason: ${rejectionReason}`);
      // Clear the selected order and reason after rejection
      setSelectedOrderId(null);
      setRejectionReason('');
    }
  };

  const renderItem = ({ item }) => (
    <Card style={styles.orderCard} key={item.id} mode='outlined'>
      <Card.Content>
        <View style={styles.orderInfo}>
          <Text>Device Type: {item.deviceType}</Text>
          <Text>Brand: {item.brand}</Text>
          <Text>Model: {item.model}</Text>
          <Text>Issue Description: {item.issueDescription}</Text>
          {/* Add more order details as needed */}
        </View>

        <Divider style={styles.divider} />

        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={() => handleEditOrder(item.id)}>
            <IconButton icon="pencil" size={20} color="#3498db" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteOrder(item.id)}>
            <IconButton icon="delete" size={20} color="#e74c3c" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedOrderId(item.id)}>
            <IconButton icon="check" size={20} color="#2ecc71" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedOrderId(item.id)}>
            <IconButton icon="close" size={20} color="#e74c3c" />
          </TouchableOpacity>
        </View>

        {selectedOrderId === item.id && (
          <View style={styles.rejectionContainer}>
            <TextInput
              label="Rejection Reason"
              value={rejectionReason}
              onChangeText={setRejectionReason}
              style={styles.reasonInput}
            />
            <Button mode="contained" onPress={handleRejectOrder} style={styles.rejectButton}>
              Reject Order
            </Button>
          </View>
        )}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  orderCard: {
    marginBottom: 16,
  },
  orderInfo: {
    marginBottom: 8,
  },
  divider: {
    marginVertical: 8,
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
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  rejectButton: {
    marginTop: 8,
  },
  orderList: {
    flex: 1,
  },
});

export default AdminOverview;
