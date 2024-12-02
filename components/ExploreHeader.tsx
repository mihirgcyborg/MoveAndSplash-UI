import { View, Text } from "react-native";
import React, { useRef, useState } from "react";
import { Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";

const categories = [
  { name: "Turf", icon: "football" },
  { name: "Swimming Pool", icon: "water" },
  { name: "Gaming Hub", icon: "game-controller" },
  { name: "Ground", icon: "earth" },
  { name: "Turf", icon: "football" },
  { name: "Swimming Pool", icon: "water" },
  { name: "Gaming Hub", icon: "game-controller" },
  { name: "Ground", icon: "earth" },
  { name: "Turf", icon: "football" },
  { name: "Swimming Pool", icon: "water" },
  { name: "Gaming Hub", icon: "game-controller" },
  { name: "Ground", icon: "earth" },
];
interface ExploreHeaderProps {
  onCategoryChanged: (category: string) => void;
}

const ExploreHeader = ({ onCategoryChanged }: ExploreHeaderProps) => {
  const scrollRef = useRef<ScrollView>(null);
  const itemsRef = useRef<Array<View | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const selectCategory = (index: number) => {
    const selected = itemsRef.current[index];
    setActiveIndex(index);
    selected?.measure((x, y, width, height, pageX) => {
      scrollRef.current?.scrollTo({ x: pageX - 16, y: 0, animated: true });
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onCategoryChanged(categories[index].name);
  };
  return (
    <View className="flex-1 bg-primary">
      <View className="bg-neutral-100 h-[14.5vh] px-2 gap-5 shadow-sm">
        <View className="flex-row items-center justify-between px-4">
          <Link href={"/(modals)/booking"} asChild>
            <TouchableOpacity>
              <View className="flex-row w-[75vw] mt-1.5  items-center p-3 gap-3 shadow-sm bg-white rounded-full">
                <Ionicons name="search" size={24} />
                <View>
                  <Text className="font-psemibold text-black text-base">
                    Where to?
                  </Text>
                  <Text className="font-pregular text-gray-500">
                    Anywhere . Any week
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </Link>

          <TouchableOpacity>
            <View className="p-3 rounded-full border border-neutral-500 ring-1 shadow-sm">
              <Ionicons name="options-outline" size={20} />
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
            gap: 30,
            paddingHorizontal: 16,
          }}
        >
          {categories.map((item, idx) => (
            <TouchableOpacity key={idx} onPress={() => selectCategory(idx)}>
              <View
                ref={(el) => (itemsRef.current[idx] = el)}
                className={`items-center justify-center pb-2 ${
                  activeIndex === idx ? "border-b-2 border-b-black" : ""
                }`}
              >
                <Ionicons
                  name={item.icon as any}
                  size={24}
                  color={activeIndex === idx ? "#000" : "gray"}
                />
                <Text
                  className={`font-pmedium text-sm ${
                    activeIndex === idx ? "color-black" : "color-gray-400"
                  }`}
                >
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default ExploreHeader;
