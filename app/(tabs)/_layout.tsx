import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const TabsLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <SafeAreaView className="flex-1 bg-primary">
      <Tabs
        initialRouteName="explore"
        screenOptions={{
          tabBarActiveTintColor: "#E51D57",
          tabBarInactiveTintColor: "#B0B0B0",
          tabBarStyle: {
            height: 62,
            paddingBottom: 15,
            paddingTop: 5,
            borderTopColor: "#B0B0B0",
            backgroundColor: "#FFFFFF",
            borderTopWidth: 1,
          },
        }}
      >
        <Tabs.Screen
          name="explore"
          options={{
            title: "Explore",
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "search" : "search-outline"}
                size={size || 24}
                color={color || "black"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="wishlists"
          options={{
            title: "Wishlists",
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "heart" : "heart-outline"}
                size={size || 24}
                color={color || "black"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="trips"
          options={{
            title: "Trips",
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "football" : "football-outline"}
                size={size || 24}
                color={color || "black"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="messages"
          options={{
            title: "Messages",
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "chatbox" : "chatbox-outline"}
                size={size || 24}
                color={color || "black"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "LogIn",
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "accessibility" : "accessibility-outline"}
                size={size || 24}
                color={color || "black"}
              />
            ),
          }}
        />
      </Tabs>
      {/* <LogInSignUpBottomSheet
          isOpen={isOpen}
          headerTitle="Log in or sign up"
          enablePanDown={true}
        /> */}

      <StatusBar backgroundColor="#161622" style="auto" />
    </SafeAreaView>
  );
};

export default TabsLayout;
