import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { MdDeleteForever } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useSheet from '../../../hooks/useSheet';
import { Link } from 'react-router-dom';
import UpdateWorkSheet from './UpdateWorkSheet';

const MyWorkSheet = () => {
  const [sheets, refetch] = useSheet()

  const axiosSecure = useAxiosSecure()

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




  return (
    <div>
      <div className="overflow-x-auto font-roboto">
        <table className="table table-xs font-roboto">
          {/* head */}
          <thead>
            <tr className='font-roboto font-semibold text-blue-600  text-xs md:text-lg ' >
              <th>No</th>
              <th>Tasks</th>
              <th>Hours</th>
              <th>Date</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {
              sheets.map((sheet, index) => <tr className='font-roboto font-semibold text-black '  key={sheet._id}>
                <th className='text-xs md:text-lg' >{index + 1}</th>
                <td className='text-xs md:text-lg'>{sheet.tasks}</td>
                <td className='text-xs md:text-lg'>{sheet.hours}</td>
                <td className='text-xs md:text-lg'>{sheet.date}</td>
                <td className='text-xs md:text-lg'><button onClick={() => handleDelete(sheet._id)} className='text-red-600 text-2xl hover:text-3xl'>
                  <MdDeleteForever /></button> </td>
                <td>
                  <Link to={`/dashboard/UpdateSheet/${sheet._id}`}>

                  
                  <button className='text-green-600 text-2xl hover:text-3xl' onClick={() => document.getElementById(`/dashboard/UpdateSheet/${sheet._id}`).showModal()}><FaEdit/></button>
                  <dialog id={`/dashboard/UpdateSheet/${sheet._id}`} className="modal">
                    <div className="modal-box">
                      <form method="dialog">
                      <UpdateWorkSheet></UpdateWorkSheet>
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                      </form>
                      
                    </div>
                  </dialog>


                </Link>
                </td>
              </tr>)
            }

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyWorkSheet;