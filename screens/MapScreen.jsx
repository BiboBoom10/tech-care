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

      const [markers, setMarkers] = useState([]);

    const [origin, setOrigin] = useState({
      latitude: -1.3916345,
      longitude: 36.7717687,
    });

    const addMarker = (details) => {
      setMarkers(prev => ([...prev, details]))
    }

  return (
    <View style={styles.container}>
      <MapView
        style={{ alignSelf: 'stretch', height: '100%' }}
        region={mapRegion}
        maxZoomLevel={30}
        onPress={(e) => { addMarker(e.nativeEvent.coordinate) }}
      >
        {markers.map((marker, index) => {
          return (
            <Marker key={index} draggable coordinate={marker} title={`Marker ${index + 1}`} />
          )
        })}
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