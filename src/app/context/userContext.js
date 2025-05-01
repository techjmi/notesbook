"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false); 

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };
  const fetchUser = async () => {
    try {
      const res = await axios.get("/api/user", { withCredentials: true });
      setUser(res.data.user);
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, refreshUser: fetchUser ,darkMode, toggleTheme}}>
      <div className={darkMode ? 'bg-black text-white min-h-screen' : 'bg-white text-black min-h-screen'}>
        {children}
      </div>
      {/* {children} */}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
