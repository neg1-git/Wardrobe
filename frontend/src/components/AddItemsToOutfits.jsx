import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const AddItemsToOutfits = () => {
  const {id}=useParams()
  const outfit_id=id

  const[clothing_item_id,setClothing_item_id]=useState([])
  
  const [data,setData]=useState([])

  //let arrIds=[]
  const handleChange=(e)=>{
    const id = e.target.id;
    if(e.target.checked){
      //arrIds.push(e.target.id)
      //setClothing_item_id([... clothing_item_id,e.target.id])
      setClothing_item_id(prev => [...prev, id]);
    }
    else if(!e.target.checked){
      //arrIds=arrIds.filter(id=> id!=e.target.id)
      //setClothing_item_id(clothing_item_id.filter(id=> id!=e.target.id))
      setClothing_item_id(prev => prev.filter(item => item != id));
    }
  }
  // e.target.checked gives if the checkbox is checked or nah

  const getItems=async ()=>{
    const result= await axios.get('http://localhost:5000/api/wardrobe',{headers: {
    token:localStorage.getItem("token")}})
    setData(result.data.data)
  }

  useEffect(()=>{
    getItems()
  },[])

  const handleAdd=async ()=>{
    try {
      const res=await axios.post('http://localhost:5000/outfit/add',{
        outfit_id,
        clothing_item_id
      },
  {
    headers: {
      token: localStorage.getItem("token")
    }})
    console.log(clothing_item_id);
    } catch (error) {
      console.log(error.response?.data || error.message)
    }
  }

  return (
    <div className='p-2'>
      {data.map((item)=>(
          <li key={item.id}className='p-2'><input id={item.id} type="checkbox" onChange={handleChange}/> {item.name}</li>
      ))}
      <button onClick={handleAdd} className='bg-amber-500 p-2 hover:cursor-pointer'>Add</button>
    </div>
  )
}

export default AddItemsToOutfits