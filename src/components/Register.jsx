import Lottie from 'lottie-react';

import { Link, useNavigate } from 'react-router-dom';
import registerLottie from '../assets/registerLottie.json'
import { useForm } from 'react-hook-form';
import { AuthContext } from '../Provider/AuthProvider';
import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import useAxiosPublic from '../hooks/useAxiosPublic';
import GoogleLogin from './SocialLogin/GoogleLogin';


const Register = () => {
    const axiosPublic = useAxiosPublic()

    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const { createUser, updateUserProfile } = useContext(AuthContext)
    const navigate = useNavigate()
    const onSubmit = (data) => {
        console.log(data)
        createUser(data.email, data.password)
            .then(result => {
                const loginUser = result.user
                console.log(loginUser)
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            role: data.role,
                            accountNo: parseFloat(data.accountNo),
                            salary: parseFloat(data.salary),
                            designation: data.designation,
                            photoURL:data.photoURL

                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user added to the data base')
                                    reset()
                                    Swal.fire({
                                        title: "success!",
                                        icon: "success",
                                        draggable: true
                                    });
                                    navigate("/")
                                }
                            })

                    })
            })
    }


    return (

        <div className='w-10/12 mx-auto items-center font-roboto'>
            <Helmet>
                <title>Employee Management | Register</title>
            </Helmet>
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

                        <form onSubmit={handleSubmit(onSubmit)}
                            className="w-full'">
                            <div className='flex gap-3'>
                                <h2 className='text-4xl font-roboto font-bold text-blue-700  mb-5'>Register</h2>
                                {/* roles */}
                                <div className='form-control w-full '>

                                    <select defaultValue="default" {...register("role", { required: true })}
                                        className="select select-bordered  text-blue-700 font-semibold w-full bg-opacity-30 rounded-none text-xl ">
                                        <option disabled value="default">Roles </option>
                                        <option value="employee">Employee</option>
                                        <option value="hr">HR</option>
                                        <option disabled={true} value="admin">Admin</option>

                                    </select>
                                </div>

                            </div>
                            {/* name */}
                            <div className=" ">
                                <label className="label">
                                    <span className="text-black font-bold">Name*</span>
                                </label>
                                <input type="text" {...register('name', { required: true })} placeholder="Name"
                                    className="input text-black font-semibold w-full bg-opacity-30 rounded-none input-bordered" />
                                {errors.name && <span className="text-red-600 ">Name is required</span>}
                            </div>
                            {/* bank account no */}
                            <div className=" ">
                                <label className="label">
                                    <span className="text-black font-bold">Bank Account No*</span>
                                </label>
                                <input type="number" {...register('accountNo', { required: true,
                                    minLength: 16,
                                    maxLength: 16,
                                 })} placeholder="Bank Account No"
                                    className="input text-black font-semibold w-full bg-opacity-30 rounded-none input-bordered" />
                                {errors.accountNo && <span className="text-red-600 ">Bank Account No is required</span>}
                                {errors.accountNo?.type === 'minLength' &&
                                    <p className="text-red-600">Account No must be 16 characters</p>}
                                {errors.accountNo?.type === 'maxLength' &&
                                    <p className="text-red-600">Account No must be less then 16 characters</p>}
                            </div>
                            <div className='flex gap-3'>
                                {/* salary */}
                                <div className=" ">
                                    <label className="label">
                                        <span className="text-black font-bold">Salary*</span>
                                    </label>
                                    <input type="number" {...register('salary', { required: true })} placeholder="Salary"
                                        className="input text-black font-semibold w-full bg-opacity-30 rounded-none input-bordered" />
                                    {errors.salary && <span className="text-red-600 ">Salary is required</span>}
                                </div>
                                {/* designation */}
                                <div className='form-control w-full '>
                                    <label className="label">
                                        <span className="text-black font-bold">Designation*</span>
                                    </label>
                                    <select defaultValue="default" {...register("designation", { required: true })}
                                        className="select select-bordered  text-lg text-black font-semibold w-full bg-opacity-30 rounded-none  ">
                                        <option disabled value="default"> Designation </option>
                                        <option value="Sales Assistant">Sales Assistant</option>
                                        <option value=" Social Media executive"> Social Media executive</option>
                                        <option value=" Digital Marketer"> Digital Marketer</option>

                                    </select>
                                    {errors.designation && <span className="text-red-600">Designation is required</span>}
                                </div>
                            </div>
                            {/* email */}
                            <div className=" ">
                                <label className="label">
                                    <span className="text-black font-bold">Email*</span>
                                </label>
                                <input type="email" {...register('email', { required: true })} placeholder="email"
                                    className="input text-black font-semibold w-full bg-opacity-30 rounded-none input-bordered" />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                            </div>
                            {/* Password */}
                            <div className="">
                                <label className="label">
                                    <span className="text-black font-bold">Password*</span>
                                </label>
                                <input type="password" {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                })} placeholder="password"
                                    className="input text-black font-semibold w-full bg-opacity-30  rounded-none input-bordered" />
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
                            {/* photo */}
                            {/* <div>
                                <label className="label">
                                    <span className="text-black font-bold">Upload Photo*</span>
                                </label>
                                <input {...register('photoURL', { required: true })}
                                    type="file" className="file-input  text-black font-semibold w-full bg-opacity-30 rounded-none " />
                                {errors.photoURL && <span className="text-red-600 ">Photo is required</span>}

                            </div> */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo Url</span>
                                </label>
                                <input type="text" {...register("photoURL",
                                    { required: true })}
                                    placeholder="Photo Url" className="input input-bordered" />
                                {errors.photoURL && <span className="text-red-500">Photo URl is required</span>}
                            </div>
                         


                            {/* disabled={disabled}  */}
                            <div className="form-control mt-6">
                                <button className="btn rounded-none text-white text-xl font-bold btn-primary">Register</button>
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

export default Register;