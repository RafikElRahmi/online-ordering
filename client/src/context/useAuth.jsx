import React, { useContext } from "react";
import axiosInstance from "../config/axiosConfig";
import { clearToken, getCookie } from "../utils/cookies";
const AuthUser = React.createContext(null);
export const Auth = ({ children }) => {
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
    const { Logged } = res.data;
    if (!Logged) {
      logout();
    }
    return Logged;
  };
  const logout = () => {
    clearToken();
    window.location.replace("/");
  };

  return (
    <AuthUser.Provider value={{ isLogged, logout }}>
      {children}
    </AuthUser.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthUser);
  return context;
};
