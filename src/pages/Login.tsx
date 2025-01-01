import React, { useState } from "react";
import { login, logout } from "../modules/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../core/store";

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  const [username, setUsername] = useState<string>("admin@admin.com");
  const [password, setPassword] = useState<string>("!Admin123");

  const handleLogin = () => {
    dispatch(login({ userEmail: username, password }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      {auth.isAuthenticated ? (
        <>
          <p>Welcome, {auth.accessToken}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </>
      )}
    </div>
  );
};

export default LoginForm;
