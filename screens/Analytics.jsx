// AnalyticsScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Paragraph, Card } from 'react-native-paper';
import { BarChart } from 'react-native-chart-kit';
import { ScrollView } from 'react-native-gesture-handler';

const Analytics = () => {
  // Static analytics data (replace with actual data fetching logic)
  const analyticsData = {
    totalOrders: 150,
    successfulOrders: 120,
    failedOrders: 30,
    // revenue: '$25,000',
    popularDevice: 'Laptops',
  };

  // Data for the bar chart
  const barChartData = {
    labels: ['Total', 'Successful', 'Failed'],
    datasets: [
      {
        data: [analyticsData.totalOrders, analyticsData.successfulOrders, analyticsData.failedOrders],
      },
    ],
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Title style={styles.title}>Analytics Overview</Title>

        {/* Bar Chart */}
        <Card style={styles.card} mode='outlined'>
          <Card.Content>
            <BarChart
              data={barChartData}
              width={350}
              height={200}
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
            <Paragraph>{analyticsData.totalOrders}</Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.card} mode='outlined'>
          <Card.Content>
            <Title>Successful Orders</Title>
            <Paragraph>{analyticsData.successfulOrders}</Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.card} mode='outlined'>
          <Card.Content>
            <Title>Failed Orders</Title>
            <Paragraph>{analyticsData.failedOrders}</Paragraph>
          </Card.Content>
        </Card>

        {/* <Card style={styles.card} mode='outlined'>
          <Card.Content>
            <Title>Revenue</Title>
            <Paragraph>{analyticsData.revenue}</Paragraph>
          </Card.Content>
        </Card> */}

        <Card style={styles.card} mode='outlined'>
          <Card.Content>
            <Title>Popular Device</Title>
            <Paragraph>{analyticsData.popularDevice}</Paragraph>
          </Card.Content>
        </Card>
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
    borderColor: 'gray'
  },
});

export default Analytics;