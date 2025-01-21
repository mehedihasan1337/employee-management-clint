import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Payroll = () => {

    const axiosSecure = useAxiosSecure()
    const { data: pays = [], refetch } = useQuery({
        queryKey: ['pays'],
        queryFn: async () => {
            const res = await axiosSecure.get('/pay')
            return res.data
        }
    })

    return (
        <div>
           <div className='mt-10'>
                   
                       <div className="overflow-x-auto w-60 sm:w-96 md:w-11/12 lg:w-full  text-xs">
                           <table className="table table-xs font-roboto  ">
                               {/* head */}
                               <thead>
                                   <tr className='font-roboto font-semibold   text-white  text-xs md:text-lg' >
                                       <th className='text-center bg-blue-500'>No</th>
                                       <th className='text-center bg-blue-600 '>Name</th>
                                       <th className='text-center bg-blue-500'>Email</th>
                                       <th className='text-center bg-blue-600'>Designation</th>
                                       <th className='text-center bg-blue-500'>Month-Year</th>
                                       <th className='text-center bg-blue-600'>Amount</th>
                                       <th className='text-center bg-blue-500'>Transaction-Id</th>
                                       <th className='text-center bg-blue-600'>Pay</th>
                                       <th className='text-center bg-blue-500'>payment-date </th>
                                   </tr>
                               </thead>
                               <tbody>
                                   {/* row 1 */}
                                   {
                                       pays.map((pay, index) => <tr className='font-roboto font-semibold text-black ' key={pay._id}>
                                           <th className='text-xs md:text-lg text-center' >{index + 1}</th>
                                           <td className='text-xs md:text-lg  bg-slate-200'>{pay.name}</td>
                                           <td className='text-xs md:text-lg '>{pay.email}</td>
                                           <td className='text-xs md:text-lg  bg-slate-200'>{pay.designation}</td>
                                           <td className='text-xs md:text-lg '>{pay.month}-{pay.year}</td>
                                           <td className='text-xs md:text-lg text-center bg-slate-200'>{pay.salary}</td>
                                           <td className='text-xs md:text-lg '>
                                            
                                           </td>
                                           <td className='text-xs md:text-lg text-center bg-slate-200'>
                                               
                                           </td>
           
                                           <td>
                                           
                                           </td>
                                       </tr>)
                                   }
           
                               </tbody>
                           </table>
                       </div>
                       
                   </div>
        </div>
    );
};

export default Payroll;