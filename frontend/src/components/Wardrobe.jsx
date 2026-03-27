import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Wardrobe = () => {

  const [data,setData]=useState([])

  const nav=useNavigate('')

  const getItems=async()=>{
    try {
      
      const res= await axios.get('http://localhost:5000/api/wardrobe',{headers: {
  token:localStorage.getItem("token")
}})
  const data = res.data.data
  setData(data)
  console.log(data)

    } catch (error) {
      console.log(error.response?.data || error.message)
    }
  }

  useEffect(()=>{
    getItems()
  },[])

  const handleDelete=async(id)=>{
    try {
      const res= await axios.delete('http://localhost:5000/api/wardrobe/'+id,{headers: {
  token:localStorage.getItem("token")
}})
      console.log(res.data)
      getItems()
    } catch (error) {
      console.log(error.response?.data || error.message)
    }
  }

  return (
    <div>
      <div className='flex p-5'>
        {data.map((item)=>(
          <div className='m-2 p-2 bg-gray-400 flex flex-col flex-wrap'>
            <p key={item.name}>{item.name}</p>
            <p key={item.color}>{item.color}</p>
            <p key={item.category}>{item.category}</p>
            <button onClick={()=>handleDelete(item.id)} className='bg-white cursor-pointer'>delete</button>
            <button onClick={() => nav(`/update/${item.id}`)}>
      Update
            </button>
        </div>
        ))}
      </div>
      <button onClick={()=>nav('/add-items')} className='bg-red-600 text-white p-2 mx-1 cursor-pointer'>Add Items</button>
    </div>
  )
}

export default Wardrobe