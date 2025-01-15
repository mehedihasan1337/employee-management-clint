
import { useContext } from 'react';

import { AuthContext } from '../Provider/AuthProvider';
import Loading from '../components/Loading';
import { Navigate, useLocation } from 'react-router-dom';
// import useAuth from '../hooks/useAuth';

const PrivateRoute = ({children}) => {
    const {user,loading}=useContext(AuthContext)
    const location =useLocation()
    if(loading){
        return <Loading></Loading>
    }
    if(user){
        return children
    }
    return <Navigate to="/login" state={{from:location}} replace></Navigate>
};

export default PrivateRoute;