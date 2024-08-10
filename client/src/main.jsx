import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom/dist";
import "./index.css";

import App from './App.jsx'
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
// import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile';
import Error from './pages/Error';
import LogExercise from './pages/LogExercise'; // Import LogExercise component
import ExerciseLogList from './pages/ExerciseLogList'; // Import ExerciseLogList component
import AddExerciseCategory from './pages/AddExerciseCategory'; // Import the new page



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/me',
        element: <Profile />
      }, {
        path: '/profiles/:username',
        element: <Profile />
      },   {
        path: '/log-exercise', // New route for logging exercises
        element: <LogExercise />,
      },
      // {
      // path: '/add-exercise-category' ,
      // element: <AddExerciseCategory />,
      // },
    
    ]
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
