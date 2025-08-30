import React from "react";
import TopNavbar from "./TopNavbar";
import BottomNavbar from "./BottomNavbar";
import pfp from "../pics/pfp.JPG"

function ProfilePage() {
  return (
    <div className="app">
      <div className="container">
        

        <div className="profile-page">
          <div className="profile-header">
            <img
              
              alt="profile"
              className="w-24 h-24 rounded-full"
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
            <button className="p-3"> Weekly Mixtape</button>
          </div>

          
          <div className="grid">
            {[...Array(9)].map((_, index) => (
              <img
                key={index}
                src={`https://via.placeholder.com/150?text=Video+${
                  index + 1
                }`}
                alt={`video-${index}`}
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
