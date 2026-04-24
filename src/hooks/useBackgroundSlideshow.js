import { useState, useEffect } from 'react';

// Local internship-related background images
const backgroundImages = [
  '/src/assets/images/auth-bg.png', // Professional Office Environment
];

export function useBackgroundSlideshow(interval = 5000) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Preload next image
    const preloadNextImage = (index) => {
      const nextIndex = (index + 1) % backgroundImages.length;
      const img = new Image();
      img.src = backgroundImages[nextIndex];
    };

    // Load first image
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = backgroundImages[currentImageIndex];
    preloadNextImage(currentImageIndex);

    const timer = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        const nextIndex = (currentImageIndex + 1) % backgroundImages.length;
        setCurrentImageIndex(nextIndex);
        preloadNextImage(nextIndex);
        setIsTransitioning(false);
      }, 500);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, currentImageIndex]);

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    transition: 'opacity 0.5s ease-in-out',
    opacity: isTransitioning ? 0 : 1,
  };

  return { backgroundStyle, imageLoaded };
}
