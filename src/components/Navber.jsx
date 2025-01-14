import React from 'react';
import { NavLink } from 'react-router-dom';

const Navber = () => {
    return (
        <div className=''>
            <div className="navbar fixed lg:max-w-screen-xl lg:mx-36  ">
                <div className="flex-1">
                    <img className='md:w-10 w-6' src="https://i.ibb.co.com/98qSn7J/Employee-Logo.png" alt="" />
                </div>
                <div className='gap-3'>
                    <NavLink className="border border-black text-black hover:bg-blue-500 hover:text-white font-bold px-1 rounded-sm text-xs md:text-lg ">Login</NavLink>
                    <NavLink className="border border-black text-black hover:bg-blue-500 hover:text-white font-bold px-1 rounded-sm text-xs md:text-lg  ">Register</NavLink>
                </div>
                <div className="flex-none gap-2 rounded-3xl px-2 hover:bg-slate-300 ml-1">
                    <h2 className='text-xs md:text-lg  '>hdfgjikjjgsdkjg</h2>
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

                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navber;