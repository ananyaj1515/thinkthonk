import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import VideoCard from './components/VideoCard';
import BottomNavbar from './components/BottomNavbar';
import TopNavbar from './components/TopNavbar';
import ProfilePage from './components/ProfilePage';
import MontagePage from './components/MontagePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


// Video data
const videoUrls = [
  {
    url: require('./videos/1.mp4'),
    profilePic: '',
    username: 'allylovesfireworks',
    description: "baby you're a firework🎇🎇 #fireworks #cny #JBMalaysia ",
    song: 'Original Sound',
    likes: 4307,
    comments: 134,
    saves: 53,
    shares: 653,
  },
  {
    url: require('./videos/2.mp4'),
    profilePic: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/eace3ee69abac57c39178451800db9d5~c5_100x100.jpeg',
    username: 'allylovesfireworks',
    description: 'Happy Birthday Singapore 🎆🎇 #fireworks #SG60 #ndp #happybirthdaysingapore',
    song: 'Original Sound',
    likes: '13.4K',
    comments: 3121,
    saves: 254,
    shares: 3420,
  },
  {
    url: require('./videos/3.mp4'),
    profilePic: 'https://p77-sign-va.tiktokcdn.com/tos-maliva-avt-0068/4e6698b235eadcd5d989a665704daf68~c5_100x100.jpeg',
    username: 'travel_with_navyaya',
    description: 'quack quack #ducks #travelvlogging #vietnam #cuteanimals',
    song: 'Contains: Famed Flames',
    likes: 5438,
    comments: 538,
    saves: 82,
    shares: 1117,
  },
  {
    url: require('./videos/4.mp4'),
    profilePic: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/4bda52cf3ad31c728153859262c329db~c5_100x100.jpeg',
    username: 'faruktuktuk',
    description: 'SUPERNOVA 25 - The biggest concert in NUS! So hyped #bestnightofmylife #freshman #freebeer #supernova',
    song: 'Original Sound',
    likes: 9689,
    comments: 830,
    saves: 1037,
    shares: 3967,
  },
  {
    url: require('./videos/5.mp4'),
    profilePic: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/4bda52cf3ad31c728153859262c329db~c5_100x100.jpeg',
    username: 'travel_with_navyaya',
    description: 'Almost got hit by the train guys 😭 #vietnamtraveldiaries #helpme #ilovetrains #travelvlogging',
    song: 'Song: The Choo Choo Train',
    likes: 9689,
    comments: 230,
    saves: 1037,
    shares: 967,
  },
  {
    url: require('./videos/6.mp4'),
    profilePic: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/4bda52cf3ad31c728153859262c329db~c5_100x100.jpeg',
    username: 'assthetic_aryan',
    description: 'House Party #sigma #codinglife #codingmemes',
    song: 'orijinal ses - Computer Science',
    likes: 9689,
    comments: 230,
    saves: 1037,
    shares: 967,
  },
  {
    url: require('./videos/7.MOV'),
    profilePic: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/4bda52cf3ad31c728153859262c329db~c5_100x100.jpeg',
    username: 'trains4life',
    description: 'this was so high up!!',
    song: 'original audio - mountain sound',
    likes: 9689,
    comments: 230,
    saves: 1037,
    shares: 967,
  },
  {
    url: require('./videos/8.MOV'),
    profilePic: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/4bda52cf3ad31c728153859262c329db~c5_100x100.jpeg',
    username: 'countrylove',
    description: 'helikopter helikpoter',
    song: 'orijinal ses - bladesss',
    likes: 9689,
    comments: 230,
    saves: 1037,
    shares: 967,
  },
  {
    url: require('./videos/9.mov'),
    profilePic: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/4bda52cf3ad31c728153859262c329db~c5_100x100.jpeg',
    username: 'cavevibes',
    description: 'you would not believe your eyes if ten million fireflies',
    song: 'Fireflies - Owl City',
    likes: 9689,
    comments: 230,
    saves: 1037,
    shares: 967,
  },
  {
    url: require('./videos/10.MOV'),
    profilePic: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/4bda52cf3ad31c728153859262c329db~c5_100x100.jpeg',
    username: 'instrusivethoughts',
    description: 'the water is so loud!!!',
    song: 'orijinal ses -Original Audio',
    likes: 9689,
    comments: 230,
    saves: 1037,
    shares: 967,
  },
];

function App() {
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
  const HomeFeed = () => (
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

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeFeed />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/montage" element={<MontagePage />} />
      </Routes>
    </Router>
  );
}

export default App;
