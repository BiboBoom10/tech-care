import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useAuth } from '../services/auth-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';

const DisplayService = ({ route }) => {
  
  const { user } = useAuth();
  const { navigate } = useNavigation();

  return (
    <View style={styles.container}>
      {/* Heading */}
      <Text style={styles.heading}>Service Details</Text>
      
      {/* Container for service information */}

      {!user?.services && <View style={{ gap: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <Text>You have not edited your service details.</Text>
        <TouchableOpacity onPress={() => { navigate('AddServiceDetails') }}><Text>Add</Text></TouchableOpacity>
      </View>}
      {user?.services && <>
        <View style={styles.infoContainer}>
          {/* Display profile picture if available */}
          {user?.profile && (
            <View style={styles.profilePictureContainer}>
              {/* <Text>Profile Picture:</Text> */}
              <Image source={{ uri: user?.profile }} style={styles.profilePicture} />
            </View>
          )}
          
          {/* Display company description */}
          <Text style={styles.label}>Company Description:</Text>
          <Text style={styles.info}>{user?.description}</Text>
          
          {/* Display services offered */}
          <Text style={styles.label}>Services Offered:</Text>
          <View>
            {user?.services?.map((service, index) => (
              <Text key={index} style={styles.serviceItem}>{`- ${service}`}</Text>
            ))}
          </View>
          
          {/* Display location */}
          <Text style={styles.label}>Location:</Text>
          <Text style={styles.info}>{JSON.stringify(user?.address)}</Text>
        </View>
      </>}

      <Button onPress={() => {navigate('AddServiceDetails')}} style={{marginTop: 16}} mode='contained' textColor='white'>Edit</Button>

    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center'
  },
  infoContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'white'
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profilePicture: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 100,
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#f93a13'
  },
  info: {
    marginBottom: 8,
  },
  serviceItem: {
    marginLeft: 16,
  },
});

export default DisplayService;
