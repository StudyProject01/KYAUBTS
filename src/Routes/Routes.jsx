import { createBrowserRouter } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Main from "../Layout/Main";
import Home from "../Home/Home";
import path from "path";
import TrackingRoute from "../Tracking Route/TrackingRoute";
import Contact from "../cart/contact";
import About from "../About/About";
import { HiExclamation } from "react-icons/hi";
import HelpLine from "../About/helpLine";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },

      {
        path:"/route/:busId",
        element:<TrackingRoute></TrackingRoute>
      },
      {
        path:"/Contact",
        element:<Contact></Contact>
      },
      {
        path:"/about",
        element:<About></About>,
        children:[{
            path:"/about/helpline"
        }]

      },
    ],
  },
]);
