import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ViewOutfits = () => {
  const [data, setData] = useState([])

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

  useEffect(() => {
    getOutfits()
  }, [])

  return (
    <div className='p-4'>
      {data.map((item, index) => (
        <div key={index} className='p-2 border mb-2'>
          <p><b>Outfit:</b> {item.name}</p>
          <p><b>Clothing:</b> {item.clothing_item_id}</p>
        </div>
      ))}
    </div>
  )
}

export default ViewOutfits