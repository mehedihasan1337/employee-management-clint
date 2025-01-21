import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
;
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { TbCreditCardPay } from 'react-icons/tb';
import { MdDeleteForever } from 'react-icons/md';
import { FaUserCog, FaUserFriends } from 'react-icons/fa';

const AllEmployeeList = () => {

    const [selectedUser, setSelectedUser] = useState(null)
    const { register, handleSubmit, reset } = useForm()

    const axiosSecure = useAxiosSecure()
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })
    const filteredUsers = users.filter(user => user.role === "employee" || user.role === "hr")

    const onSubmit = async (data) => {
        console.log(data)

        const workSheet = {

            salary: data.salary,

        }
        const salaryRes = await axiosSecure.patch(`/users/update/${selectedUser._id}`, workSheet)
        console.log(salaryRes.data)
        if (salaryRes.data.modifiedCount > 0) {


            Swal.fire({
                position: "top",
                icon: "success",
                title: 'is Updated to the Work Sheet',
                showConfirmButton: false,
                timer: 1500
            });
            setSelectedUser(null);
            reset();
        }

    }

    const handleMakeHr = user => {
        axiosSecure.patch(`/users/makeHr/${user._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: `${user.name} is a HR Now !`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }
    const handleFireUser = user => {
        axiosSecure.patch(`/users/fire/${user._id}`,{ isFired: true })
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: `${user.name} is a fire !`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    document.getElementById(`fire/${user?._id}`).close();

                    refetch();
                }
               
            })

    }



    return (
        <div>
            <h2 className='font-roboto  lg:text-3xl mb-3
             text-black font-bold text-xs md:text-lg'> Employee: {filteredUsers?.length}</h2>
            <div className="overflow-x-auto w-60 sm:w-96 md:w-11/12 lg:w-full  text-xs">
                <table className="table table-xs font-roboto  ">
                    {/* head */}
                    <thead>
                        <tr className='font-roboto font-semibold  text-white bg-blue-500 text-xs md:text-lg' >
                            <th>No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Designation</th>
                            <th>accountNo</th>
                            <th>salary</th>
                            <th>Adjust Salary</th>
                            <th>Make HR</th>
                            <th>Fire</th>



                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            filteredUsers.map((user, index) => <tr className='font-roboto font-semibold text-black ' key={user._id}>
                                <th className='text-xs md:text-lg' >{index + 1}</th>
                                <td className='text-xs md:text-lg'>{user.name}</td>
                                <td className='text-xs md:text-lg'>{user.email}</td>
                                <td className='text-xs md:text-lg'>{user.designation}</td>
                                <td className='text-xs md:text-lg'>{user.accountNo}</td>
                                <td className='text-xs md:text-lg text-center'>{user.salary}</td>
                                <td className='text-xs md:text-lg text-center'>
                                    <button
                                        className='text-green-600 text-2xl hover:text-3xl'
                                        onClick={() => setSelectedUser(user)}
                                    >
                                        <TbCreditCardPay />
                                    </button>
                                </td>
                                <td className='text-xs md:text-lg text-center'>
                                    {user.role === 'hr' ? <button className='text-green-600 text-2xl hover:text-3xl'>
                                        <FaUserCog /></button>
                                        :
                                        <button onClick={() => handleMakeHr(user)} className='text-blue-600 text-2xl hover:text-3xl'>
                                            <FaUserFriends /></button>}
                                </td>

                                <td>
                                    {user.isFired ? (
                                        <span className="text-red-500 font-bold">Fired</span>
                                    ) : (
                                        <button
                                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                            onClick={() => document.getElementById(`fire/${user?._id}`).showModal()}
                                        >
                                            Fire
                                        </button>
                                    )}

                                    {/* Modal */}
                                    <dialog id={`fire/${user?._id}`} className="modal">
                                        <div className="modal-box">
                                            <h3 className="font-bold text-lg">Are you sure you want to fire {user.name}?</h3>
                                            <p className="py-4">This action will deactivate the user account.</p>
                                            <div className="modal-action">
                                                <button
                                                    className="btn btn-error"
                                                    onClick={() => handleFireUser(user)}
                                                >
                                                    Confirm
                                                </button>
                                                <button
                                                    className="btn"
                                                    onClick={() => document.getElementById(`fire/${user?._id}`).close()}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </dialog>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            {/* Modal  */}
            {selectedUser && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="modal-box">
                        <h2 className="text-2xl text-green-600 mb-4">
                            Adjust Salary for -{selectedUser.name}
                        </h2>
                        <h2 className="text-2xl text-green-600 mb-4">
                            Old Salary:{selectedUser.salary}
                        </h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                            <div>
                                <label className="text-black font-bold">New Salary*</label>
                                <input
                                    type="number"
                                    {...register('salary', { required: true })}
                                    placeholder="Enter new salary"
                                    className="input text-black font-semibold w-full bg-opacity-30 rounded-none input-bordered"
                                />
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    type="button"
                                    className="btn "
                                    onClick={() => setSelectedUser(null)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn bg-green-600 text-white font-bold"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllEmployeeList;