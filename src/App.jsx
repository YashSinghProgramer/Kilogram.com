import React from 'react'
import Login from './Login/login.jsx'
import Mainpage from './main/mainapp.jsx'
import { Route, Router, Routes } from 'react-router-dom'
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