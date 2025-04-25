import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import Newsletter from '../components/Newsletter'

const Contact = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US NOW'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>Sorry we are only available for online purchase only</p>
          <p className='font-semibold text-xl text-gray-600'>E-mail</p>
          <p className='text-gray-500'>shop@ryoko.com</p>
          <p className='font-semibold text-xl text-gray-600'>Phone</p>
          <p className='text-gray-500'>+88018********</p>
          <p className='font-semibold text-xl text-gray-600'>Careers at Ryoko</p>
          <p className='text-gray-500'>Learn more about our terms and job openings.</p>
          <button className='border bg-[#F525BD] px-8 py-4 text-sm hover:bg-[#e240b7] text-white transition-all duration-500'>Explore Now</button>
        </div>
      </div>

      <Newsletter />

    </div>
  )
}

export default Contact