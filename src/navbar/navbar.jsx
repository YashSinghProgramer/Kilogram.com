import React from 'react'
import Style from './nav.module.css'
function navbar() {
  
  return (
    <div className={Style.NavCon}>
        <div className={Style.logo}>
            <img src="https://img.icons8.com/?size=100&id=DpOQ6G5p47f0&format=png&color=ffffff" alt="logo" />
        </div>
        <div className={Style.menulist}>
<ul>
    <li><img src='https://img.icons8.com/?size=100&id=86527&format=png&color=ffffff' alt='Logo'/>Home</li>
    <li><img src='https://img.icons8.com/?size=100&id=bgJJTYimOf01&format=png&color=ffffff' alt='Logo'/>Reel</li>
    <li><img src='https://img.icons8.com/?size=100&id=12628&format=png&color=ffffff' alt='Logo'/>Messages</li>
    <li><img src='https://img.icons8.com/?size=100&id=59878&format=png&color=ffffff' alt='Logo'/>Search</li>
    <li><img src='https://img.icons8.com/?size=100&id=88004&format=png&color=ffffff' alt='Logo'/>Explore</li>
    <li><img src='https://img.icons8.com/?size=100&id=16076&format=png&color=ffffff' alt='Logo'/>Notificatons</li>
    <li><img src='https://img.icons8.com/?size=100&id=TDaRPAsMt1Bs&format=png&color=ffffff' alt='Logo'/>Create</li>
    <li><img src='https://img.icons8.com/?size=100&id=59735&format=png&color=ffffff' alt='Logo'/>Dashboard</li>
    <li><img src='https://picsum.photos/200' alt='Logo' className={Style.prologo}/>Profile</li>
</ul>
        </div>
        <h4><img src='https://img.icons8.com/?size=100&id=S5biqohaDgd1&format=png&color=ffffff' alt='logo'/>More</h4>

        <div></div>
    </div>
  )
}

export default navbar