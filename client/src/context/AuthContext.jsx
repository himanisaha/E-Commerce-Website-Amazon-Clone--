// client/src/context/AuthContext.jsx
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../api/baseUrl";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // ✅ Add error state
    
    useEffect(() => {
        const storedToken = localStorage.getItem("userToken");
        const storedUser = localStorage.getItem("userData");
        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        setLoading(true);
        setError(null); // ✅ Clear previous errors
        try {
            const res = await axios.post(`${BASE_URL}/api/users/login`, {
                email,
                password,
            });
            const { token, user } = res.data;

            setToken(token);
            setUser(user);
            localStorage.setItem("userToken", token);
            localStorage.setItem("userData", JSON.stringify(user));
            setLoading(false);
        } catch (err) {
            // ✅ Catch and handle errors properly
            const errorMessage = err.response?.data?.message || "Login failed";
            setError(errorMessage);
            setLoading(false);
            throw err; // Re-throw so LoginPage can show alert
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        setError(null); // ✅ Clear error on logout
        localStorage.removeItem("userToken");
        localStorage.removeItem("userData");
    };

    return (
        <AuthContext.Provider value={{ user, setUser, token, loading, error, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
