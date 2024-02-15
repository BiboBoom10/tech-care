import React from 'react';
import { ScrollView } from 'react-native';
import { View, StyleSheet, Image } from 'react-native';
import { Title, Button, Card, Paragraph } from 'react-native-paper';

const DashboardScreen = ({ navigation, route }) => {
  const handleBookRepair = () => {
    // Navigate to the repair booking screen
    navigation.navigate('OrderPlacement');
  };

  const handleTrackRepair = () => {
    // Navigate to the repair tracking screen
    navigation.navigate('TrackRepair');
    // navigation.navigate('Map');
  };

  const handleViewBookings = () => {
    // Navigate to the bookings history screen
    navigation.navigate('RecentBookings');
  };

  const handleContactSupport = () => {
    // Navigate to the contact support screen or implement your support functionality
    navigation.navigate('Contacts');
  };

  const handleNotifications = () => {
    navigation.navigate('Notifications')
  }

  const handleViewProfile = () => {
    // Navigate to the profile screen
    // navigation.navigate('Profile');
    navigation.navigate('Profile', { user: route.params.user });
  };

  return (
    <ScrollView>
    <View style={styles.container}>

    <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../assets/Logo.png')} />
    </View>

      <Title style={styles.title}>Tech Care Dashboard</Title>

      <Card style={styles.card} mode='outlined'>
        <Card.Content>
          <Title>Book a Repair</Title>
          <Paragraph>Schedule a repair for your ICT equipment with our skilled technicians.</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button style={styles.button} textColor='white' mode='contained' onPress={handleBookRepair}>Book Now</Button>
        </Card.Actions>
      </Card>

      <Card style={styles.card} mode='outlined'>
        <Card.Content>
          <Title>Track Repair</Title>
          <Paragraph>Monitor the progress of your ongoing repairs in real-time.</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button style={styles.button} textColor='white' mode='contained' onPress={handleTrackRepair}>Track Now</Button>
        </Card.Actions>
      </Card>

      <Card style={styles.card} mode='outlined'>
        <Card.Content>
          <Title>Recent Bookings</Title>
          <Paragraph>View and manage your recent repair bookings with ease.</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button style={styles.button} textColor='white' mode='contained' onPress={handleViewBookings}>View All</Button>
        </Card.Actions>
      </Card>

      <Card style={styles.card} mode='outlined'>
        <Card.Content>
          <Title>Contact Support</Title>
          <Paragraph>Need assistance? Reach out to our support team for help.</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button style={styles.button} textColor='white' mode='contained' onPress={handleContactSupport}>Contact Now</Button>
        </Card.Actions>
      </Card>

      <Card style={styles.card} mode='outlined'>
        <Card.Content>
          <Title>View Notifications</Title>
          <Paragraph>View and manage your notification information.</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button style={styles.button} textColor='white' mode='contained' onPress={handleNotifications}>Notifications</Button>
        </Card.Actions>
      </Card>

      <Card style={styles.card} mode='outlined'>
        <Card.Content>
          <Title>View Profile</Title>
          <Paragraph>View and manage your profile information.</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button style={styles.button} textColor='white' mode='contained' onPress={handleViewProfile}>View Profile</Button>
        </Card.Actions>
      </Card>

    </View>
    </ScrollView>
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
    textAlign: 'center'
  },
  card: {
    marginVertical: 8,
    borderColor: 'gray'
  },
  button: {
    backgroundColor: '#f93a13',
    width: '50%'
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
},
logo: {
    height: 100,
    width: 100,
},
});

export default DashboardScreen;
