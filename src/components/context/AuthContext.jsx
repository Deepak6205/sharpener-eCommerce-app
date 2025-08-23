import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../authentication/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const idToken = await currentUser.getIdToken();
        setToken(idToken);
        localStorage.setItem("token", idToken); 
      } else {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token"); 
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
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
