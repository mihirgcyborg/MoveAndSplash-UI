import { View, Text } from "react-native";
import React from "react";
import SubstitutePage from "../../components/SubstitutePage";

const Trips = () => {
  return (
    <View>
      <SubstitutePage
        tabName="Trips"
        shortDes="No trips yet"
        longDes="When you'r ready to plan your next trip. we're here to help"
      />
    </View>
  );
};

export default Trips;
