import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className='flex font-roboto '>
           
            <div className='lg:w-72  min-h-screen  bg-blue-600'>
            <div className="flex gap-3 mx-auto w-10/12 items-center rounded-lg mt-6 ">
                    <img className='md:w-10 w-6' src="https://i.ibb.co.com/cxV32Cm/Employee-Logo.png" alt="" />
                      <h2 className='lg:text-2xl font-roboto font-bold text-white'>Employee M.</h2>
                </div>
                  <div className='w-10/12 mx-auto mt-5 text-xs md:text-lg text-white'>
                  <NavLink className="uppercase  "
                                    to="/dashboard/work-sheet">
                                   Work Sheet</NavLink>
                  </div>

            </div>
            <div className='p-10'>
               <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;