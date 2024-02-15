import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = () => {

    const [mapRegion, setmapRegion] = useState({
        latitude: -1.3916345,
        longitude: 36.7717687,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

  return (
    <View style={styles.container}>
      <MapView
        style={{ alignSelf: 'stretch', height: '100%' }}
        region={mapRegion}
        maxZoomLevel={30}
        onMarkerDrag={(event) => {}}
      >
        <Marker coordinate={mapRegion} title='Marker' />
      </MapView>
    </View>
  )
}

export default MapScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})