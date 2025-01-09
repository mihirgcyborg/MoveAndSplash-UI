import axios from "axios";
import { loginUserProps, registerUserProps } from "../interfaces/commonTypes";
import { setUserToken } from "../utils/helper";

const BASE_URL = process.env.AUTH_URL || "http://localhost:3902/api/auth";

export const checkUserExists = async (email: string) => {
  try {
    const trimmedEmail = email.trim();
    const response = await axios.post(`${BASE_URL}/checkUserExists`, {
      email: trimmedEmail,
    });
    return response.status === 200 ? false : true;
  } catch (error: any) {
    if (error.response?.status === 409) {
      return true; // User exists
    }
    console.error("Error checking if user exists:", error);
    throw new Error("Failed to check user existence. Please try again.");
  }
};

export const registerUser = async (registerUserRequest: registerUserProps) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/register`,
      registerUserRequest
    );
    if (response.status === 201) {
      const { token } = response.data;
      setUserToken(token);
      console.log("User registered successfully:", response.data);
      return response.data;
    }
  } catch (error: any) {
    if (error.response) {
      console.error("Error registering user:", error.response.data);
      if (error.response.status === 409) {
        throw new Error("User already exists.");
      } else if (error.response.status === 400) {
        throw new Error("Invalid data provided.");
      }
    } else {
      console.error("Unexpected error:", error.message);
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const loginUser = async (loginUserRequest: loginUserProps) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, loginUserRequest);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    if (error.response) {
      console.error("Error in login:", error.response.data);
      throw new Error(error.message);
    } else {
      console.error("Unexpected error:", error.message);
      throw new Error("An unexpected error occurred.");
    }
  }
};
