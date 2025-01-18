import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const UpdateWorkSheet = () => {

    const sheet = useParams()
    const [sheetUp, setSheetUp] = useState()
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    console.log(sheet)
   

    useEffect(() => {
        fetchData()
    }, [sheet.id])
    const fetchData = async () => {
        const { data } = await axiosSecure.get(`/sheets/single/${sheet.id}`)
        console.log(data)
        setSheetUp(data)
    }

    const onSubmit = async (data) => {
        console.log(data)

        const workSheet = {
            tasks: data.tasks,
            hours: data.hours,
            date: data.date,
            email: user.email
        }
        const sheetRes = await axiosSecure.patch(`/sheets/update/${sheetUp?._id}`, workSheet)
        console.log(sheetRes.data)
        if (sheetRes.data.modifiedCount > 0) {

            navigate("/dashboard/work-sheet")
            Swal.fire({
                position: "top",
                icon: "success",
                title:'is Updated to the Work Sheet',
                showConfirmButton: false,
                timer: 1500
            });
        }

    }


    return (
        <div>
            <div >
                <p>{sheet.id}</p>
                <h2 className='text-center lg:text-3xl md:text-2xl text-xl
                   font-bold font-roboto text-blue-700'>Update Work Sheet {sheetUp?.tasks}</h2>
                <form onSubmit={handleSubmit(onSubmit)}
                    className="flex  flex-col gap-3 ">
                    <div className='form-control w-full '>
                        <span className="text-black font-bold">Tasks*</span>
                        <select
                        defaultValue={sheetUp?.tasks} {...register("tasks", { required: true })}
                            className="select select-bordered  text-blue-700 font-semibold w-full bg-opacity-30 rounded-none text-xl ">
                            <option disabled value="default">Roles </option>
                            <option value="Sales">Sales</option>
                            <option value="Support">Support</option>
                            <option value="Content">Content</option>
                            <option value="Paper-work">Paper-work</option>


                        </select>
                    </div>
                    
                    <div className=" ">

                        <span className="text-black font-bold">Hours*</span>

                        <input type="number" 
                        defaultValue={sheetUp?.hours} {...register('hours', { required: true })} placeholder="Hours"
                            className="input text-black font-semibold w-full bg-opacity-30 rounded-none input-bordered" />

                    </div>
                    <div className=" ">

                        <span  className="text-black font-bold">Date*</span>
                        <input defaultValue={sheetUp?.date}
                         type="date" {...register('date', { required: true })}


                            className="input text-black font-semibold w-full bg-opacity-30 rounded-none input-bordered" />

                    </div>

                    <div className="form-control mt-6">
                        <button className="btn rounded-none text-white text-xl font-bold btn-primary">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateWorkSheet;