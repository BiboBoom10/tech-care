// AdminDashboard.js

import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Title, Card, List, Divider, IconButton } from 'react-native-paper';

const AdminDashboard = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Dashboard Overview */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>Dashboard Overview</Title>
          {/* Add your overview components here */}
        </Card.Content>
      </Card>

      <Divider style={styles.divider} />

      {/* User Management */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>User Management</Title>
          <List.Item
            title="Manage Users"
            description="View and manage user accounts"
            left={() => <List.Icon icon="account-group" />}
          />
          <List.Item
            title="User Reports"
            description="Generate reports on user activity"
            left={() => <List.Icon icon="file-chart" />}
          />
        </Card.Content>
      </Card>

      <Divider style={styles.divider} />

      {/* Analytics */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>Analytics</Title>
          {/* Add your analytics components here */}
        </Card.Content>
      </Card>

      <Divider style={styles.divider} />

      {/* Settings */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>Settings</Title>
          <List.Item
            title="General Settings"
            description="Configure application settings"
            left={() => <List.Icon icon="cog" />}
          />
          <List.Item
            title="Security & Permissions"
            description="Manage user roles and permissions"
            left={() => <List.Icon icon="shield-key" />}
          />
        </Card.Content>
      </Card>

      {/* Logout Button */}
      <View style={styles.logoutContainer}>
        <IconButton icon="logout" size={24} color="#FF0000" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  divider: {
    marginVertical: 16,
  },
  logoutContainer: {
    alignItems: 'flex-end',
    marginTop: 16,
  },
});

export default AdminDashboard;
