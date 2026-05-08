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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Wardrobe</h1>
            <p className="text-gray-600 mt-2">Your personal clothing collection</p>
          </div>
          <button
            onClick={() => nav('/app/add-items')}
            className="px-6 py-3 bg-linear-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
          >
            Add New Item
          </button>
        </div>

        {data.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-100 mb-4">
              <svg className="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Your wardrobe is empty</h3>
            <p className="text-gray-500">Start by adding your first clothing item using the button above</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {data.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="relative aspect-4/3 sm:aspect-square">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-linear-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                      <svg className="w-16 h-16 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.657a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                    <span className="px-3 py-1.5 sm:px-3 sm:py-1 bg-white/95 backdrop-blur-sm text-xs sm:text-xs font-semibold text-purple-700 rounded-full shadow-md border border-purple-200">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-3 sm:p-4">
                  <h3 className="font-semibold text-gray-800 text-base sm:text-lg mb-1 sm:mb-2 truncate">{item.name}</h3>
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <div
                      className="w-4 h-4 rounded-full border-2 border-gray-200"
                      style={{ backgroundColor: item.color.toLowerCase() }}
                      title={item.color}
                    />
                    <span className="text-sm text-gray-600 capitalize">{item.color}</span>
                  </div>

                  {/* Cost Information */}
                  {item.cost && (
                    <div className="mb-3 sm:mb-4 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Cost:</span>
                        <span className="text-sm font-semibold text-green-600">₹{parseFloat(item.cost).toFixed(2)}</span>
                      </div>
                      {item.total_wears > 0 && item.cost_per_wear && (
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Cost per wear:</span>
                          <span className="text-sm font-semibold text-purple-600">₹{parseFloat(item.cost_per_wear).toFixed(2)}</span>
                        </div>
                      )}
                      {item.total_wears > 0 && (
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Times worn:</span>
                          <span className="text-sm font-medium text-gray-700">{item.total_wears}x</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => nav(`/app/update/${item.id}`)}
                      className="flex-1 py-2 px-3 bg-purple-50 text-purple-700 text-sm font-medium rounded-lg hover:bg-purple-100 transition-colors duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex-1 py-2 px-3 bg-red-50 text-red-700 text-sm font-medium rounded-lg hover:bg-red-100 transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Wardrobe