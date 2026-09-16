import React, { useState, useEffect } from 'react';

// =========================================================================
// 📍 [مكان تعديل واستبدال شعار الوكالة الرسمي (ES Logo) - السطر التالي مباشرة]
// 1. يمكنك وضع ملف اللوجو الخاص بك باسم logo.png داخل مجلد public (الأسهل لـ GitHub).
// 2. أو استبدال مسار الاستيراد في السطر التالي بمسار صورة اللوجو الجديدة:
// =========================================================================
import esLogoImg from '../assets/images/new_es_logo_1789550348349.jpg';

import { customDataManager } from '../utils/customDataManager';

interface ESLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  src?: string;
}

export const ESLogo: React.FC<ESLogoProps> = ({
  className = '',
  size = 48,
  showText = false,
  src
}) => {
  const [logoSrc, setLogoSrc] = useState<string>(src || esLogoImg);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const updateLogo = () => {
      const custom = customDataManager.getCustomLogo();
      if (custom) {
        setLogoSrc(custom);
        setHasError(false);
      } else if (src) {
        setLogoSrc(src);
        setHasError(false);
      } else {
        // Prefer bundled 3D logo or /logo.png
        setLogoSrc(esLogoImg || '/logo.png');
        setHasError(false);
      }
    };

    updateLogo();
    window.addEventListener('brand_assets_updated', updateLogo);
    return () => window.removeEventListener('brand_assets_updated', updateLogo);
  }, [src]);

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Authentic ES Logo Container */}
      <div
        className="relative flex items-center justify-center rounded-2xl overflow-hidden shadow-lg shrink-0 border border-zinc-700/80 bg-black"
        style={{ width: size, height: size }}
      >
        {!hasError ? (
          <img
            src={logoSrc}
            alt="ES Agency Official Logo"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={() => {
              if (logoSrc !== esLogoImg) {
                setLogoSrc(esLogoImg);
              } else {
                setHasError(true);
              }
            }}
          />
        ) : (
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full p-1.5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Subtle dark backdrop lighting */}
            <circle cx="50" cy="50" r="48" fill="#111115" />
            <circle cx="50" cy="50" r="30" fill="#222228" opacity="0.6" />

            {/* Left 'E' Monogram */}
            <path
              d="M 50 35 L 28 35 C 20 35 16 40 16 48 C 16 56 20 60 28 60 L 50 60"
              stroke="#FFFFFF"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Center Bar */}
            <line x1="24" y1="47.5" x2="44" y2="47.5" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />

            {/* Right 'S' Monogram */}
            <path
              d="M 50 36 C 58 36 64 40 64 47 C 64 54 50 56 50 64 C 50 71 58 74 66 74"
              stroke="#D4D4D8"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Central chrome glint */}
            <circle cx="50" cy="48" r="2.5" fill="#FFFFFF" />
          </svg>
        )}
      </div>

      {showText && (
        <div className="flex flex-col text-right">
          <span className="font-mono font-black text-sm tracking-wider text-black leading-none">
            ES AGENCY
          </span>
          <span className="font-mono text-[10px] text-zinc-600 tracking-widest uppercase mt-0.5">
            Marketing & Design
          </span>
        </div>
      )}
    </div>
  );
};

