import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ViewOutfits = () => {
  const [data, setData] = useState([])

  const nav = useNavigate('')

  const getOutfits = async () => {
    try {
      const res = await axios.get('http://localhost:5000/outfit/get-outfits', {
        headers: {
          token: localStorage.getItem("token")
        }
      })

      setData(res.data.data)

    } catch (error) {
      console.log(error.response?.data || error.message)
    }
  }

  const handleDelete = async (id)=>{
    try {
      const res = await axios.delete(`http://localhost:5000/outfit/delete/${id}`,{
        headers: {
          token: localStorage.getItem("token")
        }
      })
      getOutfits()
    } catch (error) {
      console.log(error.response?.data || error.message)
    }
  }

  useEffect(() => {
    getOutfits()
  }, [])

  return (
    <div className='p-4'>
      <a className='text-blue-800 hover:cursor-pointer text-sm' onClick={()=>nav('/add-outfits')}>add outfits</a>
      {data.map((item, index) => (
        <div key={index} className='p-2 border mb-2'>
          <p><b>Outfit:</b> {item.name}</p>
          <p><b>Clothing:</b> {item.clothing_item_id}</p>
          <button className='bg-red-600 px-2 py-1 rounded-2xl hover:cursor-pointer hover:bg-gray-400' onClick={()=>handleDelete(item.outfit_id)}>delete</button>
        </div>
      ))}
    </div>
  )
}

export default ViewOutfits