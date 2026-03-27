import React from 'react'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Layout from './components/Layout'
import Wardrobe from './components/Wardrobe'
import Additems from './components/Additems'
import UpdateItems from './components/Updateitems'

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='register' element={<Register/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='wardrobe' element={<Wardrobe/>}/>
      <Route path='add-items' element={<Additems/>}/>
      <Route path="/update/:id" element={<UpdateItems/>} />
    </Route>
  )
  ) 

  return (
    <RouterProvider router={router}/>
  )
}

export default App
