
import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../authentication/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const idToken = await currentUser.getIdToken();
        setToken(idToken); 
      } else {
        setToken(null);
      }
    });
    return () => unsubscribe();
  }, []);

  
  const logout = async () => {
  try {
    await signOut(auth);
    setToken(null);
    setUser(null);
  } catch (err) {
    console.error("Logout failed:", err);
  }
};


  return (
    <AuthContext.Provider value={{ user, token, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
