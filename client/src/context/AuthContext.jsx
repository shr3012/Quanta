import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "../utils/base.url.js";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLoginSuccess = async (res) => {
    try {
      const decodedData = jwtDecode(res.credential);
      setLoading(true);
      const restoken = await axios.post(
        `${BASE_URL}/google-login`,
        decodedData
      );
      if (restoken.status === 200) {
        setLoading(false);
        setMessage(restoken.data.message);
        localStorage.setItem("jarvis-gemini-auth-token", restoken.data.token);
        setTimeout(() => {
          window.location.href = "/";
        }, 500);
      }
    } catch (error) {
      setLoading(false);
      setMessage("Error saving user data to server");
      console.error("Error saving user data to server:", error.response.data);
    }
  };

  const handleLoginError = () => {
    setMessage("Login Failed, Try Again Later ... ");
  };

  const handleLogOut = () => {
    localStorage.removeItem("jarvis-gemini-auth-token");
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  };

  const checkTokenExpiry = () => {
    const currTime = Date.now() / 1000;
    if (user?.exp < currTime) {
      handleLogOut();
    } else {
      const expin = user?.exp - currTime;
      setTimeout(handleLogOut, expin * 1000);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("jarvis-gemini-auth-token");
    setToken(user);
    user ? setUser(jwtDecode(user)) : "";
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loading,
        checkTokenExpiry,
        handleLoginSuccess,
        message,
        handleLoginError,
        user,
        handleLogOut,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
