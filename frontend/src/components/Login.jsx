import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [password,setPassword]=useState('')
  const [email,setEmail]=useState('')

  const nav=useNavigate()

  const handleLogin=async()=>{
    try {
      
      const res= await axios.post('http://localhost:5000/auth/login',{email,password})

      console.log(res.data.token)
      localStorage.setItem("token",res.data.token)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex items-center justify-center'>
      <div className='p-10'>
        <div className='flex gap-1 p-1.5 items-center bg-gray-800'>
          <div className='bg-gray-600 p-0.5 px-2 text-white'>Email:</div>
          <input type="text" placeholder='email' value={email} className='bg-gray-200 p-0.5 w-full' onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className='flex gap-1 p-1.5 items-center bg-gray-800'>
          <div className='bg-gray-600 p-0.5 px-2 text-white'>Password:</div>
          <input type="password" placeholder='password' value={password} className='bg-gray-200 p-0.5 w-full' onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <div className='flex gap-1 p-1.5 items-center justify-center bg-gray-800'>
          <button className='bg-white px-5 hover:scale-105 text-center hover:bg-red-400' onClick={handleLogin}>Login</button>
        </div>
        <div>
          <a className='text-blue-800 hover:cursor-pointer text-sm' onClick={()=>nav('/register')}>register</a>
        </div>
      </div>
    </div>
  )
}

export default Login