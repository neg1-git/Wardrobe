import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Additems = () => {

  const [name,setName]=useState('')
  const [category,setCategory]=useState('')
  const [color,setColor]=useState('')
  const [cost,setCost]=useState('')
  const [image_url,setImgUrl]=useState('')

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const nav=useNavigate('')

  const handleAdd = async ()=>{
    // Form validation
    if (!name || !category || !color || !image_url) {
      setError('Please fill all required fields and upload an image');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const res=await axios.post('http://localhost:5000/api/clothes',
    {
      name,
      category,
      color,
      image_url,
      cost: cost ? parseFloat(cost) : null
    }
    ,{headers: {
    token:localStorage.getItem("token")
  }})

      nav('/app/wardrobe');
    } catch (error) {
      console.log(error);
      setError('Failed to add item. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
      setError(''); // Clear any previous errors
    }
  };

  const handleUpload = async () => {
    if (!image) {
      setError('Please select an image first');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "an9i2vsa");

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dwsw7xpq4/image/upload",
        formData
      );

      setImgUrl(res.data.secure_url);
    } catch (err) {
      console.log(err);
      setError('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Add New Item</h1>
          <p className="text-gray-600 mt-2">Expand your wardrobe collection</p>
        </div>

        <div className="p-8 rounded-3xl bg-white shadow-xl border border-gray-100">
          {error && (
            <div className="mb-4 p-3 rounded-xl text-sm text-red-700 bg-red-50 border border-red-200">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                placeholder="Blue cotton shirt"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200 bg-gray-50 border border-gray-200 focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={category}
                onChange={(e)=>setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200 bg-gray-50 border border-gray-200 focus:border-purple-500"
              >
                <option value="">Select category</option>
                <option value="Tops">Tops</option>
                <option value="Bottoms">Bottoms</option>
                <option value="Shoes">Shoes</option>
                <option value="Accessories">Accessories</option>
                <option value="Outerwear">Outerwear</option>
                <option value="Dresses">Dresses</option>
                <option value="Swimwear">Swimwear</option>
                <option value="Activewear">Activewear</option>
                <option value="Sleepwear">Sleepwear</option>
                <option value="Underwear">Underwear</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
              <input
                type="text"
                placeholder="Blue, Black, White, etc."
                value={color}
                onChange={(e)=>setColor(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200 bg-gray-50 border border-gray-200 focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cost (optional)</label>
              <input
                type="number"
                placeholder="29.99"
                value={cost}
                onChange={(e)=>setCost(e.target.value)}
                step="0.01"
                min="0"
                className="w-full px-4 py-3 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200 bg-gray-50 border border-gray-200 focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
              <div className="space-y-3">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="w-full px-4 py-3 rounded-xl text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200 transition-all duration-200 bg-gray-50 border border-gray-200"
                />

                {preview && (
                  <div className="flex items-center gap-4">
                    <img src={preview} alt="Preview" className="w-24 h-24 object-cover rounded-xl border-2 border-purple-200" />
                    <div className="flex-1">
                      <button
                        onClick={handleUpload}
                        disabled={isUploading}
                        className="w-full py-2.5 px-4 text-white font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      >
                        {isUploading ? 'Uploading...' : 'Upload Image'}
                      </button>
                    </div>
                  </div>
                )}

                {image_url && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-green-50 border border-green-200">
                    <span className="text-green-600">✓</span>
                    <span className="text-green-700 text-sm font-medium">Image uploaded successfully!</span>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleAdd}
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 text-white font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {isSubmitting ? 'Adding Item...' : 'Add to Wardrobe'}
            </button>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={()=>nav('/app/wardrobe')}
              className="text-gray-600 hover:text-gray-800 text-sm transition-colors duration-200"
            >
              ← Back to Wardrobe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Additems