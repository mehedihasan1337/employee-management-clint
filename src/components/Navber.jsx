import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import { FaRegUserCircle } from 'react-icons/fa';
import { IoIosLogOut } from 'react-icons/io';

const Navber = () => {
    const { user, logOut } = useContext(AuthContext)
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            // .catch(error => console.log(error))
    }
    return (
        <div className=''>
            <div className="navbar  lg:max-w-screen-xl lg:mx-36  ">
                <div className="flex-1 gap-2">
                    <img id='home' className='md:w-10 w-6' src="https://i.ibb.co.com/98qSn7J/Employee-Logo.png" alt="" />
                    <h2 className='lg:text-2xl hidden lg:block font-roboto font-bold text-white'>Employee M.</h2>
                </div>
                <div className='md:gap-3 gap-1'>
           {
            user ? <>
            <NavLink to="/dashboard" className="border border-black text-black hover:bg-blue-500 hover:text-white font-bold px-1 rounded-sm text-xs md:text-lg  ">Dashboard</NavLink>
            <NavLink to="/" className="border border-black text-black hover:bg-blue-500 hover:text-white font-bold px-1 rounded-sm text-xs md:text-lg  ">Home</NavLink>
           
            <a className="border border-black text-black hover:bg-blue-500 hover:text-white font-bold px-1 rounded-sm text-xs md:text-lg  " href="#contact">Contact </a>
            </>:<>
            <NavLink to="/login" className="border border-black text-black hover:bg-blue-500 hover:text-white font-bold px-1 rounded-sm text-xs md:text-lg ">Login</NavLink>
                    <NavLink to="/register" className="border border-black text-black hover:bg-blue-500 hover:text-white font-bold px-1 rounded-sm text-xs md:text-lg  ">Register</NavLink>
                    <a className="border border-black text-black hover:bg-blue-500 hover:text-white font-bold px-1 rounded-sm text-xs md:text-lg  " href="#contact">Contact </a>  
            </>
           }
                </div>
                <div className="flex-none gap-2 rounded-3xl px-2  ml-1">
                   
                    {
                        user ? <>
                         <h2 className='text-xs md:text-lg  '>{user?.displayName}</h2>
                            <div className="dropdown dropdown-end">

                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="md:w-10 w-6 rounded-full">
                                        <img
                                            alt="Tailwind CSS Navbar component"
                                            src={user?.photoURL} />
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm text-white font-roboto font-bold dropdown-content  bg-blue-600 rounded-box z-[1] mt-3 w-52 p-2 ">
                                    <li>
                                        <a className="justify-between">
                                            Profile

                                        </a>
                                    </li>

                                    <li><button className='text-red-600 ' onClick={handleLogOut}>Log Out <IoIosLogOut className='text-xl' /></button></li>
                                </ul>
                            </div>
                        </> :
                            <>
                                <FaRegUserCircle className='text-3xl md:text-4xl' />
                            </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navber;