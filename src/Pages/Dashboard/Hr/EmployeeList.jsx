import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { TbCreditCardPay, TbListDetails } from 'react-icons/tb';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { TiDeleteOutline } from 'react-icons/ti';

const EmployeeList = () => {

    const axiosSecure = useAxiosSecure()
    const { register, handleSubmit } = useForm()
    const [verified, setVerified] = useState(localStorage.getItem('verify') || 'verified');

    useEffect(() => {
        document.documentElement.className = verified;
        localStorage.setItem('verify', verified);
    }, [verified]);

    const toggleVerify = (id) => {
        setVerified((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })
    const employees = users.filter(user => user.role === "employee")
    const onSubmit = async (data, employee) => {
        console.log(data)

        const payRqs = {

            name: employee?.name,
            email: employee?.email,
            salary: parseFloat(employee?.salary),
            accountNo: parseFloat(employee?.accountNo),
            designation: employee?.designation,
            month: data?.month,
            year: data?.year



        }
        const payRes = await axiosSecure.post('/pay', payRqs)
        console.log(payRes.data)
        if (payRes.data.insertedId) {

            Swal.fire({
                position: "top",
                icon: "success",
                title: 'Payment Request Successful ',
                showConfirmButton: false,
                timer: 1500
            });
        }

    }


    return (
        <div>
            <h2 className='font-roboto  lg:text-3xl mb-3
             text-black font-bold text-xs md:text-lg'> Employee: {employees?.length}</h2>
            <div className="overflow-x-auto w-60 sm:w-96 md:w-11/12 lg:w-full  text-xs">
                <table className="table table-xs font-roboto">
                    {/* head */}
                    <thead>
                        <tr className='font-roboto font-semibold text-white  text-xs md:text-lg' >
                            <th className='text-center bg-blue-500'>No</th>
                            <th className='text-center bg-blue-600'>Name</th>
                            <th className='text-center bg-blue-500'>Email</th>
                            <th className='text-center bg-blue-600'>Verified</th>
                            <th className='text-center bg-blue-500'>Bank Account</th>
                            <th className='text-center bg-blue-600'>Salary</th>
                            <th className='text-center bg-blue-500'>Pay</th>
                            <th className='text-center bg-blue-600'>Details</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            employees.map((employee, index) => <tr className='text-xs md:text-lg 
                            font-roboto font-semibold text-black' key={employee?._id}>
                                <th className='text-xs md:text-lg text-center '>{index + 1}</th>
                                <td className='text-xs md:text-lg  bg-slate-200'>{employee?.name}</td>
                                <td className='text-xs md:text-lg  '>{employee?.email}</td>
                                <td className='text-xs md:text-lg text-center bg-slate-200'>
                                    <button
                                        className="text-3xl text-black rounded dark:text-white"
                                        onClick={() => toggleVerify(employee._id)}
                                    >
                                        {verified[employee._id] ? (
                                             <TiDeleteOutline className="text-red-600 text-3xl" />
                                            
                                        ) : (
                                            <IoMdCheckmarkCircle className="text-green-500 text-3xl" />
                                        )}
                                    </button>
                                </td>
                                <td className='text-xs md:text-lg  '>{employee?.accountNo}</td>
                                <td className='text-xs md:text-lg text-center bg-slate-200'>{employee?.salary}</td>
                                <td className='text-xs md:text-lg text-center '>{/* You can open the modal using document.getElementById('ID').showModal() method */}
                                    <button className="flex gap-1 items-center  bg-green-500  hover:bg-green-600 rounded-lg px-1
                                     text-white " onClick={() => document.getElementById(`${employee?._id}`).showModal()}><TbCreditCardPay /> Pay</button>
                                    <dialog id={employee?._id} className="modal">
                                        <div className="modal-box">
                                            <form method="dialog">
                                                {/* if there is a button in form, it will close the modal */}
                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                            </form>
                                            <h2 className='text-2xl text-green-600 '> Salary:{employee?.salary}</h2>


                                            <form onSubmit={handleSubmit((data) => onSubmit(data, employee))}
                                                className="flex lg:flex-row flex-col gap-3 lg:items-center">
                                                <div className='form-control w-full '>
                                                    <span className="text-black font-bold">Month*</span>
                                                    <select defaultValue="default" {...register("month", { required: true })}
                                                        className="select select-bordered  text-blue-700 font-semibold w-full bg-opacity-30 rounded-none text-xl ">
                                                        <option disabled value="default">Month </option>
                                                        <option value="january">January</option>
                                                        <option value="february">February</option>
                                                        <option value="march">March</option>
                                                        <option value="april">April</option>
                                                        <option value="may">May</option>
                                                        <option value="june">June</option>
                                                        <option value="july">July</option>
                                                        <option value="august">August</option>
                                                        <option value="september ">September </option>
                                                        <option value="october">October</option>
                                                        <option value="november">November</option>
                                                        <option value="december">December</option>


                                                    </select>
                                                </div>
                                                <div className=" ">

                                                    <span className="text-black font-bold">Year*</span>

                                                    <input type="number"  {...register('year', { required: true })} placeholder="year"
                                                        className="input text-black font-semibold w-full bg-opacity-30 rounded-none input-bordered" />

                                                </div>


                                                <div className="form-control mt-6">
                                                    <button className="btn rounded-none text-white text-xl font-bold btn-primary">Submit</button>
                                                </div>
                                            </form>
                                        </div>
                                    </dialog></td>
                                <td className='text-xs md:text-lg text-center bg-slate-200 ' ><TbListDetails className=' bg-blue-400  hover:bg-blue-600 hover:text-white rounded-lg text-3xl  px-1' /></td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeList;