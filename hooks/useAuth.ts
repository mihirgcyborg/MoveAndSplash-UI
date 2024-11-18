import { useEffect, useState } from "react";
import { getUserToken } from "../utils/helper";


export const useAuth = () =>{
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuthStatus = async () => {
          try {
            const token = await getUserToken(); 
            console.log("token from storage", !!token); 
            setIsAuthenticated(!!token); // Set authentication status based on the token
          } catch (error) {
            console.error("Error fetching token:", error);
          }finally{
            setLoading(false);
          }
        };
        
        checkAuthStatus();
      }, []);

    return {isAuthenticated, loading};
}