import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Progress = () => {
const axiosSecure=useAxiosSecure()
    const { data: sheets = [] } = useQuery({
        queryKey: ['sheets'],
        queryFn: async () => {
            const res = await axiosSecure.get('/sheets')
            return res.data
        }
    })
    return (
        <div>
            akhana search hoba
            <h2 className='font-roboto  lg:text-3xl mb-3
             text-black font-bold text-xs md:text-lg'> Employee: {sheets?.length}</h2>
              <div className="overflow-x-auto w-60 sm:w-96 md:w-11/12 lg:w-full  text-xs">
        <table className="table table-xs font-roboto ">
          {/* head */}
          <thead>
            <tr className='font-roboto font-semibold text-whitetext-xs md:text-lg' >
              <th className='text-center bg-blue-500'>No</th>
              <th className='text-center bg-blue-600'>Name</th>
              <th className='text-center bg-blue-500'>Email</th>
              <th className='text-center bg-blue-600'>Tasks</th>
              <th className='text-center bg-blue-500'>Hours</th>
              <th className='text-center bg-blue-600'>Date</th>
             
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {
              sheets.map((sheet, index) => <tr className='font-roboto font-semibold text-black '  key={sheet._id}>
                <th className='text-xs md:text-lg text-center ' >{index + 1}</th>
                <td className='text-xs md:text-lg bg-slate-200'>{sheet.name}</td>
                <td className='text-xs md:text-lg '>{sheet.email}</td>
                <td className='text-xs md:text-lg  bg-slate-200'>{sheet.tasks}</td>
                <td className='text-xs md:text-lg text-center '>{sheet.hours}</td>
                <td className='text-xs md:text-lg  bg-slate-200'>{sheet.date}</td>
               
              </tr>)
            }

          </tbody>
        </table>
      </div>
        </div>
    );
};

export default Progress;