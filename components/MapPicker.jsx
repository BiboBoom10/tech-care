import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, Button, ToastAndroid } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_API_KEY } from '../config';
import { ScrollView } from 'react-native-gesture-handler';

const MapPicker = ({ onSelectLocation }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const mapRef = useRef();

  const handleMapPress = (event) => {
    const newLocation = {
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    };
    setSelectedLocation(newLocation);
    onSelectLocation(newLocation); // Send the location object to the parent component
  };

  const googlePlacesSelectHandler = async (data, details) => {
    const theLocation = { 
      address: data?.description, 
      latitude: details?.geometry?.location?.lat, 
      longitude: details?.geometry?.location?.lng 
    }
    setSelectedLocation(theLocation);
    onSelectLocation(theLocation)
  }

  return (
    <ScrollView keyboardShouldPersistTaps='handled'>
      <GooglePlacesAutocomplete
        GooglePlacesDetailsQuery={{ fields: 'geometry' }}
        fetchDetails={true}
        placeholder="Search"
        listViewDisplayed={false}
        onPress={googlePlacesSelectHandler}
        query={{
          key: GOOGLE_MAPS_API_KEY,
          language: 'en',
          country: 'KE',
        }}
        styles={{
          container: {
            flex: 0,
            zIndex: 1,
          },
          textInputContainer: {
            width: '100%',
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            borderBottomWidth: 0,
          },
          textInput: {
            marginLeft: 0,
            marginRight: 0,
            height: 38,
            color: '#5d5d5d',
            fontSize: 16,
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
        }}
      />

      <MapView
        style={styles.map}
        onPress={handleMapPress}
        ref={mapRef}
        maxZoomLevel={14}
        region={{
          latitude: selectedLocation?.latitude || -1.39199,
          longitude: selectedLocation?.longitude || 36.771613,
          latitudeDelta: 0.0022,
          longitudeDelta: 0.0021,
        }}
        initialRegion={{
          latitude: -1.39199,
          longitude: 36.771613,
          latitudeDelta: 0.0022,
          longitudeDelta: 0.0021,
        }}
      >
        {selectedLocation && (
          <Marker
            coordinate={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
            }}
          />
        )}
      </MapView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 300,
    marginVertical: 10,
  },
  map: {
    flex: 1,
    height: 300
  },
});

export default MapPicker;
