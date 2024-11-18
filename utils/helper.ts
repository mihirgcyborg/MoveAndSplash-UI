import * as SecureStore from "expo-secure-store";

export const getUserToken = async () => {
  try {
    const token = await SecureStore.getItemAsync("userToken");
    return token; // Returns the token or null if not found
  } catch (error) {
    console.error("Error retrieving user token:", error);
    return null; // Return null in case of error
  }
};

export const setUserToken = async (token: string) => {
  try {
    await SecureStore.setItemAsync("userToken", token);
    console.log("Token successfully stored");
  } catch (error) {
    console.error("Error storing user token:", error);
  }
};
