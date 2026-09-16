import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ChairStyleCarousel } from './components/ChairStyleCarousel';
import { QuickOrderFormSection } from './components/QuickOrderFormSection';
import { TargetAudienceShowcaseSection } from './components/TargetAudienceShowcaseSection';
import { OffersSection } from './components/OffersSection';
import { ServicesSection } from './components/ServicesSection';
import { InteractiveCalculator } from './components/InteractiveCalculator';
import { FivePhasesRoadmap } from './components/FivePhasesRoadmap';
import { BookingModal } from './components/BookingModal';
import { DeveloperModal } from './components/DeveloperModal';
import { Footer } from './components/Footer';
import { OfferItem, ServiceItem, CarouselDesignItem } from './types';
import { AGENCY_INFO } from './data/agencyData';
import { customDataManager } from './utils/customDataManager';
import { MessageSquare, MessageCircle, Phone, Send } from 'lucide-react';
import { soundManager } from './utils/audio';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedBookingTitle, setSelectedBookingTitle] = useState<string>('طلب استشارة وباقة');
  const [estimatedTotal, setEstimatedTotal] = useState<number | undefined>(undefined);
  const [isPhasesOpen, setIsPhasesOpen] = useState(false);

  // Developer Mode (PIN 12345) & Data states
  const [isDeveloperUnlocked, setIsDeveloperUnlocked] = useState(false);
  const [isDeveloperModalOpen, setIsDeveloperModalOpen] = useState(false);
  const [offers, setOffers] = useState<OfferItem[]>([]);
  const [carouselDesigns, setCarouselDesigns] = useState<CarouselDesignItem[]>([]);

  // Load persistent custom data on mount
  useEffect(() => {
    setOffers(customDataManager.getOffers());
    setCarouselDesigns(customDataManager.getCarouselDesigns());
  }, []);

  const handleDataUpdated = () => {
    setOffers([...customDataManager.getOffers()]);
    setCarouselDesigns([...customDataManager.getCarouselDesigns()]);
  };

  // Handle selecting an offer
  const handleSelectOffer = (offer: OfferItem) => {
    setSelectedBookingTitle(`العرض رقم 0${offer.number}: ${offer.titleAr}`);
    setEstimatedTotal(offer.price);
    setIsBookingOpen(true);
  };

  // Handle selecting an individual service
  const handleSelectService = (service: ServiceItem) => {
    setSelectedBookingTitle(`خدمة: ${service.titleAr} (${service.title})`);
    setEstimatedTotal(service.price);
    setIsBookingOpen(true);
  };

  // Handle custom package calculator booking
  const handleBookCustomPackage = (details: string, total: number) => {
    setSelectedBookingTitle(details);
    setEstimatedTotal(total);
    setIsBookingOpen(true);
  };

  // Generic open booking
  const handleOpenGeneralBooking = (title?: string) => {
    setSelectedBookingTitle(title || 'طلب استشارة وباقة');
    setEstimatedTotal(undefined);
    setIsBookingOpen(true);
  };

  const scrollToOffers = () => {
    const el = document.getElementById('offers');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 relative selection:bg-black selection:text-white font-sans">
      
      {/* Navigation Bar (Inverted White Theme + Messenger & WhatsApp) */}
      <Navbar
        onOpenBooking={handleOpenGeneralBooking}
        onOpenDeveloperModal={() => setIsDeveloperModalOpen(true)}
        isDeveloperUnlocked={isDeveloperUnlocked}
      />

      <main>
        {/* 1. Hero Section with Video Background, ES Logo, Specs Bar, and 3D Blender-Sculpted Character */}
        <HeroSection
          onOpenBooking={handleOpenGeneralBooking}
          onExploreOffers={scrollToOffers}
          onOpenDeveloperModal={() => setIsDeveloperModalOpen(true)}
        />

        {/* 2. Interactive Chair-Style Carousel (Auto-flips every 2s, audio limited to first 5 flips, English prices) */}
        <ChairStyleCarousel
          designs={carouselDesigns}
          onOpenDeveloperModal={() => setIsDeveloperModalOpen(true)}
        />

        {/* 3. Target Audiences 3-Card Showcase with 3D Flip & Side Arabic Tag */}
        <TargetAudienceShowcaseSection />

        {/* 4. Pricing & Offers (Clean White Cards, No Icons, Reduced Text, English Prices) */}
        <OffersSection
          offers={offers}
          onSelectOffer={handleSelectOffer}
          onOpenDeveloperModal={() => setIsDeveloperModalOpen(true)}
        />

        {/* 5. Official Services & Prices (English digits EGP) */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* 6. Dynamic Custom Package Calculator */}
        <InteractiveCalculator onBookCustomPackage={handleBookCustomPackage} />

        {/* 7. Direct Lead/Order WhatsApp Form: Name, Request, Budget (EGP) - في آخر الصفحة بعد العروض */}
        <QuickOrderFormSection />
      </main>

      {/* Footer with Messenger priority and Socials */}
      <Footer
        onOpenDeveloperModal={() => setIsDeveloperModalOpen(true)}
      />

      {/* Booking & Consultation Modal (connected to WhatsApp & Firestore) */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        defaultPackage={selectedBookingTitle}
        totalEstimate={estimatedTotal}
      />

      {/* Comprehensive 5-Phases Strategic Roadmap Modal */}
      <FivePhasesRoadmap
        isOpen={isPhasesOpen}
        onClose={() => setIsPhasesOpen(false)}
      />

      {/* Developer Password Gate & Content Manager (Secret: 12345) */}
      <DeveloperModal
        isOpen={isDeveloperModalOpen}
        onClose={() => setIsDeveloperModalOpen(false)}
        onDataUpdated={handleDataUpdated}
        isUnlocked={isDeveloperUnlocked}
        setIsUnlocked={setIsDeveloperUnlocked}
      />

      {/* Floating Quick Action Widget (Messenger Primary + WhatsApp) */}
      <aside aria-label="أزرار التواصل السريع" className="fixed bottom-5 left-5 z-40 flex flex-col gap-2.5 items-center">
        
        {/* Messenger Primary Floating Button */}
        <a
          href={AGENCY_INFO.messengerUrl}
          target="_blank"
          rel="noreferrer"
          onClick={() => soundManager.playClick()}
          title="تواصل مباشر عبر Messenger"
          className="w-13 h-13 rounded-full bg-black text-white flex items-center justify-center shadow-2xl hover:bg-zinc-800 hover:scale-110 active:scale-95 transition-all group"
        >
          <MessageSquare className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </a>

        {/* WhatsApp Secondary Floating Button */}
        <a
          href={AGENCY_INFO.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          onClick={() => soundManager.playClick()}
          title="واتساب مباشر"
          className="w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all"
        >
          <MessageCircle className="w-5 h-5" />
        </a>

        {/* Direct Quote Request Anchor */}
        <a
          href="#custom-request"
          onClick={() => soundManager.playClick()}
          title="اكتب طلبك وميزانيتك"
          className="w-9 h-9 rounded-full bg-white border border-zinc-300 hover:border-black text-black flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all"
        >
          <Send className="w-4 h-4" />
        </a>
      </aside>

    </div>
  );
}
