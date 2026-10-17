'use client';

import { useEffect, useRef, useState } from 'react';

export default function GlobalMovingBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Smooth subtle mouse & scroll parallax that breathes 3D depth into the room
  useEffect(() => {
    let animationFrameId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize from -1 to 1 based on window center
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      // Subtle vertical shift on scroll
      const scrollY = window.scrollY;
      targetY = Math.min(scrollY / 1000, 1.2) * 0.4;
    };

    const loop = () => {
      // Smooth linear interpolation (lerp)
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;

      setOffset({
        x: currentX * 14, // Max 14px horizontal drift
        y: currentY * 10, // Max 10px vertical drift
      });

      animationFrameId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    animationFrameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden -z-20 bg-amber-50/20"
    >
      {/* 1. The 2nd 3D Pixar Background Image (Cozy Kids, Panda, Fox & Golden Dragon Classroom) */}
      <div
        className="fixed -inset-8 w-[calc(100vw+64px)] h-[calc(100vh+64px)] -z-20 pointer-events-none overflow-hidden"
        style={{
          transform: `translate3d(${-offset.x}px, ${-offset.y}px, 0)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <img
          src="/hero-banner.jpg"
          alt="3D Pixar Classroom with Golden Dragon, Panda and Kids"
          className="w-full h-full object-cover object-center animate-cinematic-drift"
          style={{
            willChange: 'transform',
          }}
        />
      </div>

      {/* 2. Streaming Volumetric Sunlight Ray Animation from the Arched Window */}
      <div
        className="fixed top-0 left-1/4 w-[55vw] h-[90vh] pointer-events-none -z-10 animate-sunbeam"
        style={{
          background:
            'radial-gradient(ellipse at 50% 20%, rgba(254, 240, 138, 0.35) 0%, rgba(253, 224, 71, 0.15) 45%, transparent 75%)',
          filter: 'blur(32px)',
          mixBlendMode: 'screen',
        }}
      />

      {/* 3. Subtle Warm Ambient Shimmer on Golden Dragon & Desk */}
      <div
        className="fixed bottom-10 right-10 w-[45vw] h-[55vh] pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(circle, rgba(253, 224, 71, 0.18) 0%, rgba(245, 158, 11, 0.08) 50%, transparent 80%)',
          filter: 'blur(40px)',
          animation: 'sunbeamPulse 10s ease-in-out infinite alternate',
        }}
      />

      {/* 4. Ultra-light Readability Overlay (8% to 20% white radial vignette) */}
      <div className="global-overlay fixed top-0 left-0 w-screen h-screen -z-10 pointer-events-none" />

      {/* 5. Floating Golden Ambient Dust Particles Illuminated in the Sunlight */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="ambient-dust-particle w-2.5 h-2.5 top-1/4 left-1/3" style={{ animationDelay: '0s' }} />
        <div className="ambient-dust-particle w-3 h-3 top-1/3 right-1/4" style={{ animationDelay: '2.5s' }} />
        <div className="ambient-dust-particle w-2 h-2 top-1/2 left-1/2" style={{ animationDelay: '4s' }} />
        <div className="ambient-dust-particle w-3.5 h-3.5 top-1/5 right-1/3" style={{ animationDelay: '1.2s' }} />
        <div className="ambient-dust-particle w-2 h-2 top-2/3 left-1/4" style={{ animationDelay: '3.3s' }} />
        <div className="ambient-dust-particle w-2.5 h-2.5 top-3/4 right-1/5" style={{ animationDelay: '5s' }} />
        <div className="ambient-dust-particle w-1.5 h-1.5 top-1/6 left-2/5" style={{ animationDelay: '6.1s' }} />
        <div className="ambient-dust-particle w-3 h-3 top-3/5 left-3/4" style={{ animationDelay: '1.8s' }} />
        <div className="ambient-dust-particle w-2 h-2 top-4/5 left-1/3" style={{ animationDelay: '4.7s' }} />
        <div className="ambient-dust-particle w-2.5 h-2.5 top-1/3 left-1/6" style={{ animationDelay: '3.9s' }} />
        <div className="ambient-dust-particle w-3 h-3 top-2/5 right-2/5" style={{ animationDelay: '2.1s' }} />
        <div className="ambient-dust-particle w-1.5 h-1.5 top-3/4 left-1/2" style={{ animationDelay: '5.5s' }} />
      </div>
    </div>
  );
}
