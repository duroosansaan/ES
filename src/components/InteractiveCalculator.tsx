import React, { useState } from 'react';
import { Calculator, Sparkles, Check, ArrowLeft, RefreshCw, MessageSquare } from 'lucide-react';
import { AGENCY_INFO } from '../data/agencyData';
import { soundManager } from '../utils/audio';

interface CalculatorProps {
  onBookCustomPackage: (details: string, total: number) => void;
}

export const InteractiveCalculator: React.FC<CalculatorProps> = ({ onBookCustomPackage }) => {
  const [reelsCount, setReelsCount] = useState<number>(4);
  const [postsCount, setPostsCount] = useState<number>(10);
  const [animationMinutes, setAnimationMinutes] = useState<number>(0);
  const [includeBranding, setIncludeBranding] = useState<boolean>(false);
  const [includeWeb, setIncludeWeb] = useState<boolean>(false);
  const [includeScheduling, setIncludeScheduling] = useState<boolean>(false);

  // Exact unit prices from sheet
  const REEL_PRICE = 350;
  const POST_PRICE = 180;
  const ANIM_PRICE = 580;
  const BRANDING_PRICE = 2500;
  const WEB_PRICE = 4500;
  const SCHEDULING_PRICE = 1200;

  const total =
    reelsCount * REEL_PRICE +
    postsCount * POST_PRICE +
    animationMinutes * ANIM_PRICE +
    (includeBranding ? BRANDING_PRICE : 0) +
    (includeWeb ? WEB_PRICE : 0) +
    (includeScheduling ? SCHEDULING_PRICE : 0);

  const handleSliderChange = (setter: (v: number) => void, val: number) => {
    soundManager.playHover();
    setter(val);
  };

  const handleToggle = (setter: React.Dispatch<React.SetStateAction<boolean>>, current: boolean) => {
    soundManager.playClick();
    setter(!current);
  };

  const getPackageDescription = () => {
    const parts = [];
    if (reelsCount > 0) parts.push(`${reelsCount} ريلز`);
    if (postsCount > 0) parts.push(`${postsCount} بوست`);
    if (animationMinutes > 0) parts.push(`${animationMinutes} دقيقة أنيميشن`);
    if (includeBranding) parts.push('هوية بصرية');
    if (includeWeb) parts.push('موقع ويب');
    if (includeScheduling) parts.push('جدولة محتوى');
    return `باقة مخصصة (${parts.join(' + ')})`;
  };

  const resetAll = () => {
    soundManager.playClick();
    setReelsCount(4);
    setPostsCount(10);
    setAnimationMinutes(0);
    setIncludeBranding(false);
    setIncludeWeb(false);
    setIncludeScheduling(false);
  };

  return (
    <section id="calculator" className="relative py-20 bg-white text-zinc-900 border-b border-zinc-200 select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-300 text-zinc-800 text-xs font-semibold mb-3">
            <Calculator className="w-3.5 h-3.5 text-black" />
            <span>حاسبة الباقات التفاعلية</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-black tracking-tight mb-2">
            احسب تكلفة باقتك المخصصة فوراً
          </h2>
          <p className="text-zinc-600 text-xs sm:text-sm">
            حرك المؤشرات واختر الخدمات المطلوبة لتظهر لك التكلفة الإجمالية في لحظتها بالأسعار الرسمية
          </p>
        </div>

        {/* Calculator Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-zinc-50 border border-zinc-300 rounded-3xl p-6 sm:p-8 space-y-7 shadow-sm text-right">
            
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
              <span className="text-xs font-mono font-bold text-zinc-500 uppercase">
                CUSTOMIZER
              </span>
              <button
                onClick={resetAll}
                className="text-xs text-zinc-500 hover:text-black flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>إعادة ضبط</span>
              </button>
            </div>

            {/* Slider 1: Reels */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-black">
                  فيديوهات ريلز وشورتس ({REEL_PRICE} EGP للريلز)
                </span>
                <span className="font-mono font-black text-base text-black bg-white px-3 py-0.5 rounded-lg border border-zinc-300">
                  {reelsCount} ريلز
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={30}
                value={reelsCount}
                onChange={(e) => handleSliderChange(setReelsCount, Number(e.target.value))}
                className="w-full accent-black cursor-pointer"
              />
            </div>

            {/* Slider 2: Posts */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-black">
                  تصاميم إعلانية ثابتة ({POST_PRICE} EGP للبوست)
                </span>
                <span className="font-mono font-black text-base text-black bg-white px-3 py-0.5 rounded-lg border border-zinc-300">
                  {postsCount} بوست
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={60}
                value={postsCount}
                onChange={(e) => handleSliderChange(setPostsCount, Number(e.target.value))}
                className="w-full accent-black cursor-pointer"
              />
            </div>

            {/* Slider 3: Animation */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-black">
                  أنيميشن وموشن جرافيك ({ANIM_PRICE} EGP لكل 30 ثانية)
                </span>
                <span className="font-mono font-black text-base text-black bg-white px-3 py-0.5 rounded-lg border border-zinc-300">
                  {animationMinutes} دقيقة
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={10}
                value={animationMinutes}
                onChange={(e) => handleSliderChange(setAnimationMinutes, Number(e.target.value))}
                className="w-full accent-black cursor-pointer"
              />
            </div>

            {/* Checkbox Toggles */}
            <div className="pt-3 border-t border-zinc-200 space-y-3">
              <label className="flex items-center justify-between p-3 rounded-2xl bg-white border border-zinc-200 hover:border-black cursor-pointer transition-all">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={includeBranding}
                    onChange={() => handleToggle(setIncludeBranding, includeBranding)}
                    className="w-4 h-4 accent-black rounded"
                  />
                  <div>
                    <span className="text-xs font-bold text-black block">
                      تصميم هوية بصرية كاملة (لوجو، ألوان، خطوط)
                    </span>
                    <span className="text-[11px] text-zinc-500">
                      تشمل تسليم كافة ملفات المصدر عالية الدقة
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-black">
                  +{BRANDING_PRICE.toLocaleString('en-US')} EGP
                </span>
              </label>

              <label className="flex items-center justify-between p-3 rounded-2xl bg-white border border-zinc-200 hover:border-black cursor-pointer transition-all">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={includeWeb}
                    onChange={() => handleToggle(setIncludeWeb, includeWeb)}
                    className="w-4 h-4 accent-black rounded"
                  />
                  <div>
                    <span className="text-xs font-bold text-black block">
                      برمجة وتطوير موقع إلكتروني احترافي
                    </span>
                    <span className="text-[11px] text-zinc-500">
                      موقع متجاوب سريع مع دعم الهواتف والربط بالمنصات
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-black">
                  +{WEB_PRICE.toLocaleString('en-US')} EGP
                </span>
              </label>

              <label className="flex items-center justify-between p-3 rounded-2xl bg-white border border-zinc-200 hover:border-black cursor-pointer transition-all">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={includeScheduling}
                    onChange={() => handleToggle(setIncludeScheduling, includeScheduling)}
                    className="w-4 h-4 accent-black rounded"
                  />
                  <div>
                    <span className="text-xs font-bold text-black block">
                      تنسيق وجدولة ونشر المحتوى على الحسابات (شهرياً)
                    </span>
                    <span className="text-[11px] text-zinc-500">
                      إدارة مواعيد النشر اليومية وكتابة الـ Captions والهاشتاجات
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-black">
                  +{SCHEDULING_PRICE.toLocaleString('en-US')} EGP
                </span>
              </label>
            </div>

          </div>

          {/* Summary Box Column */}
          <div className="lg:col-span-5 bg-zinc-50 border-2 border-black rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl text-right">
            
            <div className="pb-4 border-b border-zinc-200">
              <span className="text-xs font-mono font-bold text-zinc-500 uppercase">
                ESTIMATE BREAKDOWN
              </span>
              <h3 className="text-lg font-black text-black mt-1">
                ملخص الباقة المقدرة
              </h3>
            </div>

            {/* Calculated Breakdown List */}
            <div className="space-y-2 text-xs">
              {reelsCount > 0 && (
                <div className="flex justify-between text-zinc-700">
                  <span>{reelsCount} فيديو ريلز</span>
                  <span className="font-mono font-bold text-black">
                    {(reelsCount * REEL_PRICE).toLocaleString('en-US')} EGP
                  </span>
                </div>
              )}
              {postsCount > 0 && (
                <div className="flex justify-between text-zinc-700">
                  <span>{postsCount} تصميم إعلاني</span>
                  <span className="font-mono font-bold text-black">
                    {(postsCount * POST_PRICE).toLocaleString('en-US')} EGP
                  </span>
                </div>
              )}
              {animationMinutes > 0 && (
                <div className="flex justify-between text-zinc-700">
                  <span>{animationMinutes} دقيقة أنيميشن</span>
                  <span className="font-mono font-bold text-black">
                    {(animationMinutes * ANIM_PRICE).toLocaleString('en-US')} EGP
                  </span>
                </div>
              )}
              {includeBranding && (
                <div className="flex justify-between text-zinc-700">
                  <span>تصميم هوية بصرية</span>
                  <span className="font-mono font-bold text-black">
                    {BRANDING_PRICE.toLocaleString('en-US')} EGP
                  </span>
                </div>
              )}
              {includeWeb && (
                <div className="flex justify-between text-zinc-700">
                  <span>موقع ويب خاص</span>
                  <span className="font-mono font-bold text-black">
                    {WEB_PRICE.toLocaleString('en-US')} EGP
                  </span>
                </div>
              )}
              {includeScheduling && (
                <div className="flex justify-between text-zinc-700">
                  <span>جدولة وتنسيق محتوى</span>
                  <span className="font-mono font-bold text-black">
                    {SCHEDULING_PRICE.toLocaleString('en-US')} EGP
                  </span>
                </div>
              )}
            </div>

            {/* Total Display (English Digits) */}
            <div className="pt-4 border-t border-zinc-200">
              <span className="text-xs text-zinc-500 block mb-1">الإجمالي التقديري:</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-black font-mono tracking-tight">
                  {total.toLocaleString('en-US')}
                </span>
                <span className="text-sm font-mono font-bold text-zinc-600">EGP</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => {
                  soundManager.playSuccess();
                  onBookCustomPackage(getPackageDescription(), total);
                }}
                className="w-full py-3 rounded-2xl bg-black hover:bg-zinc-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer active:scale-95"
              >
                <span>حجز هذه الباقة المخصصة</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <a
                href={AGENCY_INFO.messengerUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundManager.playHover()}
                className="w-full py-2.5 rounded-2xl bg-white hover:bg-zinc-100 text-black border border-zinc-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>مناقشة السعر عبر Messenger</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
