
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';


const useHr = () => {
    const{user}=useAuth()
    const axiosSecure=useAxiosSecure()
    const {data:isHr}=useQuery({
        queryKey:[user?.email,'isHr'],
        queryFn: async()=>{
          const res=await axiosSecure.get(`/users/hr/${user.email}`)
          console.log(res.data)
          return res.data?.hr
        }
    })
    return [isHr]
};

export default useHr;