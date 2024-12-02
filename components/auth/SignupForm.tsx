import {
  View,
  Text,
  Linking,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { SignupFormConfig } from "../../config/formConfig";
import { useForm } from "../../hooks/useForm";
import InputFields from "../helper/InputFields";
import { ScrollView } from "react-native-gesture-handler";
import CustomButton from "../helper/CustomButton";

const SignupForm = () => {
  const configForm = SignupFormConfig;
  const { formData, handleInputChange, togglePasswordVisibility, errors } =
    useForm(SignupFormConfig);

  const handleSubmit = () => {};

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 30 : 0}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        keyboardShouldPersistTaps="handled"
        onScrollBeginDrag={() => Keyboard.dismiss()}
      >
        <View className="mx-2 mt-10">
          <InputFields
            config={configForm}
            formData={formData}
            handleInputChange={handleInputChange}
            togglePasswordVisibility={togglePasswordVisibility}
            errors={errors}
          />
          <Text className="text-sm text-gray-700 leading-5 mb-7">
            By selecting Agree and continue, I agree to Splash&Move{" "}
            <Text
              className="text-blue-500 underline"
              onPress={() => Linking.openURL("https://example.com/terms")}
            >
              Terms of Service
            </Text>
            ,{" "}
            <Text
              className="text-blue-500 underline"
              onPress={() =>
                Linking.openURL("https://example.com/payment-terms")
              }
            >
              Payments Terms of Service
            </Text>
            , and{" "}
            <Text
              className="text-blue-500 underline"
              onPress={() =>
                Linking.openURL("https://example.com/nondiscrimination-policy")
              }
            >
              Nondiscrimination Policy
            </Text>{" "}
            and acknowledge the{" "}
            <Text
              className="text-blue-500 underline"
              onPress={() =>
                Linking.openURL("https://example.com/privacy-policy")
              }
            >
              Privacy Policy
            </Text>
            .
          </Text>
          <CustomButton
            title="Agree and continue"
            containerStyles="bg-black-100"
            handlePress={() => {}}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupForm;
