// src/components/VideoBackground.tsx (Improved)
import { useState, useEffect, useRef } from 'react';

const VideoBackground = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    // Check if we're on a mobile device or slow connection
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Preload the video to make it start more quickly
    const preloadVideo = async () => {
      try {
        if (videoRef.current) {
          // Force the video to load immediately
          videoRef.current.load();
          
          // Handle when video can play
          videoRef.current.oncanplay = () => {
            setVideoLoaded(true);
            
            // Ensure video plays 
            videoRef.current?.play().catch(err => {
              console.error("Video playback error:", err);
            });
          };
          
          // Check regularly if the video has stopped unexpectedly
          const videoCheckInterval = setInterval(() => {
            if (videoRef.current && videoRef.current.paused && videoLoaded) {
              videoRef.current.play().catch(err => {
                console.error("Video restart error:", err);
              });
            }
          }, 1000);
          
          return () => clearInterval(videoCheckInterval);
        }
      } catch (error) {
        console.error("Video loading error:", error);
      }
    };
    
    preloadVideo();
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Static background that shows before video loads */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
          videoLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ backgroundImage: "url('/images/login-background-static.jpg')" }}
      />
      
      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>
      
      {/* Video background */}
      {!isMobile && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={`absolute min-w-full min-h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          poster="/video-poster.jpg"
        >
          <source src="/videos/background-medium.mp4" type="video/mp4" />
          <source src="/videos/background-low.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  );
};

export default VideoBackground;