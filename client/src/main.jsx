import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom/dist";
// import 'primereact/resources/themes/saga-blue/theme.css'
// import 'primereact/resources/primereact.min.css'; 
// import 'primeicons/primeicons.css';
import "./index.css";

import App from "./App.jsx";
import Home from "./pages/Home";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import UpdateProfile from "./pages/UpdateProfile.jsx";
import Error from "./pages/Error";
import LogExercise from "./pages/LogExercise"; // Import LogExercise component
import ActivityDetails from "./pages/ActivityDetails.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        error: <Error />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
              path: "/about",
              element: <About />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
            {
                path: "/me",
                element: <Profile />,
            },
            {
                path: "/profiles/:username",
                element: <Profile />,
            },
            {
                path: "/log-exercise", // New route for logging exercises
                element: <LogExercise />,
            },
            {
                path: "/activity/:id",
                element: <ActivityDetails />,
            },
            {
                path: "/update-profile" ,
                element: <UpdateProfile />,
             },
        ],
    },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
