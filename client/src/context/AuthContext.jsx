// client/src/context/AuthContext.jsx
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

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
        const res = await axios.post("http://localhost:8000/api/users/login", {
            email,
            password,
        });
        const { token, user } = res.data;

        setToken(token);
        setUser(user);
        localStorage.setItem("userToken", token);
        localStorage.setItem("userData", JSON.stringify(user));
        setLoading(false);

    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("userToken");
        localStorage.removeItem("userData");
    };
    return (
        <AuthContext.Provider value={{ user, setUser, token, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

}
