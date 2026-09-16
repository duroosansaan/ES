import { ServiceItem, OfferItem, TargetAudienceItem, AgencyPhase } from '../types';

export const AGENCY_INFO = {
  name: "ES Design Agency",
  tagline: "Follow The Future Changes",
  arabicTagline: "نواكب تغيرات المستقبل لنصنع تميزك البصري",
  description: "موقع ووكالة متخصصة في تصميم محتواك البصري وهويتك المتميزة أمام الجمهور في أي موقع وأي مكان. نقدم خدمات تصميم كافة التصاميم الجرافيكية، الفيديوهات القصيرة بكل أنواعها، مواقع خاصة لك، وخدمة تنسيق وجدولة محتواك على المواقع والمنصات.",
  phone: "01020185275",
  phoneFormatted: "+20 102 018 5275",
  messengerUrl: "https://m.me/1DesKPK6a6",
  whatsappUrl: "https://wa.me/201020185275",
  facebookUrl: "https://www.facebook.com/share/1DesKPK6a6/",
  instagramUrl: "https://www.instagram.com/eslam_amr_almasry?stkn=Znh5bDUxY3NobWs=",
  instagramHandle: "@eslam_amr_almasry"
};

// The 5 Brand New Offers (Replacing old ones, exact prices from sheet)
export const AGENCY_OFFERS: OfferItem[] = [
  {
    id: "offer-1",
    number: 1,
    reelsCount: 12,
    postsCount: 60,
    price: 9000,
    originalPrice: 15000,
    titleAr: "باقة النخبة المتكاملة (VIP Master)",
    badge: "الأوفر والأشمل",
    isPopular: true,
    features: [
      "12 فيديو ريلز وشورتس بمونتاج سينمائي احترافي",
      "60 تصميم إعلاني ثابت للسوشيال ميديا مصممة خصيصاً",
      "تنسيق هوية بصرية موحدة للمحتوى طوال الشهرين",
      "كتابة نصوص حركية وترجمة Subtitles مدمجة",
      "توفير أكثر من 6,000 ج.م مقارنة بالطلب الفردي"
    ],
    bonusFree: "هدية مجانية: اقتراح وتنسيق تريندات حصرية للفيديوهات مجاناً"
  },
  {
    id: "offer-2",
    number: 2,
    reelsCount: 8,
    postsCount: 30,
    price: 5000,
    originalPrice: 8200,
    titleAr: "باقة الانتشار السريع (Growth Pro)",
    badge: "الأكثر طلباً",
    isPopular: false,
    features: [
      "8 فيديوهات ريلز عالية الجودة بستايل التريند",
      "30 بوست إعلاني جذاب ومتوافق مع المنصات",
      "تصاميم تسويقية تركز على زيادة التفاعل والمبيعات",
      "مؤثرات صوتية وبصرية متقنة لشد انتباه العميل"
    ],
    bonusFree: "هدية مجانية: استشارة أفكار وسيناريوهات الفيديوهات من اختيارنا"
  },
  {
    id: "offer-3",
    number: 3,
    reelsCount: 4,
    postsCount: 16,
    price: 2500,
    originalPrice: 4280,
    titleAr: "باقة الانطلاقة الذكية (Smart Starter)",
    badge: "ممتازة للبدء",
    isPopular: false,
    features: [
      "4 ريلز موجهة للوصول المباشر للجمهور المستهدف",
      "16 بوست إعلاني أنيق متناسق الهوية",
      "صياغة بصرية تبرز مزايا منتجك أو خدمتك",
      "تسليم سريع بأعلى دقة جاهزة للنشر"
    ],
    bonusFree: "هدية مجانية: تدقيق وتنسيق كفرات ومقاسات الحسابات مجاناً"
  },
  {
    id: "offer-4",
    number: 4,
    postsCount: 30,
    price: 1000,
    originalPrice: 5400,
    titleAr: "باقة البوستات الشهرية (30 Posts Pack)",
    badge: "سعر استثنائي",
    isPopular: false,
    features: [
      "30 تصميم إعلاني ثابت احترافي (بوست يومي لشهر كامل)",
      "تناسق بصري كامل مع ألوان وهوية علامتك التجارية",
      "تصاميم تلفت الأنظار وتوضح عروضك وأسعارك بوضوح",
      "سعر لا يقارن (فقط حوالي 33 ج.م للتصميم بدلاً من 180 ج.م)"
    ],
    bonusFree: "هدية مجانية: قالب موحد لستوريات الإنستجرام وفيسبوك"
  },
  {
    id: "offer-5",
    number: 5,
    reelsCount: 8,
    price: 3000,
    originalPrice: 4000,
    titleAr: "باقة الفيديوهات فقط (8 Reels Viral)",
    badge: "لصُنّاع الفيديوهات",
    isPopular: false,
    features: [
      "8 فيديوهات ريلز وشورتس وتيك توك بمونتاج تريندي",
      "مؤثرات بصرية Sound Effects & B-rolls متزامنة مع الإيقاع",
      "نصوص كابتشن وحركات ديناميكية تمنع تخطي الفيديو",
      "جاهزة للنشر بأعلى جودة Full HD 4K"
    ],
    bonusFree: "هدية مجانية: تصميم صور مصغرة (Thumbnails) مخصصة لكل ريل"
  }
];

// Exact Agency Services with official prices from screenshot files
export const AGENCY_SERVICES: ServiceItem[] = [
  {
    id: "srv-pure-anim",
    title: "Pure Animation",
    titleAr: "أنيميشن كامل مخصص",
    badge: "الأعلى طلباً",
    description: "إنتاج فيديو أنيميشن وموشن جرافيك مخصص بالكامل من الفكرة والسكريبت ورسم الشخصيات حتى التحريك النهائي الاحترافي.",
    price: 650,
    unit: "للدقيقة",
    category: "animation",
    highlights: [
      "ابتكار وتطوير فكرة السكريبت",
      "رسم الشخصيات والعناصر من الصفر",
      "تحريك متقن ومؤثرات خاصة متزامنة",
      "تعليق صوتي ومكساج متاح حسب الطلب"
    ]
  },
  {
    id: "srv-mixed-anim",
    title: "Mixed with Pic",
    titleAr: "دمج صور وأنيميشن",
    badge: "متميز للمتاجر",
    description: "دمج متناسق واحترافي بين صور المنتجات أو العناصر الحقيقية مع لمسات أنيميشن ومؤثرات كرتونية حركية تزيد رغبة الشراء.",
    price: 580,
    unit: "للدقيقة",
    category: "animation",
    highlights: [
      "إبراز تفاصيل المنتج الحقيقية",
      "مؤثرات رسومية حركية تجذب العين",
      "مثالي للإعلانات الممولة ومتاجر الـ E-Commerce",
      "تسليم سريع بصيغ متوافقة مع كل المنصات"
    ]
  },
  {
    id: "srv-pics-words",
    title: "Pictures + Words",
    titleAr: "تحريك صور ونصوص",
    badge: "اقتصادي وسريع",
    description: "عرض حركي سريع مخصص للإعلانات التي تهدف لإيصال الرسالة فوراً عبر تحريك النصوص والمنتجات بأسلوب أنيق ومباشر.",
    price: 480,
    unit: "للدقيقة",
    category: "animation",
    highlights: [
      "حركية ديناميكية للنصوص والأسعار",
      "تنسيق مريح للعين يوصل الرسالة في ثوانٍ",
      "تكلفة اقتصادية وسرعة إنجاز فائقة",
      "مناسب للحملات السريعة والعروض المؤقتة"
    ]
  },
  {
    id: "srv-static-post",
    title: "Design / Static Post",
    titleAr: "تصميم إعلاني ثابت",
    badge: "تصميم ثابت",
    description: "تصميم إعلاني ثابت للسوشيال ميديا متناسق الهوية، مصمم خصيصاً لجذب العين وزيادة التفاعل والمبيعات لعلامتك التجارية.",
    price: 180,
    unit: "للتصميم الواحد",
    category: "branding",
    highlights: [
      "فكرة تسويقية مبنية على علم الألوان وتوزيع العين",
      "دقة عالية جاهزة لفيسبوك وإنستجرام وتويتر",
      "تعديلات سلسة لضمان رضاك التام",
      "تسليم بملفات PNG و JPG عالية الجودة"
    ]
  },
  {
    id: "srv-reels-shorts",
    title: "Reels & Shorts Editing",
    titleAr: "مونتاج Reels & Shorts احترافي",
    badge: "تريند",
    description: "قص ومونتاج وإضافة نصوص حركية (Subtitles) ومؤثرات صوتية للفيديوهات الطولية لزيادة الانتشار والوصول العضوي.",
    price: 350,
    unit: "للفيديو الواحد",
    category: "video",
    highlights: [
      "إيقاع سريع يجذب انتباه المشاهد من أول 3 ثوانٍ",
      "إضافة مؤثرات بصرية وصوتية تريند",
      "كتابة نصوص حركية تفاعلية بأسلوب المشاهير",
      "تصدير بأعلى جودة لمختلف المنصات الطولية"
    ]
  },
  {
    id: "srv-branding",
    title: "Complete Branding Identity",
    titleAr: "تصميم هوية بصرية متكاملة",
    badge: "شامل",
    description: "بناء الهوية البصرية للشركات والمشروعات من الصفر: الشعار المميز، لوحة الألوان، الخطوط، ونماذج المطبوعات والتطبيقات العملية.",
    price: 2500,
    unit: "للمشروع الكامل",
    category: "branding",
    highlights: [
      "شعار مبتكر وفريد (Logo Concept & Variations)",
      "دليل الهوية الكامل (Brand Guidelines Book)",
      "لوحة الألوان والخطوط المعتمدة",
      "نماذج بطاقات العمل والمطبوعات والأوراق الرسمية"
    ]
  },
  {
    id: "srv-custom-web",
    title: "Custom Websites",
    titleAr: "مواقع خاصة وتطبيقات ويب",
    badge: "حصري وفخم",
    description: "تصميم وتطوير مواقع خاصة تعبر عن فخامة علامتك التجارية، سريعة ومتوافقة مع الهواتف ومحركات البحث ومربوطة بأحدث التقنيات.",
    price: 4500,
    unit: "يبدأ من",
    category: "web",
    highlights: [
      "تصميم UI/UX فخم يواكب التطورات المستقبلية",
      "أداء فائق السرعة وتوافق تام مع الموبايل",
      "لوحة تحكم وربط سحابي متين مع Firebase",
      "ربط مباشر مع وسائل التواصل والواتساب"
    ]
  },
  {
    id: "srv-content-scheduling",
    title: "Content Scheduling & Coordination",
    titleAr: "تنسيق وجدولة محتواك على المواقع",
    badge: "إدارة متكاملة",
    description: "خدمة احترافية لإدارة وجودك الرقمي، تشمل جدولة المنشورات والفيديوهات في أوقات ذروة المتابعين، وتنسيق الأوصاف والهاشتاجات.",
    price: 1200,
    unit: "شهرياً",
    category: "web",
    highlights: [
      "جدولة دقيقة وفق مواعيد التفاعل القصوى",
      "كتابة نصوص تسويقية مدروسة مع الهاشتاجات المناسبة",
      "متابعة مستمرة لتناسق الـ Feed والهوية",
      "تقارير دورية لأداء المنشورات والتفاعل"
    ]
  }
];

// The 3 Target Audiences Showcase (Side Name Tag & 3D Interactive Flip Card)
// "تلت صور جنب بعض لكل فئة مستهدفة في الصورة اسمها علي الجنب و لما تقلب تظهر صورة أو تصميم تاني بحيث العميل المستهدف يشوف النتيجة"
// Constraint respected: "مش عايز وله اي معلومه من الي في الصوره تتكتب في اي حته في الويب تمام"
export const TARGET_AUDIENCE_SHOWCASES: TargetAudienceItem[] = [
  {
    id: "audience-ecommerce",
    nameAr: "المتاجر والبراندات التجارية",
    nameEn: "Brands & E-Commerce",
    sideTag: "متاجر وبراندات",
    tagline: "تحويل تصفح الزوار إلى طلبات شراء فورية",
    category: "المنتجات والمبيعات",
    frontImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    backImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
    frontLabel: "المظهر الأولي",
    backLabel: "النتيجة البصرية النهائية"
  },
  {
    id: "audience-clinics",
    nameAr: "العيادات والمراكز والمكاتب",
    nameEn: "Clinics & Medical Care",
    sideTag: "عيادات ومراكز",
    tagline: "ترسيخ الثقة والمصداقية وتقديم خبرتك الراقية",
    category: "الخدمات الطبية والتخصصية",
    frontImage: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
    backImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    frontLabel: "المظهر الأولي",
    backLabel: "النتيجة البصرية النهائية"
  },
  {
    id: "audience-creators-realestate",
    nameAr: "الشركات وصُنّاع المحتوى والعقارات",
    nameEn: "Corporate & Real Estate",
    sideTag: "عقارات وصُنّاع محتوى",
    tagline: "إبهار بصري ومونتاج يواكب تريندات الانتشار",
    category: "العقارات والمشاريع الكبرى",
    frontImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    backImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    frontLabel: "المظهر الأولي",
    backLabel: "النتيجة البصرية النهائية"
  }
];

// The 5 Comprehensive Phases (خمس مراحل متكاملة قبل وبعد البدء)
export const AGENCY_FIVE_PHASES: AgencyPhase[] = [
  {
    phaseNumber: 1,
    titleAr: "المرحلة الأولى: تحليل السوق والمنافسين وتحديد الجمهور المستهدف",
    titleEn: "Market Research, Competitors & Target Persona",
    objective: "فهم البيئة التنافسية وتحديد بدقة من هو عميلك المثالي وسلوكياته الشرائية لاختيار النمط البصري الرابح.",
    deliverables: [
      "تحليل نقاط قوة وضعف أهم 3 إلى 5 منافسين في مجالك",
      "تحديد الجمهور المستهدف (العمر، الاهتمامات، القوة الشرائية، المنصات المفضلة)",
      "تحديد الرسالة التسويقية الأساسية (Unique Selling Proposition - USP)"
    ],
    tips: [
      "لا تبدأ أي تصميم بدون تحديد المشكلة التي يحلها المحتوى للعميل",
      "التركيز على المنصات الأكثر تفاعلاً لجمهورك (فيسبوك، إنستجرام، تيك توك)"
    ]
  },
  {
    phaseNumber: 2,
    titleAr: "المرحلة الثانية: هيكل الموقع وتخطيط تجربة المستخدم (UX Architecture)",
    titleEn: "Website Architecture & UX Wireframes",
    objective: "بناء مسار تصفح سلس يقود الزائر بطريقة مقنعة ومريحة من رؤية التصاميم حتى التواصل والطلب.",
    deliverables: [
      "مخطط هيكل الصفحات والأقسام (Sitemap & Content Flow)",
      "توزيع عناصر الجذب البصري (بطاقات الفئات، العروض، الخدمات، زر الواتساب)",
      "تصميم مسار التحويل السريع (Call to Action) بدون أي تشتيت"
    ],
    tips: [
      "تأكد أن سرعة التحميل على الموبايل أقل من ثانيتين",
      "اجعل زر الاتصال المباشر والواتساب ظاهراً دائماً"
    ]
  },
  {
    phaseNumber: 3,
    titleAr: "المرحلة الثالثة: نظام الهوية البصرية وتصميم الأصول والشخصية الرئيسية",
    titleEn: "Visual Identity, Design System & Character",
    objective: "صناعة بصمة بصرية لا تُنسى لـ ES Design Agency وشعار Follow The Future Changes مع شخصية العلامة الرئيسية (Brand Character).",
    deliverables: [
      "لوحة الألوان الملكية والداكنة الفاخرة وخطوط العرض العربية والإنجليزية",
      "تصميم قوالب البوستات الثابتة، والريلز، وأغلفة الفيديوهات",
      "تطوير الشخصية الرئيسية للبراند (Main Brand Character) واللوجو المميز"
    ],
    tips: [
      "الحفاظ على تناسق الألوان في كل المنصات يرسخ علامتك في ذهن العميل بنسبة 80% أكثر",
      "استخدام المؤثرات الصوتية الدقيقة لتعزيز الإحساس بالفخامة"
    ]
  },
  {
    phaseNumber: 4,
    titleAr: "المرحلة الرابعة: التطوير البرمجي والربط السحابي مع Firebase",
    titleEn: "Frontend Development & Firebase Cloud Integration",
    objective: "برمجة كود شامل وقوي متجاوب مع كافة الأجهزة ومربوط مباشرة بـ Firebase لإدارة الطلبات والعملاء وتحليل الأداء.",
    deliverables: [
      "تطوير الواجهة التفاعلية بتقنيات حديثة وحركات 3D ومؤثرات صوتية Web Audio",
      "ربط Firebase Firestore لحفظ واسترجاع طلبات العملاء والاستشارات تلقائياً",
      "تفعيل قياس الزيارات وتفاعل الزوار عبر Firebase Analytics",
      "نظام حاسبة التكاليف التفاعلي لحساب الباقات الفردية والمجمعة"
    ],
    tips: [
      "تأمين قواعد الأمان في Firestore لتشفير وحماية بيانات العملاء",
      "دعم الحفظ الاحتياطي في حال ضعف الاتصال لضمان عدم ضياع أي عميل"
    ]
  },
  {
    phaseNumber: 5,
    titleAr: "المرحلة الخامسة: الإطلاق الرسمي، جدولة المحتوى وحملات الاستحواذ",
    titleEn: "Official Launch, Content Scheduling & Conversion Tracking",
    objective: "إطلاق الموقع رسمياً، وبدء نشر المحتوى وجدولته بانتظام مع قياس المبيعات ومعدلات التحويل.",
    deliverables: [
      "نشر الموقع على نطاقك الخاص واختبار الروابط والاستجابة",
      "بدء تنفيذ خدمة جدولة المحتوى في أوقات الذروة لزيادة الانتشار",
      "توجيه إعلانات السوشيال ميديا للموقع لقياس عدد المهتمين",
      "مراجعة دورية للنتائج وتطوير العروض وفق رغبات العملاء"
    ],
    tips: [
      "الاستمرارية في نشر الفيديوهات القصيرة (Reels) هي أسرع وسيلة نمو حالياً",
      "الرد الفوري على رسائل الواتساب يزيد نسبة إتمام الصفقات إلى الضعف"
    ]
  }
];
