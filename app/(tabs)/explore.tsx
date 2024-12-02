import { View } from "react-native";

import { Link, Stack } from "expo-router";
import ExploreHeader from "../../components/ExploreHeader";
import Listing from "../../components/Listing";
import { useEffect, useMemo, useState } from "react";
import ListingMap from "../../components/ListingMap";
import { useBottomSheet } from "../../components/helper/BottomSheetProvider";
import ListingsBottomSheet from "../../components/ListingsBottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Explore = () => {
  const listingsdata: any[] = [
    { id: 123, name: "Turf" },
    { id: 2, name: "Ground" },
  ];
  const listingsDataGeo: any[] = [];
  const items = useMemo(() => listingsdata as any[], []);
  const itemsDataGeo = useMemo(() => listingsDataGeo as any[], []);
  const [showMap, setShowMap] = useState(false);
  const [category, setCategory] = useState("Turf");

  const onDataChanged = (category: string) => {
    setCategory(category);
  };

  return (
    <GestureHandlerRootView className="flex-1 mt-[80px]">
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />

      <View className="flex-1 z-0">
        <ListingMap listing={itemsDataGeo} />
      </View>

      {/* Bottom Sheet */}

      <ListingsBottomSheet category={category} listingsdata={items} />
    </GestureHandlerRootView>
  );
};

export default Explore;
