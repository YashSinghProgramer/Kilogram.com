import React from 'react'
import Login from './Login/login.jsx'
import Mainpage from '../src/main/mainapp.jsx'
import {  Route, Routes } from 'react-router-dom'
function App() {
  return (

    <div>
      <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/main' element={<Mainpage/>}/>
        {/* <Login/> */}
        {/* <Mainpage/> */}
        </Routes>
    </div>
  )
}

export default App