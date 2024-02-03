import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../config/axiosConfig";
import { clearToken, getCookie } from "../utils/cookies";
const AuthUser = React.createContext(null);
export const Auth = ({ children }) => {
  const [items, setitems] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const products = JSON.parse(localStorage.getItem('products'))
    if (products && products?.length) {
      setitems(products.length);
    }
  },[])
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
    <AuthUser.Provider value={{ isLogged, logout, isAdmin, setitems, items }}>
      {children}
    </AuthUser.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthUser);
  return context;
};
