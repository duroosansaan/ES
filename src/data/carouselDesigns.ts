import { CarouselDesignItem } from '../types';

// =========================================================================
// 📍 [مكان استيراد صورة الشخصية ثلاثية الأبعاد للمعرض - السطر التالي]
// =========================================================================
import brandCharacterImg from '../assets/images/new_3d_avatar_1789550372274.jpg';
import chairSofaImg from '../assets/images/chair_sofa_modern_1789540396152.jpg';
import chairGrayImg from '../assets/images/chair_minimal_gray_1789540410419.jpg';
import chairRotanImg from '../assets/images/chair_rotan_round_1789540421781.jpg';

export { brandCharacterImg, chairSofaImg, chairGrayImg, chairRotanImg };

export const INITIAL_CAROUSEL_DESIGNS: CarouselDesignItem[] = [
  {
    id: "design-sofa-modern",
    title: "SOFA MODERN",
    titleAr: "كنبة مودرن فاخرة",
    category: "furniture",
    priceTag: "$145",
    badge: "Best Deal",
    highlight: "Approved Quality",
    imageUrl: chairSofaImg,
  },
  {
    id: "design-chair-minimal",
    title: "MINIMAL CHAIR",
    titleAr: "كرسي إسكندنافي أنيق",
    category: "furniture",
    priceTag: "$110",
    badge: "Top Choice",
    highlight: "Best Quality",
    imageUrl: chairGrayImg,
  },
  {
    id: "design-chair-rotan",
    title: "ROTAN LOUNGE",
    titleAr: "كرسي روتان دائري عصري",
    category: "furniture",
    priceTag: "$102",
    badge: "Discount",
    highlight: "Premium Finish",
    imageUrl: chairRotanImg,
  },
  {
    id: "design-brand-hero",
    title: "BRAND IDENTITY 3D",
    titleAr: "شخصية البراند ثلاثية الأبعاد",
    category: "branding",
    priceTag: "VIP Asset",
    badge: "Official Character",
    highlight: "Follow The Future",
    imageUrl: brandCharacterImg,
  },
  {
    id: "design-graphic-ad",
    title: "EDITORIAL POST PACK",
    titleAr: "حزمة تصاميم إعلانية للسوشيال",
    category: "graphic",
    priceTag: "30 Posts",
    badge: "Most Popular",
    highlight: "High Conversion",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "design-luxury-web",
    title: "CUSTOM WEB UI/UX",
    titleAr: "واجهة موقع خاصة وتطبيق ويب",
    category: "web",
    priceTag: "Ultra Fast",
    badge: "Next-Gen Web",
    highlight: "Dark Minimal Luxury",
    imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=900&q=80",
  }
];
