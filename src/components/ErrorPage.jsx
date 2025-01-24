import Lottie from 'lottie-react';
import errorLottie from '../assets/error.json'

const ErrorPage = () => {
    return (
        <div className='lg:w-6/12 mx-auto'>
            <Lottie animationData={errorLottie}></Lottie>
        </div>
    );
};

export default ErrorPage;