import { useEffect, useState } from "react";

export const useAuth = () =>{
    const [isAuthenticated,setIsAuthenticated] = useState(false);

    useEffect(()=>{
        const checkAuthStatus = async () =>{
            // const user = await getuserFromStorage();
            // setIsAuthenticated(!!user)
            setIsAuthenticated(false);
        }
        checkAuthStatus();
    },[]);

    return {isAuthenticated};
}