// import React from 'react';
// import { View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import { Title, Card, List, Divider, IconButton } from 'react-native-paper';
// import { useNavigation } from '@react-navigation/native';
// import { useAuth } from '../services/auth-context';

// const AdminDashboard = () => {

//   const { logout } = useAuth();

//   const navigation = useNavigation();

//   const handleAnalytics = () => {
//     navigation.navigate('Analytics');
//   };

//   const handleManageUsers = () => {
//     navigation.navigate('AdminManageOrders'); // Replace with the actual screen name
//   };

//   const handleUserReports = () => {
//     navigation.navigate('AdminUserReports'); // Replace with the actual screen name
//   };

//   const handleGeneralSettings = () => {
//     navigation.navigate('GeneralSettings'); // Replace with the actual screen name
//   };

//   const handleSecuritySettings = () => {
//     navigation.navigate('SecurityAndPermissions'); // Replace with the actual screen name
//   };

//   const handleLogout = () => {
//     logout();
//     // Implement logout logic
//     console.log('Logging out...');
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {/* Dashboard Overview */}
//       <View style={styles.logoContainer}>
//         <Image style={styles.logo} source={require('../assets/Logo.png')} />
//       </View>

//       <Title style={styles.title}>Tech Care Dashboard</Title>

//       {/* Dashboard Overview */}
//       <Card style={styles.cardTwo} mode='outlined'>
//         <Card.Content>
//           <Title style={styles.titleTwo}>Dashboard Overview</Title>
//           {/* Add your overview components here */}
//         </Card.Content>
//       </Card>

//       <Divider style={styles.divider} />

//       {/* User Management */}
//       <Card style={styles.card} mode='outlined'>
//         <Card.Content>
//           <Title>User Management</Title>
//           <TouchableOpacity onPress={handleManageUsers}>
//             <List.Item
//               title="Manage Users"
//               description="View and manage user accounts"
//               left={() => <List.Icon icon="account-group" />}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={handleUserReports}>
//             <List.Item
//               title="User Reports"
//               description="Generate reports on user activity"
//               left={() => <List.Icon icon="file-chart" />}
//             />
//           </TouchableOpacity>
//         </Card.Content>
//       </Card>

//       <Divider style={styles.divider} />

//       {/* Analytics */}
//       <Card style={styles.card} mode='outlined'>
//         <Card.Content>
//           <TouchableOpacity onPress={handleAnalytics}>
//             <Title>Analytics</Title>
//           </TouchableOpacity>
//           {/* Add your analytics components here */}
//         </Card.Content>
//       </Card>

//       <Divider style={styles.divider} />

//       {/* Settings */}
//       <Card style={styles.card} mode='outlined'>
//         <Card.Content>
//           <Title>Settings</Title>
//           <TouchableOpacity onPress={handleGeneralSettings}>
//             <List.Item
//               title="General Settings"
//               description="Configure application settings"
//               left={() => <List.Icon icon="cog" />}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={handleSecuritySettings}>
//             <List.Item
//               title="Security & Permissions"
//               description="Manage user roles and permissions"
//               left={() => <List.Icon icon="shield-key" />}
//             />
//           </TouchableOpacity>
//         </Card.Content>
//       </Card>

//       {/* Logout Button */}
//       <View style={styles.logoutContainer}>
//         <IconButton icon="logout" size={24} color="#FF0000" onPress={handleLogout} />
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//   },
//   card: {
//     marginBottom: 16,
//     borderColor: 'red',
//   },
//   cardTwo: {
//     backgroundColor: '#f93a13',
//     borderColor: 'white',
//   },
//   divider: {
//     marginVertical: 16,
//   },
//   logoutContainer: {
//     alignItems: 'flex-end',
//     marginTop: 16,
//   },
//   logoContainer: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   logo: {
//     height: 100,
//     width: 100,
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 16,
//     textAlign: 'center',
//   },
//   titleTwo: {
//     textAlign: 'center',
//     color: 'white'
//   },
// });

// export default AdminDashboard;


import React from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Title, Card, List, Divider, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../services/auth-context';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigation = useNavigation();

  const handleAnalytics = () => {
    navigation.navigate('Analytics');
  };
  
  const handleManageOrder = () => {
    navigation.navigate('AdminOverview'); // Replace with the actual screen name
  };

  const handleManageUsers = () => {
    navigation.navigate('AdminManageOrders'); // Replace with the actual screen name
  };

  const handleUserReports = () => {
    navigation.navigate('AdminUserReports'); // Replace with the actual screen name
  };

  const handleAddSkills = () => {
    navigation.navigate('DisplayService'); // Replace with the actual screen name
  };

  const handleLogout = () => {
    logout();
    // Implement logout logic
    console.log('Logging out...');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Dashboard Overview */}
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../assets/Logo.png')} />
      </View>

      <Title style={styles.title}>Tech Care Dashboard</Title>

      {/* Dashboard Overview */}
      <Card style={styles.cardTwo} mode='outlined'>
        <Card.Content>
          <Title style={styles.titleTwo}>Dashboard Overview</Title>
          {/* Add your overview components here */}
        </Card.Content>
      </Card>

      <Divider style={styles.divider} />

      {/* User Management */}
      <Card style={styles.card} mode='outlined'>
        <Card.Content>
          <Title>User Management</Title>
          <TouchableOpacity onPress={handleManageOrder}>
            <List.Item
              title="Review Order"
              description="View order action"
              left={() => <List.Icon icon="account" />}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleManageUsers}>
            <List.Item
              title="All Users Orders"
              description="View all user orders"
              left={() => <List.Icon icon="account-group" />}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleUserReports}>
            <List.Item
              title="User Reports"
              description="Generate reports on user activity"
              left={() => <List.Icon icon="file-chart" />}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAddSkills}>
            <List.Item
              title="My Services"
              description="Manage your services"
              left={() => <List.Icon icon="plus" />}
            />
          </TouchableOpacity>
        </Card.Content>
      </Card>

      <Divider style={styles.divider} />

      {/* Analytics */}
      <Card style={styles.card} mode='outlined'>
        <Card.Content>
          <TouchableOpacity onPress={handleAnalytics}>
            <Title>Analytics</Title>
          </TouchableOpacity>
          {/* Add your analytics components here */}
        </Card.Content>
      </Card>

      <Divider style={styles.divider} />

      {/* Logout Button */}
      <View style={styles.logoutContainer}>
        <IconButton icon="logout" size={24} color="#FF0000" onPress={handleLogout} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    borderColor: 'red',
  },
  cardTwo: {
    backgroundColor: '#f93a13',
    borderColor: 'white',
  },
  divider: {
    marginVertical: 16,
  },
  logoutContainer: {
    alignItems: 'flex-end',
    marginTop: 16,
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
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  titleTwo: {
    textAlign: 'center',
    color: 'white'
  },
});

export default AdminDashboard;
