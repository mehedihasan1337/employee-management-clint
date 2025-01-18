
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useSheet = () => {
    const{user}=useAuth()
   const axiosSecure=useAxiosSecure()
   const { refetch,data:sheets=[]}=useQuery({
    queryKey:['sheets',user?.email],
    queryFn:async()=>{
   const res =await axiosSecure.get(`/sheets/${user?.email}`)
        return res.data
    }
 })
 return[sheets,refetch]
};

export default useSheet;