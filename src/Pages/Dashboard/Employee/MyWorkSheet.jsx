import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { MdDeleteForever } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useSheet from '../../../hooks/useSheet';

const MyWorkSheet = () => {
    const[sheets,refetch]=useSheet()
  
   const axiosSecure=useAxiosSecure()

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
             <div className="overflow-x-auto">
  <table className="table table-xs">
    {/* head */}
    <thead>
      <tr>
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
    sheets.map((sheet,index)=><tr key={sheet._id}>
        <th>{index+1}</th>
        <td>{sheet.tasks}</td>
        <td>{sheet.hours}</td>
        <td>{sheet.date}</td>
        <td><button onClick={()=>handleDelete(sheet._id)} className='text-red-600 text-2xl hover:text-3xl'>
        <MdDeleteForever /></button> </td>
        <td><button  className='text-green-600 text-2xl hover:text-3xl'>
        <FaEdit
         /> </button></td>
      </tr>)
  }
    
    </tbody>
  </table>
</div>
        </div>
    );
};

export default MyWorkSheet;