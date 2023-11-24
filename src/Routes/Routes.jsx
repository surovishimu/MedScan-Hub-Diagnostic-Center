import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Alltest from "../Pages/All Test/Alltest";
import Gallery from "../Pages/Gallery/Gallery";
import Contact from "../Pages/Contact/Contact";
import UserDashboard from "../Pages/UserDahboard/UserDashboard";
import AdminDashboard from "../Pages/AdminDashboard/AdminDashboard";
import Login from "../Login/Login";


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'aboutus',
            element:<AboutUs></AboutUs>
        },
        {
            path:'alltest',
            element:<Alltest></Alltest>
        },
        {
            path:'gallery',
            element:<Gallery></Gallery>
        },
        {
            path:'contact',
            element:<Contact></Contact>
        },
        {
            path:'userdashboard',
            element:<UserDashboard></UserDashboard>,
        },
        {
            path:'admindashboard',
            element:<AdminDashboard></AdminDashboard>,
        },
        {
            path:'login',
            element:<Login></Login>
        },
        
      ]
    },
  ]);