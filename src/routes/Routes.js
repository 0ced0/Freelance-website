import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import Login from "../pages/Login";
import App from "../App";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Charts from "../pages/Charts"
import { AuthProvider } from "../AuthContext";

const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/charts", element: <Charts /> },
    { path: "/profile", element: <Profile /> },
    { path: "/login", element: <Login /> }
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </StrictMode>
);
