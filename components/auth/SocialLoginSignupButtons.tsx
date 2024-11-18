import { View, Text, Alert, Modal, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as SecureStore from "expo-secure-store";
import { WebView, WebViewNavigation } from "react-native-webview";
import { setUserToken } from "../../utils/helper";

interface SocialConfig {
  provider: string;
  title: string;
  iconName: keyof typeof Ionicons.glyphMap;
  color: string;
}
interface SocialButtonProps {
  title: string;
  iconName: keyof typeof Ionicons.glyphMap;
  color: string;
  onPress: () => void;
}
const SocialButton: React.FC<SocialButtonProps> = ({
  title,
  iconName,
  color,
  onPress,
}) => (
  <TouchableOpacity onPress={onPress}>
    <View className="flex-row items-center justify-between p-4 border border-black rounded-lg">
      <Ionicons name={iconName} size={20} color={color} />
      <Text className="ml-2 text-black font-pmedium text-lg">{title}</Text>
      <View style={{ width: 24 }} />
    </View>
  </TouchableOpacity>
);

const socialLoginConfigs: SocialConfig[] = [
  {
    provider: "facebook",
    title: "Continue with Facebook",
    iconName: "logo-facebook",
    color: "#4267B2",
  },
  {
    provider: "google",
    title: "Continue with Google",
    iconName: "logo-google",
    color: "#DB4437",
  },
  {
    provider: "github",
    title: "Continue with GitHub",
    iconName: "logo-github",
    color: "#333",
  },
];

const SocialLoginSignupButtons = () => {
  const [showWebView, setShowWebView] = useState(false);
  const [authUrl, setAuthUrl] = useState("");

  const handleOAuthLogin = async (provider: string) => {
    const baseUrl = "http://192.168.0.103:3902/api/auth";

    setAuthUrl(`${baseUrl}/${provider}`);
    setShowWebView(true);
  };

  const handleWebViewNavigationStateChange = (
    newNavState: WebViewNavigation
  ) => {
    const { url } = newNavState;
    // Backup logic in case the token isn't intercepted earlier
    if (url.includes("?token=")) {
      const token = url.split("?token=")[1];
      setShowWebView(false); // Close WebView
      setUserToken(token); // Save token securely
    }
  };
  const onShouldStartLoadWithRequest = (request: any) => {
    const { url } = request;
    console.log("url inside onShouldStartLoadWithRequest", url);
    if (url.includes("?token=")) {
      const token = url.split("?token=")[1];
      console.log("Extracted Token:", token);

      // Save the token securely
      setUserToken(token);
      Alert.alert("Login Successful", "You are logged in!");
      // Close the WebView modal
      setShowWebView(false);

      return false; // Prevent WebView from navigating
    }
    return true; // Allow normal navigation
  };

  return (
    <View style={{ flex: 1 }}>
      <View className="space-y-3 gap-5">
        {socialLoginConfigs.map((config) => (
          <SocialButton
            key={config.provider}
            title={config.title}
            iconName={config.iconName}
            color={config.color}
            onPress={() => handleOAuthLogin(config.provider)}
          />
        ))}
      </View>
      <Modal
        visible={showWebView}
        presentationStyle="pageSheet"
        animationType="slide"
        onRequestClose={() => setShowWebView(false)}
      >
        <WebView
          source={{ uri: authUrl }}
          onNavigationStateChange={handleWebViewNavigationStateChange}
          startInLoadingState
          cacheEnabled={false}
          onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn("WebView error:", nativeEvent);
          }}
          onHttpError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn("WebView HTTP error:", nativeEvent);
          }}
          style={{ flex: 1 }}
        />
      </Modal>
    </View>
  );
};

export default SocialLoginSignupButtons;
