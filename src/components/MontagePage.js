import React, { useEffect, useState, useRef } from 'react';
import '../App.css';
import VideoCard from './VideoCard';
import BottomNavbar from './BottomNavbar';
import TopNavbar from './TopNavbar';

// Video data
const videoUrls = [
  {
    url: require('../videos/montage.mov'),
    profilePic: '',
    username: 'ananabanana',
    description: "Your weekly MixTape for the past week! #MixTapes #shareyourMixTape #montage #fyp #foryou",
    song: 'Original Sound',
    likes: 1,
    comments: 0,
    saves: 1,
    shares: 2,
  }
]

function MontagePage() {
  const [videos, setVideos] = useState([]);
  const [userInteracted, setUserInteracted] = useState(false);
  const videoRefs = useRef([]);

  useEffect(() => {
    setVideos(videoUrls);
  }, []);

  // Detect first user interaction
  useEffect(() => {
    const handleInteraction = () => setUserInteracted(true);
    window.addEventListener('click', handleInteraction, { once: true });
    return () => window.removeEventListener('click', handleInteraction);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.8,
    };

    const handleIntersection = (entries) => {
      if (!userInteracted) return; // Only play after user interacts
      entries.forEach((entry) => {
        const videoElement = entry.target;
        if (entry.isIntersecting) {
          videoElement.play().catch((err) => console.log('Play failed:', err));
        } else {
          videoElement.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    videoRefs.current.forEach((videoRef) => {
      if (videoRef) observer.observe(videoRef);
    });

    return () => observer.disconnect();
  }, [videos, userInteracted]);

  const handleVideoRef = (index) => (ref) => {
    videoRefs.current[index] = ref;
  };

  // Home feed component
  return (
    <div className="app">
      <div className="container">
        <TopNavbar />
        {videos.map((video, index) => (
          <VideoCard
            key={index}
            username={video.username}
            description={video.description}
            song={video.song}
            likes={video.likes}
            saves={video.saves}
            comments={video.comments}
            shares={video.shares}
            url={video.url}
            profilePic={video.profilePic}
            setVideoRef={handleVideoRef(index)}
          />
        ))}
        <BottomNavbar />
      </div>
    </div>
  );
}

export default MontagePage;
