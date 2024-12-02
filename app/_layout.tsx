import React, { useEffect } from "react";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import Ionicons from "@expo/vector-icons/Ionicons";
import "../global.css";
import { BottomSheetProvider } from "../components/helper/BottomSheetProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  const router = useRouter();
  // useEffect(() => {
  //   const handleDeepLink = (event: { url: string }) => {
  //     const url = event.url;
  //     if (url) {
  //       console.log("Deep link URL:", url);
  //       const token = new URL(url).searchParams.get("token");
  //       if (token) {
  //         // Save the token securely
  //         setUserToken(token);
  //         Alert.alert("Login Successful", "You are logged in!");
  //       }
  //     }
  //   };

  //   Linking.addEventListener("url", handleDeepLink);
  //   const checkInitialURL = async () => {
  //     const initialURL = await Linking.getInitialURL();
  //     if (initialURL) {
  //       handleDeepLink({ url: initialURL });
  //     }
  //   };

  //   checkInitialURL();

  //   // Cleanup the event listener on unmount
  //   return () => {
  //     Linking.removeAllListeners("url");
  //   };
  // }, []);

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;
  return (
    <GestureHandlerRootView className="flex-1">
      <BottomSheetProvider>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false, headerTransparent: true }}
          />
          <Stack.Screen
            name="listing/[id]"
            options={{ headerTitle: "", headerTransparent: true }}
          />
          <Stack.Screen
            name="(modals)/booking"
            options={{
              animation: "fade",
              presentation: "transparentModal",
              headerLeft: () => (
                <TouchableOpacity onPress={() => router.back()}>
                  <Ionicons name="close-outline" size={28} />
                </TouchableOpacity>
              ),
            }}
          />
        </Stack>
      </BottomSheetProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
