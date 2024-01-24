// UserManagementPage.js

import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Title, Card, List, Divider, IconButton } from 'react-native-paper';

const UserManagementPage = () => {
  // Sample user data (replace with actual data from your backend)
  const users = [
    { id: '1', name: 'John Doe', role: 'Admin', status: 'Active' },
    { id: '2', name: 'Jane Smith', role: 'User', status: 'Inactive' },
    // Add more user data as needed
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* User Management Heading */}
      <Title style={styles.heading}>User Management</Title>

      {/* User List */}
      <Card style={styles.card} mode='outlined'>
        <Card.Content>
          <Title>User List</Title>
          {users.map((user) => (
            <List.Item
              key={user.id}
              title={user.name}
              description={`Role: ${user.role}, Status: ${user.status}`}
              left={() => <List.Icon icon="account" />}
            />
          ))}
        </Card.Content>
      </Card>

      <Divider style={styles.divider} />

      {/* User Actions */}
      <Card style={styles.card} mode='outlined'>
        <Card.Content>
          <Title>User Actions</Title>
          <List.Item
            title="Update User Information"
            description="Modify user details and roles"
            left={() => <List.Icon icon="account-edit" />}
          />
          <List.Item
            title="Generate User Reports"
            description="Create reports on user activity"
            left={() => <List.Icon icon="file-chart" />}
          />
        </Card.Content>
      </Card>

      {/* Back to Dashboard Button */}
      {/* <View style={styles.backButtonContainer}>
        <IconButton icon="arrow-left" size={24} color="#000" />
      </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  heading: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
    color: 'red',
    marginTop: 48,
    marginBottom: 32
  },
  card: {
    marginBottom: 16,
    borderColor: 'gray'
  },
  divider: {
    marginVertical: 16,
  },
  backButtonContainer: {
    alignItems: 'flex-start',
    marginTop: 16,
  },
});

export default UserManagementPage;
