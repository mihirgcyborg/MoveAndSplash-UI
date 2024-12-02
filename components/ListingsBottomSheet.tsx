import { View, Text } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";

import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Listing from "./Listing";

const ListingsBottomSheet = ({
  listingsdata,
  category,
}: {
  listingsdata: any[];
  category: string;
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = ["10%", "100%"];
  const [refresh, setRefresh] = useState(0);
  const [currentIndex, setCurrentIndex] = useState<number>(1);

  useEffect(() => {
    if (bottomSheetRef.current && currentIndex !== 1) {
      bottomSheetRef.current.snapToIndex(1);
    }
  }, [category]);
  const showMap = () => {
    if (bottomSheetRef.current && currentIndex !== 0) {
      // Collapse to 10% without triggering animation
      bottomSheetRef.current.collapse();
    }
    setRefresh((prev) => prev + 1);
  };
  const handleSheetChanges = (index: number) => {
    setCurrentIndex(index);
  };
  useEffect(() => {
    console.log("Snap Points:", snapPoints);
  }, [snapPoints]);

  return (
    <BottomSheet
      snapPoints={snapPoints}
      index={currentIndex}
      animateOnMount={false}
      ref={bottomSheetRef}
      enablePanDownToClose={false}
      handleIndicatorStyle={{ backgroundColor: "lightgray" }}
      // style={{ marginTop: 140 }}
    >
      <BottomSheetView className="flex-1 bg-white shadow-md ">
        <Listing listing={listingsdata} category={category} refresh={refresh} />
        <View className="absolute bottom-7 w-full items-center ">
          <TouchableOpacity onPress={showMap}>
            <View className="bg-black-200 p-4 h-[50px] flex-row items-center rounded-full gap-2">
              <Text className="font-psemibold color-white">Map</Text>
              <Ionicons name="map" size={20} color={"#fff"} />
            </View>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default ListingsBottomSheet;
