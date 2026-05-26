import React, { useState } from 'react'
import style from './right.module.css'
import { Link } from 'react-router-dom';
import main from '../main/mainapp.jsx'
function Right() {
  
 const norefersh=(e)=>{
  e.preventDefault();
 }

  return (
    <div className={style.rightcon}>
      <div className={style.dete}>
<h4>Log into Kilogram</h4>
<div>
  <form className={style.logform} onSubmit={norefersh}>
    <input type='text' placeholder='Mobile number,username or email'/>
    <input type='password' placeholder='Password'/>
    <Link to='/main'><button type='submit' className={style.login}> Log in</button></Link>

  <h2>Forgot password?</h2>
  </form>
</div>
<div className={style.otherlog}>
<button className={style.logbtn} ><img src='https://img.icons8.com/?size=100&id=uLWV5A9vXIPu&format=png&color=000000' alt='facebooklogo'/> Log in with Facebook</button>
<button className={style.crebtn}> Create new account</button>
</div>

<h5><img src='https://img.icons8.com/?size=100&id=PvvcWRWxRKSR&format=png&color=000000' alt='logo'/>Meta</h5>
      </div>
      
    </div>
  )
}

export default Right