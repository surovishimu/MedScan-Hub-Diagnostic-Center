import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Alltest from "../Pages/All Test/Alltest";
import Gallery from "../Pages/Gallery/Gallery";
import Contact from "../Pages/Contact/Contact";
import AdminDashboard from "../Pages/AdminDashboard/AdminDashboard";
import Login from "../Login/Login";
import UserDashbord from "../Pages/UserDahboard/UserDashboard";
import UserProfile from "../Pages/UserDahboard/UserProfile";
import Appoinments from "../Pages/UserDahboard/Appoinments";
import TestResult from "../Pages/UserDahboard/TestResult";
import Review from "../Pages/UserDahboard/Review";
import Alluser from "../Pages/AdminDashboard/Alluser";
import Addtest from "../Pages/AdminDashboard/Addtest";

import Addbanner from "../Pages/AdminDashboard/Addbanner";
import AllBanner from "../Pages/AdminDashboard/AllBanner";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import SignUp from "../Login/SignUp";
import PackageDetails from "../Pages/Home/PopularPackage/PackageDetails";
import TestDetails from "../Pages/All Test/TestDetails";
import Payment from "../Pages/All Test/Payment";
import PrivateRoute from "./PrivateRoute";
import AlltestList from "../Pages/AdminDashboard/AlltestList";
import UpdateTest from "../Pages/AdminDashboard/UpdateTest";
import Reservations from "../Pages/AdminDashboard/Reservations";
import Report from "../Pages/AdminDashboard/Report";
import AdminRoute from "./AdminRoute";
import Career from "../Pages/Career/Career";






export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'aboutus',
                element: <AboutUs></AboutUs>
            },
            {
                path: 'alltest',
                element: <Alltest></Alltest>
            },
            {
                path: 'gallery',
                element: <Gallery></Gallery>
            },
            {
                path: 'contact',
                element: <Contact></Contact>
            },
            {
                path: 'career',
                element: <Career></Career>
            },

            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/package/:id',
                element: <PackageDetails></PackageDetails>
            },
            {
                path: '/alltests/:id',
                element: <TestDetails></TestDetails>
            }


        ]
    },
    {
        path: 'userdashboard',
        element: <PrivateRoute><UserDashbord></UserDashbord></PrivateRoute>,
        children: [
            {
                path: 'userprofile',
                element: <UserProfile></UserProfile>,
            },
            {
                path: 'appointments',
                element: <Appoinments></Appoinments>,
            },
            {
                path: 'testresult',
                element: <TestResult></TestResult>
            },
            {
                path: 'review',
                element: <Review></Review>
            },
            {
                path: 'payment/:id',
                element: <Payment></Payment>
            },



        ]
    },
    {
        path: 'admindashboard',
        element: <AdminDashboard></AdminDashboard>,
        children: [
            {
                path: 'allusers',
                element: <AdminRoute><Alluser></Alluser></AdminRoute>

            },
            {
                path: 'addtest',
                element: <Addtest></Addtest>
            },

            {
                path: 'testlist',
                element: <AlltestList></AlltestList>
            },
            {
                path: 'testlist/:id',
                element: <UpdateTest></UpdateTest>
            },
            {
                path: 'reservation/:id',
                element: <Reservations></Reservations>
            },

            {
                path: 'addbanner',
                element: <Addbanner></Addbanner>
            },
            {
                path: 'allbanners',
                element: <AllBanner></AllBanner>
            },
            {
                path: 'report/:id',
                element: <Report></Report>
            },


        ]
    },

]);