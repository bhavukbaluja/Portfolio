import React, { useEffect } from "react";

const LoginPage = ({openLoginSignup})=>{
    useEffect(()=>{
        openLoginSignup();
    },[]);
}
export default LoginPage;
