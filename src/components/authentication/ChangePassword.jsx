import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../../styles/ChangePassword.css"; 

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const { token, logout } = useAuth();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!newPassword) return;

    try {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${import.meta.env.VITE_FIREBASE_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            idToken: token,
            password: newPassword,
            returnSecureToken: true,
          }),
        }
      );

      const data = await res.json();
      if (data.error) throw new Error(data.error.message);

      setMessage("Password updated successfully. Please login again.");
      await logout(); 
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  return (
    <div className="change-password-container">
      <h2>Change Password</h2>
      <form onSubmit={handleChangePassword} className="change-password-form">
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit" className="change-password-btn">Change Password</button>
      </form>
      {message && <p className={`message ${message.startsWith("Error") ? "error" : "success"}`}>{message}</p>}
    </div>
  );
};

export default ChangePassword;
