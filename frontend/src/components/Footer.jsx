import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className='my-10 mt-40 text-sm'>
      {/* Main content */}
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14'>
        <div>
          <img src={assets.logo} className='mb-5 w-32' alt="" />
          <p className='w-full md:w-2/3 text-gray-600'>
            Ryoko Shop is the first-ever eCommerce platform exclusively designed for travelers, offering a wide range of travel-related products. From essentials like bags and camping gear to accessories like sunglasses, it's a one-stop shop for all travel needs.
          </p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>Get In Touch</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>RYOKO</li>
            <li>+8809000000000</li>
            <li>contact@ryoko.shop</li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className='mt-10'>
        <hr />
        <p className='py-1 text-sm text-center'>Copyright 2024@ Ryoko.Shop - All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
