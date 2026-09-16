import React, { useState } from 'react';
import { RefreshCw, Sparkles, Upload, Eye, CheckCircle, Image as ImageIcon, Volume2 } from 'lucide-react';
import { TARGET_AUDIENCE_SHOWCASES } from '../data/agencyData';
import { TargetAudienceItem } from '../types';
import { soundManager } from '../utils/audio';

export const TargetAudienceShowcaseSection: React.FC = () => {
  const [audiences, setAudiences] = useState<TargetAudienceItem[]>(TARGET_AUDIENCE_SHOWCASES);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [showUploader, setShowUploader] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<string>(TARGET_AUDIENCE_SHOWCASES[0].id);

  const toggleFlip = (id: string) => {
    soundManager.playFlip();
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const flipAll = (state: boolean) => {
    soundManager.playFlip();
    const updated: Record<string, boolean> = {};
    audiences.forEach((a) => {
      updated[a.id] = state;
    });
    setFlippedCards(updated);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, side: 'front' | 'back') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setAudiences((prev) =>
            prev.map((item) => {
              if (item.id === selectedCardId) {
                return {
                  ...item,
                  [side === 'front' ? 'frontImage' : 'backImage']: result
                };
              }
              return item;
            })
          );
          soundManager.playSuccess();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="showcase" className="relative py-20 bg-white text-zinc-900 border-b border-zinc-200 overflow-hidden select-none">
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-300 text-zinc-800 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>معرض التحول والنتائج البصرية</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-black tracking-tight mb-2">
              شاهد النتيجة الفعلية لكل فئة مستهدفة
            </h2>
            <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
              اضغط على أي بطاقة لقلبها واكتشاف كيف يتحول المظهر العادي إلى تصميم وهوية بصرية فخمة تجذب العملاء فوراً.
            </p>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => flipAll(true)}
              className="px-3.5 py-1.5 rounded-xl bg-black hover:bg-zinc-800 text-white text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <RefreshCw className="w-3 h-3" />
              <span>قلب الكل للنتيجة</span>
            </button>
            <button
              onClick={() => flipAll(false)}
              className="px-3.5 py-1.5 rounded-xl bg-white border border-zinc-300 hover:bg-zinc-100 text-zinc-800 text-xs font-semibold transition-all"
            >
              <span>إعادة للوجه الأول</span>
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setShowUploader(!showUploader);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-black border border-zinc-300 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <Upload className="w-3 h-3" />
              <span>تغيير / رفع تصاميمك</span>
            </button>
          </div>
        </div>

        {/* Custom Image Uploader Drawer */}
        {showUploader && (
          <div className="mb-8 p-5 rounded-3xl bg-zinc-50 border border-zinc-300 shadow-xl transition-all text-right">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 mb-4">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-black" />
                <h4 className="text-xs sm:text-sm font-bold text-black">تخصيص تصاميم الفئات (التصاميم الخاصة بك)</h4>
              </div>
              <span className="text-xs text-zinc-500">يمكنك رفع صورة من جهازك بسهولة</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">اختر الفئة المستهدفة:</label>
                <select
                  value={selectedCardId}
                  onChange={(e) => setSelectedCardId(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-white border border-zinc-300 text-black text-xs focus:border-black outline-none"
                >
                  {audiences.map((aud) => (
                    <option key={aud.id} value={aud.id}>
                      {aud.nameAr}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">صورة الوجه الأول:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'front')}
                  className="text-xs text-zinc-600 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:bg-zinc-200 file:text-black file:font-semibold hover:file:bg-zinc-300 cursor-pointer w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">صورة النتيجة النهائية:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'back')}
                  className="text-xs text-zinc-600 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:bg-zinc-200 file:text-black file:font-semibold hover:file:bg-zinc-300 cursor-pointer w-full"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowUploader(false)}
                className="px-4 py-1.5 rounded-xl bg-black text-white hover:bg-zinc-800 text-xs font-medium"
              >
                إغلاق
              </button>
            </div>
          </div>
        )}

        {/* The 3 Side-By-Side Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {audiences.map((card) => {
            const isFlipped = !!flippedCards[card.id];

            return (
              <div
                key={card.id}
                id={`audience-card-${card.id}`}
                className="group relative flex flex-row rounded-3xl bg-white border border-zinc-300 hover:border-black shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-[440px] sm:h-[480px]"
              >
                {/* 1. Side Vertical Tag ("اسمها علي الجنب") */}
                <div className="w-11 sm:w-12 shrink-0 bg-zinc-100 border-l border-zinc-200 flex flex-col items-center justify-between py-5 px-1 z-20 select-none">
                  <div className="w-6 h-6 rounded-md bg-white border border-zinc-300 flex items-center justify-center shadow-sm">
                    <Sparkles className="w-3 h-3 text-black" />
                  </div>

                  {/* Vertical Arabic Text Name along the side */}
                  <div className="writing-vertical-rl rotate-180 flex items-center gap-2 text-[11px] font-extrabold tracking-wider text-zinc-700 group-hover:text-black transition-colors uppercase whitespace-nowrap">
                    {card.sideTag}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFlip(card.id);
                    }}
                    title="اقلب البطاقة"
                    className="w-6 h-6 rounded-full bg-white hover:bg-black hover:text-white text-zinc-700 transition-all flex items-center justify-center border border-zinc-300"
                  >
                    <RefreshCw className={`w-3 h-3 transition-transform duration-500 ${isFlipped ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {/* 2. Main Card Area with 3D Flip Container */}
                <div
                  className="relative flex-1 h-full cursor-pointer perspective-1000"
                  onClick={() => toggleFlip(card.id)}
                >
                  <div
                    className={`relative w-full h-full duration-700 transform-style-3d transition-transform ${
                      isFlipped ? 'rotate-y-180' : ''
                    }`}
                  >
                    
                    {/* FRONT SIDE */}
                    <div className="absolute inset-0 w-full h-full backface-hidden flex flex-col bg-zinc-100">
                      <div className="relative flex-1 w-full overflow-hidden">
                        <img
                          src={card.frontImage}
                          alt={card.nameAr}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-80" />
                        
                        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 border border-zinc-300 backdrop-blur-md text-[10px] font-semibold text-black flex items-center gap-1 shadow-md">
                          <Eye className="w-3 h-3 text-zinc-600" />
                          <span>{card.frontLabel}</span>
                        </div>
                      </div>

                      <div className="p-3.5 bg-white border-t border-zinc-200 flex items-center justify-between">
                        <div>
                          <h3 className="text-xs font-bold text-black">{card.nameAr}</h3>
                          <p className="text-[10px] text-zinc-500">{card.category}</p>
                        </div>
                        <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-black hover:text-white text-zinc-800 text-[11px] font-bold transition-all border border-zinc-200">
                          <span>اقلب للنتيجة</span>
                          <RefreshCw className="w-3 h-3" />
                        </div>
                      </div>
                    </div>

                    {/* BACK SIDE */}
                    <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 flex flex-col bg-zinc-900 border-2 border-black shadow-2xl text-white">
                      <div className="relative flex-1 w-full overflow-hidden">
                        <img
                          src={card.backImage}
                          alt={card.nameAr + ' النتيجة'}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                        
                        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/90 border border-zinc-700 backdrop-blur-md text-[10px] font-bold text-white flex items-center gap-1 shadow-lg">
                          <CheckCircle className="w-3 h-3 text-emerald-400" />
                          <span>{card.backLabel}</span>
                        </div>
                      </div>

                      <div className="p-3.5 bg-black border-t border-zinc-800 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block font-mono">
                            ES DESIGN AGENCY
                          </span>
                          <h3 className="text-xs font-extrabold text-white">{card.nameAr}</h3>
                        </div>
                        <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-[11px] font-medium transition-colors">
                          <span>العودة</span>
                          <RefreshCw className="w-3 h-3 text-zinc-400" />
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Hint */}
        <div className="mt-6 text-center text-xs text-zinc-500 flex items-center justify-center gap-2">
          <Volume2 className="w-3.5 h-3.5 text-black" />
          <span>مؤثرات قلب ثلاثية الأبعاد 3D تفاعلية ومحسوبة بالمللي</span>
        </div>

      </div>
    </section>
  );
};
