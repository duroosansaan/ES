export interface ServiceItem {
  id: string;
  title: string;
  titleAr: string;
  badge?: string;
  description: string;
  price: number;
  unit: string;
  category: 'animation' | 'video' | 'branding' | 'web';
  highlights: string[];
}

export interface OfferItem {
  id: string;
  number: number;
  reelsCount?: number;
  postsCount?: number;
  price: number;
  originalPrice?: number;
  titleAr: string;
  badge?: string;
  isPopular?: boolean;
  features: string[];
  bonusFree?: string;
  imageUrl?: string;
  isCustom?: boolean;
  createdAt?: string;
}

export interface CarouselDesignItem {
  id: string;
  title: string;
  titleAr: string;
  category: 'all' | 'graphic' | 'video' | 'web' | 'branding' | 'furniture';
  priceTag?: string;
  badge?: string;
  highlight?: string;
  imageUrl: string;
  isCustom?: boolean;
}

export interface TargetAudienceItem {
  id: string;
  nameAr: string;
  nameEn: string;
  sideTag: string;
  tagline: string;
  category: string;
  frontImage: string;
  backImage: string;
  frontLabel: string;
  backLabel: string;
}

export interface InquiryFormData {
  name: string;
  phone: string;
  businessType: string;
  selectedPackage: string;
  notes?: string;
  createdAt?: string;
}

export interface AgencyPhase {
  phaseNumber: number;
  titleAr: string;
  titleEn: string;
  objective: string;
  deliverables: string[];
  tips: string[];
}

