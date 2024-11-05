import { useEffect, useState } from "react";
import { FormConfigProps } from "../config/formConfig";

export const useForm = (config:Record<string,FormConfigProps>)=>{
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [errors, setErrors] = useState<Record<string, string | undefined>>({});
    
    useEffect(()=>{
      setFormData(
        Object.keys(config).reduce((allfields, currData) => {
          let newFields = Object.keys(config[currData].inputFields).reduce(
            (acc, key) => ({ ...acc, [key]: "" }),
            {}
          );
          return { ...allfields, ...newFields };
        }, {})
      );
      setErrors({});
    },[config]);

    const handleInputChange = (field: string, value: string) => {
        setFormData((prevData) => ({ ...prevData, [field]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [field]: undefined }));
    };
    const togglePasswordVisibility = (sectionKey: string, fieldKey: string) => {
        config[sectionKey].inputFields[fieldKey].showPassword =
          !config[sectionKey].inputFields[fieldKey].showPassword;
        setFormData((prevData) => ({ ...prevData })); // Force re-render
      };
    return { formData, setFormData,handleInputChange,togglePasswordVisibility, errors,setErrors};
}