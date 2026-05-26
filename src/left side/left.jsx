import React from 'react'
import Style from './left.module.css'
function left() {
  return (
    <div className={Style.Leftcon}>
      <div>
        <img src='https://img.icons8.com/?size=100&id=5eT5OnLluNOx&format=png&color=000000' alt='logo'className={Style.logo}/>
        </div><div className={Style.Heding}><h2>See everyday moments from your <span>close friends</span>.</h2></div>
        <img src='https://static.cdninstagram.com/rsrc.php/yJ/r/53X3pk-t2Gn.webp' alt='random' className={Style.storypc}/>
        

    </div>
  )
}

export default left