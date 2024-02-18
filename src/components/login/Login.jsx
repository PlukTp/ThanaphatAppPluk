import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const clickLogin = async() => {
    try {
      const url = "https://workshop-react-api.vercel.app/login"
      const res = await axios.post(url,{username,password})

      const decode = jwtDecode(res.data.token)

      localStorage.setItem('token',res.data.token )
      localStorage.setItem('user_id',decode.user_id )
      setTimeout(() => {
        window.location.reload()
      },200);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='bg-green-200 h-screen flex flex-col justify-center items-center'>
      <div className='bg-white px-40 py-10   rounded-lg shadow-lg '>
        <div className="flex justify-center items-center mb-5">
          {/* Logo */}
          
          <h2 className='text-2xl'>เข้าสู่ระบบ</h2>
        </div>

        {/* Displaying username and password for testing */}
        {username} <br />
        {password}

        <div className='flex flex-col'>
          <div className="flex items-center border border-gray-400 rounded-lg mt-5 p-2">
            <span className="material-icons mr-2">person</span>
            <input
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Username'
              type='text'
              className='flex-1 focus:outline-none'
            />
          </div>

          <div className="flex items-center border border-gray-400 rounded-lg mt-5 p-2">
            <span className="material-icons mr-2">lock</span>
            <input
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              type='password'
              className='flex-1 focus:outline-none'
            />
          </div>

          <button onClick={clickLogin}
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-5 p-2"
          >
            ล็อกอิน
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
