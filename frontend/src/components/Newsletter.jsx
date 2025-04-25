import React from 'react'

const Newsletter = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }

  return (
    <div className='text-center'>

<p className='text-2xl font-medium text-[#F525BD]'>
  Subscribe now & get 20% off
</p>
    <p className='text-gray-500 mt-3'>
        you can unsusbcribe anytime you want.
    </p>
    <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
        <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your email' required />
        <button type='submit' className='text-white text-xs px-10 py-4 bg-[#F525BD] hover:bg-pink-500 relative overflow-hidden transition-all duration-200 ease-in-out'>
  SUBSCRIBE
</button>

    </form>
    </div>
  )
}

export default Newsletter