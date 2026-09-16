import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Pause, Play, PlusCircle, Volume2, VolumeX } from 'lucide-react';
import { CarouselDesignItem } from '../types';
import { soundManager } from '../utils/audio';

interface ChairStyleCarouselProps {
  designs: CarouselDesignItem[];
  onOpenDeveloperModal: () => void;
}

export const ChairStyleCarousel: React.FC<ChairStyleCarouselProps> = ({
  designs,
  onOpenDeveloperModal
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isPlaying, setIsPlaying] = useState(true);
  const [autoFlipSoundCount, setAutoFlipSoundCount] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Counter to mute auto-flip sound after 5 flips as requested by user:
  // "الصوت خليه لاول خمس تقليبات بس و يقف خالص لكل واحد يخش الموقع بس يظهر لو هو داس على حاجه عشان هو دلوقتى رخم"
  const autoFlipSoundCountRef = useRef(0);

  const categories = [
    { id: 'all', label: 'كافة التصاميم', labelEn: 'ALL DESIGNS' },
    { id: 'furniture', label: 'تصاميم أثاث فاخر', labelEn: 'CHAIR DESIGN' },
    { id: 'graphic', label: 'تصاميم إعلانية', labelEn: 'GRAPHIC ADS' },
    { id: 'video', label: 'ريلز ومونتاج', labelEn: 'REELS & VIDEO' },
    { id: 'web', label: 'مواقع خاصة', labelEn: 'WEB UI/UX' },
    { id: 'branding', label: 'هوية بصرية', labelEn: 'BRANDING' },
  ];

  const filteredDesigns = activeCategory === 'all'
    ? designs
    : designs.filter(d => d.category === activeCategory);

  const safeDesigns = filteredDesigns.length > 0 ? filteredDesigns : designs;

  // Auto-flip every 2 seconds with sound LIMITED TO 5 AUTO-FLIPS
  useEffect(() => {
    if (!isPlaying || safeDesigns.length <= 1) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % safeDesigns.length;
        
        // Play flip sound ONLY for the first 5 auto-flips
        if (autoFlipSoundCountRef.current < 5) {
          soundManager.playFlip();
          autoFlipSoundCountRef.current += 1;
          setAutoFlipSoundCount(autoFlipSoundCountRef.current);
        }

        return next;
      });
    }, 2000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, safeDesigns.length]);

  // Manual actions ALWAYS play sound on user click
  const handleNext = () => {
    soundManager.playFlip();
    setCurrentIndex((prev) => (prev + 1) % safeDesigns.length);
  };

  const handlePrev = () => {
    soundManager.playFlip();
    setCurrentIndex((prev) => (prev - 1 + safeDesigns.length) % safeDesigns.length);
  };

  const goToIndex = (idx: number) => {
    soundManager.playFlip();
    setCurrentIndex(idx);
  };

  const handleCategoryChange = (catId: string) => {
    soundManager.playClick();
    setActiveCategory(catId);
    setCurrentIndex(0);
  };

  // Safe cyclic indices
  const currentItem = safeDesigns[currentIndex % safeDesigns.length];
  const prevIndex = (currentIndex - 1 + safeDesigns.length) % safeDesigns.length;
  const prevItem = safeDesigns[prevIndex];
  const nextIndex = (currentIndex + 1) % safeDesigns.length;
  const nextItem = safeDesigns[nextIndex];

  return (
    <section
      id="chair-carousel-section"
      className="relative py-20 bg-zinc-50 text-zinc-900 border-b border-zinc-200 overflow-hidden select-none"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Category Navigation */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-300 text-zinc-800 text-xs font-semibold mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>معرض التصاميم التفاعلي | تقليب سلس كل ثانيتين</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-black tracking-tight mb-2">
            معرض الأعمال والتصاميم ثلاثية الأبعاد
          </h2>
          <p className="text-zinc-600 text-xs sm:text-sm max-w-xl">
            تقليب تلقائي ديناميكي لعرض أدق تفاصيل التصاميم والأثاث والإعلانات والهويات البصرية
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-6 p-1.5 rounded-2xl bg-white border border-zinc-300 shadow-sm max-w-3xl">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                    isActive
                      ? 'bg-black text-white shadow-sm'
                      : 'text-zinc-600 hover:text-black hover:bg-zinc-100'
                  }`}
                >
                  <span className="block text-[10px] font-sans opacity-90">{cat.label}</span>
                  <span className="block text-[9px] tracking-wider opacity-75">{cat.labelEn}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* The 3D Perspective Carousel Stage */}
        <div
          className="relative max-w-5xl mx-auto min-h-[440px] sm:min-h-[500px] flex items-center justify-center"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          {/* Navigation Chevrons */}
          <button
            onClick={handlePrev}
            title="التصميم السابق"
            className="absolute left-2 sm:left-4 z-30 w-11 h-11 rounded-full bg-white border border-zinc-300 hover:border-black text-black flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            title="التصميم التالي"
            className="absolute right-2 sm:right-4 z-30 w-11 h-11 rounded-full bg-white border border-zinc-300 hover:border-black text-black flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Cards Layout: Left Peek, Center Stage, Right Peek */}
          <div className="relative w-full flex items-center justify-center h-full py-4">
            
            {/* 1. LEFT PEEK CARD */}
            {prevItem && (
              <div
                onClick={handlePrev}
                className="hidden md:flex absolute left-8 lg:left-12 w-[240px] lg:w-[280px] h-[340px] rounded-3xl bg-white border border-zinc-300 p-4 opacity-40 hover:opacity-75 transition-all duration-500 transform -rotate-6 scale-90 cursor-pointer shadow-md overflow-hidden flex-col justify-between select-none"
              >
                <div className="w-full h-[200px] rounded-2xl overflow-hidden bg-zinc-100">
                  <img
                    src={prevItem.imageUrl}
                    alt={prevItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-right pt-2">
                  <span className="text-[10px] text-zinc-500 font-mono uppercase">{prevItem.subtitle}</span>
                  <h4 className="text-xs font-bold text-zinc-800 truncate">{prevItem.title}</h4>
                </div>
              </div>
            )}

            {/* 2. CENTER ACTIVE CARD */}
            {currentItem && (
              <div
                key={currentItem.id + currentIndex}
                className="relative z-20 w-[90%] sm:w-[380px] lg:w-[440px] rounded-3xl bg-white border-2 border-zinc-900 p-5 sm:p-7 shadow-2xl transition-all duration-500 transform scale-100 flex flex-col justify-between overflow-hidden"
              >
                {/* Card Top Details */}
                <div className="flex items-start justify-between gap-2 mb-4">
                  <div className="text-right">
                    <span className="text-[11px] font-mono font-bold text-zinc-500 tracking-wider uppercase block">
                      {currentItem.subtitle}
                    </span>
                    <h3 className="text-lg sm:text-2xl font-black text-black tracking-tight">
                      {currentItem.title}
                    </h3>
                  </div>

                  {currentItem.badge && (
                    <span className="px-3 py-1 rounded-full bg-black text-white text-[11px] font-mono font-bold shadow-sm shrink-0">
                      {currentItem.badge}
                    </span>
                  )}
                </div>

                {/* Main Product/Design Visual Container */}
                <div className="relative w-full h-[230px] sm:h-[280px] rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 group">
                  <img
                    src={currentItem.imageUrl}
                    alt={currentItem.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* English Price Tag as requested */}
                  {currentItem.price && (
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-xl bg-white/95 border border-zinc-300 text-black text-xs font-mono font-black shadow-md">
                      {currentItem.price.toLocaleString('en-US')} EGP
                    </div>
                  )}
                </div>

                {/* Bottom Card Bar */}
                <div className="pt-4 mt-4 border-t border-zinc-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-zinc-500">
                      0{currentIndex + 1} / 0{safeDesigns.length}
                    </span>
                  </div>

                  <span className="text-[11px] text-zinc-600 font-medium">
                    ES DESIGN DIRECTION
                  </span>
                </div>

              </div>
            )}

            {/* 3. RIGHT PEEK CARD */}
            {nextItem && (
              <div
                onClick={handleNext}
                className="hidden md:flex absolute right-8 lg:right-12 w-[240px] lg:w-[280px] h-[340px] rounded-3xl bg-white border border-zinc-300 p-4 opacity-40 hover:opacity-75 transition-all duration-500 transform rotate-6 scale-90 cursor-pointer shadow-md overflow-hidden flex-col justify-between select-none"
              >
                <div className="w-full h-[200px] rounded-2xl overflow-hidden bg-zinc-100">
                  <img
                    src={nextItem.imageUrl}
                    alt={nextItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-right pt-2">
                  <span className="text-[10px] text-zinc-500 font-mono uppercase">{nextItem.subtitle}</span>
                  <h4 className="text-xs font-bold text-zinc-800 truncate">{nextItem.title}</h4>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Carousel Bottom Controls & Indicators */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-3xl mx-auto px-4 text-xs text-zinc-600">
          
          {/* Sound & Autoplay Status */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundManager.playClick();
                setIsPlaying(!isPlaying);
              }}
              className="p-2 rounded-xl bg-white border border-zinc-300 hover:border-black text-black transition-colors"
              title={isPlaying ? 'إيقاف مؤقت' : 'تشغيل تلقائي'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>

            <span className="text-[11px]">
              {autoFlipSoundCount < 5 ? (
                <span className="flex items-center gap-1 text-black font-semibold">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>الصوت نشط لأول 5 تقليبات ({autoFlipSoundCount}/5)</span>
                </span>
              ) : (
                <span className="flex items-center gap-1 text-zinc-500">
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>تم كتم الصوت التلقائي (يعمل عند النقر فقط)</span>
                </span>
              )}
            </span>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {safeDesigns.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentIndex ? 'w-6 bg-black' : 'w-2 bg-zinc-300 hover:bg-zinc-500'
                }`}
              />
            ))}
          </div>

          {/* Developer Quick Add Trigger */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenDeveloperModal();
            }}
            className="flex items-center gap-1.5 text-zinc-600 hover:text-black font-medium transition-colors cursor-pointer text-[11px]"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>إضافة تصميم جديد (لوحة المطورين)</span>
          </button>

        </div>

      </div>
    </section>
  );
};
