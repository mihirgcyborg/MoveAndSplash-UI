import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  Share,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import Animated, {
  interpolate,
  SlideInDown,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "nativewind";
import CustomButton from "../../components/helper/CustomButton";

const IMG_HEIGHT = 300;
const { width } = Dimensions.get("window");
const listing = () => {
  const { id } = useLocalSearchParams();
  const listing = {
    name: "Spartans Turf",
    listing_url: "www.google.com",
    smart_location: "Wakad",
  };
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const navigation = useNavigation();
  const shareListing = async () => {
    try {
      await Share.share({
        title: listing.name,
        url: listing.listing_url,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackground: () => (
        <Animated.View
          style={[
            {
              backgroundColor: "white",
              borderBottomColor: "lightgray",
              borderWidth: StyleSheet.hairlineWidth,
              height: 100,
            },
            headerAnimatedStyle,
          ]}
        />
      ),
      headerRight: () => (
        <View className="flex-row items-center justify-center gap-2.5">
          <TouchableOpacity
            className="w-[40px] h-[40px] border-hairline border-gray-400 rounded-full bg-white items-center justify-center color-secondary"
            onPress={shareListing}
          >
            <Ionicons name="share-outline" size={22} color={"#000"} />
          </TouchableOpacity>
          <TouchableOpacity className="w-[40px] h-[40px] border-hairline border-gray-400 rounded-full bg-white items-center justify-center color-secondary">
            <Ionicons name="heart-outline" size={22} color={"#000"} />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          className="w-[40px] h-[40px] border-hairline border-gray-400 rounded-full bg-white items-center justify-center color-secondary"
          onPress={router.back}
        >
          <Ionicons name="chevron-back" size={22} color={"#000"} />
        </TouchableOpacity>
      ),
    });
  }, []);
  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.4], [0, 1]),
    };
  });

  return (
    <View className="flex-1 bg-white">
      <Animated.ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingBottom: 100 }}
        scrollEventThrottle={16}
      >
        <Animated.Image
          source={{
            uri: "https://images.unsplash.com/photo-1591154669695-5f2a8d20c089?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dXJsfGVufDB8fDB8fHww",
          }}
          style={[{ height: IMG_HEIGHT, width }, imageAnimatedStyle]}
        />
        <View className="p-6 bg-primary">
          <View>
            <Text className="text-[26px] font-pbold">{listing.name}</Text>
            <Text className="text-[18px] mt-2.5 font-psemibold">
              {listing.smart_location}
            </Text>
            <Text className="text-[16px] font-plight my-1 color-gray-400">
              will give 2 infos
            </Text>
          </View>
          <View className="flex-row gap-1">
            <Ionicons name="star" size={16} />
            <Text className="text-[16px] font-psemibold">
              4.95 . 38 reviews
            </Text>
          </View>

          <View className="flex-1 my-4 border-b-[1px] border-[#DDD]" />

          <View className="flex-row items-center gap-3">
            <Image
              source={{ uri: "" }}
              className="h-[50px] w-[50px] rounded-full bg-gray-500"
            />

            <View>
              <Text className="text-[16px] font-pregular">
                Hosted by host_name
              </Text>
              <Text className="text-sm font-plight">Host since host_since</Text>
            </View>
          </View>

          <View className="flex-1 my-4 border-b-[1px] border-[#DDD]" />
          <Text className="mt-2.5 font-plight text-[16px]">
            description Lorem ipsum dolor, sit amet consectetur adipisicing
            elit. Magnam adipisci nesciunt vitae, repudiandae quo quis iusto
            explicabo voluptatum a delectus dolores? Maxime, earum aliquid
            ratione dicta perspiciatis sed illo rem. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Corporis aperiam iste aliquam
            exercitationem? Quas quasi, facere labore alias cupiditate dolores
            quos modi, quae, sapiente laboriosam tempore facilis pariatur
            eveniet iste? Lorem, ipsum dolor sit amet consectetur adipisicing
            elit. Praesentium, nemo explicabo! Distinctio, accusamus aperiam
            ducimus corrupti repellendus error beatae dolorum harum inventore
            atque esse, similique itaque autem! Ipsa, necessitatibus deleniti?
            Deserunt veniam assumenda excepturi nobis similique quisquam maxime,
            quis eveniet, aliquam ipsa illo. Ullam voluptas voluptatum alias,
            provident quibusdam placeat nobis quisquam nihil, doloribus error
            voluptatem sunt assumenda, omnis illum.
          </Text>
        </View>
      </Animated.ScrollView>

      <Animated.View
        className="h-[12.5vh] mx-5 border-t-hairline border-[#DDD] bg-primary"
        entering={SlideInDown.delay(200)}
      >
        <View className="flex-row justify-between items-center mb-4">
          <TouchableOpacity>
            <View className="h-[100%] justify-center flex-row items-center gap-1">
              <Text className="text-[18px] font-psemibold">1000Rs</Text>
              <Text>hour</Text>
            </View>
          </TouchableOpacity>
          <CustomButton
            title="Book"
            handlePress={() => {}}
            containerStyles="bg-secondary w-[30vw]"
          />
        </View>
      </Animated.View>
    </View>
  );
};

export default listing;
