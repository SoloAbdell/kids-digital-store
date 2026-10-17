'use client';

import { useEffect, useRef, useState } from 'react';

export default function GlobalMovingBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force strict muted properties for cross-browser autoplay compliance
    video.muted = true;
    video.defaultMuted = true;

    const attemptPlay = () => {
      const promise = video.play();
      if (promise !== undefined) {
        promise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.log('Autoplay deferred pending user interaction', err);
          });
      }
    };

    attemptPlay();

    // Universal gesture unlock: first scroll, click, touch, or mouse movement
    const unlockAutoplay = () => {
      if (video && video.paused) {
        video.muted = true;
        video
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    };

    window.addEventListener('scroll', unlockAutoplay, { once: true, passive: true });
    window.addEventListener('click', unlockAutoplay, { once: true });
    window.addEventListener('touchstart', unlockAutoplay, { once: true, passive: true });
    window.addEventListener('mousemove', unlockAutoplay, { once: true });

    return () => {
      window.removeEventListener('scroll', unlockAutoplay);
      window.removeEventListener('click', unlockAutoplay);
      window.removeEventListener('touchstart', unlockAutoplay);
      window.removeEventListener('mousemove', unlockAutoplay);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-20">
      {/* 1. Global 3D Fixed Background Video with Smooth Looping & Cinematic Drift */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster="/hero-banner.jpg"
        className="global-3d-background fixed top-0 left-0 w-screen h-screen object-cover -z-20 pointer-events-none animate-cinematic-drift"
        onPlay={() => setIsPlaying(true)}
      >
        <source src="/hero-background.mp4" type="video/mp4" />
        <source src="/hero-banner.mp4" type="video/mp4" />
        {/* Fallback image with continuous breathing camera animation */}
        <img
          src="/hero-banner.jpg"
          alt="3D Animated Storybook Scene"
          className="w-full h-full object-cover animate-cinematic-drift"
        />
      </video>

      {/* 2. Streaming Volumetric Sunlight Ray Animation from the window/canopy */}
      <div
        className="fixed -top-24 -left-24 w-[70vw] h-[130vh] pointer-events-none -z-10 animate-sunbeam"
        style={{
          background:
            'linear-gradient(135deg, rgba(254, 240, 138, 0.28) 0%, rgba(253, 224, 71, 0.14) 40%, transparent 75%)',
          filter: 'blur(35px)',
        }}
      />

      {/* 3. Ultra-light Readability Overlay (8% to 22% white radial vignette, 100% vibrant colors) */}
      <div className="global-overlay fixed top-0 left-0 w-screen h-screen -z-10 pointer-events-none" />

      {/* 4. Magical Floating Golden Ambient Dust Particles & Firefly Motes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="ambient-dust-particle w-2.5 h-2.5 top-1/4 left-1/3" style={{ animationDelay: '0s' }} />
        <div className="ambient-dust-particle w-3 h-3 top-1/3 right-1/4" style={{ animationDelay: '2.5s' }} />
        <div className="ambient-dust-particle w-2 h-2 top-1/2 left-1/2" style={{ animationDelay: '4s' }} />
        <div className="ambient-dust-particle w-3.5 h-3.5 top-1/5 right-1/3" style={{ animationDelay: '1.2s' }} />
        <div className="ambient-dust-particle w-2 h-2 top-2/3 left-1/4" style={{ animationDelay: '3.3s' }} />
        <div className="ambient-dust-particle w-2.5 h-2.5 top-3/4 right-1/5" style={{ animationDelay: '5s' }} />
        <div className="ambient-dust-particle w-1.5 h-1.5 top-1/6 left-1/5" style={{ animationDelay: '6.1s' }} />
        <div className="ambient-dust-particle w-3 h-3 top-3/5 left-3/4" style={{ animationDelay: '1.8s' }} />
        <div className="ambient-dust-particle w-2 h-2 top-4/5 left-1/3" style={{ animationDelay: '4.7s' }} />
        <div className="ambient-dust-particle w-2.5 h-2.5 top-1/2 left-1/6" style={{ animationDelay: '3.9s' }} />
      </div>
    </div>
  );
}
