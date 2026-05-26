import React from 'react';
import Style from './message.module.css';

function Message() {
  // 1. Ekdum real-looking unique data array bana diya (4 logon ke liye)
  const suggestedUsers = [
  { id: 1, username: "rohit_sharma_45", fullname: "Rohit Sharma", randomId: 101 },
  { id: 2, username: "sneha_kapoor", fullname: "Sneha Kapoor", randomId: 102 },
  { id: 3, username: "priya.verma", fullname: "Priya Verma", randomId: 103 },
  { id: 4, username: "aman_dxb", fullname: "Aman Malik", randomId: 104 },
  { id: 5, username: "ishita_99", fullname: "Ishita Sharma", randomId: 105 },
//   { id: 6, username: "kabir_singh_vlogs", fullname: "Kabir Malhotra", randomId: 106 },
//   { id: 7, username: "ananya_art", fullname: "Ananya Joshi", randomId: 107 },
//   { id: 8, username: "vicky_kaushal_fan", fullname: "Vikram Rathore", randomId: 108 },
//   { id: 9, username: "neha_structures", fullname: "Neha Gupta", randomId: 109 }
];

  return (
    <div className={Style.messageCon}>
      <div className={Style.allmessage}>
        
        {/* Main User Profile (Aapki khud ki) */}
        <div className={Style.profile}>
          <img src='https://picsum.photos/200' alt='my_profile' />
          <div className={Style.usernames}>
            <h3>rajput_yash</h3>
            <h6>Yash Singh</h6>
          </div>
          <h5>Switch</h5>
        </div>

        {/* Suggested Section */}
        <div className={Style.otherprofile}>
          <div className={Style.profiletext}>
            <h1>Suggested for you</h1>
            <h6>See all</h6>
          </div>

          <div className={Style.otherusers}>
            {/* Ab hum apne static array ko map kar rahe hain */}
            {suggestedUsers.map((user) => (
              <div className={Style.otherproser} key={user.id}>
                {/* user.randomId ki wajah se har photo alag aur unique aayegi */}
                <img src={`https://picsum.photos/200?random=${user.randomId}`} alt='suggested_profile' />
                <div className={Style.usernames}>
                  <h3>{user.username}</h3> 
                  <h6>{user.fullname}</h6>
                </div>
                <h2>Follow</h2>
              </div>
            ))}
          </div>
          <div className={Style.footer}>
        <h1>About .Help .Press .API .Jobs .Privacy .Terms .Locations .Languages .Meta Verified</h1>
        <p>&copy; 2026 KILOGRAM FROM YASHDEV </p>
      </div>
        </div>

      </div>
      
    </div>
  );
}

export default Message;