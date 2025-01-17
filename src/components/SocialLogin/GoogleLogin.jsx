import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const GoogleLogin = () => {
    const { googleSignIn } = useAuth()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user)
                  
                        const userInfo = {
                            name: result.user?.displayName,
                            email: result.user?.email,
                            image:result.user?.photoURL,


                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data) {
                                    console.log('user added to the data base')
                                    
                                    Swal.fire({
                                        title: "success!",
                                        icon: "success",
                                        draggable: true
                                    });
                                    navigate("/")
                                }
                            })

                    })
            
    }
    return (
        <div>
            <button onClick={handleGoogleSignIn} className='hover:text-5xl'>
                <FcGoogle />
            </button>
        </div>
    );
};

export default GoogleLogin;