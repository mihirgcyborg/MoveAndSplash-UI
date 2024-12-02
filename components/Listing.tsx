import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import {
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from "@gorhom/bottom-sheet";

interface ListingProps {
  listing: any[];
  category: string;
  refresh: number;
}
const Listing = ({ listing: items, category, refresh }: ListingProps) => {
  const [loading, setLoading] = useState(false);
  const listRef = useRef<BottomSheetFlatListMethods>(null);

  useEffect(() => {
    if (refresh) {
      listRef.current?.scrollToOffset({ offset: 0, animated: true });
    }
  }, [refresh]);
  useEffect(() => {
    console.log("Reload listing");

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  const renderRow: ListRenderItem<any> = ({ item }) => {
    return (
      <Link href={`/listing/${item.id}`} asChild>
        <TouchableOpacity>
          <Animated.View
            className="p-4 gap-2 my-4"
            entering={FadeInRight}
            exiting={FadeOutLeft}
          >
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1591154669695-5f2a8d20c089?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dXJsfGVufDB8fDB8fHww",
              }}
              className="w-[100%] h-80 rounded-lg"
            />
            <TouchableOpacity
              style={{ position: "absolute", right: 30, top: 30 }}
            >
              <Ionicons name="heart-outline" size={24} />
            </TouchableOpacity>
            <View className="flex-row justify-between">
              <Text className="font-psemibold text-sm">name</Text>
              <View className="flex-row gap-1">
                <Ionicons name="star" size={14} />
                <Text className="font-psemibold">4.8</Text>
              </View>
            </View>

            <Text className="font-plight">room_type</Text>

            <View className="flex-row gap-1">
              <Text className="font-psemibold">1000$</Text>
              <Text className="font-plight">hour</Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Link>
    );
  };

  return (
    <View className="">
      <BottomSheetFlatList
        showsVerticalScrollIndicator={false}
        renderItem={renderRow}
        ref={listRef}
        data={loading ? [] : items}
        ListHeaderComponent={
          <Text className="text-center font-psemibold text-md">
            {items.length} places
          </Text>
        }
      />
    </View>
  );
};

export default Listing;
