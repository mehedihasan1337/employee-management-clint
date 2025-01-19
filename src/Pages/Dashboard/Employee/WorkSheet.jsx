
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import MyWorkSheet from './MyWorkSheet';
import useAuth from '../../../hooks/useAuth';



const WorkSheet = () => {
    const{user}=useAuth()
    console.log(user)
    const { register, handleSubmit,reset } = useForm()
    const axiosSecure= useAxiosSecure()
  
    const onSubmit =async (data) => {
        console.log(data)
        
            const workSheet={
                tasks:data.tasks,
                hours:data.hours,
                date:data.date,
                email:user?.email,
                name:user?.displayName,
                

            }
            const sheetRes =await axiosSecure.post('/sheets',workSheet)
            console.log(sheetRes.data)
            if(sheetRes.data.insertedId){
                
                reset()
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: `${data.tasks} is added to the Work Sheet`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        
    }
    return (
        <div>
            <div >
                <form onSubmit={handleSubmit(onSubmit)}
                    className="flex lg:flex-row flex-col gap-3 lg:items-center">
                    <div className='form-control w-full '>
                        <span className="text-black font-bold">Tasks*</span>
                        <select defaultValue="default" {...register("tasks", { required: true })}
                            className="select select-bordered  text-blue-700 font-semibold w-full bg-opacity-30 rounded-none text-xl ">
                            <option disabled value="default">Roles </option>
                            <option value="Sales">Sales</option>
                            <option value="Support">Support</option>
                            <option  value="Content">Content</option>
                            <option  value="Paper-work">Paper-work</option>
                            

                        </select>
                    </div>
                    <div className=" ">

                        <span className="text-black font-bold">Hours*</span>

                        <input type="number" {...register('hours', { required: true })} placeholder="Hours"
                            className="input text-black font-semibold w-full bg-opacity-30 rounded-none input-bordered" />

                    </div>
                    <div className=" ">

                        <span className="text-black font-bold">Date*</span>
                           <input type="date" {...register('date', { required: true })} 
                      
 
                            className="input text-black font-semibold w-full bg-opacity-30 rounded-none input-bordered" />

                    </div>

                    <div className="form-control mt-6">
                        <button className="btn rounded-none text-white text-xl font-bold btn-primary">Add</button>
                    </div>
                </form>
            </div>

            <MyWorkSheet></MyWorkSheet>
            

        </div>
    );
};

export default WorkSheet;