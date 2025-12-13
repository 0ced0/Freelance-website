import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(false);
    const [loading, setLoading] = useState(true); // optional, to track if auth check is in progress

    useEffect(() => {
        const token = localStorage.getItem("authToken");

        if (token) {
            // Check token validity with backend
            fetch("http://localhost:8000/api/auth/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data._id) {
                        // Token valid, store real user info
                        setUser(data);
                    } else {
                        // Token invalid, remove from localStorage
                        localStorage.removeItem("authToken");
                        setUser(false);
                    }
                })
                .catch(() => {
                    // If request fails, assume not logged in
                    setUser(false);
                })
                .finally(() => setLoading(false));
        } else {
            setUser(false);
            setLoading(false);
        }
    }, []);

    // Optional helper functions
    const login = (token, userData) => {
        localStorage.setItem("authToken", token);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}
