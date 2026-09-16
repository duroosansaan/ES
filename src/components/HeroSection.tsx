import React from 'react';
import { ArrowLeft, MessageSquare, Facebook, MessageCircle, Sparkles, Send, Settings, Image as ImageIcon } from 'lucide-react';
import { AGENCY_INFO } from '../data/agencyData';
import { soundManager } from '../utils/audio';
import { BlenderSculptedCharacter } from './BlenderSculptedCharacter';
import { HeroVideoBanner } from './HeroVideoBanner';
import { ESLogo } from './ESLogo';

interface HeroSectionProps {
  onOpenBooking: (packageTitle?: string) => void;
  onExploreOffers: () => void;
  onOpenDeveloperModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  onExploreOffers,
  onOpenDeveloperModal
}) => {
  return (
    <section id="hero" className="relative pt-28 pb-16 bg-white text-zinc-900 border-b border-zinc-200 overflow-hidden select-none">
      
      {/* Crisp subtle background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Top Video Header & Brand Reel (As requested: الوجو والفيديو كخلفية في أول الموقع وتحته الوصف بشياكة) */}
        <HeroVideoBanner />

        {/* Museum of Ancient Art Style Specs Bar (Inspired by Video Reference 2) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 my-6 border-y border-zinc-200 text-center font-mono text-xs">
          <div className="p-2 border-l border-zinc-200 last:border-none">
            <span className="text-[10px] text-zinc-400 block uppercase">DIRECTION</span>
            <strong className="text-black font-extrabold text-sm">ESLAM AMR</strong>
          </div>
          <div className="p-2 border-l border-zinc-200 last:border-none">
            <span className="text-[10px] text-zinc-400 block uppercase">RESOLUTION</span>
            <strong className="text-black font-extrabold text-sm">4K ULTRA HD</strong>
          </div>
          <div className="p-2 border-l border-zinc-200 last:border-none">
            <span className="text-[10px] text-zinc-400 block uppercase">DELIVERY SPEED</span>
            <strong className="text-black font-extrabold text-sm">FAST TURNAROUND</strong>
          </div>
          <div className="p-2">
            <span className="text-[10px] text-zinc-400 block uppercase">TARGET</span>
            <strong className="text-black font-extrabold text-sm">VIRAL ENGAGEMENT</strong>
          </div>
        </div>

        {/* Main 2-Column Showcase: Text & Actions on Right, Blender 3D Sculpted Character on Left */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-4">
          
          {/* Text & CTAs */}
          <div className="lg:col-span-7 flex flex-col text-right items-start">
            
            {/* Slogan Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 border border-zinc-300 shadow-sm mb-5">
              <ESLogo size={20} />
              <span className="font-mono text-xs font-bold text-black tracking-wider uppercase">
                ES DESIGN AGENCY
              </span>
              <span className="text-zinc-400">|</span>
              <span className="text-xs text-zinc-600 font-medium">
                Follow The Future Changes
              </span>
            </div>


            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl font-black text-black leading-[1.2] tracking-tight mb-5">
              نصنع هويتك ومحتواك البصري <br />
              <span className="text-zinc-600">بمعايير عالمية تجذب عملائك</span>
            </h1>

            {/* Description Paragraph */}
            <p className="text-sm sm:text-base text-zinc-600 max-w-xl leading-relaxed mb-8">
              وكالة متخصصة في تصميم الهويات، الفيديوهات القصيرة ريلز وشورتس بأسلوب التريند، تصاميم الإعلانات الجذابة، وتطوير مواقع الويب الخاصة لعلامتك التجارية.
            </p>

            {/* Primary Action Buttons: Messenger Highlight + Custom WhatsApp Request */}
            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto mb-8">
              {/* Primary: Messenger Chat */}
              <a
                href={AGENCY_INFO.messengerUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundManager.playClick()}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-black hover:bg-zinc-800 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2.5 shadow-xl hover:shadow-2xl transition-all cursor-pointer active:scale-95"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                <span>تواصل معنا فوراً عبر Messenger</span>
              </a>

              {/* Direct WhatsApp Quote / Budget Request */}
              <a
                href="#custom-request"
                onClick={() => soundManager.playClick()}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-zinc-100 text-black border-2 border-black text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>اكتب طلبك وميزانيتك</span>
              </a>

              {/* Browse Offers Button */}
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onExploreOffers();
                }}
                className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>مشاهدة باقات الأسعار</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Social Proof Channels */}
            <div className="flex flex-wrap items-center gap-5 pt-4 border-t border-zinc-200 text-xs text-zinc-600">
              <span className="font-semibold text-black">قنواتنا الرسمية:</span>
              
              <a
                href={AGENCY_INFO.messengerUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-black transition-colors font-medium"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Messenger</span>
              </a>

              <a
                href={AGENCY_INFO.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-black transition-colors"
              >
                <Facebook className="w-3.5 h-3.5" />
                <span>فيسبوك</span>
              </a>

              <a
                href={AGENCY_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-black transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>واتساب: {AGENCY_INFO.phoneFormatted}</span>
              </a>
            </div>

          </div>

          {/* Blender 3D Sculpted Character (Touch & Drag Rotation) */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <BlenderSculptedCharacter className="w-full" />
          </div>

        </div>

      </div>
    </section>
  );
};
