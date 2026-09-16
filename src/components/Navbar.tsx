import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Sparkles, Layers, Award, Calculator, MessageSquare, Facebook, MessageCircle, Lock, Unlock, Send } from 'lucide-react';
import { AGENCY_INFO } from '../data/agencyData';
import { soundManager } from '../utils/audio';
import { ESLogo } from './ESLogo';

interface NavbarProps {
  onOpenBooking: (packageTitle?: string) => void;
  onOpenDeveloperModal: () => void;
  isDeveloperUnlocked: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenDeveloperModal,
  isDeveloperUnlocked
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [soundActive, setSoundActive] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const newState = soundManager.toggleSound();
    setSoundActive(newState);
  };

  const navLinks = [
    { name: 'العروض والباقات', href: '#offers', icon: Award },
    { name: 'المعرض (3D)', href: '#chair-carousel-section', icon: Layers },
    { name: 'طلب مخصص (واتساب)', href: '#custom-request', icon: Send },
    { name: 'الخدمات والأسعار', href: '#services', icon: Sparkles },
    { name: 'حاسبة التكلفة', href: '#calculator', icon: Calculator },
  ];

  return (
    <header
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 select-none ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-zinc-200 shadow-sm py-3'
          : 'bg-white/70 backdrop-blur-sm border-b border-zinc-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Agency Identity */}
          <a
            href="#"
            id="brand-logo"
            onClick={() => soundManager.playClick()}
            className="flex items-center gap-3 group"
          >
            <ESLogo size={42} showText={false} />
            <div className="flex flex-col text-right">
              <span className="font-mono font-black text-base sm:text-lg tracking-wider text-black leading-none">
                ES AGENCY
              </span>
              <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase mt-0.5">
                Follow The Future Changes
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => soundManager.playHover()}
                  className="flex items-center gap-1.5 text-xs font-bold text-zinc-700 hover:text-black transition-colors"
                >
                  <Icon className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action Icons & Direct Messenger / Developer Portal */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Direct Messenger Chat Button (Primary focus as requested) */}
            <a
              href={AGENCY_INFO.messengerUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundManager.playClick()}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-black hover:bg-zinc-800 text-white text-xs font-bold transition-all shadow-sm active:scale-95"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Messenger</span>
            </a>

            {/* WhatsApp Quick Icon */}
            <a
              href={AGENCY_INFO.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundManager.playClick()}
              title="تواصل عبر واتساب"
              className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-black transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            {/* Facebook Quick Icon */}
            <a
              href={AGENCY_INFO.facebookUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundManager.playClick()}
              title="صفحة الفيسبوك الرسمية"
              className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-black transition-colors"
            >
              <Facebook className="w-4 h-4" />
            </a>

            {/* Sound Toggle */}
            <button
              type="button"
              onClick={handleToggleSound}
              title={soundActive ? 'كتم المؤثرات الصوتية' : 'تفعيل المؤثرات الصوتية'}
              className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-600 hover:text-black transition-colors"
            >
              {soundActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-zinc-400" />}
            </button>

            {/* Developer Gate Button */}
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onOpenDeveloperModal();
              }}
              title="بوابة المطورين (إدارة العروض والصور)"
              className={`p-2 rounded-xl transition-all ${
                isDeveloperUnlocked
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
              }`}
            >
              {isDeveloperUnlocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-zinc-100 text-black lg:hidden"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 rounded-2xl bg-white border border-zinc-200 shadow-xl space-y-3 text-right">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-end gap-2.5 py-2 px-3 rounded-xl text-xs font-bold text-zinc-800 hover:bg-zinc-100 transition-colors"
                >
                  <span>{link.name}</span>
                  <Icon className="w-4 h-4 text-zinc-500" />
                </a>
              );
            })}

            <div className="pt-3 border-t border-zinc-100 space-y-2">
              <a
                href={AGENCY_INFO.messengerUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-xl bg-black text-white text-xs font-bold flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>محادثة Messenger</span>
              </a>

              <a
                href="#custom-request"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-xl bg-zinc-100 text-black text-xs font-bold flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>طلب مخصص بالميزانية (واتساب)</span>
              </a>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
