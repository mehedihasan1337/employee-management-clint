import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useHr from "../hooks/useHr";
import Loading from "../components/Loading";



const HrRoute = ({children}) => {
    const{user, loading}=useAuth()
    const[isHr, isHrLoading]=useHr()
    const location =useLocation()
    if(loading || isHrLoading){
        return <Loading></Loading>
    }
    if(user && isHr){
        return children
    }
    return <Navigate to="/" state={{from:location}} replace></Navigate>
};

export default HrRoute;