
import { useForm } from 'react-hook-form';


const WorkSheet = () => {
    const { register, handleSubmit } = useForm()

    const onSubmit = (data) => {
        console.log(data)
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

        </div>
    );
};

export default WorkSheet;