import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddOutfits = () => {
  const [name,setName]=useState('')

  const nav=useNavigate()

  const handleAdd=async()=>{
    try {
      const res=await axios.post('http://localhost:5000/outfit/create',{
        name
      },{headers: {
  token:localStorage.getItem("token")
}})
    const outfitId = res.data.data.id;
    console.log(outfitId);
    nav(`/add-outfit-items/${outfitId}`)
    } catch (error) {
      console.log(error.response?.data || error.message)
    }
  }
  return (
    <div className='flex items-center justify-center'>
      <div className='p-10'>
        <div className='flex gap-1 p-1.5 items-center bg-gray-800'>
          <div className='bg-gray-600 p-0.5 px-2 text-white'>Name:</div>
          <input type="text" placeholder='name' value={name} className='bg-gray-200 p-0.5 w-full' onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div className='flex gap-1 p-1.5 items-center justify-center bg-gray-800'>
          <button className='bg-white px-5 hover:scale-105 text-center hover:bg-red-400' onClick={handleAdd}>Add Outfit</button>
        </div>
        <div>
          <a className='text-blue-800 hover:cursor-pointer text-sm' onClick={()=>nav('/outfits')}>outfits</a>
        </div>
      </div>
      
    </div>
  )
}

export default AddOutfits