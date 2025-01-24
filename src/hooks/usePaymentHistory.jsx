import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const usePaymentHistory = () => {
    const {user}=useAuth()
    const axiosSecure =useAxiosSecure()
    const {data:payments=[], refetch}=useQuery({
        queryKey:['payments',user.email],
        queryFn: async()=>{
            const res= await axiosSecure.get(`/payments/${user.email}`)
            return res.data
        }  
    })
    return [payments,refetch]
};

export default usePaymentHistory;