import React, { useState } from 'react';
import Style from './reels.module.css';
import reelsData from './reelcon';

// --- 1. NEW CHILD COMPONENT FOR A SINGLE REEL ---
function ReelCard({ username, profileImg, postImg, caption }) {
  // Save Icons
  const unsavedIcon = "https://img.icons8.com/?size=100&id=ttPVWWAN2Fak&format=png&color=ffffff";
  const savedIcon = "https://img.icons8.com/?size=100&id=MsXLF6DrtERg&format=png&color=ffffff";

  // Like Icons
  const unlikedIcon = "https://img.icons8.com/?size=100&id=85033&format=png&color=ffffff";
  const likedIcon = "https://img.icons8.com/?size=100&id=VlnJWHDIdmAJ&format=png&color=ff0000";

  // State is now isolated inside THIS specific card!
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Random generators run once when the card mounts
  const [commentsCount] = useState(() => Math.round(Math.random() * 1000));
  const [daysAgo] = useState(() => Math.round(Math.random() * 100));

  return (
    <div className={Style.reelcon}>
      <div className={Style.reelhead}>
        <div className={Style.reelhead1}>
          <img src={profileImg} alt={`${username}'s profile`} />
          <p>{username}</p>
        </div>
        <h2>...</h2>
      </div>

      <div className={Style.reelimg}>
        <img src={postImg} alt="Post content" />
      </div>

      <div className={Style.interaction}>
        <div className={Style.inter1}>
          <img 
            src={isLiked ? likedIcon : unlikedIcon} 
            onClick={() => setIsLiked(!isLiked)} 
            alt="Like Icon"
          />
          <img src='https://img.icons8.com/?size=100&id=143&format=png&color=ffffff' alt="Comment Icon" />
          <img src='https://img.icons8.com/?size=100&id=12628&format=png&color=ffffff' alt="Share Icon" />
        </div>
        <div className={Style.inter2}>
          <img 
            src={isSaved ? savedIcon : unsavedIcon} 
            onClick={() => setIsSaved(!isSaved)} 
            alt="Save Icon"
          />
        </div>
      </div>

      <div className={Style.text}>
        <div className={Style.text1}>
          <h5>{username} <span>{caption}</span></h5>
          <h2>View all {commentsCount} comments</h2>
        </div>
        <p>{daysAgo} days Ago</p>
      </div>
    </div>
  );
}

// --- 2. MAIN COMPONENT ---
function Reels() {
  return (
    <div className={Style.test}>
      
      {/* Your original Static/First Reel */}
      <ReelCard 
        username="Yashsingh"
        profileImg="https://picsum.photos/200"
        postImg="https://picsum.photos/200"
        caption="Hello, this is my first post! 🚀 #coding"
      />

      {/* Dynamic Map Reels Data */}
      {reelsData.map((info, index) => (
        <ReelCard 
          key={index} // Unique key for React tracking
          username={info.username}
          profileImg={info.profileImg}
          postImg={info.postImg}
          caption={info.caption}
        />
      ))}
      
    </div>
  );
}

export default Reels;