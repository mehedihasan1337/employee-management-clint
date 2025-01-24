import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const usePay = () => {
    const axiosSecure = useAxiosSecure()
    const { data: pays = [], refetch } = useQuery({
        queryKey: ['pays'],
        queryFn: async () => {
            const res = await axiosSecure.get('/pay')
            return res.data
        }
    })

    return [pays,refetch]
};

export default usePay;