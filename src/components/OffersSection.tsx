import React from 'react';
import { ArrowLeft, MessageSquare, PlusCircle } from 'lucide-react';
import { OfferItem } from '../types';
import { AGENCY_INFO } from '../data/agencyData';
import { soundManager } from '../utils/audio';

interface OffersSectionProps {
  offers: OfferItem[];
  onSelectOffer: (offer: OfferItem) => void;
  onOpenDeveloperModal: () => void;
}

export const OffersSection: React.FC<OffersSectionProps> = ({
  offers,
  onSelectOffer,
  onOpenDeveloperModal
}) => {
  return (
    <section id="offers" className="relative py-20 bg-white text-zinc-900 border-b border-zinc-200 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-300 text-zinc-800 text-xs font-semibold mb-3">
            <span>باقات وعروض الوكالة</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-black tracking-tight mb-2">
            عروض حصرية بتوفير استثنائي
          </h2>
          <p className="text-zinc-600 text-xs sm:text-sm">
            باقات متكاملة ومحددة بدقة لتطوير المحتوى وزيادة التفاعل والمبيعات
          </p>
        </div>

        {/* Compact Offers Grid without any icons inside cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
          {offers.map((offer) => {
            const isFeatured = offer.isPopular || offer.number === 1;

            return (
              <div
                key={offer.id}
                id={`offer-card-${offer.id}`}
                className={`relative flex flex-col justify-between rounded-3xl p-6 transition-all duration-300 ${
                  isFeatured
                    ? 'bg-white border-2 border-black shadow-xl ring-1 ring-black/5'
                    : 'bg-zinc-50 border border-zinc-300 hover:border-zinc-500 shadow-sm'
                }`}
              >
                {/* Badge without icon */}
                {offer.badge && (
                  <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase bg-black text-white shadow-md font-mono">
                    {offer.badge}
                  </div>
                )}

                {/* Offer Content */}
                <div>
                  <div className="flex items-center justify-between gap-2 pb-3 border-b border-zinc-200 mb-3">
                    <span className="text-xs font-mono font-bold text-zinc-500">
                      PACKAGE 0{offer.number}
                    </span>
                    {offer.originalPrice && (
                      <span className="text-xs text-zinc-400 line-through font-mono">
                        {offer.originalPrice.toLocaleString('en-US')} EGP
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-extrabold text-black mb-2 leading-snug">
                    {offer.titleAr}
                  </h3>

                  {/* Concise Counts Tags without emojis/icons */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {offer.reelsCount && (
                      <span className="px-2.5 py-1 rounded-lg bg-white border border-zinc-300 text-black font-bold text-xs font-mono">
                        {offer.reelsCount} REELS
                      </span>
                    )}
                    {offer.postsCount && (
                      <span className="px-2.5 py-1 rounded-lg bg-white border border-zinc-300 text-black font-bold text-xs font-mono">
                        {offer.postsCount} POSTS
                      </span>
                    )}
                  </div>

                  {/* Optional Offer Image */}
                  {offer.imageUrl && (
                    <div className="w-full h-28 mb-4 rounded-xl overflow-hidden border border-zinc-200 bg-zinc-100">
                      <img src={offer.imageUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                  )}

                  {/* English Price Tag as requested: "الاسعار بالانجليزي" */}
                  <div className="flex items-baseline gap-1.5 my-3 pb-3 border-b border-zinc-200">
                    <span className="text-3xl font-black text-black font-mono tracking-tight">
                      {offer.price.toLocaleString('en-US')}
                    </span>
                    <span className="text-xs text-zinc-600 font-mono font-bold">EGP</span>
                  </div>

                  {/* Simplified Concise Features List (NO ICONS, clean typographic dashes) */}
                  <div className="space-y-1.5 mb-5 text-right">
                    {offer.features.slice(0, 4).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-zinc-700">
                        <span className="text-zinc-400 font-mono select-none">—</span>
                        <span className="truncate">{feat.replace(/^[🎬🖼️✨🔥🎁]\s*/, '')}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bonus text (concise, without icon) */}
                  {offer.bonusFree && (
                    <div className="p-2.5 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-700 text-[11px] mb-4 text-right">
                      <span className="font-bold text-black ml-1">ميزة إضافية:</span>
                      <span>{offer.bonusFree.replace(/^[🎬🖼️✨🔥🎁]\s*هدية مجانية:\s*/, '')}</span>
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div className="space-y-2 pt-2 border-t border-zinc-200">
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      onSelectOffer(offer);
                    }}
                    className="w-full py-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shadow-md"
                  >
                    <span>حجز هذا العرض</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={AGENCY_INFO.messengerUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => soundManager.playHover()}
                    className="w-full py-2 rounded-xl bg-white hover:bg-zinc-100 text-zinc-700 hover:text-black border border-zinc-300 text-[11px] font-semibold transition-all flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>استفسار عبر Messenger</span>
                  </a>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Fast Action Bar */}
        <div className="mt-12 p-6 rounded-3xl bg-zinc-50 border border-zinc-300 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-right">
            <h4 className="text-sm font-bold text-black mb-0.5">
              تريد عرضاً مخصصاً أو إضافة أسعار جديدة؟
            </h4>
            <p className="text-xs text-zinc-600">
              يمكنك كتابة طلبك وميزانيتك أو استخدام لوحة المطورين لتعديل العروض فوراً.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenDeveloperModal();
              }}
              className="px-4 py-2 rounded-xl bg-white hover:bg-zinc-100 border border-zinc-300 text-zinc-800 text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>إضافة عرض جديد (المطورين)</span>
            </button>

            <a
              href="#custom-request"
              onClick={() => soundManager.playClick()}
              className="px-5 py-2 rounded-xl bg-black hover:bg-zinc-800 text-white text-xs font-bold transition-all"
            >
              اكتب طلبك وميزانيتك
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
