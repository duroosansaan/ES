import React, { useRef, useEffect } from 'react';
import { ESLogo } from './ESLogo';

export const HeroVideoBanner: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    // Set canvas dimensions
    const resize = () => {
      if (canvas) {
        canvas.width = canvas.offsetWidth * window.devicePixelRatio;
        canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      }
    };
    resize();
    window.addEventListener('resize', resize);

    // Particle nodes for ambient neon glow
    const particles: Array<{ x: number; y: number; speed: number; radius: number; color: string }> = [];
    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * (canvas.width || 800),
        y: Math.random() * (canvas.height || 400),
        speed: 0.3 + Math.random() * 0.7,
        radius: 1 + Math.random() * 2,
        color: i % 2 === 0 ? '#BD181E' : '#F5B800'
      });
    }

    const render = () => {
      time += 0.02;
      const w = canvas.width;
      const h = canvas.height;

      // Dark forest green / luxury grid background (like the official video intro)
      ctx.fillStyle = '#05180F';
      ctx.fillRect(0, 0, w, h);

      // Fine tech grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 32 * window.devicePixelRatio;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Central ambient rotating halo (Museum of Ancient Art style)
      const cx = w / 2;
      const cy = h / 2;
      const ringRadius = Math.min(w, h) * 0.38;

      ctx.save();
      ctx.translate(cx, cy);

      // Outer ring glow
      ctx.strokeStyle = 'rgba(245, 184, 0, 0.25)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, ringRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Rotating neon arcs (Red & Gold)
      ctx.rotate(time * 0.5);
      ctx.strokeStyle = '#BD181E';
      ctx.lineWidth = 4 * window.devicePixelRatio;
      ctx.beginPath();
      ctx.arc(0, 0, ringRadius, 0, Math.PI * 0.8);
      ctx.stroke();

      ctx.rotate(Math.PI);
      ctx.strokeStyle = '#F5B800';
      ctx.lineWidth = 4 * window.devicePixelRatio;
      ctx.beginPath();
      ctx.arc(0, 0, ringRadius, 0, Math.PI * 0.8);
      ctx.stroke();

      ctx.restore();

      // Float particles
      particles.forEach((p) => {
        p.y -= p.speed * window.devicePixelRatio;
        if (p.y < 0) p.y = h;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * window.devicePixelRatio, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border-2 border-black/10 shadow-2xl bg-[#05180F] select-none my-6">
      {/* Canvas Video Animation */}
      <canvas
        ref={canvasRef}
        className="w-full h-[260px] sm:h-[340px] block"
      />

      {/* Center Cinematic Overlay with Official ES Logo */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-4 text-center">
        
        {/* The Authentic ES Brand Logo with pulsing glow */}
        <div className="relative group mb-3">
          <div className="absolute -inset-2 bg-white/20 rounded-3xl blur-md animate-pulse" />
          <ESLogo size={74} className="relative shadow-2xl" />
        </div>

        {/* Video Title - Clean Display Typography */}
        <h3 className="font-mono text-xl sm:text-2xl font-black text-white tracking-widest uppercase drop-shadow-md">
          ES DESIGN AGENCY
        </h3>

        {/* Tagline */}
        <p className="font-mono text-xs sm:text-sm text-zinc-300 tracking-widest uppercase mt-1 drop-shadow">
          Follow The Future Changes
        </p>

        {/* Bottom subtle bar */}
        <div className="mt-3 flex items-center gap-3 text-[11px] font-mono text-zinc-300 bg-black/60 backdrop-blur-md px-4 py-1 rounded-full border border-white/10">
          <span>HIGH-END VISUAL DIRECTION</span>
          <span className="text-zinc-500">•</span>
          <span>4K REELS</span>
          <span className="text-zinc-500">•</span>
          <span>CUSTOM CODE</span>
        </div>
      </div>

      {/* Corner Video Tag */}
      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-mono text-zinc-300 border border-white/10">
        CINEMATIC LOGO REEL // 2026
      </div>
    </div>
  );
};
