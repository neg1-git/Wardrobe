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
      console.log(res.data.data)

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

  const handleWorn= async(id)=>{
    try {
      const res = await axios.post(`http://localhost:5000/outfit/${id}/wear`,
        {},
        {
        headers: {
          token: localStorage.getItem("token")
        }
      })

      getOutfits();
      
    } catch (error) {
      console.log(error.response?.data || error.message)
    }
  }

  const handleFav=async (id)=>{
    try {
      const res = await axios.patch(`http://localhost:5000/outfit/${id}/favorite`,{},
        {
        headers: {
          token: localStorage.getItem("token")
        }
      })

      getOutfits();
      
    } catch (error) {
      console.log(error.response?.data || error.message)
    }
  }

  useEffect(() => {
    getOutfits()
  }, [])

  return (
    <div className='p-4'>
      <a className='text-blue-800 hover:cursor-pointer text-sm' onClick={()=>nav('/app/add-outfits')}>add outfits</a>
      {data.map((item, index) => (
        <div key={item.outfit_id} className='p-2 border mb-2'>
          <p><b>Outfit:</b> {item.name}</p>
          <div><b>Clothing:</b> {item.clothes.map((cloth)=>(<p>{cloth}</p>))}</div>
          <p><b>wear count:</b> {item.wear_count}</p>
          <p><b>last worn:</b> {item.last_worn_date}</p>
          <button className='bg-red-600 px-2 py-1 rounded-2xl hover:cursor-pointer hover:bg-gray-400' onClick={()=>handleDelete(item.outfit_id)}>delete</button>
          <button className='bg-gray-600 px-2 py-1 rounded-2xl hover:cursor-pointer text-white hover:bg-gray-400' onClick={()=>handleWorn(item.outfit_id)}>mark as worn</button>
          <input className='mx-2' onChange={()=>handleFav(item.outfit_id)} type="checkbox" checked={item.is_favorite} name="isFav" id={item.outfit_id} />
          fav
        </div>
      ))}
    </div>
  )
}

export default ViewOutfits