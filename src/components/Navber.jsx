import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import { FaRegUserCircle } from 'react-icons/fa';

const Navber = () => {
    const {user ,logOut}=useContext(AuthContext)
     const handleLogOut=()=>{
        logOut()
        .then(()=>{})
        .catch (error=> console.log(error))
     }
    return (
        <div className=''>
            <div className="navbar  lg:max-w-screen-xl lg:mx-36  ">
                <div className="flex-1">
                    <img className='md:w-10 w-6' src="https://i.ibb.co.com/98qSn7J/Employee-Logo.png" alt="" />
                </div>
                <div className='gap-3'>
                    <NavLink to="/login" className="border border-black text-black hover:bg-blue-500 hover:text-white font-bold px-1 rounded-sm text-xs md:text-lg ">Login</NavLink>
                    <NavLink to="/register" className="border border-black text-black hover:bg-blue-500 hover:text-white font-bold px-1 rounded-sm text-xs md:text-lg  ">Register</NavLink>
                </div>
                <div className="flex-none gap-2 rounded-3xl px-2 hover:bg-slate-300 ml-1">
                    <h2 className='text-xs md:text-lg  '>hdfgjikjjgsdkjg</h2>
                    {
                        user ? <>
                        <div className="dropdown dropdown-end">

<div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
    <div className="md:w-10 w-6 rounded-full">
        <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
    </div>
</div>
<ul
    tabIndex={0}
    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
    <li>
        <a className="justify-between">
            Profile

        </a>
    </li>

    <li><button onClick={handleLogOut}>Log Out</button></li>
</ul>
</div>
                        </>: 
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