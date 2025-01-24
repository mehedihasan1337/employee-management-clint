import React from 'react';
import usePaymentHistory from './../../../hooks/usePaymentHistory';

const PaymentHistory = () => {
    const [payments, refetch] = usePaymentHistory()
    return (
        <div>
            <div className='mt-10'>

                <div className="overflow-x-auto w-60 sm:w-96 md:w-11/12 lg:w-full  text-xs">
                    <table className="table table-xs font-roboto  ">
                        {/* head */}
                        <thead>
                            <tr className='font-roboto font-semibold   text-white  text-xs md:text-lg' >
                                <th className='text-center bg-blue-600'>No</th>

                                <th className='text-center bg-blue-500'>Month-Year</th>
                                <th className='text-center bg-blue-600'>Amount</th>
                                <th className='text-center bg-blue-500'>Transaction-Id</th>

                                <th className='text-center bg-blue-600'>payment-date </th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                payments.map((payment, index) => <tr className='font-roboto font-semibold text-black ' key={payment._id}>
                                    <th className='text-xs md:text-lg text-center  bg-slate-200' >{index + 1}</th>
                                    <td className='text-xs md:text-lg '>{payment.month}-{payment.year}</td>
                                    <td className='text-xs md:text-lg text-center bg-slate-200'>{payment.salary}</td>
                                    <td className='text-xs md:text-lg '> {payment.transactionId}</td>
                                    <td className='text-xs md:text-lg text-center bg-slate-200'>
                                        {new Date(payment.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
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

export default PaymentHistory;