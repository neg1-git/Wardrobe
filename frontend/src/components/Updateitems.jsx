import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateItems = () => {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [color, setColor] = useState('')
  const [image_url, setImgUrl] = useState('')

  const nav = useNavigate()
  const { id } = useParams()

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/wardrobe/${id}`,
        {
          name: name || null,
          category: category || null,
          color: color || null,
          image_url: image_url || null
        },
        {
          headers: {
            token: localStorage.getItem("token")
          }
        }
      )

      console.log(res.data)
      nav('/wardrobe')

    } catch (error) {
      console.log(error.response?.data || error.message)
    }
  }

  return (
    <div className='flex items-center justify-center'>
      <div className='p-10'>

        <div className='flex gap-1 p-1.5 items-center bg-gray-800'>
          <div className='bg-gray-600 p-0.5 px-2 text-white'>Name:</div>
          <input type="text" placeholder='name' value={name}
            className='bg-gray-200 p-0.5 w-full'
            onChange={(e)=>setName(e.target.value)} />
        </div>

        <div className='flex gap-1 p-1.5 items-center bg-gray-800'>
          <div className='bg-gray-600 p-0.5 px-2 text-white'>Category:</div>
          <input type="text" placeholder='category' value={category}
            className='bg-gray-200 p-0.5 w-full'
            onChange={(e)=>setCategory(e.target.value)} />
        </div>

        <div className='flex gap-1 p-1.5 items-center bg-gray-800'>
          <div className='bg-gray-600 p-0.5 px-2 text-white'>Color:</div>
          <input type="text" placeholder='color' value={color}
            className='bg-gray-200 p-0.5 w-full'
            onChange={(e)=>setColor(e.target.value)} />
        </div>

        <div className='flex gap-1 p-1.5 items-center bg-gray-800'>
          <div className='bg-gray-600 p-0.5 px-2 text-white'>URL:</div>
          <input type="text" placeholder='url' value={image_url}
            className='bg-gray-200 p-0.5 w-full'
            onChange={(e)=>setImgUrl(e.target.value)} />
        </div>

        <div className='flex gap-1 p-1.5 items-center justify-center bg-gray-800'>
          <button
            className='bg-white px-5 hover:scale-105 hover:bg-green-400'
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>

      </div>
    </div>
  )
}

export default UpdateItems