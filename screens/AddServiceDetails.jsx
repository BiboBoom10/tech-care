import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import MapPicker from '../components/MapPicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../services/auth-context';
import axios from 'axios';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

const AddServiceDetails = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [companyDescription, setCompanyDescription] = useState('');
  const [services, setServices] = useState(['']); 
  const [formData, setFormData] = useState({});
  const [loc, setLoc] = useState();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const { updateUser } = useAuth();
  // Function to handle adding a new service field
  const addServiceField = () => {
    setServices([...services, '']); // Add a new empty service field
  };

  // Function to handle changes in service fields
  const handleServiceChange = (text, index) => {
    const updatedServices = [...services];
    updatedServices[index] = text;
    setServices(updatedServices);
  };

  // Function to handle profile picture selection
  const pickProfilePicture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

     if (!result.canceled) {
      setProfilePicture(result.assets[0].uri);
      setImageFile(result.assets[0]);
    }
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      
      const data = {
        profile: profilePicture,
        description: companyDescription,
        services,
        address: loc?.address,
        longitude: loc?.longitude,
        latitude: loc?.latitude
      };
      if (profilePicture) {
        const file = await fetch(profilePicture);
        const fileData = await file.blob();
        const storeRef = ref(storage, `/profile/${profilePicture.substring(profilePicture.lastIndexOf('/')+1) || 'profile'}`);
        const imRes = await uploadBytes(storeRef, fileData);
        const imageUrl = await getDownloadURL(imRes.ref);
        console.log('Image', imageUrl)
        data.profile = imageUrl
      };
      console.log(data);
      await updateUser(data);
      setProfilePicture(null);
      setCompanyDescription('');
      setServices(['']);
      navigation.navigate('DisplayService', { formData: formData });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
    // Prepare data for submission (profilePicture, companyDescription, services)
  };

  return (
    <ScrollView keyboardShouldPersistTaps='always'>
      <View style={styles.container}>
        {profilePicture && (
          <View style={styles.profilePictureContainer}>
            <Text>Profile Picture:</Text>
            <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
          </View>
        )}
        <Button onPress={pickProfilePicture}>Pick a Profile Picture</Button>
        <TextInput
          value={companyDescription}
          onChangeText={setCompanyDescription}
          label="Company Description"
          multiline
          style={styles.input}
          mode='outlined'
        />
        {services.map((service, index) => (
          <TextInput
            key={index}
            value={service}
            onChangeText={(text) => handleServiceChange(text, index)}
            label={`Service Offered ${index + 1}`}
            style={styles.input}
            mode='outlined'
          />
        ))}

        <Button mode="contained" onPress={addServiceField} textColor='white' style={{marginBottom: 16, marginTop: 16, backgroundColor: 'gray'}}>
          Add Service
        </Button>


        <MapPicker
          onSelectLocation={(selectedLocation) => { setLoc(selectedLocation) }}
        />
        
        <Button mode="contained" loading={isLoading} onPress={handleSubmit} textColor='white'>
          Save Details
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
    // borderBottomColor: 'gray',
    // borderBottomWidth: 1
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
});

export default AddServiceDetails;
