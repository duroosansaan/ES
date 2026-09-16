import React, { useState, useRef, useEffect, useCallback } from 'react';
import { RotateCw, RefreshCw, Eye, Sparkles, Box, Compass } from 'lucide-react';

// =========================================================================
// 📍 [مكان تعديل صورة الشخصية المنحوتة ثلاثية الأبعاد - السطر التالي مباشرة]
// 1. يمكنك وضع صورتك باسم character.png داخل مجلد public (الأفضل لـ GitHub).
// 2. أو تغيير مسار الاستيراد في السطر التالي إلى ملف صورتك الجديدة:
// =========================================================================
import brandCharacterImg from '../assets/images/new_3d_avatar_1789550372274.jpg';

import { customDataManager } from '../utils/customDataManager';
import { soundManager } from '../utils/audio';

interface BlenderSculptedCharacterProps {
  className?: string;
}

export const BlenderSculptedCharacter: React.FC<BlenderSculptedCharacterProps> = ({
  className = ''
}) => {
  // 3D Rotation Angles
  const [rotX, setRotX] = useState<number>(8);
  const [rotY, setRotY] = useState<number>(-12);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isAutoSpinning, setIsAutoSpinning] = useState<boolean>(true);
  const [lightingPos, setLightingPos] = useState({ x: 45, y: 35 });

  // 📍 هنا يتم تحديد مصدر صورة الشخصية: يقرأ من التخزين، أو public/character.png، أو brandCharacterImg الافتراضي
  const [characterImgSrc, setCharacterImgSrc] = useState<string>(brandCharacterImg);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number; y: number; startRotX: number; startRotY: number }>({
    x: 0,
    y: 0,
    startRotX: 8,
    startRotY: -12
  });

  // Load active character image & listen for updates from developer portal
  useEffect(() => {
    const updateCharacterImg = () => {
      const custom = customDataManager.getCustomCharacter();
      if (custom) {
        setCharacterImgSrc(custom);
      } else {
        // Test public/character.png, fallback to bundled image
        const img = new Image();
        img.onload = () => {
          setCharacterImgSrc('/character.png');
        };
        img.onerror = () => {
          setCharacterImgSrc(brandCharacterImg);
        };
        img.src = '/character.png';
      }
    };

    updateCharacterImg();
    window.addEventListener('brand_assets_updated', updateCharacterImg);
    return () => window.removeEventListener('brand_assets_updated', updateCharacterImg);
  }, []);

  // Auto-spin turntable (Blender 360 preview mode)

  useEffect(() => {
    if (!isAutoSpinning || isDragging) return;

    const interval = setInterval(() => {
      setRotY((prev) => {
        const next = (prev + 0.6) % 360;
        // Shift simulated light reflection dynamically
        const rad = (next * Math.PI) / 180;
        setLightingPos({
          x: 50 + Math.sin(rad) * 30,
          y: 40 + Math.cos(rad) * 20
        });
        return next;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [isAutoSpinning, isDragging]);

  // Pointer / Touch Drag Start
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setIsAutoSpinning(false);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      startRotX: rotX,
      startRotY: rotY
    };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    soundManager.playHover();
  };

  // Pointer / Touch Drag Move
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;

    // Smooth rotation calculation
    const newRotY = (dragStartRef.current.startRotY + deltaX * 0.7) % 360;
    const newRotX = Math.max(-35, Math.min(35, dragStartRef.current.startRotX - deltaY * 0.5));

    setRotY(newRotY);
    setRotX(newRotX);

    // Calculate dynamic specular highlight
    const rad = (newRotY * Math.PI) / 180;
    setLightingPos({
      x: Math.max(10, Math.min(90, 50 + Math.sin(rad) * 35)),
      y: Math.max(10, Math.min(90, 50 - newRotX * 0.8))
    });
  };

  // Pointer / Touch Drag End
  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
      } catch {
        // Safe fallback
      }
      soundManager.playClick();
    }
  };

  const handleReset = () => {
    soundManager.playClick();
    setRotX(8);
    setRotY(-12);
    setIsAutoSpinning(false);
  };

  const toggleAutoSpin = () => {
    soundManager.playClick();
    setIsAutoSpinning(!isAutoSpinning);
  };

  const setAnglePreset = (angle: number) => {
    soundManager.playClick();
    setIsAutoSpinning(false);
    setRotY(angle);
    setRotX(10);
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col items-center select-none ${className}`}
    >
      {/* 3D Viewport Frame - Blender UI / UX Style */}
      <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-3xl p-3 bg-zinc-50 border border-zinc-300 shadow-2xl overflow-hidden flex flex-col justify-between">
        
        {/* Top Viewport Header / UI UX Telemetry */}
        <div className="flex items-center justify-between text-[11px] font-mono font-semibold text-zinc-700 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-zinc-200 z-20 shadow-sm">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-black font-bold">BLENDER 3D SCULPT</span>
          </div>
          
          {/* Real-time D3 / UI telemetry coordinates */}
          <div className="flex items-center gap-2 text-zinc-600">
            <span>X: {rotX.toFixed(1)}°</span>
            <span>Y: {Math.round(rotY)}°</span>
            <span>Z: 0.0°</span>
          </div>
        </div>

        {/* 3D Scene Area */}
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative flex-1 w-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-none perspective-1000 overflow-hidden py-4"
          style={{ perspective: 1100 }}
        >
          {/* Subtle Turntable Grid Rings (Blender Floor Grid) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
            <div
              className="w-[280px] h-[280px] rounded-full border border-dashed border-zinc-800"
              style={{
                transform: `rotateX(75deg) rotateZ(${rotY}deg)`
              }}
            />
            <div
              className="absolute w-[360px] h-[360px] rounded-full border border-zinc-400"
              style={{
                transform: `rotateX(75deg) rotateZ(${rotY * 0.5}deg)`
              }}
            />
          </div>

          {/* 3D Carved & Sculpted Model Container */}
          <div
            className="relative w-[260px] sm:w-[290px] h-[320px] sm:h-[350px] transition-transform duration-75 ease-out transform-style-3d"
            style={{
              transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Extruded Depth Layers simulating 3D Blender sculpted relief */}
            <div
              className="absolute inset-0 rounded-3xl bg-zinc-400/40 blur-[2px]"
              style={{ transform: 'translateZ(-14px)' }}
            />
            <div
              className="absolute inset-0 rounded-3xl bg-zinc-300 border-2 border-zinc-400"
              style={{ transform: 'translateZ(-8px)' }}
            />
            <div
              className="absolute inset-0 rounded-3xl bg-zinc-200 border-2 border-zinc-400 shadow-inner"
              style={{ transform: 'translateZ(-3px)' }}
            />

            {/* Main Front Sculpted Surface */}
            <div
              className="relative w-full h-full rounded-2xl overflow-hidden bg-black border-2 border-black shadow-2xl"
              style={{
                transform: 'translateZ(12px)',
                boxShadow: `${-rotY * 0.4}px ${rotX * 0.5 + 20}px 35px rgba(0,0,0,0.3)`
              }}
            >
              {/* The Brand Character Image */}
              <img
                src={characterImgSrc}
                alt="ES Brand Character 3D Blender Sculpt"
                className="w-full h-full object-cover object-center pointer-events-none filter contrast-110 brightness-105"
                draggable={false}
              />

              {/* Dynamic Chiseled Light Reflection Shader */}
              <div
                className="absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-150"
                style={{
                  background: `radial-gradient(circle at ${lightingPos.x}% ${lightingPos.y}%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.1) 40%, rgba(0,0,0,0.5) 100%)`
                }}
              />

              {/* Blender Sculpt Clay / Metallic Rim Highlight */}
              <div
                className="absolute inset-0 border-[3px] rounded-2xl pointer-events-none"
                style={{
                  borderColor: `rgba(255, 255, 255, ${0.4 + Math.abs(Math.sin((rotY * Math.PI) / 180)) * 0.4})`
                }}
              />

              {/* Bottom Spec Badge */}
              <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-[10px] font-mono font-bold text-white border border-white/20">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span>ES GRAND AVATAR // 3D</span>
              </div>
            </div>

            {/* Realistic Cast Drop Shadow underneath */}
            <div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-8 bg-black/25 rounded-full blur-md pointer-events-none"
              style={{
                transform: `rotateX(90deg) translateZ(-40px) scale(${1 - Math.abs(rotX) * 0.01})`
              }}
            />
          </div>
        </div>

        {/* Bottom Interactive Controls (Touch & Rotate UI) */}
        <div className="flex flex-col gap-2 z-20 pt-2 border-t border-zinc-200 bg-white/95 backdrop-blur-md -mx-3 -mb-3 p-3 rounded-b-3xl">
          
          <div className="flex items-center justify-between text-xs text-zinc-600">
            <span className="font-semibold text-zinc-900 flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-black" />
              <span>المس أو اسحب للتدوير 360°</span>
            </span>
            <span className="font-mono text-[10px] text-zinc-500">
              {isAutoSpinning ? 'دوران تلقائي نشط' : 'تحكم يدوي'}
            </span>
          </div>

          <div className="flex items-center justify-between gap-1.5">
            <button
              onClick={toggleAutoSpin}
              className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                isAutoSpinning
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800'
              }`}
            >
              <RotateCw className={`w-3.5 h-3.5 ${isAutoSpinning ? 'animate-spin' : ''}`} />
              <span>{isAutoSpinning ? 'إيقاف الدوران' : 'دوران 360°'}</span>
            </button>

            <button
              onClick={() => setAnglePreset(-45)}
              className="py-1.5 px-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-semibold"
            >
              45°-
            </button>

            <button
              onClick={() => setAnglePreset(45)}
              className="py-1.5 px-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-semibold"
            >
              +45°
            </button>

            <button
              onClick={handleReset}
              title="إعادة ضبط الزاوية"
              className="p-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-600 hover:text-black transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Aesthetic Caption */}
      <div className="mt-3 text-center">
        <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
          Sculpted 3D Brand Direction // Touch-Responsive Turntable
        </span>
      </div>
    </div>
  );
};
