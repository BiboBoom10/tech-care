import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, ToastAndroid } from 'react-native';
import { Title, TextInput, Button, Paragraph, Modal, Portal } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import BottomSheet from '@gorhom/bottom-sheet';
import { useBooking } from '../services/booking-context';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../services/auth-context';

const OrderPlacement = ({ route }) => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [additionalInstructions, setAdditionalInstructions] = useState('');
  const [serviceLocation, setServiceLocation] = useState('');
  const [deliveryOptions, setDeliveryOptions] = useState('');
  const [serviceOrProduct, setServiceOrProduct] = useState('');
  const [technicianDetails, setTechnicianDetails] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalButtonType, setModalButtonType] = useState('');

  const { navigate } = useNavigation();
  const sheetRef = useRef(null);

  const { addBooking } = useBooking();
  const { addOrder } = useAuth();
  const { selectedTechnician } = route.params;

  const handlePlaceOrder = async () => {
    try {

      if (!brand || !model || !issueDescription || !deliveryOptions || !serviceOrProduct) {
        throw new Error('Please fill out all required fields.');
      }

      const newBooking = {
        brand,
        model,
        issueDescription,
        additionalInstructions,
        serviceLocation,
        deliveryOptions,
        serviceOrProduct,
        recepient: technicianDetails, // Fixed typo here
      };

      addBooking(newBooking);
      // Uncomment if you have addOrder function
      await addOrder(newBooking);

      // Simulate success message
      setModalMessage('Congratulations! Your order has been placed successfully.');
      setModalButtonType('Go To Dashboard');
      setModalVisible(true);
    } catch (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
      console.error('Error placing order:', error);
      // Simulate error message
      setModalMessage('Error placing order. Please try again.');
      setModalButtonType('Cancel');
      setModalVisible(true);
    }
  };

  const handleModalButtonPress = () => {
    setModalVisible(false);
    if (modalButtonType === 'Go To Dashboard') {
      navigate('DashboardScreen'); // Navigate to your dashboard screen
    }
  };

  useEffect(() => {
    // Simulate fetching technician details from an API
    const fetchTechnicianDetails = async () => {
      try {
        // Simulated technician details
        setTechnicianDetails({
          name: route.params.technicianName,
          location: route.params.technicianLocation,
          _id: route.params.technicianId,
        });
      } catch (error) {
        console.error('Error fetching technician details:', error);
      }
    };

    fetchTechnicianDetails();
  }, [route.params]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Title style={styles.title}>Order Placement</Title>

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

          <RNPickerSelect
            placeholder={{ label: 'Select Delivery Option', value: null }}
            onValueChange={(value) => setDeliveryOptions(value)}
            items={[
              { label: 'Standard Delivery', value: 'standard' },
              { label: 'Express Delivery', value: 'express' },
              { label: 'Same Day Delivery', value: 'sameDay' },
              { label: 'Next Day Delivery', value: 'nextDay' },
              { label: 'Scheduled Delivery', value: 'scheduled' },
            ]}
          />

          <RNPickerSelect
            placeholder={{ label: 'Select Service', value: null }}
            onValueChange={(value) => setServiceOrProduct(value)}
            items={[
              { label: 'Device Repair', value: 'deviceRepair' },
              { label: 'Technical Support', value: 'technicalSupport' },
              { label: 'Installation Service', value: 'installationService' },
            ]}
          />

          <View style={styles.technicianDetailsContainer}>
            <Paragraph style={styles.technicianDetails}>Technician Name: {technicianDetails?.name}</Paragraph>
            {/* <Paragraph style={styles.technicianDetails}>Technician Location: {technicianDetails?.location}</Paragraph> */}
          </View>

        <Button mode="contained" onPress={handlePlaceOrder} textColor="white">
          Place Order
        </Button>
      </View>

      {/* Modal for success/failure message */}
      <Portal>
        <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <Paragraph style={styles.modalMessage}>{modalMessage}</Paragraph>
            <Button mode="contained" onPress={handleModalButtonPress} style={styles.modalButton}>
              {modalButtonType}
            </Button>
          </View>
        </Modal>
      </Portal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  input: {
    marginBottom: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white'
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalMessage: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    marginTop: 10,
  },
});

export default OrderPlacement;


// import React, { useRef, useState, useEffect } from 'react';
// import { View, StyleSheet, ScrollView, ToastAndroid } from 'react-native';
// import { Title, TextInput, Button, Paragraph } from 'react-native-paper';
// import RNPickerSelect from 'react-native-picker-select';
// import SheetScreen from './SheetScreen';
// import BottomSheet, { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
// import { useCallback } from 'react';
// import { useBooking } from '../services/booking-context';
// import { useNavigation } from '@react-navigation/native';
// import { useAuth } from '../services/auth-context';

// const OrderPlacement = ({ route }) => {
//   const [brand, setBrand] = useState('');
//   const [model, setModel] = useState('');
//   const [issueDescription, setIssueDescription] = useState('');
//   const [additionalInstructions, setAdditionalInstructions] = useState('');
//   const [serviceLocation, setServiceLocation] = useState('');
//   const [deliveryOptions, setDeliveryOptions] = useState('');
//   const [serviceOrProduct, setServiceOrProduct] = useState('');
//   const [technicianDetails, setTechnicianDetails] = useState(null);

//   const [snapPoints, setSnapPoints] = useState(['50%', '100%']);
//   const [modalIndex, setModalIndex] = useState(-1);

//   const { navigate } = useNavigation();
//   const sheetRef = useRef(null);

//   const { addBooking } = useBooking();
//   const { addOrder } = useAuth();
//   const { selectedTechnician } = route.params;

//   const handleSheetChanges = useCallback((index) => {
//     console.log('handleSheetChanges', index);
//     setModalIndex(index);
//   }, []);

//   const handlePlaceOrder = async () => {
//     try {
//       console.log('Order placed!');

//       const newBooking = {
//         brand,
//         model,
//         issueDescription,
//         additionalInstructions,
//         serviceLocation,
//         deliveryOptions,
//         serviceOrProduct,
//         recepient: technicianDetails,
//       };

//       addBooking(newBooking);
//       // Uncomment if you have addOrder function
//       await addOrder(newBooking);
//     } catch (error) {
//       ToastAndroid.show(error, ToastAndroid.SHORT)
//       console.error('Error placing order:', error);
//     }
//   };

//   // Simulate fetching technician details from an API
//   const fetchTechnicianDetails = async () => {
//     try {
//       console.log('Route Params', route.params)
//       // Replace the following with your actual logic to fetch technician details
//       // const response = await fetch(`your-api-endpoint/technicians/${selectedTechnician.id}`);
//       // const data = await response.json();
//       // setTechnicianDetails(data);

//       // Receive the technician details passed from TechnicianListScreen
//       setTechnicianDetails({
//         name: route.params.technicianName,
//         location: route.params.technicianLocation,
//         _id: route.params.technicianId
//       });
//     } catch (error) {
//       console.error('Error fetching technician details:', error);
//     }
//   };

//   useEffect(() => {
//     fetchTechnicianDetails();
//   }, []);

//   return (
//     <>
//       <ScrollView>
//         <View style={styles.container}>
//           <Title style={styles.title}>Order Placement</Title>

//           <TextInput
//             label="Brand"
//             value={brand}
//             onChangeText={(text) => setBrand(text)}
//             style={styles.input}
//           />

//           <TextInput
//             label="Model"
//             value={model}
//             onChangeText={(text) => setModel(text)}
//             style={styles.input}
//           />

//           <TextInput
//             label="Issue Description"
//             value={issueDescription}
//             onChangeText={(text) => setIssueDescription(text)}
//             style={styles.input}
//             multiline
//           />

//           <TextInput
//             label="Additional Instructions"
//             value={additionalInstructions}
//             onChangeText={(text) => setAdditionalInstructions(text)}
//             style={styles.input}
//             multiline
//           />

//           <RNPickerSelect
//             placeholder={{ label: 'Select Delivery Option', value: null }}
//             onValueChange={(value) => setDeliveryOptions(value)}
//             items={[
//               { label: 'Standard Delivery', value: 'standard' },
//               { label: 'Express Delivery', value: 'express' },
//               { label: 'Same Day Delivery', value: 'sameDay' },
//               { label: 'Next Day Delivery', value: 'nextDay' },
//               { label: 'Scheduled Delivery', value: 'scheduled' },
//             ]}
//           />

//           <RNPickerSelect
//             placeholder={{ label: 'Select Service', value: null }}
//             onValueChange={(value) => setServiceOrProduct(value)}
//             items={[
//               { label: 'Device Repair', value: 'deviceRepair' },
//               { label: 'Technical Support', value: 'technicalSupport' },
//               { label: 'Installation Service', value: 'installationService' },
//             ]}
//           />

//           <View style={styles.technicianDetailsContainer}>
//             <Paragraph style={styles.technicianDetails}>Technician Name: {technicianDetails?.name}</Paragraph>
//             {/* <Paragraph style={styles.technicianDetails}>Technician Location: {technicianDetails?.location}</Paragraph> */}
//           </View>

//           <Button mode="contained" onPress={handlePlaceOrder} textColor="white">
//             Place Order
//           </Button>

//           <Paragraph style={styles.note}>
//             Note: Please provide as much detail as possible to help us serve you better.
//           </Paragraph>
//         </View>
//       </ScrollView>
//       <BottomSheet
//         ref={sheetRef}
//         index={modalIndex}
//         snapPoints={snapPoints}
//         onChange={handleSheetChanges}
//         enablePanDownToClose={true}
//       >
//         <SheetScreen sheetRef={sheetRef} snapPoints={snapPoints} />
//       </BottomSheet>
//     </>
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
//     textAlign: 'center',
//   },
//   input: {
//     marginBottom: 10,
//     borderColor: 'gray',
//     borderWidth: 1,
//     borderRadius: 5,
//     backgroundColor: 'white'
//   },
//   note: {
//     textAlign: 'center',
//     marginTop: 16,
//     color: 'gray',
//   },
//   technicianDetailsContainer: {
//     marginVertical: 10,
//   },
//   technicianDetails: {
//     fontSize: 16,
//     marginBottom: 8,
//   },
// });

// export default OrderPlacement;
