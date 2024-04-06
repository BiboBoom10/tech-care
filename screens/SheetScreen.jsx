import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_API_KEY } from '../config';

const SheetScreen = () => {
  // ref

  // variables

  const [to, setTo] = useState('');
  const [from, setFrom] = useState('');
  const [distance, setDistance] = useState('');
  const [price, setPrice] = useState('');

  // error states
  const [toError, setToError] = useState('');
  const [fromError, setFromError] = useState('');
  const [distanceError, setDistanceError] = useState('');
  const [priceError, setPriceError] = useState('');

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleSubmit = () => {
    // Basic validation
    let isValid = true;

    if (!to.trim()) {
      setToError('To field is required');
      isValid = false;
    } else {
      setToError('');
    }

    if (!from.trim()) {
      setFromError('From field is required');
      isValid = false;
    } else {
      setFromError('');
    }

    if (!distance.trim()) {
      setDistanceError('Distance field is required');
      isValid = false;
    } else {
      setDistanceError('');
    }

    if (!price.trim()) {
      setPriceError('Price field is required');
      isValid = false;
    } else {
      setPriceError('');
    }

    // Additional validation logic if needed

    // Handle the submission logic here if all fields are valid
    if (isValid) {
      console.log('Submitted:', { to, from, distance, price });
    }
  };

  const ref = useRef();

  useEffect(() => {
    ref.current?.setAddressText('Some Text');
  }, []);


  // renders
  return (
  <View style={styles.contentContainer}>
            <Text style={{ marginVertical: 16 }}>Select Order Location</Text>
            <GooglePlacesAutocomplete
              placeholder='To'
              onPress={(data, details = null) => {
                console.log(data, details);
                setTo(data.description);
              }}
              query={{
                key: GOOGLE_MAPS_API_KEY,
                language: 'en',
              }}
              fetchDetails={true}
              styles={{
                textInput: styles.input,
                container: styles.googlePlacesContainer,
              }}
            />

          <GooglePlacesAutocomplete
              placeholder='From'
              onPress={(data, details = null) => {
                console.log(data, details);
                setTo(data.description);
              }}
              query={{
                key: GOOGLE_MAPS_API_KEY,
                language: 'en',
              }}
              fetchDetails={true}
              styles={{
                textInput: styles.input,
                container: styles.googlePlacesContainer,
              }}
            />

            {/* <TextInput
              label="To"
              style={styles.input}
              value={to}
              onChangeText={(text) => setTo(text)}
            /> */}
            <HelperText type="error" visible={!!toError}>
              {toError}
            </HelperText>

            {/* <TextInput
              label="From"
              style={styles.input}
              value={from}
              onChangeText={(text) => setFrom(text)}
            />
            <HelperText type="error" visible={!!fromError}>
              {fromError}
            </HelperText>

            <View style={styles.containerTwo}>
              <TextInput
                label="Distance"
                style={styles.inputTwo}
                keyboardType="numeric"
                value={distance}
                onChangeText={(text) => setDistance(text)}
              />
              <HelperText type="error" visible={!!distanceError}>
                {distanceError}
              </HelperText>

              <TextInput
                label="Price"
                style={styles.inputTwo}
                keyboardType="numeric"
                value={price}
                onChangeText={(text) => setPrice(text)}
              />
              <HelperText type="error" visible={!!priceError}>
                {priceError}
              </HelperText>
            </View> */}

            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.button}
              textColor="white"
            >
              Submit
            </Button>
          </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: 'blue',
  },
  containerTwo: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    width: '90%',
    marginBottom: 1,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  inputTwo: {
    width: '44%',
    marginBottom: 16,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    width: '90%',
  },
  googlePlacesContainer: {
    width: '90%',
    padding: 2
  }
});

export default SheetScreen;
