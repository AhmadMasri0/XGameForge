import React, {
  createContext, useContext, useState,
  useEffect, ReactNode,
} from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { RegistrationData, User } from "../types/types";

interface AuthContextType {
  user: User | null;
  login: (formData: RegistrationData) => Promise<string | void>;
  signup: (formData: RegistrationData) => Promise<string | void>;
  logout: () => void;
  isAuthenticated: boolean;
  signupMessage: string;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [signupMessage, setSignupMessage] = useState<string>("");

  const navigate = useNavigate();
  const redirectTo =
    new URLSearchParams(window.location.search).get("redirect") || "/";

  // useEffect(() => {
  //   if (user) {
  //     localStorage.setItem("user", JSON.stringify(user));
  //   } else {
  //     localStorage.removeItem("user");
  //   }
  // }, [user]);

  useEffect(() => {
    if (user?.token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    }
  }, [user]);

  const login = async (formData: RegistrationData): Promise<string | void> => {
    try {
      const response = await api.post("/api/auth/login", formData);
      const { token, user: userData } = response.data;

      const fullUser = { ...userData, token };
      setUser(fullUser);
      localStorage.setItem("user", JSON.stringify(fullUser));
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      navigate(redirectTo, { replace: true });
    } catch (error: any) {
      console.error("Login error:", error);
      if (error?.response?.data?.message) {
        return error.response.data.message;
      } else {
        alert("Login failed. Please try again.");
      }
    }
  };

  const signup = async (formData: RegistrationData): Promise<string | void> => {
    try {
      const response = await api.post("/api/auth/register", formData);
      const message: string = response.data.message;
      setSignupMessage(message);
    } catch (error: any) {
      console.error("Signup error:", error);
      if (error?.response?.data?.message) {
        return error.response.data.message;
      } else {
        alert("Signup failed. Please try again.");
      }
    }
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem("user");
    delete api.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        signup,
        isAuthenticated: !!user,
        signupMessage,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
