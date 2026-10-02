import { createContext, useContext, useState } from "react";
import { loginUser, registerUser } from "../api/client";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("user")); } catch { return null; }
  });
  const [authOpen, setAuthOpen] = useState(false);
  const [mode, setMode] = useState("login");

  const login = async (email, password) => {
    const d = await loginUser(email, password);
    localStorage.setItem("token", d.token);
    localStorage.setItem("user", JSON.stringify(d.user));
    setToken(d.token); setUser(d.user); setAuthOpen(false);
  };
  const register = async (form) => { await registerUser(form); await login(form.email, form.password); };
  const logout = () => { localStorage.removeItem("token"); localStorage.removeItem("user"); setToken(""); setUser(null); };
  const openAuth = (m = "login") => { setMode(m); setAuthOpen(true); };

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout, authOpen, setAuthOpen, mode, setMode, openAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
