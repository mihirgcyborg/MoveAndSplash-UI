import { Text, View } from "react-native";
import LoginForm from "./LoginForm";
import SocialLoginSignupButtons from "./SocialLoginSignupButtons";

export const LogInSignUpContent = () => {
  return (
    <View className="mt-7">
      <LoginForm />

      {/* Separtor with "or" text */}
      <View className="flex-row items-center my-10 ">
        <View className="flex-1 border-b-[1px] border-[#DDD]" />
        <Text className="px-4 font-pmedium  text-[#DDD]">or</Text>
        <View className="flex-1 border-b-[1px] border-[#DDD]" />
      </View>

      <SocialLoginSignupButtons />
    </View>
  );
};
