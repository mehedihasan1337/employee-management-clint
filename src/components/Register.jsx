import Lottie from 'lottie-react';

import { Link } from 'react-router-dom';
import registerLottie from '../assets/registerLottie.json'
import { useForm } from 'react-hook-form';
import { AuthContext } from '../Provider/AuthProvider';
import { useContext } from 'react';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { createUser, updateUserProfile } = useContext(AuthContext)
    const onSubmit = data => {
        console.log(data)
        createUser(data.email, data.password)
            .then(result => {
                const loginUser = result.user
                console.log(loginUser)
            })
    }
   
    
    return (
        <div className='w-10/12 mx-auto items-center font-roboto'>
        <div className='bg-regBG bg-cover mt-10 '>
            <div className='hidden lg:block'>
            <h2 className='lg:text-5xl md:text-3xl text-2xl font-bold text-center py-3 text-black'> Welcome to Register Page </h2>
            <p className='font-semibold text-black text-center'>Already Registered? <Link to="/login"><span className='text-lg text-blue-700'>Login</span></Link></p>
            </div>
           <div className='flex flex-col lg:flex-row justify-between lg:p-20 p-6  items-center gap-10'>
           
           <div className=''>
                <Lottie animationData={registerLottie}></Lottie>
            </div>
            <div className=' w-full'>
            <div className='lg:hidden block'>
            <h2 className=' md:text-4xl text-2xl font-bold text-center  text-black'> Welcome to Register Page </h2>
            <p className='font-semibold mb-6 text-black text-center'>Already Registered? <Link to="/login"><span className='text-lg text-blue-700'>Login</span></Link></p>
            </div>
                    <h2 className='text-4xl font-roboto font-bold text-blue-700  mb-5'>Register</h2>
                <form  onSubmit={handleSubmit(onSubmit)}
                 className="w-full'">
                    <div className=" ">
                        <label className="label">
                            <span className="text-black font-bold">Name</span>
                        </label>
                        <input type="text" {...register('name',{ required: true })} placeholder="Name" 
                        className="input text-black font-semibold w-full bg-opacity-30 rounded-none input-bordered" />
                    {errors.name && <span className="text-red-600 ">Name is required</span>}
                    </div>
                    <div className=" ">
                        <label className="label">
                            <span className="text-black font-bold">Email</span>
                        </label>
                        <input type="email" {...register('email',{ required: true })}  placeholder="email" 
                        className="input text-black font-semibold w-full bg-opacity-30 rounded-none input-bordered"  />
                     {errors.email && <span className="text-red-600">Email is required</span>}
                    </div>
                    <div className="">
                        <label className="label">
                            <span className="text-black font-bold">Password</span>
                        </label>
                        <input type="password" {...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 20,
                                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                            })}  placeholder="password"
                         className="input text-black font-semibold w-full bg-opacity-30  rounded-none input-bordered"  />
                    {errors.password?.type === 'required' &&
                                <p className="text-red-600">Password is required</p>}
                            {errors.password?.type === 'minLength' &&
                                <p className="text-red-600">Password must be 6 characters</p>}
                            {errors.password?.type === 'maxLength' &&
                                <p className="text-red-600">Password must be less then 20 characters</p>}
                            {errors.password?.type === 'pattern' &&
                                <p className="text-red-600">Password must have one uppercase one lowercase
                                    one number and one special character</p>}
                           
                    </div>

                    {/* disabled={disabled}  */}
                    <div className="form-control mt-6">
                        <button className="btn rounded-none text-white text-xl font-bold btn-primary">Register</button>
                    </div>
                </form>
            </div>
           </div>
        </div>
    </div>
    );
};

export default Register;