import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL, HEADERS } from "../constants";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("authToken") || null);

  const handleLogin = async (data) => {
    const resp = await fetch(`${API_URL}/api/v1/user/login`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status) {
          const authToken = window.btoa(JSON.stringify(data));
          localStorage.setItem("authToken", authToken);
          setToken(authToken);
          navigate("/dashboard");
        } else {
          return { status: data.status, message: data.errorMessage };
        }
      });
    return resp;
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
  };

  const getToken = async () => {
    const authToken = await localStorage.getItem("authToken");
    setToken(authToken);
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        onLogin: handleLogin,
        onLogout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
