import React, { useState, useRef, useEffect } from 'react';
import { Modal, View, StyleSheet, Dimensions, Animated, Text } from 'react-native';
import { Title, Button } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import MapPicker from '../components/MapPicker';

const { height } = Dimensions.get('window');

const AddSkillsModal = ({ visible, onClose, onAddSkill }) => {
  const [formData, setFormData] = useState({
    selectedRepairType: 'phone',
    location: null,
  });

  const modalPosition = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(modalPosition, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(modalPosition, {
        toValue: height,
        useNativeDriver: false,
      }).start();
    }
  }, [visible]);

  const handleAddSkill = () => {
    const newSkill = {
      skill: `${formData.selectedRepairType.charAt(0).toUpperCase()}${formData.selectedRepairType.slice(1)} Repair`,
      location: formData.location,
    };
    onAddSkill(newSkill);
    onClose();
  };

  return (
    <Modal transparent visible={visible} animationType="slide">
      <Animated.View style={[styles.modalContainer, { top: modalPosition }]}>
        <View style={styles.container}>
          <Title style={styles.title}>Add Service Detail</Title>
          <View style={styles.innerContent}>
            <RNPickerSelect
              placeholder={{ label: 'Select Repair Type', value: null }}
              value={formData.selectedRepairType}
              onValueChange={(value) => setFormData({ ...formData, selectedRepairType: value })}
              items={[
                { label: 'Phone', value: 'phone' },
                { label: 'Laptop', value: 'laptop' },
                { label: 'Desktop', value: 'desktop' },
                { label: 'Tablet', value: 'tablet' },
              ]}
              style={pickerSelectStyles}
            />
            <MapPicker
              onSelectLocation={(selectedLocation) => setFormData({ ...formData, location: selectedLocation })}
            />
            <Text style={styles.selectedSkill}>{`Selected Skill: ${formData.selectedRepairType.charAt(0).toUpperCase()}${formData.selectedRepairType.slice(1)} Repair`}</Text>
            <Button style={styles.buttonOne} mode="contained" onPress={handleAddSkill} textColor='white'>
              Add
            </Button>
            <Button onPress={onClose}>Cancel</Button>
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    marginBottom: 16,
    borderColor: '#f93a13',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 12,
    fontSize: 16,
  },
  inputAndroid: {
    marginBottom: 16,
    borderColor: '#f93a13',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 12,
    fontSize: 16,
    color: 'black',
  },
});

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  container: {
    flex: 1,
    marginTop: height / 8,
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: '#f93a13',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 32,
  },
  selectedSkill: {
    fontSize: 18,
    marginBottom: 16,
    color: 'gray',
    textAlign: 'center',
  },
  buttonOne: {
    width: '100%',
    marginTop: 32
  },
  innerContent: {
    width: '90%',
    alignItems: 'center'
  },
});

export default AddSkillsModal;




