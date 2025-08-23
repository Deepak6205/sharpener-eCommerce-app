import React from "react";
import { Navigate } from "react-router-dom";

// ✅ firebase
import { auth } from "./firebase";


const PrivateRoute = ({ children }) => {
  const user = auth.currentUser;
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
