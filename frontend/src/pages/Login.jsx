import React, { useState } from 'react';

const Login = () => {
  const [currenState, setcurrenState] = useState('Sign Up');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="prata-regular text-3xl">{currenState}</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>
        {currenState === 'Login' ? '' : (
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Name"
            required
          />
        )}
        <div className="inline-flex w-full">
          <div className="flex items-center justify-center px-3 py-2 border border-gray-800 bg-gray-100">
            +880
          </div>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Phone Number"
            required
          />
        </div>
        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Password"
          required
        />
        <div className="w-full flex justify-between text-sm mt-[-8px]">
          <p className="cursor-pointer">Forgot Password ?</p>
          {currenState === 'Login' ? (
            <p onClick={() => setcurrenState('Sign Up')} className="cursor-pointer">
              Create account
            </p>
          ) : (
            <p onClick={() => setcurrenState('Login')} className="cursor-pointer">
              Login Here
            </p>
          )}
        </div>
        <button className="bg-black text-white font-light px-8 py-2 mt-4">
          {currenState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default Login;
