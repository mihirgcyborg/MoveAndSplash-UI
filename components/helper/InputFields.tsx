import { View, Text } from "react-native";

import React from "react";
import { FormConfigProps } from "../../config/formConfig";
import { TextInput } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "@gorhom/bottom-sheet";

interface InputFieldsProps {
  config: Record<string, FormConfigProps>;
  formData: Record<string, string>;
  handleInputChange: (sectionKey: string, field: string, value: string) => void;
  togglePasswordVisibility: (sectionKey: string, fieldKey: string) => void;
  errors: Record<string, string | undefined>;
}

const InputFields = ({
  config,
  formData,
  handleInputChange,
  togglePasswordVisibility,
  errors,
}: InputFieldsProps) => {
  return (
    <View>
      {Object.keys(config).map((sectionkey) => {
        const section = config[sectionkey];
        return (
          <View key={sectionkey} className="mb-7">
            {section.title && (
              <Text className="font-pmedium ml-1 mb-3">{section.title}</Text>
            )}
            <View className="border-y-[1px] border-x-[1px]  rounded-t-xl rounded-b-xl border-[#DDD] mb-2">
              {Object.keys(section.inputFields).map((fieldKey, index) => {
                const config = section.inputFields[fieldKey];
                const isPassword = config.type === "password";

                return (
                  <View key={fieldKey} className="">
                    <View className="relative">
                      <TextInput
                        placeholder={config.placeholder}
                        autoCapitalize="none"
                        value={formData[fieldKey]}
                        onChangeText={(value) =>
                          handleInputChange(sectionkey, fieldKey, value)
                        }
                        secureTextEntry={isPassword && !config.showPassword}
                        className={` p-2 ${
                          index !== Object.keys(section.inputFields).length - 1
                            ? "border-b-[1px] border-[#DDD]"
                            : ""
                        } min-h-[62px] font-pmedium text-lg ${
                          errors[fieldKey] ? "border-red-600" : "border-[#DDD]"
                        }`}
                      />
                      {isPassword && (
                        <TouchableOpacity
                          onPress={() =>
                            togglePasswordVisibility(sectionkey, fieldKey)
                          }
                          className="absolute right-5 top-[18px]"
                        >
                          <Ionicons
                            name={config.showPassword ? "eye" : "eye-off"}
                            size={20}
                            color="#999"
                          />
                        </TouchableOpacity>
                      )}
                    </View>

                    {errors[fieldKey] && (
                      <Text className="text-red-600">{errors[fieldKey]}</Text>
                    )}
                  </View>
                );
              })}
            </View>
            {section.description && (
              <Text className="font-pregular color-gray-500 text-sm ml-1 ">
                {section.description}
              </Text>
            )}
          </View>
        );
      })}
    </View>
  );
};

export default InputFields;
