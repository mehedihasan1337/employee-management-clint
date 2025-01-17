
import { Link, useLocation, useNavigate } from 'react-router-dom';
import loginLottie from '../assets/loginLottie.json'
import Lottie from 'lottie-react';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import GoogleLogin from './SocialLogin/GoogleLogin';

const Login = () => {
 
    const{signIn}=useContext(AuthContext)
    const navigate =useNavigate()
    const location=useLocation()
    
    const from =location.state?.from?.pathname ||"/"
        useEffect(() => {
            
        }, [])
    const handleLogin = event => {
        event.preventDefault()
        const form = event.target
        const email = form.email.value
        const password = form.password.value
        console.log(email, password)
        signIn(email, password)
        .then(result=>{
            const user =result.user
            console.log(user)
            Swal.fire({
                title: "Login!",
                icon: "success",
                draggable: true
              });
           
              navigate(from,{replace:true})

        })
    }


    return (
        <div className='w-10/12 mx-auto items-center font-roboto'>
            <div className='bg-loginBG bg-cover mt-10 '>
                <div className='hidden lg:block'>
                <h2 className='lg:text-5xl md:text-3xl text-2xl font-bold text-center py-3 text-black'> Welcome to Login Page </h2>
                <p className='font-semibold text-black text-center'>Need an account? <Link to="/register"><span className='text-lg text-blue-700'>Register</span></Link></p>
                </div>
               <div className='flex flex-col lg:flex-row justify-between lg:p-20 p-6  items-center gap-10'>
               
               <div className=''>
                    <Lottie animationData={loginLottie}></Lottie>
                </div>
                <div className=' w-full'>
                <div className='lg:hidden block'>
                <h2 className=' md:text-4xl text-2xl font-bold text-center  text-black'> Welcome to Login Page </h2>
                <p className='font-semibold mb-6 text-black text-center'>Need an account? <Link to="/register"><span className='text-lg text-blue-700'>Register</span></Link></p>
                </div>
                        <h2 className='text-4xl font-roboto font-bold text-blue-700  mb-5'>Login</h2>
                    <form onSubmit={handleLogin} className="w-full'">
                        <div className=" ">
                            <label className="label">
                                <span className="text-black font-bold">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" 
                            className="input text-black font-semibold w-full bg-opacity-30 rounded-none input-bordered" required />
                        </div>
                        <div className="">
                            <label className="label">
                                <span className="text-black font-bold">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password"
                             className="input text-black font-semibold w-full bg-opacity-30  rounded-none input-bordered" required />
                               <p className='text-blue-800 font-semibold' >Forgot Password?</p>
                        
                        </div>

                        {/* disabled={disabled}  */}
                        <div className="form-control mt-6">
                            <button className="btn rounded-none text-white text-xl font-bold btn-primary">Login</button>
                        </div>
                    </form>
                    <div className='divider font-bold font-roboto text-xl'>or</div>
                        <div className='text-center text-4xl'>
                        <GoogleLogin></GoogleLogin>
                        </div>
                </div>
               </div>
            </div>
        </div>
    );
};

export default Login;