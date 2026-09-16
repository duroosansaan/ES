import React from 'react';
import { ArrowUp, Sparkles, MessageSquare, Facebook, MessageCircle, Phone, Lock } from 'lucide-react';
import { AGENCY_INFO } from '../data/agencyData';
import { soundManager } from '../utils/audio';
import { ESLogo } from './ESLogo';

interface FooterProps {
  onOpenDeveloperModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDeveloperModal }) => {
  const scrollToTop = () => {
    soundManager.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-zinc-100 text-zinc-900 border-t border-zinc-200 pt-16 pb-12 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-zinc-200">
          
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-4 text-right">
            <div className="flex items-center gap-3">
              <ESLogo size={42} showText={false} />
              <div>
                <span className="font-mono font-black text-lg text-black tracking-widest block">
                  ES DESIGN AGENCY
                </span>
                <span className="text-xs text-zinc-500 font-mono">Follow The Future Changes</span>
              </div>
            </div>

            <p className="text-xs text-zinc-600 max-w-md leading-relaxed">
              وكالة تصميم محتوى بصري وهويات احترافية وفيديوهات ريلز ومواقع خاصة. نعمل بشغف لمواكبة المستقبل وصناعة أثر بصري استثنائي لعلامتك التجارية.
            </p>

            {/* Direct Messenger Highlight */}
            <div className="pt-2">
              <a
                href={AGENCY_INFO.messengerUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white text-xs font-bold transition-all shadow-md active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                <span>بدء محادثة رسمية عبر Messenger</span>
              </a>
            </div>
          </div>

          {/* Social & Contact */}
          <div className="md:col-span-3 space-y-3 text-right">
            <h4 className="text-xs font-bold text-black font-mono uppercase tracking-wider">
              قنوات التواصل الرسمية
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href={AGENCY_INFO.messengerUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-zinc-600 hover:text-black transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-black" />
                <span>Messenger (الرد الفوري)</span>
              </a>
              <a
                href={AGENCY_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-zinc-600 hover:text-black transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp: {AGENCY_INFO.phoneFormatted}</span>
              </a>
              <a
                href={AGENCY_INFO.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-zinc-600 hover:text-black transition-colors"
              >
                <Facebook className="w-4 h-4 text-blue-600" />
                <span>Facebook Page</span>
              </a>
              <a
                href={`tel:${AGENCY_INFO.phone}`}
                className="flex items-center gap-2 text-zinc-600 hover:text-black transition-colors font-mono"
              >
                <Phone className="w-4 h-4 text-zinc-700" />
                <span>{AGENCY_INFO.phoneFormatted}</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3 text-right">
            <h4 className="text-xs font-bold text-black font-mono uppercase tracking-wider">
              روابط سريعة
            </h4>
            <div className="space-y-2 text-xs text-zinc-600">
              <a href="#offers" className="block hover:text-black transition-colors">باقات وعروض الوكالة</a>
              <a href="#chair-carousel-section" className="block hover:text-black transition-colors">معرض التصاميم (3D)</a>
              <a href="#custom-request" className="block hover:text-black transition-colors font-bold text-black">اكتب طلبك وميزانيتك (واتساب)</a>
              <a href="#services" className="block hover:text-black transition-colors">قائمة أسعار الخدمات</a>
              <a href="#calculator" className="block hover:text-black transition-colors">حاسبة الباقات المخصصة</a>
              
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onOpenDeveloperModal();
                }}
                className="flex items-center gap-1.5 text-zinc-400 hover:text-black transition-colors pt-2 text-xs"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>بوابة المطورين</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="text-center sm:text-right">
            <span>جميع الحقوق محفوظة © {new Date().getFullYear()} وكالة ES Design Agency.</span>
            <span className="mx-2 text-zinc-300">|</span>
            <span className="font-mono text-[11px]">Follow The Future Changes</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-zinc-600 hover:text-black transition-colors"
          >
            <span>العودة للأعلى</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
