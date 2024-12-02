import { View, Text, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { memo, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import MapView from "react-native-map-clustering";

interface Props {
  listing: any[];
}

const INITIAL_REGION = {
  latitude: 37.785834,
  longitude: -122.406417,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const ListingMap = memo(({ listings }: Props) => {
  const router = useRouter();
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.785834,
    longitude: -122.406417,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const userLocation = async () => {
    try {
      // Request permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      // Fetch user's current location
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High, // Use the predefined accuracy enum
      });

      // Update map region with user location
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (error) {
      console.error("Error fetching user location:", error);
    }
  };
  const onMarkerSelected = () => {
    router.push(`/listing/${1}`);
  };

  useEffect(() => {
    userLocation();
  }, []);

  const renderCluster = (cluster: any) => {
    const { id, geometry, onPress, propertites } = cluster;
    const points = propertites.point_count;

    return (
      <Marker
        onPress={onPress}
        key={`cluster-${id}`}
        coordinate={{
          longitude: geometry.coordinate[0],
          latitude: geometry.coordinate[1],
        }}
      >
        <View className="bg-white p-1.5 elevation-sm s items-center justify-center shadow-black rounded-3xl">
          <Text className="color-black text-center font-psemibold">
            {points}
          </Text>
        </View>
      </Marker>
    );
  };
  return (
    <View className="flex-1">
      <MapView
        animationEnabled={false}
        style={StyleSheet.absoluteFill}
        showsUserLocation
        showsMyLocationButton
        initialRegion={INITIAL_REGION}
        region={mapRegion}
        clusterColor="#fff"
        clusterTextColor="#000"
        renderCluster={renderCluster}
        // provider={PROVIDER_GOOGLE}
      >
        <Marker
          coordinate={mapRegion}
          onPress={() => onMarkerSelected()}
          title="You are here"
        >
          <View className="bg-white p-1.5 elevation-sm s items-center justify-center shadow-black rounded-3xl">
            <Text className="text-sm font-psemibold">$ 1000</Text>
          </View>
        </Marker>
      </MapView>
    </View>
  );
});

export default ListingMap;
