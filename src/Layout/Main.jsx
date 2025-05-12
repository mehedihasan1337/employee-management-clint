import React from 'react';
import Navber from '../components/Navber';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const Main = () => {
    return (
        <div className='font-roboto'>
            <section className=" bg-opacity-50 bg-blue-500 hover:bg-blue-600 "> <Navber></Navber></section>

            <Outlet></Outlet>
            <section><Footer></Footer></section>

        </div>

    );
};

export default Main;