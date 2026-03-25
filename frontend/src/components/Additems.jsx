import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Additems = () => {

  const [name,setName]=useState('')
  const [category,setCategory]=useState('')
  const [color,setColor]=useState('')
  const [image_url,setImgUrl]=useState('')

  const nav=useNavigate('')

  const handleAdd = async ()=>{
    try {
      console.log(name,category,color,image_url)

      const res=await axios.post('http://localhost:5000/api/clothes',
  {
    name,
    category,
    color,
    image_url
  }
  ,{headers: {
  token:localStorage.getItem("token")
}})

  nav('/wardrobe')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex items-center justify-center'>
      <div className='p-10'>
        <div className='flex gap-1 p-1.5 items-center bg-gray-800'>
          <div className='bg-gray-600 p-0.5 px-2 text-white'>Name:</div>
          <input type="text" placeholder='name' value={name} className='bg-gray-200 p-0.5 w-full' onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div className='flex gap-1 p-1.5 items-center bg-gray-800'>
          <div className='bg-gray-600 p-0.5 px-2 text-white'>Category:</div>
          <input type="text" placeholder='category' value={category} className='bg-gray-200 p-0.5 w-full' onChange={(e)=>setCategory(e.target.value)}/>
        </div>
        <div className='flex gap-1 p-1.5 items-center bg-gray-800'>
          <div className='bg-gray-600 p-0.5 px-2 text-white'>Color:</div>
          <input type="text" placeholder='color' value={color} className='bg-gray-200 p-0.5 w-full' onChange={(e)=>setColor(e.target.value)}/>
        </div>
        <div className='flex gap-1 p-1.5 items-center bg-gray-800'>
          <div className='bg-gray-600 p-0.5 px-2 text-white'>url:</div>
          <input type="text" placeholder='Url' value={image_url} className='bg-gray-200 p-0.5 w-full' onChange={(e)=>setImgUrl(e.target.value)}/>
        </div>
        <div className='flex gap-1 p-1.5 items-center justify-center bg-gray-800'>
          <button className='bg-white px-5 hover:scale-105 text-center hover:bg-red-400' onClick={handleAdd}>Add</button>
        </div>
        <div>
          <a className='text-blue-800 hover:cursor-pointer text-sm' onClick={()=>nav('/wardrobe')}>to wardrobe</a>
        </div>
      </div>
      
    </div>
  )
}

export default Additems