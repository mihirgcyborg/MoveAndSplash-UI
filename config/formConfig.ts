export type FieldConfig = {
    title: string;
    placeholder:string;
    validation:(value:string, allValues?:Record<string,string>)=> true | string;
    type?: "text" | "password" | "date",
    showPassword?: boolean;
}  

export type FormConfigProps = {
    title?:string;
    inputFields:Record<string,FieldConfig>;
    description?:string;
}



export const LoginFormConfig:Record<string, FormConfigProps>={
    login:{
       
        inputFields:{
            email:{
                title:"Email",
                placeholder:"Enter your email",
                validation:(value:string)=> /\S+@\S+\.\S+/.test(value)|| "Email is invalid",
                type:"text"
            },
            password: {
                title: "Password",
                placeholder: "Enter your password",
                validation: (value: string) => value.length >= 6 || "Password must be at least 6 characters",
                type:"password",
                showPassword:false,
            }
        }
    }
}
export const SignupFormInitialConfig:Record<string, FormConfigProps>={
    signup:{
        
        inputFields:{
            email:{
                title:"Email",
                placeholder:"Enter your email",
                validation:(value:string)=> /\S+@\S+\.\S+/.test(value)|| "Email is invalid",
                type:"text"
            }
        }
    }
}




export const SignupFormConfig:Record<string, FormConfigProps>={
    legalName:{
        title:"Legal name",
        inputFields:{
            firstName: {
                title: "First Name",
                placeholder: "First Name on ID",
                validation: (value: string) => value.trim() !== "" || "First name is required",
            },
            lastName: {
                title: "Last Name",
                placeholder: "Last Name on ID",
                validation: (value: string) => value.trim() !== "" || "Last name is required",
            },
        },
        description:"Make sure this matches the name on your government ID."
    },
    dateOfBirth:{
        title:"Date of birth",
        inputFields:{
            dateOfBirth: {
                title: "Date of Birth",
                placeholder: "YYYY-MM-DD",
                validation: (value: string) => 
                    /^\d{4}-\d{2}-\d{2}$/.test(value) || "Date of birth must be in YYYY-MM-DD format",
            },
        },
        description:"To sign up , you need to be at least 18."
    },
    email:{
        title:"Email",
        inputFields:{
            email: {
                title: "Email",
                placeholder: "Enter your email",
                validation: (value: string) => 
                    /\S+@\S+\.\S+/.test(value) || "Email is invalid",
            },
        },
        description:"We'll email you trip confirmations and receipts."
    },
    password:{
        title:"Password",
        inputFields:{
            password: {
                title: "Password",
                placeholder: "Enter your password",
                validation: (value: string) => 
                    value.length >= 6 || "Password must be at least 6 characters",
                
                type:"password",
                showPassword:false,
            },
            confirmPassword: {
                title: "Confirm Password",
                placeholder: "Re-enter your password",
                validation: (value: string, allValues?: Record<string, string>) =>
                    value === allValues?.password || "Passwords do not match",
                
                type:"password",
                showPassword:false,
            },
        }
    }
}