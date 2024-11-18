import { View, Text } from "react-native";
import React from "react";
import SubstitutePage from "../../components/SubstitutePage";

const Wishlists = () => {
  return (
    <View>
      <SubstitutePage
        tabName="Wishlists"
        shortDes="Log in to view your wishlists"
        longDes="You can create, view, or edit wishlists once you've logged in."
      />
    </View>
  );
};

export default Wishlists;
