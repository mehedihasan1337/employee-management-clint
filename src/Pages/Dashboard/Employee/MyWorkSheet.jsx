import { useState } from 'react';

import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { MdDeleteForever } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useSheet from '../../../hooks/useSheet';

import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';

const MyWorkSheet = () => {
  const [sheets, refetch] = useSheet()
  const [selectedUser, setSelectedUser] = useState(null)
  const { register, handleSubmit, reset } = useForm()
  const axiosSecure = useAxiosSecure()
  const { user } = useAuth()

  const handleDelete = id => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        axiosSecure.delete(`/sheets/${id}`)
          .then(res => {
            if (res.data.deletedCount > 0)
              refetch()
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          })

      }
    });
  }
  const onSubmit = async (data) => {
    // console.log(data)

    const workSheet = {
      tasks: data.tasks,
      hours: data.hours,
      date: data.date,
      email: user.email
    }
    const sheetRes = await axiosSecure.patch(`/sheets/update/${selectedUser._id}`, workSheet)
    // console.log(sheetRes.data)
    if (sheetRes.data.modifiedCount > 0) {

      reset()
      Swal.fire({
        position: "top",
        icon: "success",
        title: 'is Updated to the Work Sheet',
        showConfirmButton: false,
        timer: 1500
      });
    }

  }



  return (
    <div>
      <div className="overflow-x-auto mt-8 w-60 sm:w-96 md:w-11/12 lg:w-full  text-xs">
        <table className="table table-xs font-roboto">
          {/* head */}
          <thead>
            <tr className='font-roboto font-semibold text-white  text-xs md:text-lg ' >
              <th className='text-center bg-blue-500'>No</th>
              <th className='text-center bg-blue-600'>Tasks</th>
              <th className='text-center bg-blue-500'>Hours</th>
              <th className='text-center bg-blue-600'>Date</th>
              <th className='text-center bg-blue-500'>Delete</th>
              <th className='text-center bg-blue-600'>Edit</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {
              sheets.map((sheet, index) => <tr className='font-roboto font-semibold text-black ' key={sheet._id}>
                <th className='text-xs md:text-lg text-center' >{index + 1}</th>
                <td className='text-xs md:text-lg text-center bg-slate-200'>{sheet.tasks}</td>
                <td className='text-xs md:text-lg text-center'>{sheet.hours}</td>
                <td className='text-xs md:text-lg text-center bg-slate-200'>{sheet.date}</td>
                <td className='text-xs md:text-lg text-center'><button onClick={() => handleDelete(sheet._id)} className='text-red-600 text-2xl hover:text-3xl'>
                  <MdDeleteForever /></button> </td>
                <td className='text-xs md:text-lg text-center bg-slate-200'>
                  <button
                    className='text-green-600 text-2xl hover:text-3xl'
                    onClick={() => setSelectedUser(sheet)}
                  >
                    <FaEdit />
                  </button>
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
            <div >

              <h2 className='text-center lg:text-3xl md:text-2xl text-xl
                 font-bold font-roboto text-blue-700'>Update Work Sheet</h2>
              <form onSubmit={handleSubmit(onSubmit)}
                className="flex  flex-col gap-3 ">
                <div className='form-control w-full '>
                  <span className="text-black font-bold">Tasks*</span>
                  <select
                    defaultValue={selectedUser.tasks} {...register("tasks", { required: true })}
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
                    defaultValue={selectedUser.hours} {...register('hours', { required: true })} placeholder="Hours"
                    className="input text-black font-semibold w-full bg-opacity-30 rounded-none input-bordered" />

                </div>
                <div className=" ">

                  <span className="text-black font-bold">Date*</span>
                  <input defaultValue={selectedUser.date}
                    type="date" {...register('date', { required: true })}


                    className="input text-black font-semibold w-full bg-opacity-30 rounded-none input-bordered" />

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
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyWorkSheet;