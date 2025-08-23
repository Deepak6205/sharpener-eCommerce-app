import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../authentication/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("token");
    const expiry = localStorage.getItem("tokenExpiry");
    if (storedToken && expiry && Date.now() < Number(expiry)) {
      return storedToken;
    }
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
    return null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const idToken = await currentUser.getIdToken();
        setUser(currentUser);
        setToken(idToken);
        localStorage.setItem("token", idToken);
        localStorage.setItem("tokenExpiry", Date.now() + 5 * 60 * 1000); 
      } else {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiry");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiry");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const loginSuccess = (currentUser, idToken) => {
    setUser(currentUser);
    setToken(idToken);
    localStorage.setItem("token", idToken);
    localStorage.setItem("tokenExpiry", Date.now() + 5 * 60 * 1000); 
  };

  
  useEffect(() => {
    if (token) {
      const expiry = localStorage.getItem("tokenExpiry");
      const timeout = Number(expiry) - Date.now();
      if (timeout > 0) {
        const timer = setTimeout(() => {
          logout();
          alert("Session expired. Please login again.");
        }, timeout);
        return () => clearTimeout(timer);
      } else {
        logout();
      }
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, logout, loading, loginSuccess }}>
      {children}
    </AuthContext.Provider>
  );
};
