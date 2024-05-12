import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Title, Card, Divider, IconButton, Button, Badge } from 'react-native-paper';
import axios from 'axios';
import axiosInstance from '../utils/axios';

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
    status: 'Pending', 
    rejectionReason: '',
  },
  
];

const AdminManageOrders = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  // const [orders, setOrders] = useState(dummyOrders);
  const [rejectionReason, setRejectionReason] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get('/auth/orders');
        setOrders(response.data)
      } catch (error) {
        console.log('Error fetching orders', error);
      }
    }

    fetchOrders();
  }, []);

  const handleAcceptOrder = (orderId) => {
    // Implement logic to mark the order as accepted
    console.log(`Accepting order with ID: ${orderId}`);
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: 'Accepted', rejectionReason: '' } : order
      )
    );
  };
  
  const handleRejectOrder = (orderId) => {
    // Implement logic to reject the selected order with a reason
    console.log(`Rejecting order with ID: ${orderId} for reason: ${rejectionReason}`);
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: 'Rejected', rejectionReason } : order
      )
    );
    setSelectedOrderId(null);
    setRejectionReason('');

    // Send notification to user
    sendNotification(orderId, 'Rejected');
  };

  const sendNotification = (orderId, status) => {
    const notificationData = {
      orderId,
      status,
    };

    axios.post('https://tech-care-server.vercel.app/notify/notifications', notificationData)
      .then((response) => {
        console.log('Notification sent successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error sending notification:', error);
      });
  };

  const renderItem = ({ item }) => (
    <Card style={styles.orderCard} key={item.id} mode='outlined'>
      <Card.Content>
        <ScrollView>
          <View style={styles.orderInfo}>
            {/* <Text style={styles.infoText}>
              <Text style={styles.infoTitle}>Device Type: </Text>
              {item.deviceType}
            </Text> */}
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
            {/* <Text style={styles.infoText}>
              <Text style={styles.infoTitle}>Phone Number: </Text>
              {item.phoneNumber}
            </Text> */}
            <Text style={styles.infoText}>
              <Text style={styles.infoTitle}>Service or Product: </Text>
              {item.serviceOrProduct}
            </Text>
          </View>
        </ScrollView>

        {/* {item.status === 'Pending' && (
          <View style={styles.actionsContainer}>
            <TouchableOpacity onPress={() => handleAcceptOrder(item._id)}>
              <IconButton icon="check" size={20} color="#2ecc71" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedOrderId(item._id)}>
              <IconButton icon="close" size={20} color="#e74c3c" />
            </TouchableOpacity>
          </View>
        )} */}

        {selectedOrderId === item.id && (
          <View style={styles.rejectionContainer}>
            <TextInput
              label="Rejection Reason"
              value={rejectionReason}
              onChangeText={setRejectionReason}
              style={styles.reasonInput}
            />
            <Button mode="contained" onPress={() => handleRejectOrder(item.id)} style={styles.rejectButton}textColor='white'>
              Reject Order
            </Button>
          </View>
        )}

        {item.status === 'Accepted' && <Badge style={styles.acceptedBadge}>Accepted</Badge>}
        {item.status === 'Rejected' && <Badge style={styles.rejectedBadge}>Rejected</Badge>}
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Orders History</Title>
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
    color: '#f93a13',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  orderCard: {
    marginBottom: 16,
    borderColor: '#f93a13'
  },
  orderInfo: {
    marginBottom: 8,
  },
  infoTitle: {
    fontWeight: 'bold',
    color: '#f93a13',
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
    borderColor: '#333333',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 12
  },
  rejectButton: {
    marginTop: 8,
    // backgroundColor: '#e74c3c',
  },
  acceptedBadge: {
    marginTop: 8,
    backgroundColor: '#2ecc71',
    alignSelf: 'flex-end',
    paddingVertical: 0,
    width: '20%',
    color: 'white'
  },
  rejectedBadge: {
    marginTop: 8,
    backgroundColor: '#f93a13',
    alignSelf: 'flex-end',
    paddingVertical: 0,
    color: 'white',
    width: '20%'
  },
  orderList: {
    flex: 1,
  },
  infoText: {
    marginBottom: 8,
    color: '#333333',
  },
});

export default AdminManageOrders;
