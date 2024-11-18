import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuth } from "../../hooks/useAuth";
import { useBottomSheet } from "../../components/helper/BottomSheetProvider";
import { LogInSignUpContent } from "../../components/auth/LogInSignUpContent";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";

const TabsLayout = () => {
  const { openBottomSheet } = useBottomSheet();
  const { isAuthenticated, loading } = useAuth();
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      // Wait for loading to complete
      console.log("User is not authenticated:", isAuthenticated);
      openBottomSheet(<LogInSignUpContent />, "Log in or sign up", true);
    }
  }, [isAuthenticated, loading]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />; // Show a loader while checking
  }
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
            headerShown: true,
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

      <StatusBar backgroundColor="#161622" style="auto" />
    </SafeAreaView>
  );
};

export default TabsLayout;
