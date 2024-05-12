// AnalyticsScreen.js
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Paragraph, Card, ActivityIndicator } from 'react-native-paper';
import { BarChart } from 'react-native-chart-kit';
import { ScrollView } from 'react-native-gesture-handler';
import axiosInstance from '../utils/axios';

const data = {
  totalOrders: 0,
  successfulOrders: 0,
  failedOrders: 0,
  // revenue: '$25,000',
  popularDevice: 'Laptops',
};


const Analytics = () => {

  const [analyticsData, setAnalyticsData] = useState(data);
  const [isLoading, setIsLoading] = useState(true);

  const getStats = async () => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.get('/statistics');
      const statsData = {
        totalOrders: data.orders.length,
        successfulOrders: data.successfullOrders.length,
        failedOrders: data.failedOrders.length,
      };
      console.log(statsData);
      setAnalyticsData(statsData)
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  // Data for the bar chart
  const barChartData = {
    labels: ['Total', 'Successful', 'Failed'],
    datasets: [
      {
        data: [analyticsData.totalOrders, analyticsData.successfulOrders, analyticsData.failedOrders],
      },
    ],
  };

  useEffect(() => {
    getStats();
  }, []);

  if (isLoading) return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator />
    </View>
  )

  return (
    <ScrollView>
      <View style={styles.container}>
        <Title style={styles.title}>Analytics Overview</Title>

        {/* Bar Chart */}
        <Card style={styles.card}>
          <Card.Content>
            <BarChart
              data={barChartData}
              width={340}
              height={250}
              chartConfig={{
                backgroundGradientFrom: '#f93a13',
                backgroundGradientTo: '#f93a13',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
              }}
              style={{ alignSelf: 'center' }}
            />
          </Card.Content>
        </Card>

        {/* Other Metrics */}
        <Card style={styles.card} mode='outlined'>
          <Card.Content>
            <Title>Total Orders</Title>
            <Paragraph style={{color: '#f93a13'}}>{analyticsData.totalOrders}</Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.card} mode='outlined'>
          <Card.Content>
            <Title>Successful Orders</Title>
            <Paragraph style={{color: '#f93a13'}}>{analyticsData.successfulOrders}</Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.card} mode='outlined'>
          <Card.Content>
            <Title>Failed Orders</Title>
            <Paragraph style={{color: '#f93a13'}}>{analyticsData.failedOrders}</Paragraph>
          </Card.Content>
        </Card>

        {/* <Card style={styles.card} mode='outlined'>
          <Card.Content>
            <Title>Revenue</Title>
            <Paragraph>{analyticsData.revenue}</Paragraph>
          </Card.Content>
        </Card> */}

        {/* <Card style={styles.card} mode='outlined'>
          <Card.Content>
            <Title>Popular Device</Title>
            <Paragraph>{analyticsData.popularDevice}</Paragraph>
          </Card.Content>
        </Card> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center'
  },
  card: {
    marginVertical: 8,
    borderColor: 'gray',
    backgroundColor: 'white'
  },
});

export default Analytics;