import React from "react";
import { useNavigate } from "react-router-dom";
import TopNavbar from "./TopNavbar";
import BottomNavbar from "./BottomNavbar";
import pfp from "../videos/profile.jpg"
import thumb1 from '../videos/thumbnail1.png';
import thumb2 from '../videos/thumbnail2.png';
import thumb3 from '../videos/thumbnail3.png';
import thumb4 from '../videos/thumbnail4.png';

function ProfilePage() {
  const navigate = useNavigate();
  return (
    <div className="app">
      <div className="container">
        

        <div className="profile-page">
          <div className="profile-header">
            <img
              src={pfp}
              alt="profile"
              className="w-24 h-24 rounded-full"
              style={{ width: '96px', height: '96px', borderRadius: '50%' }}
            />

            <h2>@ananabanana</h2>
            <p>just a gal</p>

            <div className="stats">
              <div>
                <span>500</span>
                <p>Following</p>
              </div>
              <div>
                <span>400</span>
                <p>Followers</p>
              </div>
              <div>
                <span>400</span>
                <p>Likes</p>
              </div>
            </div>

            
            <button>Edit Profile</button>
            <button className="p-3" onClick={() => navigate('/montage')}> Weekly MixTape</button>
          </div>

          
          <div className="grid">
            {[thumb1, thumb2, thumb3, thumb4].map((imgUrl, index) => (
              <img
                key={index}
                src={imgUrl}
                alt={`video-${index}`}
                style={{ width: '90px', height: '160px', objectFit: 'cover', borderRadius: '12px', margin: '8px' }}
              />
            ))}
          </div>
        </div>

        <BottomNavbar />
      </div>
    </div>
  );
}

export default ProfilePage;
