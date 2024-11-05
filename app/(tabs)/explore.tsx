import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useBottomSheet } from "../../components/BottomSheetProvider";
import { LogInSignUpContent } from "../../components/auth/LogInSignUpContent";

const Explore = () => {
  const { openBottomSheet } = useBottomSheet();
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (!isAuthenticated) {
      openBottomSheet(<LogInSignUpContent />, "Log in or sign up", true);
    }
  }, [isAuthenticated]);

  return (
    <View>
      <Text>E</Text>
    </View>
  );
};

export default Explore;
