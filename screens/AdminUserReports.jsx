import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { Title, Card, Divider } from 'react-native-paper';

// Dummy data for user reports (replace this with actual report data)
const dummyUserReports = [
  {
    id: '1',
    reportType: 'Accepted Orders',
    value: 15, // Replace with actual count of accepted orders
  },
  {
    id: '2',
    reportType: 'Rejected Orders',
    value: 5, // Replace with actual count of rejected orders
  },
  // Add more reports as needed
];

const AdminUserReports = ({ navigation }) => {
  const [userReports, setUserReports] = useState(dummyUserReports);

  useEffect(() => {
    // Fetch user reports from the backend or update the state as needed
    // Example: fetchReportsFromAPI().then(data => setUserReports(data));
  }, []);

  const renderItem = ({ item }) => (
    <Card style={styles.reportCard} key={item.id} mode='outlined'>
      <Card.Content>
        <View style={styles.reportInfo}>
          <Text style={styles.infoTitle}>{item.reportType}:</Text>
          <Text>{item.value}</Text>
        </View>
        <Divider style={styles.divider} />
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Order Reports</Title>
      <FlatList
        data={userReports}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.reportList}
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
  },
  reportCard: {
    marginBottom: 16,
    borderColor: '#f93a13',
  },
  reportInfo: {
    marginBottom: 8,
  },
  infoTitle: {
    fontWeight: 'bold',
    color: '#f93a13',
  },
  divider: {
    marginVertical: 8,
  },
  reportList: {
    flex: 1,
  },
});

export default AdminUserReports;
