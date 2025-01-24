import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <div>
            <footer className="footer footer-center text-black bg-blue-300 p-10">
  <aside>
    <img  className='w-20' src="https://i.ibb.co.com/98qSn7J/Employee-Logo.png" alt="" />
    <p className="font-bold">
    Employee Management Ltd.
      <br />
      Providing reliable tech since 1992
    </p>
    <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
  </aside>
  <nav>
    <div className="grid grid-flow-col gap-4">
      
      <a  href="https://x.com/EMLtd" >
       <FaTwitter className='text-3xl text-blue-600 hover:text-4xl hover:text-blue-700'></FaTwitter>
      </a>
      <a  href="https://www.instagram.com/bcstrata">
       <FaInstagram  className='text-3xl text-blue-600 hover:text-4xl hover:text-blue-700'></FaInstagram>
      </a>
      <a  href="https://www.facebook.com/groups/internationalremotejobs">
       <FaFacebook  className='text-3xl text-blue-600 hover:text-4xl hover:text-blue-700'></FaFacebook>
      </a>
    </div>
  </nav>
</footer>
        </div>
    );
};

export default Footer;