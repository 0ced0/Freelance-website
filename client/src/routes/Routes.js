import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
// import "./index.css"
import App from "../App";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Charts from "../pages/Charts"

const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/charts", element: <Charts /> },
    { path: "/profile", element: <Profile /> }
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
