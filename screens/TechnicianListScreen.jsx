import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { Card, Title, Paragraph, IconButton } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import axios from 'axios';

const TechnicianListScreen = ({ navigation }) => {
  const [technicians, setTechnicians] = useState([]);
  const [selectedTechnician, setSelectedTechnician] = useState(null);

  useEffect(() => {
    fetchTechniciansHandler();
  }, []);

  const fetchTechniciansHandler = async () => {
    try {
      const response = await axios.get('https://tech-care-server.vercel.app/technicians');
      setTechnicians(response.data.technicians);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectTechnician = (technician) => {
    setSelectedTechnician(technician);
  };

  const handleRateTechnician = () => {
    // Implement rating functionality or navigation to rating screen
    console.log('Rating technician:', selectedTechnician);
  };

  const renderItem = ({ item }) => (
    <Card
      style={[styles.item, selectedTechnician?._id === item._id && styles.selectedItem]}
      onPress={() => handleSelectTechnician(item)}
      mode='outlined'
    >
      <View style={styles.cardContent}>
        <View style={styles.profileSection}>
          {/* <Image source={{ uri: item.profilePic }} style={styles.profilePic} /> */}
          <View style={styles.details}>
            <Title>{item.name}</Title>
            <Paragraph>Service Offered: {item.service}</Paragraph>
            {item?.services?.map((service, index) => <Paragraph key={index} style={{color: 'black', marginLeft: 20, fontWeight: 'bold'}}>{service}</Paragraph>)}
            {/* <Paragraph>Location: {item.address}</Paragraph> */}
            <Paragraph>Location: <Text style={{color: 'black', fontWeight: 'bold'}}>{item.address}</Text></Paragraph> 
          </View>
        </View>
        <View style={styles.ratingSection}>
          {/* <Text style={{marginLeft: 0, marginRight: 162}}>Ratings: </Text> */}
          {/* <Rating
            type='star'
            ratingCount={5}
            startingValue={item.rating}
            imageSize={20}
            readonly
          /> */}
          {/* <IconButton
            icon="star"
            size={20}
            color="#f93a13"
            onPress={handleRateTechnician}
          /> */}
        </View>
      </View>
    </Card>
  );

  const handleProceedToOrderPlacement = () => {
    if (selectedTechnician) {
      const { _id, name, location } = selectedTechnician;
      navigation.navigate('OrderPlacement', {
        technicianId: _id,
        technicianName: name,
        technicianLocation: location,
      });
    } else {
      console.warn('Error: Selected technician details not found.');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={technicians}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        style={styles.list}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleProceedToOrderPlacement}
        disabled={!selectedTechnician}
      >
        <Title style={styles.buttonText}>Proceed to Order Placement</Title>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  list: {
    flex: 1,
  },
  item: {
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  selectedItem: {
    backgroundColor: '#f93a13',
  },
  cardContent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    // backgroundColor: 'white'
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#f93a13',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default TechnicianListScreen;


// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { View, FlatList, StyleSheet } from 'react-native';
// import { Button, Card, Title, Paragraph } from 'react-native-paper';

// // const techniciansData = [
// //   { id: '1', name: 'John Doe', service: 'Phone Repair', location: '123 Main St, City' },
// //   { id: '2', name: 'Jane Smith', service: 'Laptop Repair', location: '456 Oak St, Town' },
// //   { id: '3', name: 'Bob Johnson', service: 'Desktop Repair', location: '789 Pine St, Village' },
// //   { id: '4', name: 'Alice Brown', service: 'Tablet Repair', location: '101 Elm St, Hamlet' },
// //   { id: '5', name: 'Charlie Davis', service: 'Smartwatch Repair', location: '202 Cedar St, Countryside' },
// //   // Add more technicians as needed
// // ];

// const TechnicianListScreen = ({ navigation }) => {
//   const [technicians, setTechnicians] = useState([]);
//   const [selectedTechnician, setSelectedTechnician] = useState();

//   const handleSelectTechnician = (technician) => {
//     setSelectedTechnician(technician);
//   };

//   const fetchTechniciansHandler = async () => {
//     try {
//       const response = await axios.get('https://tech-care-server.vercel.app/technicians');
//       // Add unique IDs to technicians
//       setTechnicians(response.data.technicians);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchTechniciansHandler()
//   }, [])

//   const handleProceedToOrderPlacement = () => {
//     if (selectedTechnician) {
//       // Find the selected technician details from the selectedTechnician array
//       const selectedTechnicianDetails = selectedTechnician; // Since selectedTechnician is an array, access the first element
  
//       const { _id, name, location } = selectedTechnicianDetails;
//       navigation.navigate('OrderPlacement', { technicianId: _id, technicianName: name, technicianLocation: location });
//     } else {
//       console.warn('Error: Selected technician details not found.');
//     }
//   };
  
//   const renderItem = ({ item }) => (
//     <Card
//       style={[styles.item, selectedTechnician?._id === item._id && styles.selectedItem]}
//       onPress={() => handleSelectTechnician(item)}
//       mode='outlined'
//     >
//       <Card.Content>
//         <Title style={[styles.title, selectedTechnician?.id === item.id && styles.selectedTitle]}>
//           {item.name}
//         </Title>
//         <Paragraph style={[styles.paragraph, selectedTechnician?.id === item.id && styles.selectedParagraph]}>
//           Service Offered: {item.service}
//         </Paragraph>
//         <Paragraph style={styles.location}>Location: {item.location}</Paragraph>
//       </Card.Content>
//     </Card>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={technicians}
//         renderItem={renderItem}
//         keyExtractor={(item) => item._id}
//         style={styles.list}
//       />
//       <Button
//         style={styles.button}
//         mode="contained"
//         onPress={handleProceedToOrderPlacement}
//         disabled={!selectedTechnician}
//         textColor='white'
//       >
//         Proceed to Order Placement
//       </Button>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   list: {
//     flex: 1,
//   },
//   item: {
//     marginVertical: 8,
//     borderColor: 'gray',
//   },
//   selectedItem: {
//     backgroundColor: '#f93a13',
//   },
//   title: {
//     color: 'black', // Default text color
//   },
//   selectedTitle: {
//     color: 'black', // White text color for selected item
//   },
//   paragraph: {
//     color: 'black', // Default text color
//   },
//   selectedParagraph: {
//     color: 'black', // White text color for selected item
//   },
//   location: {
//     color: 'gray', // Text color for location
//   },
//   button: {
//     marginTop: 16,
//     backgroundColor: '#f93a13',
//   },
// });

// export default TechnicianListScreen;