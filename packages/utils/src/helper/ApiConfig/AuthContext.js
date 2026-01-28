// import React, { createContext, useState, useEffect } from "react";
// import axios from "axios";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [accessToken, setAccessToken] = useState(null);
//   const [user, setUser] = useState(null);

//   // Login Function
//   const login = async (email, password) => {
//     try {
//       const response = await axios.post("http://localhost:8080/api/auth/login", { email, password });
//       setAccessToken(response.data.accessToken); // Store token in state
//       setUser(response.data.user);
//       return true;
//     } catch (error) {
//       console.error("Login failed", error);
//       return false;
//     }
//   };

//   // Logout Function
//   const logout = async () => {
//     setAccessToken(null);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ accessToken, user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;
