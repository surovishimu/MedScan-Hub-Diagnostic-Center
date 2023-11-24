
import { FaCalendar, FaHome, FaListAlt, FaStar } from "react-icons/fa";
import { GrDocumentTest } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { NavLink, Outlet } from "react-router-dom";



const UserDashbord = () => {

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-64 min-h-full md:min-h-screen bg-green-900 menu ">

                <NavLink
                    to="/userdashboard/userprofile"
                    className={({ isActive, isExact, isPartiallyCurrent, isPending }) => {
                        return isPending
                            ? 'pending flex items-center text-white p-3 lg:p-7 text-sm uppercase font-semibold'
                            : isActive || isExact || isPartiallyCurrent
                                ? 'active flex items-center text-black bg-green-700 lg:p-7 p-3 text-sm uppercase font-semibold'
                                : 'flex items-center text-white hover:text-black hover:bg-white p-3 lg:p-7 text-sm uppercase font-semibold';
                    }}
                >
                    <CgProfile className="mr-2 text-xl" /> My Profile
                </NavLink>


                <NavLink
                    to="/userdashboard/appointments"
                    className={({ isActive, isExact, isPartiallyCurrent, isPending }) => {
                        return isPending
                            ? 'pending flex items-center text-white p-3 lg:p-7 text-sm uppercase font-semibold'
                            : isActive || isExact || isPartiallyCurrent
                                ? 'active flex items-center text-black bg-green-700 lg:p-7 p-3 text-sm uppercase font-semibold'
                                : 'flex items-center text-white hover:text-black hover:bg-white p-3 lg:p-7 text-sm uppercase font-semibold';
                    }}
                >
                    <FaCalendar className="mr-2 text-xl" /> Upcoming Appointments
                </NavLink>


                <NavLink
                    to="/userdashboard/testresult"
                    className={({ isActive, isExact, isPartiallyCurrent, isPending }) => {
                        return isPending
                            ? 'pending flex items-center text-white p-3 lg:p-7 text-sm uppercase font-semibold'
                            : isActive || isExact || isPartiallyCurrent
                                ? 'active flex items-center text-black bg-green-700 lg:p-7 p-3 text-sm uppercase font-semibold'
                                : 'flex items-center text-white hover:text-black hover:bg-white p-3 lg:p-7 text-sm uppercase font-semibold';
                    }}
                >
                    <GrDocumentTest className="mr-2 text-xl" /> Test Results
                </NavLink>

                <NavLink
                    to="/userdashboard/review"
                    className={({ isActive, isExact, isPartiallyCurrent, isPending }) => {
                        return isPending
                            ? 'pending flex items-center text-white p-3 lg:p-7 text-sm uppercase font-semibold'
                            : isActive || isExact || isPartiallyCurrent
                                ? 'active flex items-center text-black bg-green-700 lg:p-7 p-3 text-sm uppercase font-semibold'
                                : 'flex items-center text-white hover:text-black hover:bg-white p-3 lg:p-7 text-sm uppercase font-semibold';
                    }}
                >
                    <FaStar className="mr-2 text-xl" /> Add Review
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

                <NavLink
                    to="/alltest"
                    className={({ isActive, isExact, isPartiallyCurrent, isPending }) => {
                        return isPending
                            ? 'pending flex items-center text-white p-3 lg:p-7 text-sm uppercase font-semibold'
                            : isActive || isExact || isPartiallyCurrent
                                ? 'active flex items-center text-black bg-green-700 lg:p-7 p-3 text-sm uppercase font-semibold'
                                : 'flex items-center text-white hover:text-black hover:bg-white p-3 lg:p-7 text-sm uppercase font-semibold';
                    }}
                >
                    <FaListAlt className="mr-2 text-xl" /> All Test
                </NavLink>

            </div>
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default UserDashbord;