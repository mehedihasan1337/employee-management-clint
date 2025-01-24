import React, { useState } from 'react';


import { TbCreditCardPay } from 'react-icons/tb';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import usePay from '../../../hooks/usePay';



const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK)
const Payroll = () => {

    const [pays] = usePay()
  


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
                              
                                <th className='text-center bg-blue-500'>Pay</th>
                              
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
       
                                    <td className='text-xs md:text-lg text-center '>
                                        <button className="flex gap-1 items-center  bg-green-500  hover:bg-green-600 rounded-lg px-1
                                           text-white " onClick={() => document.getElementById(`${pay?._id}`).showModal()}><TbCreditCardPay /> Pay</button>
                                        <dialog id={pay?._id} className="modal">
                                            <div className="modal-box">
                                                <form method="dialog">
                                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                </form>
                                                <h2 className='text-2xl text-left  text-black '> Salary  :  <span className='text-green-600 '> ${pay?.salary}</span></h2>
                                                <h2 className='text-2xl text-left  text-black '>  Card No: <span className='text-green-600'>{pay?.accountNo}</span></h2>

                                                <Elements stripe={stripePromise}>
                                                    <CheckoutForm name={pay?.name}
                                                     email={pay?.email} 
                                                     month={pay?.month} 
                                                   year={ pay?.year} 
                                                   amount={pay?.salary}></CheckoutForm>

                                                </Elements>

                                            </div>
                                        </dialog>
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