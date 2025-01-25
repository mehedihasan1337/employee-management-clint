

import contact from '../assets/contact.json'
import Lottie from 'lottie-react';

const Contact = () => {
    return (
        <div id='contact' className=''>
           <h2 className='pt-10 text-2xl md:text-4xl text-blue-600  font-bold text-center'>Contact Us </h2>
            <div className='flex flex-col-reverse md:flex-row justify-between items-center w-10/12 mx-auto'>
                <div className='mt-10 md:w-4/12 mb-4 '>
                    <Lottie animationData={contact}> </Lottie>
                </div>

                <div className='mt-20 border flex-row p-10 bg-blue-600 w-6/12 text-center rounded-full  mx-auto mb-32 '>
                    
                   <div className=''>
                   <a className='text-white lg:px-32 lg:text-3xl hover:bg-blue-800' href="mailto:mdmehedihasan1337@gmail.com?subject=Test%20Subject&body=Hello,%20this%20is%20a%20test%20email.">Send Email</a>
                   </div>
                 
                   <div>
                   <a className='text-white lg:px-32 lg:text-3xl hover:bg-blue-800 ' href="https://wa.me/8801763348775?text=Hello%20there!%20How%20are%20you?" target="_blank">Message on WhatsApp</a>
                   </div>
                  
                   <div>
                   <a className='text-white lg:px-32 lg:text-3xl hover:bg-blue-800 ' href="tel:+880 1763-348775">Call Now</a>
                   </div>
                    
            

                </div>

            </div>
        </div>
    );
};

export default Contact;