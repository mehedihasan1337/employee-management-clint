
import { NavLink, Outlet } from 'react-router-dom';
// import useAdmin from '../hooks/useAdmin';
// import useHr from '../hooks/useHr';


const Dashboard = () => {

    // const [isAdmin] = useAdmin()
    // const [isHr] = useHr()



    return (
        <div className='flex font-roboto '>

            <div className='lg:w-72 w-4/12  min-h-screen  bg-blue-600'>
                <div className="flex gap-3 mx-auto w-10/12 items-center rounded-lg mt-6 ">
                    <img className='md:w-10  w-6' src="https://i.ibb.co.com/cxV32Cm/Employee-Logo.png" alt="" />
                    <h2 className='lg:text-2xl text-xs font-roboto font-bold text-white'>Employee M.</h2>
                </div>


                {/* {
                    isAdmin ? <>
                        <div className='lg:w-10/12 md:p-1 mx-auto lg:mt-5 mt-1 text-xs md:text-lg text-white'>
                            <NavLink className="uppercase  "
                                to="/dashboard/all-employee-list">
                                All Employee List</NavLink>
                        </div>
                        <div className='lg:w-10/12 md:p-1 mx-auto lg:mt-5 mt-1 text-xs md:text-lg text-white'>
                            <NavLink className="uppercase  "
                                to="/dashboard/payroll">
                                payroll</NavLink>
                        </div>
                    </> :
                        <>

                        {
                            isHr? <>
                             <div className='lg:w-10/12 md:p-1 mx-auto lg:mt-5 mt-1 text-xs md:text-lg text-white'>
                                <NavLink className="uppercase  "
                                    to="/dashboard/employee-list">
                                    Employee List</NavLink>
                            </div>
                            <div className='lg:w-10/12 md:p-1 mx-auto lg:mt-5 mt-1 text-xs md:text-lg text-white'>
                                <NavLink className="uppercase  "
                                    to="/dashboard/progress">
                                    Progress</NavLink>
                            </div>
                            </>:<>
                            <div className='lg:w-10/12 p-1 mx-auto lg:mt-5 mt-1 text-xs md:text-lg text-white'>
                                <NavLink className="uppercase  "
                                    to="/dashboard/work-sheet">
                                    Work Sheet</NavLink>
                            </div>
                            <div className='lg:w-10/12 md:p-1 mx-auto lg:mt-5 mt-1 text-xs md:text-lg text-white'>
                                <NavLink className="uppercase  "
                                    to="/dashboard/payment-history">
                                    Payment History</NavLink>
                            </div>
                            </>
                        }
                           
                           
                        </>
                } */}

                <div className='lg:w-10/12 p-1 mx-auto lg:mt-5 mt-1 text-xs md:text-lg text-white'>
                    <NavLink className="uppercase  "
                        to="/dashboard/work-sheet">
                        Work-Sheet</NavLink>
                </div>
                <div className='lg:w-10/12 md:p-1 mx-auto lg:mt-5 mt-1 text-xs md:text-lg text-white'>
                    <NavLink className="uppercase  "
                        to="/dashboard/payment-history">
                        Payment-History</NavLink>
                </div>
                <div className='lg:w-10/12 md:p-1 mx-auto lg:mt-5 mt-1 text-xs md:text-lg text-white'>
                    <NavLink className="uppercase  "
                        to="/dashboard/employee-list">
                        Employee-List</NavLink>
                </div>
                <div className='lg:w-10/12 md:p-1 mx-auto lg:mt-5 mt-1 text-xs md:text-lg text-white'>
                    <NavLink className="uppercase  "
                        to="/dashboard/progress">
                        Progress</NavLink>
                </div>

                <div className='lg:w-10/12 md:p-1 mx-auto lg:mt-5 mt-1 text-xs md:text-lg text-white'>
                    <NavLink className="uppercase  "
                        to="/dashboard/all-employee-list">
                        All-Employee-List</NavLink>
                </div>
                <div className='lg:w-10/12 md:p-1 mx-auto lg:mt-5 mt-1 text-xs md:text-lg text-white'>
                    <NavLink className="uppercase  "
                        to="/dashboard/payroll">
                        payroll</NavLink>
                </div>



                <div className='divider'></div>


                <div className='w-10/12 mx-auto mt-5 text-xs md:text-lg text-white'>
                    <NavLink className="uppercase  "
                        to="/">
                        Home</NavLink>
                </div>
                <div className='w-10/12 mx-auto mt-5 text-xs md:text-lg text-white'>
                    <NavLink className="uppercase  "
                        to="/">
                        Contact</NavLink>
                </div>

            </div>
            <div className='lg:p-10 px-3 py-6'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;