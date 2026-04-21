import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Insights = () => {

  const [data,setData]=useState(null);
  const [reco,setReco]=useState(null);

  const getInsights= async()=>{
    try {

      const result =await axios.get('http://localhost:5000/outfit/insights',{
        headers:{
          token: localStorage.getItem("token")
        }
      })

      setData(result.data)
      
    } catch (error) {
      console.log(error.response?.data || error.message)
    }
  }

  const getRecommendations= async()=>{
    try {
      const result =await axios.get('http://localhost:5000/outfit/recommendations',{
        headers:{
          token: localStorage.getItem("token")
        }
      })

      console.log(result.data)
      setReco(result.data)
      
    } catch (error) {
      console.log(error.response?.data || error.message)
    }

  }

  useEffect(()=>{
    getInsights()
    getRecommendations()
  },[])

  return (
    <div className="p-4">
    <h2 className="text-xl font-bold mb-4">Insights</h2>

    {data && (
      <>
        <div className="mb-4">
          <h3 className="font-semibold">Most Worn</h3>
          <p>{data.mostWorn?.name}</p>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold">Least Worn</h3>
          <p>{data.leastWorn?.name}</p>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold">Recently Worn</h3>
          {data.recentlyWorn?.map((item) => (
            <p key={item.id}>{item.name}</p>
          ))}
        </div>

        <div className="mb-4">
          <h3 className="font-semibold">Neglected</h3>
          {data.neglected?.map((item) => (
            <p key={item.id}>{item.name}</p>
          ))}
        </div>
      </>
    )}
    <div className="mb-4">
  <h3 className="font-semibold">Recommendations</h3>

  {(reco?.data || reco)?.map((item) => (
    <p key={item.outfit_id || item.id}>{item.name}</p>
  ))}
</div>
  </div>
  )
}

export default Insights