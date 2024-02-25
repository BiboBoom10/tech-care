// import React from 'react';
// import { View, StyleSheet, ScrollView, Text } from 'react-native';
// import { Title, Card, Paragraph, Subheading } from 'react-native-paper';
// import { useBooking } from '../services/booking-context';

// const RecentBookings = () => {


//   const recentBookings = [
//     {
//       id: '1',
//       deviceType: 'Laptop',
//       brand: 'Dell',
//       model: 'XPS 13',
//       issueDescription: 'Screen not working',
//       additionalInstructions: 'Handle with care',
//       serviceLocation: 'Option 1',
//       deliveryOptions: 'Option A',
//       phoneNumber: '123-456-7890',
//       serviceOrProduct: 'Laptop Repair',
//     },
//     {
//       id: '2',
//       deviceType: 'Phone',
//       brand: 'Samsung',
//       model: 'Galaxy S21',
//       issueDescription: 'Battery draining fast',
//       additionalInstructions: 'Urgent repair needed',
//       serviceLocation: 'Option 2',
//       deliveryOptions: 'Option B',
//       phoneNumber: '987-654-3210',
//       serviceOrProduct: 'Phone Repair',
//     },
//     {
//       id: '3',
//       deviceType: 'Tablet',
//       brand: 'Apple',
//       model: 'iPad Pro',
//       issueDescription: 'Touchscreen not responsive',
//       additionalInstructions: 'Use genuine parts',
//       serviceLocation: 'Option 3',
//       deliveryOptions: 'Option C',
//       phoneNumber: '555-123-4567',
//       serviceOrProduct: 'Tablet Repair',
//     },
//     // Add more dummy bookings as needed
//   ]; // Use the hook to get the recent bookings

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Title style={styles.title}>Recent Bookings</Title>
//       <Subheading style={styles.subHeading}>Details for your recent bookings</Subheading>
//       {recentBookings.map((booking) => (
//         <Card key={booking.id} style={styles.card} elevation={2} mode="outlined">
//           <Card.Content>
//             <Title style={styles.serviceName}>{booking.serviceOrProduct}</Title>
//             <Paragraph>
//               <Text style={styles.miniTitle}>Device Type:</Text> {booking.deviceType}
//             </Paragraph>
//             <Paragraph>
//               <Text style={styles.miniTitle}>Brand:</Text> {booking.brand}
//             </Paragraph>
//             <Paragraph>
//               <Text style={styles.miniTitle}>Model:</Text> {booking.model}
//             </Paragraph>
//             <Paragraph>
//               <Text style={styles.miniTitle}>Issue Description:</Text> {booking.issueDescription}
//             </Paragraph>
//             <Paragraph>
//               <Text style={styles.miniTitle}>Additional Instructions:</Text> {booking.additionalInstructions}
//             </Paragraph>
//             <Paragraph>
//               <Text style={styles.miniTitle}>Service Location:</Text> {booking.serviceLocation}
//             </Paragraph>
//             <Paragraph>
//               <Text style={styles.miniTitle}>Delivery Options:</Text> {booking.deliveryOptions}
//             </Paragraph>
//             <Paragraph>
//               <Text style={styles.miniTitle}>Phone Number:</Text> {booking.phoneNumber}
//             </Paragraph>
//           </Card.Content>
//         </Card>
//       ))}
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
//   },
//   miniTitle: {
//     fontWeight: 'bold',
//   },
// });

// export default RecentBookings;


// CODE 2

import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Title, Card, Paragraph, Subheading } from 'react-native-paper';
import { useBooking } from '../services/booking-context';

const RecentBookings = () => {

  const { recentBookings } = useBooking();

  // const recentBookings = [
  //   {
  //     id: '1',
  //     deviceType: 'Laptop',
  //     brand: 'Dell',
  //     model: 'XPS 13',
  //     issueDescription: 'Screen not working',
  //     additionalInstructions: 'Handle with care',
  //     serviceLocation: 'Option 1',
  //     deliveryOptions: 'Option A',
  //     phoneNumber: '123-456-7890',
  //     serviceOrProduct: 'Laptop Repair',
  //   },
  //   {
  //     id: '2',
  //     deviceType: 'Phone',
  //     brand: 'Samsung',
  //     model: 'Galaxy S21',
  //     issueDescription: 'Battery draining fast',
  //     additionalInstructions: 'Urgent repair needed',
  //     serviceLocation: 'Option 2',
  //     deliveryOptions: 'Option B',
  //     phoneNumber: '987-654-3210',
  //     serviceOrProduct: 'Phone Repair',
  //   },
  //   {
  //     id: '3',
  //     deviceType: 'Tablet',
  //     brand: 'Apple',
  //     model: 'iPad Pro',
  //     issueDescription: 'Touchscreen not responsive',
  //     additionalInstructions: 'Use genuine parts',
  //     serviceLocation: 'Option 3',
  //     deliveryOptions: 'Option C',
  //     phoneNumber: '555-123-4567',
  //     serviceOrProduct: 'Tablet Repair',
  //   },
  //   // Add more dummy bookings as needed
  // ]; // Use the hook to get the recent bookings

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.title}>Recent Bookings</Title>
      <Subheading style={styles.subHeading}>Details for your recent bookings</Subheading>

      {recentBookings.length === 0 ? (
        <Paragraph style={styles.noOrdersText}>No orders placed.</Paragraph>
      ) : (
        recentBookings.map((booking) => (
          <Card key={booking.id} style={styles.card} elevation={2} mode="outlined">
            <Card.Content>
              <Title style={styles.serviceName}>{booking.serviceOrProduct}</Title>
              <Paragraph>
                <Text style={styles.miniTitle}>Device Type:</Text> {booking.deviceType}
              </Paragraph>
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
                <Text style={styles.miniTitle}>Service Location:</Text> {booking.serviceLocation}
              </Paragraph>
              <Paragraph>
                <Text style={styles.miniTitle}>Delivery Options:</Text> {booking.deliveryOptions}
              </Paragraph>
              <Paragraph>
                <Text style={styles.miniTitle}>Phone Number:</Text> {booking.phoneNumber}
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
  },
  miniTitle: {
    fontWeight: 'bold',
  },
  noOrdersText: {
    textAlign: 'center'
  }
});

export default RecentBookings;
