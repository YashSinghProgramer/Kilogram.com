import React from 'react'
import Style from './mainapp.module.css'
import Navbar from '../navbar/navbar.jsx'
import Story from '../storys/storys.jsx'
import Reels from '../reels/reels.jsx'
import Message from '../message/message.jsx'
function mainapp() {
  return (
    <div className={Style.mainscreen}>
      
<Navbar/>
<div className={Style.rightside}>
<Story/>
<Reels/>
</div>
  <Message/>


    </div>
  )
}

export default mainapp