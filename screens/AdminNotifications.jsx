import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axiosInstance from '../utils/axios';

const AdminNotifications = () => {
  const [notificationsData, setNotificationsData] = useState([]);

  const getNotifications = async () => {
    try {
      const { data } = await axiosInstance.get('/auth/notifications');
      setNotificationsData(data.notifications);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getNotifications();
  }, [])

  const renderNotificationItem = ({ item }) => (
    <Card style={styles.card} elevation={0}>
      <Card.Content>
        <Title>{item.user?.name}</Title>
        <Text>{item.message}</Text>
        <Text>Status: {item.orderId?.status}</Text>
        <Paragraph>Order Description: {item.orderId?.issueDescription}</Paragraph>
        {item.messageType === 'Rejected' && <Text style={{ color: 'red' }}>{item.rejectionReason}</Text>}
        <Paragraph>
          {Array(item.orderId?.rating || 0)
            .fill()
            .map((_, index) => (
              <Icon key={index} name="star" color="#f39c12" size={20} style={styles.starIcon} />
            ))}
        </Paragraph>
      </Card.Content>
    </Card>
  );

  const handleClearNotifications = () => {
    setNotificationsData([]);
    console.log('Notifications cleared!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      {notificationsData.length === 0 ? (
        <Text style={styles.noNotificationsText}>No notifications</Text>
      ) : (
        <FlatList
          data={notificationsData}
          renderItem={renderNotificationItem}
          keyExtractor={(item) => item.id}
        />
      )}
      {notificationsData.length > 0 && (
        <Button mode="contained" onPress={handleClearNotifications} style={styles.clearButton} textColor='white'>
          Clear Notifications
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 24,
    fontWeight: 'bold',
  },
  card: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white'
  },
  starIcon: {
    marginRight: 2,
  },
  clearButton: {
    marginVertical: 20,
  },
  noNotificationsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    // fontStyle: 'italic',
    color: 'gray',
  },
});

export default AdminNotifications;
