import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { TextInput, Button, Title, Subheading, Snackbar, Picker } from 'react-native-paper';


function Merchant() {

    const [businessName, setBusinessName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [location, setLocation] = useState('');
    const [street, setStreet] = useState('');
    const [building, setBuilding] = useState('');
    const [shopNumber, setShopNumber] = useState('');
    const [businessType, setBusinessType] = useState('');
    const [businessPermit, setBusinessPermit] = useState('');
    const [businessLogo, setBusinessLogo] = useState('');
    const [pricingCatalogue, setPricingCatalogue] = useState('');
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState('');

    const handleSubmission = () => {
        if (
          businessName.trim() === '' ||
          email.trim() === '' ||
          phoneNumber.trim() === '' ||
          location.trim() === '' ||
          street.trim() === '' ||
          building.trim() === '' ||
          shopNumber.trim() === '' ||
          businessType.trim() === '' ||
          businessPermit.trim() === '' ||
          businessLogo.trim() === '' ||
          pricingCatalogue.trim() === ''
        ) {
          setError('Please fill out all fields.');
          setVisible(true);
        } else {
          // Submit the form or perform your desired action here
          // For example, make an API request to register the merchant
          // Reset the form fields and show a success message
          clearFormFields();
          setError('');
          setVisible(true);
        }
      };

      const clearFormFields = () => {
        setBusinessName('');
        setEmail('');
        setPhoneNumber('');
        setLocation('');
        setStreet('');
        setBuilding('');
        setShopNumber('');
        setBusinessType('');
        setBusinessPermit('');
        setBusinessLogo('');
        setPricingCatalogue('');
      };

      const [selectedOption, setSelectedOption] = useState('Option 1');
      const businessTypes = [
        'Retail',
        'Hospitality',
        'Healthcare',
        'Technology',
        'Other',
      ];
    
      const openMenu = () => setVisible(true);
      const closeMenu = () => setVisible(false);
    
      const handleOptionSelect = (option) => {
        setSelectedOption(option);
        closeMenu();
      };

  return (
    <ScrollView>
        <View style={styles.container}>
        <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require('../assets/Logo.png')} />
        </View> 
        <Title style={styles.register}>Register Merchant</Title>

        <TextInput label="Business Name" value={businessName} onChangeText={text => setBusinessName(text)} style={styles.input} />
        <TextInput label="E-mail" value={email} onChangeText={text => setEmail(text)} style={styles.input} />
        <TextInput label="Phone Number" value={phoneNumber} onChangeText={text => setPhoneNumber(text)} style={styles.input} />

        <Subheading>Business Location</Subheading>
        <TextInput label="Field of Location" value={location} onChangeText={text => setLocation(text)} style={styles.input} />
        <TextInput label="Select Street" value={street} onChangeText={text => setStreet(text)} style={styles.input} />
        <TextInput label="Building & Shop Number" value={building} onChangeText={text => setBuilding(text)} style={styles.input} />
        <TextInput label="Select Business/Service Offered" value={shopNumber} onChangeText={text => setShopNumber(text)} style={styles.input} />

        {/* <Subheading>Business Type</Subheading>
      <TextInput label="Business Type" value={businessType} onChangeText={text => setBusinessType(text)} style={styles.input} />
      <TextInput label="Place to upload Business Permit Documents" value={businessPermit} onChangeText={text => setBusinessPermit(text)} style={styles.input} /> */}
{/* 
        <Picker
          selectedValue={selectedOption}
          onValueChange={(itemValue) => setSelectedOption(itemValue)}
          style={styles.picker}
        >
          {businessTypes.map((type) => (
            <Picker key={type} label={type} value={type} />
          ))}
        </Picker>
        <Text style={styles.selectedOptionText}>Selected Business Type: {selectedOption}</Text> */}

      <Subheading>Images and Branding</Subheading>
      <TextInput label="Field to upload Business Logo" value={businessLogo} onChangeText={text => setBusinessLogo(text)} style={styles.input} />
      <TextInput label="Field to upload Pricing Catalogue" value={pricingCatalogue} onChangeText={text => setPricingCatalogue(text)} style={styles.input} />

      <Button mode="contained" onPress={handleSubmission} style={styles.button} textColor='white'>
        Submit
      </Button>

      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        action={{
          label: 'OK',
          onPress: () => setVisible(false),
        }}
      >
        {error ? error : 'Merchant registered successfully!'}
      </Snackbar>

      </View>
    </ScrollView>
  )
}

export default Merchant;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        marginVertical: 20
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        height: 100,
        width: 100,
    },
    register: {
        textAlign: 'center',
        marginBottom: 16
    },
    input: {
        marginBottom: 10,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5
      },
      button: {
        marginTop: 20,
      },
});