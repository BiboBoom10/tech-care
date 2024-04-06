import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const EachOrder = ({ route, navigation }) => {
  const { orderId } = route.params;
  const [status, setStatus] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');

  const handleSave = () => {
    // Implement logic to save the status and reason
    console.log('Status:', status);
    console.log('Rejection Reason:', rejectionReason);
    // Add logic to update your data or perform any necessary actions
    navigation.goBack(); // Navigate back to the previous screen
  };

  return (
    <View>
      <Text>Order ID: {orderId}</Text>
      <TextInput
        placeholder="Status"
        value={status}
        onChangeText={(text) => setStatus(text)}
      />
      <TextInput
        placeholder="Rejection Reason"
        value={rejectionReason}
        onChangeText={(text) => setRejectionReason(text)}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

export default EachOrder;
