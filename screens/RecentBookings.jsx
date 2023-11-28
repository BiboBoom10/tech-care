import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Title, Card, Paragraph, Subheading } from 'react-native-paper';

const RecentBookings = () => {
  // Sample data for recent bookings
  const recentBookings = [
    {
      id: '1',
      serviceName: 'Laptop Repair',
      technician: 'John Doe',
      date: 'November 10, 2023',
      status: 'Completed',
    },
    {
      id: '2',
      serviceName: 'Phone Screen Replacement',
      technician: 'Jane Smith',
      date: 'November 8, 2023',
      status: 'In Progress',
    },
    {
      id: '3',
      serviceName: 'Data Recovery',
      technician: 'Sam Johnson',
      date: 'November 5, 2023',
      status: 'Scheduled',
    },
    {
      id: '4',
      serviceName: 'Printer Troubleshooting',
      technician: 'Emily White',
      date: 'November 3, 2023',
      status: 'Completed',
    },
    {
      id: '5',
      serviceName: 'Network Setup',
      technician: 'Alex Green',
      date: 'November 1, 2023',
      status: 'In Progress',
    },
    {
      id: '6',
      serviceName: 'Software Installation',
      technician: 'Chris Brown',
      date: 'October 30, 2023',
      status: 'Completed',
    },
  ];
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.title}>Recent Bookings</Title>
        <Subheading style={styles.subHeading}>Details for your recent bookings</Subheading>
      {recentBookings.map(booking => (
        <Card key={booking.id} style={styles.card} elevation={2} mode='outlined'>
          <Card.Content>
            <Title style={styles.serviceName}>{booking.serviceName}</Title>
            <Paragraph><Text style={styles.miniTitle}>Technician:</Text> {booking.technician}</Paragraph>
            <Paragraph><Text style={styles.miniTitle}>Date:</Text> {booking.date}</Paragraph>
            <Paragraph><Text style={styles.miniTitle}>Status:</Text> {booking.status}</Paragraph>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center'
  },
  card: {
    marginBottom: 16,
    backgroundColor: '#fafafa',
    borderColor: 'gray'
  },
  subHeading : {
    textAlign: 'center',
    marginBottom: 24,
    fontSize: 16,
    },
  serviceName: {
    color: '#f93a13'
  },
  miniTitle: {
    fontWeight: 'bold',
  }
});

export default RecentBookings;
