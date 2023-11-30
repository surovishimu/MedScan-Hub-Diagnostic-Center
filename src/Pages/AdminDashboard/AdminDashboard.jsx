
import { FaHome,FaUsers } from "react-icons/fa";

import { MdDensitySmall } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import { TbHandClick } from "react-icons/tb";
import { PiFlagBanner } from "react-icons/pi";
import { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet-async";
const AdminDashbord = () => {

    return (
      <div>
         <Helmet>
                <title>
                    MedScan Hub | Admin Dashboard
                </title>
            </Helmet>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-64 min-h-full md:min-h-screen bg-green-900 menu ">

                <NavLink
                    to="/admindashboard/allusers"
                    className={({ isActive, isExact, isPartiallyCurrent, isPending }) => {
                        return isPending
                            ? 'pending flex items-center text-white p-3 lg:p-7 text-sm uppercase font-semibold'
                            : isActive || isExact || isPartiallyCurrent
                                ? 'active flex items-center text-black bg-green-700 lg:p-7 p-3 text-sm uppercase font-semibold'
                                : 'flex items-center text-white hover:text-black hover:bg-white p-3 lg:p-7 text-sm uppercase font-semibold';
                    }}
                >
                    <FaUsers className="mr-2 text-xl" /> All users
                </NavLink>


                <NavLink
                    to="/admindashboard/addtest"
                    className={({ isActive, isExact, isPartiallyCurrent, isPending }) => {
                        return isPending
                            ? 'pending flex items-center text-white p-3 lg:p-7 text-sm uppercase font-semibold'
                            : isActive || isExact || isPartiallyCurrent
                                ? 'active flex items-center text-black bg-green-700 lg:p-7 p-3 text-sm uppercase font-semibold'
                                : 'flex items-center text-white hover:text-black hover:bg-white p-3 lg:p-7 text-sm uppercase font-semibold';
                    }}
                >
                    <MdOutlineAddBox className="mr-2 text-xl" /> Add Test
                </NavLink>


                <NavLink
                    to="/admindashboard/testlist"
                    className={({ isActive, isExact, isPartiallyCurrent, isPending }) => {
                        return isPending
                            ? 'pending flex items-center text-white p-3 lg:p-7 text-sm uppercase font-semibold'
                            : isActive || isExact || isPartiallyCurrent
                                ? 'active flex items-center text-black bg-green-700 lg:p-7 p-3 text-sm uppercase font-semibold'
                                : 'flex items-center text-white hover:text-black hover:bg-white p-3 lg:p-7 text-sm uppercase font-semibold';
                    }}
                >
                    <MdDensitySmall className="mr-2 text-xl" /> All tests
                </NavLink>

                
                <NavLink
                    to="/admindashboard/addbanner"
                    className={({ isActive, isExact, isPartiallyCurrent, isPending }) => {
                        return isPending
                            ? 'pending flex items-center text-white p-3 lg:p-7 text-sm uppercase font-semibold'
                            : isActive || isExact || isPartiallyCurrent
                                ? 'active flex items-center text-black bg-green-700 lg:p-7 p-3 text-sm uppercase font-semibold'
                                : 'flex items-center text-white hover:text-black hover:bg-white p-3 lg:p-7 text-sm uppercase font-semibold';
                    }}
                >
                    <TbHandClick className="mr-2 text-xl" /> Add Banner
                </NavLink>
                <NavLink
                    to="/admindashboard/allbanners"
                    className={({ isActive, isExact, isPartiallyCurrent, isPending }) => {
                        return isPending
                            ? 'pending flex items-center text-white p-3 lg:p-7 text-sm uppercase font-semibold'
                            : isActive || isExact || isPartiallyCurrent
                                ? 'active flex items-center text-black bg-green-700 lg:p-7 p-3 text-sm uppercase font-semibold'
                                : 'flex items-center text-white hover:text-black hover:bg-white p-3 lg:p-7 text-sm uppercase font-semibold';
                    }}
                >
                    <PiFlagBanner className="mr-2 text-xl" /> All Banners
                </NavLink>



                <div className="divider"></div>

                <NavLink
                    to="/"
                    className={({ isActive, isExact, isPartiallyCurrent, isPending }) => {
                        return isPending
                            ? 'pending flex items-center text-white p-3 lg:p-7 text-sm uppercase font-semibold'
                            : isActive || isExact || isPartiallyCurrent
                                ? 'active flex items-center text-black bg-green-700 lg:p-7 p-3 text-sm uppercase font-semibold'
                                : 'flex items-center text-white hover:text-black hover:bg-white p-3 lg:p-7 text-sm uppercase font-semibold';
                    }}
                >
                    <FaHome className="mr-2 text-xl" /> Home
                </NavLink>

                

            </div>
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
            <Toaster position="bottom-center"></Toaster>
        </div>
      </div>
    );
};

export default AdminDashbord;