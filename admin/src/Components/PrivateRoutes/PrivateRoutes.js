import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoutes = ({ children }) => {
    let location = useLocation()
    const [isLogin, setIslogin] = useState(false)
    console.log("loggedIn private**************", isLogin)
    let loginDetails = sessionStorage.getItem("login");
    let login = JSON.parse(loginDetails)
    useEffect(()=> {
        if(login?.email) {
          setIslogin(true)
        } else {
          setIslogin(false)
        }
    }, [loginDetails])

    if(login?.username) {
        return (
            <>
                {children}
            </>
        )
    }
    return <Navigate to="/login" />
};

export default PrivateRoutes;