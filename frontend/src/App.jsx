import React from 'react'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Layout from './components/Layout'

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='register' element={<Register/>}/>
      <Route path='login' element={<Login/>}/>
    </Route>
  )
  ) 

  return (
    <RouterProvider router={router}/>
  )
}

export default App
