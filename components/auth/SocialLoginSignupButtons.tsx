import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";

interface SocialConfig {
  platform: string;
  title: string;
  iconName: keyof typeof Ionicons.glyphMap;
  color: string;
}

const socialLoginConfigs: SocialConfig[] = [
  {
    platform: "Facebook",
    title: "Continue with Facebook",
    iconName: "logo-facebook",
    color: "#4267B2",
  },
  {
    platform: "Google",
    title: "Continue with Google",
    iconName: "logo-google",
    color: "#DB4437",
  },
  {
    platform: "GitHub",
    title: "Continue with GitHub",
    iconName: "logo-github",
    color: "#333",
  },
];

const SocialLoginSignupButtons = () => {
  return (
    <View>
      <View className="space-y-3 gap-5">
        {socialLoginConfigs.map((config, idx) => (
          <TouchableOpacity key={idx} onPress={() => {}}>
            <View className="flex-row items-center justify-between p-4 border border-black rounded-lg">
              <Ionicons name={config.iconName} size={20} color={config.color} />
              <Text className="ml-2 text-black font-pmedium text-lg">
                {config.title}
              </Text>
              <View style={{ width: 24 }} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default SocialLoginSignupButtons;
