import { useState, useEffect } from 'react';

const VideoBackground = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check if we're on a mobile device or slow connection
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Set up video loading event
    const videoElement = document.getElementById('bg-video');
    if (videoElement) {
      const handleLoaded = () => setVideoLoaded(true);
      videoElement.addEventListener('loadeddata', handleLoaded);
      
      return () => {
        videoElement.removeEventListener('loadeddata', handleLoaded);
        window.removeEventListener('resize', checkMobile);
      };
    }
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
          id="bg-video"
          autoPlay
          muted
          loop
          playsInline
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