import { View, Text, LayoutAnimation } from "react-native";
import React, { useState } from "react";
import {
  LoginFormConfig,
  SignupFormInitialConfig,
} from "../../config/formConfig";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import CustomButton from "../helper/CustomButton";
import { useBottomSheet } from "../helper/BottomSheetProvider";
import SignupForm from "./SignupForm";
import { useForm } from "../../hooks/useForm";
import InputFields from "../helper/InputFields";
const LoginForm = () => {
  const { openBottomSheet } = useBottomSheet();
  const [enableSignUp, setEnableSignUp] = useState(false);
  const configForm = enableSignUp ? SignupFormInitialConfig : LoginFormConfig;
  const {
    formData,
    setFormData,
    handleInputChange,
    togglePasswordVisibility,
    errors,
    setErrors,
    validateAllFields,
  } = useForm(configForm);

  const handleSubmit = () => {
    const isValid = validateAllFields();

    if (!isValid) {
      // Errors are already set in `errors` state via `validateAllFields`
      return;
    } else {
      if (enableSignUp) {
        // const emailExists = await checkEmailExists(formData["email"]);
        const emailExists = false;
        if (!emailExists) {
          // Redirect to the signup completion page
          console.log("Redirecting to signup page for", formData["email"]);
          openBottomSheet(<SignupForm />, "Finish signing up", false);
        } else {
          setErrors({ email: "Email already exists. Please sign in." });
        }
      } else {
        // Submit login form
        console.log("Form submitted:", formData);
      }
    }
  };
  return (
    <>
      <InputFields
        config={configForm}
        formData={formData}
        handleInputChange={handleInputChange}
        togglePasswordVisibility={togglePasswordVisibility}
        errors={errors}
      />
      <View className="flex-row items-center justify-center mb-5">
        <Text className="text-base font-pmedium text-gray-600">
          {enableSignUp ? "Already" : "Don’t"} have an account?{" "}
        </Text>
        <TouchableOpacity
          onPress={() => {
            LayoutAnimation.configureNext(
              LayoutAnimation.create(
                600, // duration in milliseconds
                LayoutAnimation.Types.easeInEaseOut, // animation type
                LayoutAnimation.Properties.scaleXY // animates both X and Y scales smoothly
              )
            );
            setEnableSignUp((val) => !val);
          }}
        >
          <Text className="text-base font-pmedium text-blue-600 underline">
            Sign {enableSignUp ? "in" : "up"}
          </Text>
        </TouchableOpacity>
      </View>
      <CustomButton
        title="Continue"
        handlePress={handleSubmit}
        containerStyles="w-full bg-secondary"
      />
    </>
  );
};

export default LoginForm;
