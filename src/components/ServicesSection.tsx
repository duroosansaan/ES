import React, { useState } from 'react';
import { Sparkles, ArrowLeft, MessageSquare } from 'lucide-react';
import { AGENCY_SERVICES, AGENCY_INFO } from '../data/agencyData';
import { ServiceItem } from '../types';
import { soundManager } from '../utils/audio';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'animation' | 'video' | 'branding' | 'web'>('all');

  const tabs = [
    { id: 'all', label: 'كافة الخدمات' },
    { id: 'animation', label: 'أنيميشن وموشن جرافيك' },
    { id: 'video', label: 'ريلز وشورتس' },
    { id: 'branding', label: 'الهوية والتصاميم الثابتة' },
    { id: 'web', label: 'المواقع والجدولة' },
  ];

  const filteredServices = activeTab === 'all'
    ? AGENCY_SERVICES
    : AGENCY_SERVICES.filter((s) => s.category === activeTab);

  return (
    <section id="services" className="relative py-20 bg-zinc-50 text-zinc-900 border-b border-zinc-200 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-300 text-zinc-800 text-xs font-semibold mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>قائمة أسعار الخدمات الفردية</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-black tracking-tight mb-2">
            خدمات إبداعية متكاملة بأعلى معايير الجودة
          </h2>
          <p className="text-zinc-600 text-xs sm:text-sm">
            أسعار واضحة ومحددة لكل خدمة بمفردها مع إمكانية دمجها في باقات موفرة
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundManager.playClick();
                setActiveTab(tab.id as any);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-black text-white font-bold shadow-md'
                  : 'bg-white border border-zinc-300 text-zinc-700 hover:text-black hover:border-zinc-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Services Grid (Inverted White Cards, English prices) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className="flex flex-col justify-between rounded-3xl p-6 bg-white border border-zinc-200 hover:border-black shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-zinc-100 mb-3">
                  <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                    {service.unit}
                  </span>
                  <span className="text-xs font-mono font-bold text-zinc-500">
                    {service.title}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-black mb-2">
                  {service.titleAr}
                </h3>

                <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                  {service.description}
                </p>
              </div>

              <div>
                {/* Price tag in English digits as requested */}
                <div className="flex items-baseline justify-between pt-3 pb-3 border-t border-zinc-100 mb-3">
                  <span className="text-xs text-zinc-500">السعر المعتمد:</span>
                  <div className="flex items-baseline gap-1 font-mono">
                    <span className="text-2xl font-black text-black">
                      {service.price.toLocaleString('en-US')}
                    </span>
                    <span className="text-xs text-zinc-600 font-bold">EGP</span>
                  </div>
                </div>

                {/* Card CTA Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      onSelectService(service);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
                  >
                    <span>طلب الخدمة</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={AGENCY_INFO.messengerUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => soundManager.playHover()}
                    className="p-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-black transition-colors"
                    title="استفسار عبر Messenger"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
