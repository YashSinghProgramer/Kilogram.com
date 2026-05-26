import React, { useState, useEffect } from 'react';
import Style from './storys.module.css';
import axios from 'axios';

function Storys() { // Component ka naam Capital (S) se shuru kiya
  const [userImages, setUserImages] = useState([]);

  // API se data lane ke liye function
  const getdata = async () => {
    try {
      
      const response = await axios.get('https://picsum.photos/v2/list?page=2&limit=40'); 
      setUserImages(response.data); // Data ko state mein save kiya
    } catch (error) {
      console.error("Data laane mein error aaya:", error);
    }
  };

  // Component load hote hi API call karne ke liye useEffect lagaya
  useEffect(() => {
    getdata();
  }, []);

 
  const localStories = [
    {
      name: "rajput_yash.20",
      img: "https://picsum.photos/200"
    }
  ];

  return (
    <div className={Style.Con}>
      {/* 1. Pehle aapka local data dikhega */}
      {localStories.map((story, index) => (
        <div className={Style.Story} key={`local-${index}`}>
          <img src={story.img} alt='profile_img' />
          <h3>{story.name}</h3>
        </div>
      ))}

      {/* 2. Fir API (Picsum) se aaya hua data dikhega */}
      {userImages.map((elem, idx) => (
        <div className={Style.Story} key={`api-${elem.id || idx}`}>
          
          <img src={elem.download_url} className={Style.img} alt='api_img' />
          <h3>{elem.author}</h3>
        </div>
      ))}
    </div>
  );
}

export default Storys;