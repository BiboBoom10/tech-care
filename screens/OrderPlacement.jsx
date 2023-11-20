import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, TextInput, Button, Picker } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';

const OrderPlacement = () => {
  const [serviceOrProduct, setServiceOrProduct] = useState('');
  const [additionalInstructions, setAdditionalInstructions] = useState('');
  const [serviceLocation, setServiceLocation] = useState('');
  const [deliveryOptions, setDeliveryOptions] = useState('');

  // Sample data for Picker options
  const serviceLocationOptions = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
    { label: 'Option 4', value: 'option4' },
    { label: 'Option 5', value: 'option5' },
  ];

  const deliveryOptionsSelect = [
    { label: 'Option A', value: 'optionA' },
    { label: 'Option B', value: 'optionB' },
    { label: 'Option C', value: 'optionC' },
    { label: 'Option D', value: 'optionD' },
    { label: 'Option E', value: 'optionE' },
  ];

  const handlePlaceOrder = () => {
    // Implement your logic for placing the order
    console.log('Order placed!');
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Order Placement</Title>

      <TextInput
        label="Service or Product"
        value={serviceOrProduct}
        onChangeText={(text) => setServiceOrProduct(text)}
        style={styles.input}
      />

      <TextInput
        label="Additional Instructions"
        value={additionalInstructions}
        onChangeText={(text) => setAdditionalInstructions(text)}
        style={styles.input}
      />

      <RNPickerSelect
        placeholder={{ label: 'Select Service Location', value: null }}
        onValueChange={(value) => setServiceLocation(value)}
        items={serviceLocationOptions}
      />

      <RNPickerSelect
        placeholder={{ label: 'Select Delivery Option', value: null }}
        onValueChange={(value) => setDeliveryOptions(value)}
        items={deliveryOptionsSelect}
      />

      <Button mode="contained" onPress={handlePlaceOrder} textColor='white'>
        Place Order
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    marginBottom: 16,
    fontWeight: '600',
    textAlign: 'center'
  },
  input: {
    marginBottom: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5
  },
});

export default OrderPlacement;
