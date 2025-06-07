import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [signupMessage, setSignupMessage] = useState('');

  const navigate = useNavigate();
  const redirectTo = new URLSearchParams(window.location.search).get("redirect") || "/";



  useEffect(() => {
    if (user?.token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    }
  }, [user]);

  const login = async (formData) => {
    try {
      const response = await api.post("/api/auth/login", formData);

      const { token, user } = response.data;

      setUser({ ...user, token });
      localStorage.setItem("user", JSON.stringify({ ...user, token }));
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      navigate(redirectTo, { replace: true });

    } catch (error) {
      console.error("Login error:", error);
      if (error?.response?.data?.message) {
        return error.response.data.message;
      } else {
        alert("Login failed. Please try again.");
      }
    }
  };

  const signup = async (formData) => {
    try {
      const response = await api.post("/api/auth/register", formData);
      const message = response.data.message;
      setSignupMessage(message);
    } catch (error) {
      console.error("Signup error:", error);
      if (error?.response?.data?.message) {
        return error.response.data.message;
      } else {
        alert("Signup failed. Please try again.");
      }
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    delete api.defaults.headers.common["Authorization"];
  };


  return (
    <AuthContext.Provider value={{ user, login, logout, signup, isAuthenticated: !!user, setUser, signupMessage }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
