import axios from 'axios';

const BASE_URL = process.env.AUTH_URL || "http://localhost:3902/api/auth";

export const loginWithOAuth = async (provider : string)=>{
    try{
        console.log(`${BASE_URL}/${provider}`);
        const response = await axios.get(`${BASE_URL}/${provider}`);
        return response.data;
    }catch(error){
        if (axios.isAxiosError(error) && error.response) {
            
            throw new Error(error.response.data?.message || "Failed to authenticate. Please try again.");
          } 
          
          throw new Error("Failed to authenticate. Please try again.");
        
    }
}