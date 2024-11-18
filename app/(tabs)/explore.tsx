import { View } from "react-native";

import { Link, Stack } from "expo-router";
import ExploreHeader from "../../components/ExploreHeader";
import Listing from "../../components/Listing";

const Explore = () => {
  return (
    <View className="flex-1">
      <Stack.Screen
        options={{
          header: () => <ExploreHeader />,
        }}
      />
      <Listing />
    </View>
  );
};

export default Explore;
