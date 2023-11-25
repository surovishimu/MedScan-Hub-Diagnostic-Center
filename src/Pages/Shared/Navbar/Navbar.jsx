import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../../../public/image/logo.png'

import useAuth from '../../../Hooks/useAuth';


const Navbar = () => {
    const { user, logOut } = useAuth();
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!isDrawerOpen);
    };

    const navOptions = <div className='flex flex-col lg:flex-row justify-normal items-center '>
        <NavLink
            to="/"
            className={({ isActive, isExact, isPartiallyCurrent, isPending }) => {
                return isPending
                    ? 'pending text-white p-3 lg:p-7 text-sm uppercase font-semibold'
                    : isActive || isExact || isPartiallyCurrent
                        ? 'active text-black bg-green-700 lg:p-7 p-3 text-sm uppercase font-semibold'
                        : 'text-white hover:text-black hover:bg-white p-3 lg:p-7 text-sm uppercase font-semibold';
            }}
        >
            Home
        </NavLink>
        <NavLink
            to="aboutus"
            className={({ isActive, isExact, isPartiallyCurrent, isPending }) => {
                return isPending
                    ? 'pending text-white p-3 lg:p-7 text-sm uppercase font-semibold'
                    : isActive || isExact || isPartiallyCurrent
                        ? 'active text-black bg-green-700 lg:p-7 p-3 text-sm uppercase font-semibold'
                        : 'text-white hover:text-black hover:bg-white p-3 lg:p-7 text-sm uppercase font-semibold';
            }}
        >
            About Us
        </NavLink>
        <NavLink
            to="alltest"
            className={({ isActive, isExact, isPartiallyCurrent, isPending }) => {
                return isPending
                    ? 'pending text-white p-3 lg:p-7 text-sm uppercase font-semibold'
                    : isActive || isExact || isPartiallyCurrent
                        ? 'active text-black bg-green-700 lg:p-7 p-3 text-sm uppercase font-semibold'
                        : 'text-white hover:text-black hover:bg-white p-3 lg:p-7 text-sm uppercase font-semibold';
            }}
        >
            All Test
        </NavLink>
        <NavLink
            to="gallery"
            className={({ isActive, isExact, isPartiallyCurrent, isPending }) => {
                return isPending
                    ? 'pending text-white p-3 lg:p-7 text-sm uppercase font-semibold'
                    : isActive || isExact || isPartiallyCurrent
                        ? 'active text-black bg-green-700 lg:p-7 p-3 text-sm uppercase font-semibold'
                        : 'text-white hover:text-black hover:bg-white p-3 lg:p-7 text-sm uppercase font-semibold';
            }}
        >
            Gallery
        </NavLink>

        <NavLink
            to="userdashboard/userprofile"
            className={({ isActive, isExact, isPartiallyCurrent, isPending }) => {
                return isPending
                    ? 'pending text-white p-3 lg:p-7 text-sm uppercase font-semibold'
                    : isActive || isExact || isPartiallyCurrent
                        ? 'active text-black bg-green-700 lg:p-7 p-3 text-sm uppercase font-semibold'
                        : 'text-white hover:text-black hover:bg-white p-3 lg:p-7 text-sm uppercase font-semibold';
            }}
        >
            Dashboard
        </NavLink>

        <NavLink
            to="admindashboard/allusers"
            className={({ isActive, isExact, isPartiallyCurrent, isPending }) => {
                return isPending
                    ? 'pending text-white p-3 lg:p-7 text-sm uppercase font-semibold'
                    : isActive || isExact || isPartiallyCurrent
                        ? 'active text-black bg-green-700 lg:p-7 p-3 text-sm uppercase font-semibold'
                        : 'text-white hover:text-black hover:bg-white p-3 lg:p-7 text-sm uppercase font-semibold';
            }}
        >
            Admin Dashboard
        </NavLink>
        {
            user?.email ?
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">


                        <div className="w-10 rounded-full">
                            <img src={user.photoURL} alt={user.displayName} />
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-md dropdown-content mt-2 z-[1] p-2 shadow bg-base-100 w-60 ">
                        <li>
                            <button className="btn btn-sm text-black btn-ghost">{user.displayName}</button>
                        </li>
                        <li>
                            <button className="btn btn-sm  btn-ghost"
                                onClick={logOut}
                            >Logout</button>

                        </li>
                    </ul>
                </div>
                :
                <NavLink
                    to="login"
                    className={({ isActive, isExact, isPartiallyCurrent, isPending }) => {
                        return isPending
                            ? 'pending text-white p-3 lg:p-7 text-sm uppercase font-semibold'
                            : isActive || isExact || isPartiallyCurrent
                                ? 'active text-black bg-green-700 lg:p-7 p-3 text-sm uppercase font-semibold'
                                : 'text-white hover:text-black hover:bg-white p-3 lg:p-7 text-sm uppercase font-semibold';
                    }}
                >
                    Login
                </NavLink>
        }


    </div>


    return (
        <nav className="bg-green-900 px-6">
            <div className="container mx-auto flex justify-between items-center">

                <div className='flex flex-col items-center -space-y-3'>
                    <img className='w-20 h-16' src={logo} alt="" /><a href="/" className="text-orange-300 text-lg font-bold">MedScan <span className='text-green-300'>Hub</span></a>
                </div>

                {/* large device */}
                <div className=''>
                    <ul className="hidden lg:flex space-x-4">
                        {navOptions}
                    </ul>
                </div>

                {/*Small devices */}
                <div className="lg:hidden">
                    <button onClick={toggleDrawer} className="text-white focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                    </button>
                </div>

                {/* Drawer for small devices */}
                {isDrawerOpen && (
                    <div className="lg:hidden absolute top-0 left-0 w-9/12 h-full bg-green-800 bg-opacity-95 z-10">
                        <div className="flex justify-end p-4">
                            <button onClick={toggleDrawer} className="text-white">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                        <div className="flex flex-col items-center">
                            <ul className="menu menu-horizontal px-1">
                                {navOptions}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
