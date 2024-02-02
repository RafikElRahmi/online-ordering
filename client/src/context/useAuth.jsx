import React, { useContext, useState } from "react";
import axiosInstance from "../config/axiosConfig";
import { clearToken, getCookie } from "../utils/cookies";
const AuthUser = React.createContext(null);
export const Auth = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const isLogged = async () => {
    const token = getCookie("token");
    if (!token.length) {
      return false;
    }
    const res = await axiosInstance.get(`/auth`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { Logged, admin } = res.data;
    if (Logged) {
      setIsAdmin(admin);
      return Logged;
    } else {
      logout();
      return Logged;
    }
  };
  const logout = () => {
    clearToken();
    setIsAdmin(false);
    window.location.replace("/");
  };

  return (
    <AuthUser.Provider value={{ isLogged, logout, isAdmin }}>
      {children}
    </AuthUser.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthUser);
  return context;
};
