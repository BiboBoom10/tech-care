import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Title, Card, Paragraph, Subheading, Button } from 'react-native-paper';
import axios from 'axios';
import axiosInstance from '../utils/axios';

const RecentBookings = () => {
  const [eachOrder, setEachOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('day'); // Default sort by day

  const myBookings = async () => {
    try {
      const response = await axiosInstance.get('/auth/orders');
      const orders = response.data;
      if (sortBy === 'day') {
        orders.sort((a, b) => b.createdAt - a.createdAt); // Sort by descending order of creation date
      } else if (sortBy === 'service') {
        orders.sort((a, b) => a.serviceOrProduct.localeCompare(b.serviceOrProduct)); // Sort by service name
      }

      setEachOrder(orders);
      setIsLoading(false); // Set loading state to false after data fetch
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }

  useEffect(() => {
    myBookings();
  }, [sortBy]);

  const handleSortByDay = () => {
    setSortBy('day');
  };

  const handleSortByService = () => {
    setSortBy('service');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.title}>Recent Bookings</Title>
      <View style={styles.buttonContainer}>
        <Button onPress={handleSortByDay} mode="outlined" style={styles.button}>
          Sort By Day
        </Button>
        <Button onPress={handleSortByService} mode="outlined" style={styles.button}>
          Sort By Service
        </Button>
      </View>
      <Subheading style={styles.subHeading}>Details for your recent bookings</Subheading>

      {isLoading ? (
        <Paragraph style={styles.loadingText}>Loading...</Paragraph>
      ) : eachOrder.length === 0 ? (
        <Paragraph style={styles.noOrdersText}>No orders placed.</Paragraph>
      ) : (
        eachOrder.map((booking) => (
          <Card key={booking.id} style={styles.card} elevation={2} mode="outlined">
            <Card.Content>
              <Title style={styles.serviceName}>{booking.serviceOrProduct}</Title>
              <Paragraph>
                <Text style={styles.miniTitle}>Brand:</Text> {booking.brand}
              </Paragraph>
              <Paragraph>
                <Text style={styles.miniTitle}>Model:</Text> {booking.model}
              </Paragraph>
              <Paragraph>
                <Text style={styles.miniTitle}>Issue Description:</Text> {booking.issueDescription}
              </Paragraph>
              <Paragraph>
                <Text style={styles.miniTitle}>Additional Instructions:</Text>{' '}
                {booking.additionalInstructions}
              </Paragraph>
              <Paragraph>
                <Text style={styles.miniTitle}>Day and Time:</Text>{' '}
                {booking.createdAt.toLocaleString('en-US', { weekday: 'long', hour: 'numeric', minute: 'numeric' })}
              </Paragraph>
              <Paragraph>
                <Text style={styles.miniTitle}>Status:</Text>{' '}
                {booking.status}
              </Paragraph>
            </Card.Content>
          </Card>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    marginBottom: 16,
    backgroundColor: '#fafafa',
    borderColor: 'gray',
  },
  subHeading: {
    textAlign: 'center',
    marginBottom: 24,
    fontSize: 16,
  },
  serviceName: {
    color: '#f93a13',
    textTransform: 'capitalize'
  },
  miniTitle: {
    fontWeight: 'bold',
  },
  noOrdersText: {
    textAlign: 'center',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  button: {
    marginHorizontal: 8,
  },
});

export default RecentBookings;


// // RecentBookings.js
// import React, { useEffect, useState } from 'react';
// import { View, StyleSheet, ScrollView, Text } from 'react-native';
// import { Title, Card, Paragraph, Subheading } from 'react-native-paper';
// // import { useBooking } from '../services/booking-context';
// import axios from 'axios';

// const RecentBookings = () => {
//   // const { recentBookings } = useBooking();

//   const [eachOrder, setEachOrder] = useState([]);
 
//   const myBookings = async() => {
//     const response = await axios.get('https://tech-care-server.vercel.app/auth/orders')
//     setEachOrder(response.data)
//   }

//   useEffect(() => {
//     myBookings();
//   }, [])

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Title style={styles.title}>Recent Bookings</Title>
//       <Subheading style={styles.subHeading}>Details for your recent bookings</Subheading>

//       {eachOrder.length === 0 ? (
//         <Paragraph style={styles.noOrdersText}>No orders placed.</Paragraph>
//       ) : (
//         eachOrder.map((booking) => (
//           <Card key={booking.id} style={styles.card} elevation={2} mode="outlined">
//             <Card.Content>
//               <Title style={styles.serviceName}>{booking.serviceOrProduct}</Title>
//               <Paragraph>
//                 <Text style={styles.miniTitle}>Brand:</Text> {booking.brand}
//               </Paragraph>
//               <Paragraph>
//                 <Text style={styles.miniTitle}>Model:</Text> {booking.model}
//               </Paragraph>
//               <Paragraph>
//                 <Text style={styles.miniTitle}>Issue Description:</Text> {booking.issueDescription}
//               </Paragraph>
//               <Paragraph>
//                 <Text style={styles.miniTitle}>Additional Instructions:</Text>{' '}
//                 {booking.additionalInstructions}
//               </Paragraph>
//               {/* Display Technician Details */}
//               {/* <Paragraph>
//                 <Text style={styles.miniTitle}>Technician Name:</Text> {booking.selectedTechnician.name}
//               </Paragraph>
//               <Paragraph>
//                 <Text style={styles.miniTitle}>Technician Location:</Text> {booking.selectedTechnician.location}
//               </Paragraph> */}
//               {/* End of Technician Details */}
//             </Card.Content>
//           </Card>
//         ))
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 16,
//     textAlign: 'center',
//   },
//   card: {
//     marginBottom: 16,
//     backgroundColor: '#fafafa',
//     borderColor: 'gray',
//   },
//   subHeading: {
//     textAlign: 'center',
//     marginBottom: 24,
//     fontSize: 16,
//   },
//   serviceName: {
//     color: '#f93a13',
//     textTransform: 'capitalize'
//   },
//   miniTitle: {
//     fontWeight: 'bold',
//   },
//   noOrdersText: {
//     textAlign: 'center',
//   },
// });

// export default RecentBookings;
