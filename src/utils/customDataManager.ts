import { OfferItem, CarouselDesignItem } from '../types';
import { AGENCY_OFFERS } from '../data/agencyData';
import { INITIAL_CAROUSEL_DESIGNS } from '../data/carouselDesigns';

const OFFERS_STORAGE_KEY = 'es_agency_custom_offers_v2';
const DESIGNS_STORAGE_KEY = 'es_agency_custom_designs_v2';

export const customDataManager = {
  // Load offers combining default and custom
  getOffers(): OfferItem[] {
    try {
      const stored = localStorage.getItem(OFFERS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading stored offers', e);
    }
    return AGENCY_OFFERS;
  },

  // Save full offers list
  saveOffers(offers: OfferItem[]): void {
    try {
      localStorage.setItem(OFFERS_STORAGE_KEY, JSON.stringify(offers));
    } catch (e) {
      console.error('Error saving offers', e);
    }
  },

  // Add a brand new offer
  addOffer(offer: Omit<OfferItem, 'id' | 'number'>): OfferItem[] {
    const current = this.getOffers();
    const nextNumber = current.length + 1;
    const newOffer: OfferItem = {
      ...offer,
      id: `custom-offer-${Date.now()}`,
      number: nextNumber,
      isCustom: true,
      createdAt: new Date().toISOString()
    };
    const updated = [newOffer, ...current];
    this.saveOffers(updated);
    return updated;
  },

  // Delete an offer
  deleteOffer(id: string): OfferItem[] {
    const current = this.getOffers();
    const updated = current.filter(o => o.id !== id);
    this.saveOffers(updated);
    return updated;
  },

  // Reset offers to default
  resetOffers(): OfferItem[] {
    try {
      localStorage.removeItem(OFFERS_STORAGE_KEY);
    } catch (e) {}
    return AGENCY_OFFERS;
  },

  // Load carousel designs
  getCarouselDesigns(): CarouselDesignItem[] {
    try {
      const stored = localStorage.getItem(DESIGNS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading stored designs', e);
    }
    return INITIAL_CAROUSEL_DESIGNS;
  },

  // Save carousel designs
  saveCarouselDesigns(designs: CarouselDesignItem[]): void {
    try {
      localStorage.setItem(DESIGNS_STORAGE_KEY, JSON.stringify(designs));
    } catch (e) {
      console.error('Error saving designs', e);
    }
  },

  // Add new carousel design / image
  addCarouselDesign(design: Omit<CarouselDesignItem, 'id'>): CarouselDesignItem[] {
    const current = this.getCarouselDesigns();
    const newDesign: CarouselDesignItem = {
      ...design,
      id: `custom-design-${Date.now()}`,
      isCustom: true
    };
    const updated = [newDesign, ...current];
    this.saveCarouselDesigns(updated);
    return updated;
  },

  // Delete carousel design
  deleteCarouselDesign(id: string): CarouselDesignItem[] {
    const current = this.getCarouselDesigns();
    const updated = current.filter(d => d.id !== id);
    this.saveCarouselDesigns(updated);
    return updated;
  },

  // Reset carousel designs
  resetCarouselDesigns(): CarouselDesignItem[] {
    try {
      localStorage.removeItem(DESIGNS_STORAGE_KEY);
    } catch (e) {}
    return INITIAL_CAROUSEL_DESIGNS;
  },

  // Brand Logo Management
  getCustomLogo(): string | null {
    try {
      return localStorage.getItem('es_agency_custom_logo') || null;
    } catch {
      return null;
    }
  },

  saveCustomLogo(dataUrl: string): void {
    try {
      localStorage.setItem('es_agency_custom_logo', dataUrl);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('brand_assets_updated'));
      }
    } catch (e) {
      console.error('Error saving custom logo', e);
    }
  },

  resetCustomLogo(): void {
    try {
      localStorage.removeItem('es_agency_custom_logo');
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('brand_assets_updated'));
      }
    } catch {}
  },

  // Brand 3D Character Management
  getCustomCharacter(): string | null {
    try {
      return localStorage.getItem('es_agency_custom_character') || null;
    } catch {
      return null;
    }
  },

  saveCustomCharacter(dataUrl: string): void {
    try {
      localStorage.setItem('es_agency_custom_character', dataUrl);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('brand_assets_updated'));
      }
    } catch (e) {
      console.error('Error saving custom character', e);
    }
  },

  resetCustomCharacter(): void {
    try {
      localStorage.removeItem('es_agency_custom_character');
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('brand_assets_updated'));
      }
    } catch {}
  }
};

