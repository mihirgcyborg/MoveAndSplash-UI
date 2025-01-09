import { useEffect, useState } from "react";
import { FormConfigProps } from "../config/formConfig";
import { defaultValuesProps } from "../interfaces/commonTypes";


export const useForm = (config :Record<string, FormConfigProps> , defaultValues:defaultValuesProps | null) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  useEffect(() => {
    setFormData(
      Object.keys(config).reduce((allfields, currData) => {
        let newFields = Object.keys(config[currData].inputFields).reduce(
          (acc, key) => ({ ...acc, [key]: (defaultValues?.[key] as string) || "" }),
          {}
        );
        return { ...allfields, ...newFields };
      }, {})
    );
    setErrors({});
  }, [config,defaultValues]);
  const validateField = (
    sectionKey: string,
    fieldKey: string,
    value: string
  ) => {
    const fieldConfig = config[sectionKey].inputFields[fieldKey];
    const error =
      typeof fieldConfig.validation === "function"
        ? fieldConfig.validation(value, formData)
        : true;

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldKey]: error !== true ? error : undefined,
    }));
  };

  const validateAllFields = () => {
    const newErrors: Record<string, string | undefined> = {};
    Object.keys(config).forEach((sectionKey) => {
        const section = config[sectionKey];
        Object.keys(section.inputFields).forEach((fieldKey) => {
            const fieldValue = formData[fieldKey];
            const error = typeof section.inputFields[fieldKey].validation === "function"
                ? section.inputFields[fieldKey].validation(fieldValue, formData)
                : true;
            if (error !== true) {
                newErrors[fieldKey] = error;
            }
        });
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
};


  const handleInputChange = (
    sectionKey: string,
    field: string,
    value: string
  ) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
    validateField(sectionKey, field, value);
  };
  const togglePasswordVisibility = (sectionKey: string, fieldKey: string) => {
    config[sectionKey].inputFields[fieldKey].showPassword =
      !config[sectionKey].inputFields[fieldKey].showPassword;
    setFormData((prevData) => ({ ...prevData })); // Force re-render
  };
  return {
    formData,
    setFormData,
    handleInputChange,
    togglePasswordVisibility,
    errors,
    setErrors,
    validateAllFields
  };
};
