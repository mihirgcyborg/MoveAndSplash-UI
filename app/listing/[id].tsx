import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const listing = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>listing</Text>
    </View>
  );
};

export default listing;
