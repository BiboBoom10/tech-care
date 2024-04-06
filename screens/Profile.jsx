import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Avatar, Card, List } from 'react-native-paper';

const Profile = ({route}) => {

  const user = route.params;

  return (
    <View style={styles.container}>
      <Card mode='outlined'>
        <Card.Cover source={ require('../assets/Logo.png') } />
        <Card.Content>
          <List.Item
            title={user.name}
            // description="Software Developer"
            left={() => <Avatar.Image size={64} source={{ uri: 'https://placekitten.com/64/64' }} />}
          />
        </Card.Content>
      </Card>

      <List.Section style={styles.listSection}>
      <List.Item title="Email" description={user.email} left={() => <List.Icon icon="email" />} />
        <List.Item title="Email" description="john.doe@example.com" left={() => <List.Icon icon="email" />} />
        <List.Item title="Phone" description="+1 (123) 456-7890" left={() => <List.Icon icon="phone" />} />
        {/* <List.Item title="Location" description="City, Country" left={() => <List.Icon icon="map-marker" />} /> */}
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  listSection: {
    marginTop: 16,
  },
});

export default Profile;
