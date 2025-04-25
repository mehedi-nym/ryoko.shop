import React, { useContext, useState } from 'react';  // Added useState
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';

// Array of 64 districts
const districts = [
  'Bagerhat', 'Bandarban', 'Barguna', 'Barishal', 'Bhola', 'Bogura', 
  'Brahmanbaria', 'Chandpur', 'Chattogram', 'Chuadanga', 'Cox\'s Bazar', 
  'Cumilla', 'Dhaka', 'Dinajpur', 'Faridpur', 'Feni', 'Gaibandha', 'Gazipur', 
  'Gopalganj', 'Habiganj', 'Jamalpur', 'Jashore', 'Jhalokathi', 'Jhenaidah', 
  'Joypurhat', 'Khagrachari', 'Khulna', 'Kishoreganj', 'Kurigram', 'Kushtia', 
  'Lakshmipur', 'Lalmonirhat', 'Madaripur', 'Magura', 'Manikganj', 'Meherpur', 
  'Moulvibazar', 'Munshiganj', 'Mymensingh', 'Naogaon', 'Narail', 'Narayanganj', 
  'Narsingdi', 'Natore', 'Netrokona', 'Nilphamari', 'Noakhali', 'Pabna', 
  'Panchagarh', 'Patuakhali', 'Pirojpur', 'Rajbari', 'Rajshahi', 'Rangamati', 
  'Rangpur', 'Satkhira', 'Shariatpur', 'Sherpur', 'Sirajganj', 'Sunamganj', 
  'Sylhet', 'Tangail', 'Thakurgaon'
];

const PlaceOrder = () => {
  const [filteredDistricts, setFilteredDistricts] = useState(districts);
  const [showDropdown, setShowDropdown] = useState(false);
  const [city, setCity] = useState('');
  const [method,setMethod] = useState('cod');

  const {navigate} = useContext(ShopContext);

  const handleCityChange = (e) => {
    const value = e.target.value;
    setCity(value);
    if (value) {
      setFilteredDistricts(districts.filter(district =>
        district.toLowerCase().includes(value.toLowerCase())
      ));
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleSelectDistrict = (district) => {
    setCity(district);
    setShowDropdown(false);
  };

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/*------------- Left Side--------------- */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

        <div className='text-xl sm:text--2xl my-3'>
          <Title text1={'DELIVERY'} text2={'DETAILS'} />
        </div>

        <div className=''> 
          <div class="mb-0">
            <label htmlFor="name" class="block text-sm font-semibold mb-1">Your Name <span class="text-[#ff33cc]">*</span></label>
            <input type="text" id="name" placeholder='' required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#ff33cc]" />
          </div>
        </div>

        <div className=''> 
          <div class="mb-0">
            <label htmlFor="street" class="block text-sm font-semibold mb-1">Street Address<span class="text-[#ff33cc]">*</span></label>
            <input type="text" id="street" placeholder='Street name, House number' required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#ff33cc]" />
            <input type="text" id="apartment" placeholder='Apartment, Suite etc (optional)' class="w-full px-3 py-2 my-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#ff33cc]" />
          </div>
        </div>

        <div className='flex gap-3'> 
          <div class="mb-0">
            <label htmlFor="area" class="block text-sm font-semibold mb-1">Area (Thana) <span class="text-[#ff33cc]">*</span></label>
            <input type="text" id="area" placeholder='Dhanmondi' class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#ff33cc]" />
          </div>

          {/* Searchable City Input */}
          <div class="mb-0">
            <label htmlFor='city' className='block text-sm font-semibold mb-1'>
              City <span className='text-[#ff33cc]'>*</span>
            </label>
            <div className='relative'>
              <input
                type='text'
                id='city'
                value={city}
                onChange={handleCityChange}
                placeholder='Type to search city'
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#ff33cc]'
              />
              {showDropdown && (
                <ul className='absolute z-10 w-full bg-white border border-gray-300 rounded-lg max-h-40 overflow-y-auto'>
                  {filteredDistricts.map((district) => (
                    <li
                      key={district}
                      className='px-3 py-2 hover:bg-gray-100 cursor-pointer'
                      onClick={() => handleSelectDistrict(district)}
                    >
                      {district}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className=''> 
          <div class="mb-0">
            <label htmlFor="phone" class="block text-sm font-semibold mb-1">Phone<span class="text-[#ff33cc]">*</span></label>
            <input type="text" id="phone" placeholder='Phone' class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#ff33cc]" />
          </div>
        </div>

        <div className=''> 
          <div class="mb-0">
            <label htmlFor="email" class="block text-sm font-semibold mb-1">Email</label>
            <input type="email" id="email" placeholder='email (optional)' class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#ff33cc]" />
          </div>
        </div>

       
      </div>
      {/*------------- Left Side--------------- */}
      <div className='mt-8'>

        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          {/* ----------Payment method ---------- */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={()=>setMethod('bkash')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'bkash' ? 'bg-[#ff33cc]' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.bkash_logo} alt="" />
            </div>


            <div onClick={()=>setMethod('ssl')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'ssl' ? 'bg-[#ff33cc]' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.ssl_logo} alt="" />
            </div>

            <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-[#ff33cc]' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.cod_logo} alt="" />
            </div>
          </div>
          <div className='w-full text-end mt-8'>
            <button   onClick={()=>navigate('/orders')} className='hover:bg-[#ff00bf] bg-[#ff2cce] text-white px-16 py-3 text-sm'>PLACE ORDER</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
