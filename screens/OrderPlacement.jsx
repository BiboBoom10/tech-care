// import React, { useState } from 'react';
// import { View, StyleSheet } from 'react-native';
// import { Title, TextInput, Button, Picker } from 'react-native-paper';
// import RNPickerSelect from 'react-native-picker-select';

// const OrderPlacement = () => {
//   const [serviceOrProduct, setServiceOrProduct] = useState('');
//   const [additionalInstructions, setAdditionalInstructions] = useState('');
//   const [serviceLocation, setServiceLocation] = useState('');
//   const [deliveryOptions, setDeliveryOptions] = useState('');

//   // Sample data for Picker options
//   const serviceLocationOptions = [
//     { label: 'Option 1', value: 'option1' },
//     { label: 'Option 2', value: 'option2' },
//     { label: 'Option 3', value: 'option3' },
//     { label: 'Option 4', value: 'option4' },
//     { label: 'Option 5', value: 'option5' },
//   ];

//   const deliveryOptionsSelect = [
//     { label: 'Option A', value: 'optionA' },
//     { label: 'Option B', value: 'optionB' },
//     { label: 'Option C', value: 'optionC' },
//     { label: 'Option D', value: 'optionD' },
//     { label: 'Option E', value: 'optionE' },
//   ];

//   const handlePlaceOrder = () => {
//     // Implement your logic for placing the order
//     console.log('Order placed!');
//   };

//   return (
//     <View style={styles.container}>
//       <Title style={styles.title}>Order Placement</Title>

//       <TextInput
//         label="Service or Product"
//         value={serviceOrProduct}
//         onChangeText={(text) => setServiceOrProduct(text)}
//         style={styles.input}
//       />

//       <TextInput
//         label="Additional Instructions"
//         value={additionalInstructions}
//         onChangeText={(text) => setAdditionalInstructions(text)}
//         style={styles.input}
//       />

//       <RNPickerSelect
//         placeholder={{ label: 'Select Service Location', value: null }}
//         onValueChange={(value) => setServiceLocation(value)}
//         items={serviceLocationOptions}
//       />

//       <RNPickerSelect
//         placeholder={{ label: 'Select Delivery Option', value: null }}
//         onValueChange={(value) => setDeliveryOptions(value)}
//         items={deliveryOptionsSelect}
//       />

//       <Button mode="contained" onPress={handlePlaceOrder} textColor='white'>
//         Place Order
//       </Button>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     justifyContent: 'center',
//   },
//   title: {
//     marginBottom: 16,
//     fontWeight: '600',
//     textAlign: 'center'
//   },
//   input: {
//     marginBottom: 10,
//     borderColor: 'gray',
//     borderWidth: 1,
//     borderRadius: 5
//   },
// });

// export default OrderPlacement;


// CODE 2

import React, { useRef, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Title, TextInput, Button, Paragraph } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import SheetScreen from './SheetScreen';
import { useAuth } from '../services/auth-context';
import BottomSheet, { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useCallback } from 'react';

const OrderPlacement = () => {
  const [deviceType, setDeviceType] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [additionalInstructions, setAdditionalInstructions] = useState('');
  const [serviceLocation, setServiceLocation] = useState('');
  const [deliveryOptions, setDeliveryOptions] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [serviceOrProduct, setServiceOrProduct] = useState('');

  const [snapPoints, setSnapPoints] = useState(['50%', '100%']);
  const [modalIndex, setModalIndex] = useState(-1);

  const sheetRef = useRef(null);

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
    setModalIndex(index)
  }, []);

  const { addOrder } = useAuth();

  // Sample data for Picker options
  // const serviceLocationOptions = [
  //   { label: 'Option 1', value: 'option1' },
  //   { label: 'Option 2', value: 'option2' },
  //   { label: 'Option 3', value: 'option3' },
  //   { label: 'Option 4', value: 'option4' },
  //   { label: 'Option 5', value: 'option5' },
  // ];

  const serviceOrProductSelect =[
    { label: 'Device Repair', value: 'deviceRepair' },
    { label: 'Technical Support', value: 'technicalSupport' },
    // { label: 'Product Purchase', value: 'productPurchase' },
    // { label: 'Consultation', value: 'consultation' },
    { label: 'Installation Service', value: 'installationService' }
  ]

  const deliveryOptionsSelect = [
    { "label": "Standard Delivery", "value": "standard" },
    { "label": "Express Delivery", "value": "express" },
    { "label": "Same Day Delivery", "value": "sameDay" },
    { "label": "Next Day Delivery", "value": "nextDay" },
    { "label": "Scheduled Delivery", "value": "scheduled" }
  ]
  

  const selectLocationHandler = () => {
    setModalIndex(0);
    // sheetRef.current?.present();
  }

  const handlePlaceOrder = async () => {
    // Implement your logic for placing the order
    console.log('Order placed!', );

    await addOrder({
      deviceType,
      brand,
      model,
      issueDescription,
      additionalInstructions,
      serviceLocation,
      deliveryOptions,
      phoneNumber,
      serviceOrProduct,
    });

  };

  return (
    <>
      <ScrollView>
      <View style={styles.container}>
        <Title style={styles.title}>Order Placement</Title>

        <RNPickerSelect
          placeholder={{ label: 'Select Device Type', value: null }}
          onValueChange={(value) => setDeviceType(value)}
          items={[
            { label: 'Smartphone', value: 'smartphone' },
            { label: 'Laptop', value: 'laptop' },
            { label: 'Tablet', value: 'tablet' },
            // Add more device types as needed
          ]}
        />

        <TextInput
          label="Brand"
          value={brand}
          onChangeText={(text) => setBrand(text)}
          style={styles.input}
        />

        <TextInput
          label="Model"
          value={model}
          onChangeText={(text) => setModel(text)}
          style={styles.input}
        />

        <TextInput
          label="Issue Description"
          value={issueDescription}
          onChangeText={(text) => setIssueDescription(text)}
          style={styles.input}
          multiline
        />

        <TextInput
          label="Additional Instructions"
          value={additionalInstructions}
          onChangeText={(text) => setAdditionalInstructions(text)}
          style={styles.input}
          multiline
        />

        {/* <RNPickerSelect
          placeholder={{ label: 'Select Service Location', value: null }}
          onValueChange={(value) => setServiceLocation(value)}
          items={serviceLocationOptions}
        /> */}

        <RNPickerSelect
          placeholder={{ label: 'Select Delivery Option', value: null }}
          onValueChange={(value) => setDeliveryOptions(value)}
          items={deliveryOptionsSelect}
        />

        <TextInput
          label="Phone Number"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
          style={styles.input}
          keyboardType="phone-pad"
        />

        <RNPickerSelect 
          placeholder={{label: 'Select Service', value: null}}
          onValueChange={(value) => setServiceOrProduct(value)}
          items={serviceOrProductSelect}
        />

        {/* <TextInput
          label="Service or Product"
          value={serviceOrProduct}
          onChangeText={(text) => setServiceOrProduct(text)}
          style={styles.input}
        /> */}

        <Button mode="contained-tonal" style={{ marginVertical: 10 }} onPress={selectLocationHandler}>
          Select Location
        </Button>
        <Button mode="contained" onPress={handlePlaceOrder} textColor='white'>
          Place Order
        </Button>

        <Paragraph style={styles.note}>
          Note: Please provide as much detail as possible to help us serve you better.
        </Paragraph>
      </View>
      </ScrollView>
      <BottomSheet
          ref={sheetRef}
          index={modalIndex}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enablePanDownToClose={true}
        >
          <SheetScreen sheetRef={sheetRef} snapPoints={snapPoints} />
        </BottomSheet>
    </>
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
  note: {
    textAlign: 'center',
    marginTop: 16,
    color: 'gray'
  }
});

export default OrderPlacement;
