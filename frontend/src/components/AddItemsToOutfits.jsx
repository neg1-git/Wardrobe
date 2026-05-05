import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const AddItemsToOutfits = () => {
  const { id } = useParams()
  const outfit_id = id

  const nav = useNavigate('')

  const [clothing_item_id, setClothing_item_id] = useState([])
  const [data, setData] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const itemId = e.target.id
    if (e.target.checked) {
      setClothing_item_id(prev => [...prev, itemId])
    } else {
      setClothing_item_id(prev => prev.filter(item => item != itemId))
    }
  }

  const getItems = async () => {
    try {
      const result = await axios.get('http://localhost:5000/api/wardrobe', {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      setData(result.data.data)
    } catch (error) {
      console.log(error.response?.data || error.message)
      setError('Failed to load wardrobe items')
    }
  }

  useEffect(() => {
    getItems()
  }, [])

  const handleAdd = async () => {
    if (clothing_item_id.length === 0) {
      setError('Please select at least one item')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      const res = await axios.post('http://localhost:5000/outfit/add', {
        outfit_id,
        clothing_item_id
      }, {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      console.log(clothing_item_id)
      nav('/app/outfits')
    } catch (error) {
      console.log(error.response?.data || error.message)
      setError('Failed to add items to outfit. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Add Items to Outfit</h1>
          <p className="text-gray-600 mt-2">Select clothing items to include in your outfit</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          {error && (
            <div className="mb-6 p-3 rounded-xl text-sm text-red-700 bg-red-50 border border-red-200">
              {error}
            </div>
          )}

          {data.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-4">
                <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No items in wardrobe</h3>
              <p className="text-gray-500 mb-4">Add some clothing items first!</p>
              <button
                onClick={() => nav('/app/add-items')}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Add Items
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {data.map((item) => (
                  <div
                    key={item.id}
                    className={`relative p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                      clothing_item_id.includes(String(item.id))
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 bg-white hover:border-purple-300'
                    }`}
                    onClick={() => {
                      const checkbox = document.getElementById(item.id)
                      if (checkbox) {
                        checkbox.checked = !checkbox.checked
                        handleChange({ target: checkbox })
                      }
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        id={item.id}
                        type="checkbox"
                        onChange={handleChange}
                        checked={clothing_item_id.includes(String(item.id))}
                        className="mt-1 w-5 h-5 text-purple-600 rounded focus:ring-purple-500 cursor-pointer"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {item.image_url && (
                            <img
                              src={item.image_url}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                          )}
                          <div>
                            <h4 className="font-semibold text-gray-800">{item.name}</h4>
                            <p className="text-sm text-gray-500">{item.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full border border-gray-300"
                            style={{ backgroundColor: item.color.toLowerCase() }}
                          />
                          <span className="text-xs text-gray-600 capitalize">{item.color}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
                <div className="text-sm text-gray-600">
                  {clothing_item_id.length} item{clothing_item_id.length !== 1 ? 's' : ''} selected
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => nav('/app/outfits')}
                    className="px-6 py-3 text-gray-700 font-medium rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAdd}
                    disabled={isSubmitting || clothing_item_id.length === 0}
                    className="px-6 py-3 text-white font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    {isSubmitting ? 'Adding...' : 'Add to Outfit'}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default AddItemsToOutfits