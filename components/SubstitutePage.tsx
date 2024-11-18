import { View, Text } from "react-native";
import React from "react";
import CustomButton from "./helper/CustomButton";
import { useBottomSheet } from "./helper/BottomSheetProvider";
import { LogInSignUpContent } from "./auth/LogInSignUpContent";

const SubstitutePage = ({
  tabName,
  shortDes,
  longDes,
}: {
  tabName: string;
  shortDes: string;
  longDes: string;
}) => {
  const { openBottomSheet } = useBottomSheet();

  return (
    <View className="bg-primary h-[100%] px-6">
      <View className="p-5">
        <Text className="font-psemibold text-3xl mt-10  mb-10">{tabName}</Text>
        <Text className="font-pmedium text-2xl mb-1">{shortDes}</Text>
        <Text className="font-pregular text-lg mb-10">{longDes}</Text>
        <CustomButton
          title="Log in"
          containerStyles="bg-secondary w-[30%] "
          handlePress={() => {
            openBottomSheet(<LogInSignUpContent />, "Login or signup", true);
          }}
        />
      </View>
    </View>
  );
};

export default SubstitutePage;
