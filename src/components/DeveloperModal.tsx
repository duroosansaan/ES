import React, { useState, useRef, useEffect } from 'react';
import { Lock, Unlock, X, Plus, Trash2, CheckCircle2, Image as ImageIcon, Sparkles, RefreshCw, AlertCircle, Upload, FolderCheck, FileCode, Check, Copy, Database, Phone, MessageSquare, Clock } from 'lucide-react';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { OfferItem, CarouselDesignItem } from '../types';
import { customDataManager } from '../utils/customDataManager';
import { soundManager } from '../utils/audio';
import { ESLogo } from './ESLogo';
import defaultCharacterImg from '../assets/images/new_3d_avatar_1789550372274.jpg';

interface DeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataUpdated: () => void;
  isUnlocked: boolean;
  setIsUnlocked: (unlocked: boolean) => void;
}

export const DeveloperModal: React.FC<DeveloperModalProps> = ({
  isOpen,
  onClose,
  onDataUpdated,
  isUnlocked,
  setIsUnlocked
}) => {
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'branding' | 'offer' | 'design' | 'manage' | 'orders'>('branding');
  const [firebaseOrders, setFirebaseOrders] = useState<any[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);

  // Listen to Firebase orders when tab or unlock is active
  useEffect(() => {
    if (!isUnlocked) return;
    setIsLoadingOrders(true);
    try {
      const q = query(collection(db, 'orders'), limit(30));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // sort by createdAt desc if available
        docs.sort((a: any, b: any) => (b.createdAt || '').localeCompare(a.createdAt || ''));
        setFirebaseOrders(docs);
        setIsLoadingOrders(false);
      }, (err) => {
        console.warn('Firebase orders snapshot warning:', err);
        setIsLoadingOrders(false);
      });
      return () => unsubscribe();
    } catch (e) {
      console.warn('Firebase query error:', e);
      setIsLoadingOrders(false);
    }
  }, [isUnlocked]);

  // Brand logo & character custom states
  const [customLogo, setCustomLogo] = useState<string | null>(customDataManager.getCustomLogo());
  const [customChar, setCustomChar] = useState<string | null>(customDataManager.getCustomCharacter());
  const [copiedCode, setCopiedCode] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const charInputRef = useRef<HTMLInputElement>(null);

  // Offer form state
  const [offerTitle, setOfferTitle] = useState('');
  const [offerPrice, setOfferPrice] = useState<number | ''>('');
  const [offerOriginalPrice, setOfferOriginalPrice] = useState<number | ''>('');
  const [reelsCount, setReelsCount] = useState<number | ''>('');
  const [postsCount, setPostsCount] = useState<number | ''>('');
  const [offerBadge, setOfferBadge] = useState('');
  const [offerFeatures, setOfferFeatures] = useState('');
  const [offerBonus, setOfferBonus] = useState('');
  const [offerImage, setOfferImage] = useState('');

  // Design / Carousel form state
  const [designTitle, setDesignTitle] = useState('');
  const [designTitleAr, setDesignTitleAr] = useState('');
  const [designCategory, setDesignCategory] = useState<CarouselDesignItem['category']>('graphic');
  const [designPriceTag, setDesignPriceTag] = useState('');
  const [designBadge, setDesignBadge] = useState('');
  const [designHighlight, setDesignHighlight] = useState('');
  const [designImage, setDesignImage] = useState('');

  const [feedbackMsg, setFeedbackMsg] = useState('');

  if (!isOpen) return null;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    // Secret code is 12345 (Arabic numerals or standard digits)
    const normalized = passcode.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d).toString()).trim();
    if (normalized === '12345') {
      setIsUnlocked(true);
      setAuthError('');
      setPasscode('');
      soundManager.playSuccess();
    } else {
      setAuthError('الرمز السري غير صحيح. يرجى المحاولة مرة أخرى.');
      soundManager.playClick();
    }
  };

  const handleUploadLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const res = event.target?.result as string;
        if (res) {
          customDataManager.saveCustomLogo(res);
          setCustomLogo(res);
          setFeedbackMsg('تم تحديث شعار الوكالة الأصلي بنجاح عبر كامل الموقع!');
          soundManager.playSuccess();
          setTimeout(() => setFeedbackMsg(''), 4000);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetLogo = () => {
    customDataManager.resetCustomLogo();
    setCustomLogo(null);
    setFeedbackMsg('تمت استعادة الشعار الافتراضي');
    soundManager.playClick();
    setTimeout(() => setFeedbackMsg(''), 4000);
  };

  const handleUploadCharacter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const res = event.target?.result as string;
        if (res) {
          customDataManager.saveCustomCharacter(res);
          setCustomChar(res);
          setFeedbackMsg('تم تحديث الشخصية ثلاثية الأبعاد الأصلية بنجاح في الموقع!');
          soundManager.playSuccess();
          setTimeout(() => setFeedbackMsg(''), 4000);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetCharacter = () => {
    customDataManager.resetCustomCharacter();
    setCustomChar(null);
    setFeedbackMsg('تمت استعادة الشخصية الافتراضية');
    soundManager.playClick();
    setTimeout(() => setFeedbackMsg(''), 4000);
  };

  const copyGitCommands = () => {
    const commands = `# 1. ضع صورة اللوجو في مجلد public باسم logo.png
# 2. ضع صورة الشخصية في مجلد public باسم character.png
git add public/logo.png public/character.png
git commit -m "Update official logo and 3D character"
git push`;
    navigator.clipboard?.writeText(commands);
    setCopiedCode(true);
    soundManager.playSuccess();
    setTimeout(() => setCopiedCode(false), 3000);
  };


  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'offer' | 'design') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const res = event.target?.result as string;
        if (target === 'offer') setOfferImage(res);
        else setDesignImage(res);
        soundManager.playSuccess();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!offerTitle.trim() || !offerPrice) return;

    const feats = offerFeatures
      .split('\n')
      .map(f => f.trim())
      .filter(f => f.length > 0);

    customDataManager.addOffer({
      titleAr: offerTitle.trim(),
      price: Number(offerPrice),
      originalPrice: offerOriginalPrice ? Number(offerOriginalPrice) : undefined,
      reelsCount: reelsCount ? Number(reelsCount) : undefined,
      postsCount: postsCount ? Number(postsCount) : undefined,
      badge: offerBadge.trim() || undefined,
      features: feats.length > 0 ? feats : ['تنفيذ احترافي ومطابقة لهوية البراند'],
      bonusFree: offerBonus.trim() || undefined,
      imageUrl: offerImage || undefined
    });

    soundManager.playSuccess();
    setFeedbackMsg('تمت إضافة العرض الجديد بنجاح وحفظه!');
    setTimeout(() => setFeedbackMsg(''), 3500);

    // Reset fields
    setOfferTitle('');
    setOfferPrice('');
    setOfferOriginalPrice('');
    setReelsCount('');
    setPostsCount('');
    setOfferBadge('');
    setOfferFeatures('');
    setOfferBonus('');
    setOfferImage('');

    onDataUpdated();
  };

  const handleAddDesign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!designTitle.trim() || !designImage.trim()) {
      alert('يرجى كتابة عنوان التصميم ورفع صورته');
      return;
    }

    customDataManager.addCarouselDesign({
      title: designTitle.trim().toUpperCase(),
      titleAr: designTitleAr.trim() || designTitle.trim(),
      category: designCategory,
      priceTag: designPriceTag.trim() || undefined,
      badge: designBadge.trim() || undefined,
      highlight: designHighlight.trim() || undefined,
      imageUrl: designImage
    });

    soundManager.playSuccess();
    setFeedbackMsg('تمت إضافة التصميم الجديد إلى الكاروسيل المتحرك فوراً!');
    setTimeout(() => setFeedbackMsg(''), 3500);

    setDesignTitle('');
    setDesignTitleAr('');
    setDesignPriceTag('');
    setDesignBadge('');
    setDesignHighlight('');
    setDesignImage('');

    onDataUpdated();
  };

  const allOffers = customDataManager.getOffers();
  const allDesigns = customDataManager.getCarouselDesigns();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#0e0e10] border border-zinc-700 shadow-2xl text-right overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-[#141417] border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isUnlocked ? 'bg-white text-black' : 'bg-zinc-800 text-zinc-300'}`}>
              {isUnlocked ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>بوابة المطورين وإدارة المحتوى</span>
                {isUnlocked && <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">نشط ومفتوح</span>}
              </h3>
              <p className="text-xs text-zinc-400">
                {isUnlocked ? 'يمكنك إضافة وتعديل العروض والصور من غير برمجة' : 'أدخل الرقم السري لفتح صلاحية التعديل'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Locked State: PIN verification */}
        {!isUnlocked ? (
          <form onSubmit={handleUnlock} className="p-6 sm:p-8 space-y-5">
            <div className="text-center max-w-sm mx-auto space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center mx-auto text-zinc-300">
                <Lock className="w-7 h-7" />
              </div>
              <h4 className="text-sm font-bold text-white">الوصول مخصص للمطورين فقط</h4>
              <p className="text-xs text-zinc-400">
                أدخل الرقم السري لفتح لوحة إضافة العروض والتصاميم الحصرية
              </p>
            </div>

            <div className="max-w-xs mx-auto space-y-2">
              <input
                type="password"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setAuthError('');
                }}
                autoFocus
                maxLength={10}
                placeholder="أدخل الرقم السري..."
                className="w-full px-4 py-3 rounded-xl bg-black border border-zinc-700 text-white text-center text-lg tracking-widest focus:border-white focus:outline-none transition-all placeholder:text-zinc-600 font-mono"
              />
              {authError && (
                <div className="flex items-center justify-center gap-1.5 text-xs text-red-400 mt-2">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{authError}</span>
                </div>
              )}
            </div>

            <div className="max-w-xs mx-auto">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-sm transition-all shadow-lg active:scale-95"
              >
                تأكيد الدخول
              </button>
            </div>
          </form>
        ) : (
          /* Unlocked State: Content Management Tabs */
          <div className="p-5 sm:p-6">
            
            {/* Feedback alert */}
            {feedbackMsg && (
              <div className="mb-4 p-3 rounded-xl bg-zinc-800 border border-zinc-600 text-white text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                <span>{feedbackMsg}</span>
              </div>
            )}

            {/* Navigation tabs */}
            <div className="flex items-center justify-between gap-2 pb-4 border-b border-zinc-800 mb-6 overflow-x-auto">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('branding')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    activeTab === 'branding'
                      ? 'bg-white text-black shadow'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  الهوية والشخصية (GitHub Assets)
                </button>
                <button
                  onClick={() => setActiveTab('offer')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    activeTab === 'offer'
                      ? 'bg-white text-black shadow'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  + إضافة عرض جديد
                </button>
                <button
                  onClick={() => setActiveTab('design')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    activeTab === 'design'
                      ? 'bg-white text-black shadow'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  + إضافة صورة للكاروسيل
                </button>
                <button
                  onClick={() => setActiveTab('manage')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    activeTab === 'manage'
                      ? 'bg-white text-black shadow'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  إدارة العناصر الحالية
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === 'orders'
                      ? 'bg-emerald-500 text-black shadow font-black'
                      : 'bg-zinc-900 text-emerald-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>طلبات العملاء سحابياً ({firebaseOrders.length})</span>
                </button>
              </div>

              <button
                onClick={() => {
                  setIsUnlocked(false);
                  soundManager.playClick();
                }}
                className="text-[11px] text-zinc-400 hover:text-red-400 transition-colors flex items-center gap-1 shrink-0 mr-2"
              >
                <Lock className="w-3 h-3" />
                <span>قفل</span>
              </button>
            </div>

            {/* TAB 0: Branding (Logo & 3D Character & GitHub Guide) */}
            {activeTab === 'branding' && (
              <div className="space-y-6">
                
                {/* Visual Explainer Notice */}
                <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-right">
                  <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                    <FolderCheck className="w-4 h-4 text-emerald-400" />
                    <span>تسمية وحفظ ملفات الشعار والشخصية لمشروع GitHub</span>
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    تم إعداد وبرمجة كود الموقع ليقرأ صورتك الحقيقية للوجو والشخصية تلقائياً من مجلد <code className="bg-black text-amber-300 px-1.5 py-0.5 rounded font-mono">public/</code>. يمكنك استبدالهم في الكود، أو رفعهم هنا فوراً للعرض المباشر بالمتصفح!
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* 1. Official Logo Manager */}
                  <div className="p-4 rounded-2xl bg-black border border-zinc-800 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-white">1. الشعار الرسمي (Logo)</span>
                        <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded">
                          public/logo.png
                        </span>
                      </div>

                      {/* Current Preview */}
                      <div className="h-28 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center p-3 mb-3 relative group">
                        <ESLogo size={70} showText={false} />
                      </div>

                      <div className="text-[11px] text-zinc-400 space-y-1 mb-3">
                        <p>• <strong>الاسم المطلوب:</strong> <code className="text-amber-300 font-mono">logo.png</code></p>
                        <p>• <strong>المجلد:</strong> داخل مجلد <code className="text-amber-300 font-mono">public/</code></p>
                        <p className="text-[10px] text-zinc-500">ينعكس فوراً في الـ Navbar، الفيديو الترحيبي، وكافة أقسام الموقع.</p>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-zinc-800">
                      <input
                        ref={logoInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleUploadLogo}
                      />
                      <button
                        type="button"
                        onClick={() => logoInputRef.current?.click()}
                        className="w-full py-2 px-3 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-bold flex items-center justify-center gap-2 shadow active:scale-95 transition-all"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>رفع واستبدال الشعار فوراً</span>
                      </button>

                      {customLogo && (
                        <button
                          type="button"
                          onClick={handleResetLogo}
                          className="w-full py-1 text-center text-[10px] text-zinc-500 hover:text-red-400 transition-colors"
                        >
                          استعادة الشعار الافتراضي
                        </button>
                      )}
                    </div>
                  </div>

                  {/* 2. 3D Character Manager */}
                  <div className="p-4 rounded-2xl bg-black border border-zinc-800 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-white">2. الشخصية ثلاثية الأبعاد (Character)</span>
                        <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded">
                          public/character.png
                        </span>
                      </div>

                      {/* Current Preview */}
                      <div className="h-28 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center p-3 mb-3 relative overflow-hidden">
                        <img
                          src={customChar || defaultCharacterImg || '/character.png'}
                          alt="Character Preview"
                          className="max-h-full max-w-full object-contain rounded-lg"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>

                      <div className="text-[11px] text-zinc-400 space-y-1 mb-3">
                        <p>• <strong>الاسم المطلوب:</strong> <code className="text-amber-300 font-mono">character.png</code></p>
                        <p>• <strong>المجلد:</strong> داخل مجلد <code className="text-amber-300 font-mono">public/</code></p>
                        <p className="text-[10px] text-zinc-500">يتم دمجها تلقائياً مع محرك التدوير 360° ونظام النحت والإضاءة التفاعلية.</p>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-zinc-800">
                      <input
                        ref={charInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleUploadCharacter}
                      />
                      <button
                        type="button"
                        onClick={() => charInputRef.current?.click()}
                        className="w-full py-2 px-3 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-bold flex items-center justify-center gap-2 shadow active:scale-95 transition-all"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>رفع واستبدال الشخصية فوراً</span>
                      </button>

                      {customChar && (
                        <button
                          type="button"
                          onClick={handleResetCharacter}
                          className="w-full py-1 text-center text-[10px] text-zinc-500 hover:text-red-400 transition-colors"
                        >
                          استعادة الشخصية الافتراضية
                        </button>
                      )}
                    </div>
                  </div>

                </div>

                {/* GitHub Commands Cheat-Sheet Box */}
                <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-zinc-300 flex items-center gap-1.5">
                      <FileCode className="w-4 h-4 text-amber-400" />
                      <span>أوامر الرفع على GitHub (Terminal / Git):</span>
                    </span>

                    <button
                      onClick={copyGitCommands}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors border border-zinc-700"
                    >
                      {copiedCode ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">تم النسخ!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>نسخ الأوامر</span>
                        </>
                      )}
                    </button>
                  </div>

                  <pre className="p-3 rounded-xl bg-black border border-zinc-800 text-[11px] font-mono text-emerald-400 overflow-x-auto text-left dir-ltr">
{`# 1. ضع صورة اللوجو باسم logo.png في مجلد public
# 2. ضع صورة الشخصية باسم character.png في مجلد public
git add public/logo.png public/character.png
git commit -m "Update official logo and 3D character"
git push`}
                  </pre>
                </div>

              </div>
            )}


            {/* TAB 1: Add Offer */}
            {activeTab === 'offer' && (
              <form onSubmit={handleAddOffer} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-zinc-300 font-semibold mb-1">عنوان العرض:</label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: باقة النخبة 2026"
                      value={offerTitle}
                      onChange={(e) => setOfferTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-black border border-zinc-800 text-white text-xs focus:border-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-300 font-semibold mb-1">الشارة الترويجية (Badge):</label>
                    <input
                      type="text"
                      placeholder="مثال: خصم 40% لفترة محدودة"
                      value={offerBadge}
                      onChange={(e) => setOfferBadge(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-black border border-zinc-800 text-white text-xs focus:border-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-300 font-semibold mb-1">السعر المطلوب (ج.م):</label>
                    <input
                      type="number"
                      required
                      placeholder="السعر بالجنيه المصري"
                      value={offerPrice}
                      onChange={(e) => setOfferPrice(e.target.value ? Number(e.target.value) : '')}
                      className="w-full px-3 py-2 rounded-xl bg-black border border-zinc-800 text-white text-xs focus:border-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-300 font-semibold mb-1">السعر الأصلي قبل الخصم (اختياري):</label>
                    <input
                      type="number"
                      placeholder="السعر القديم المشطوب"
                      value={offerOriginalPrice}
                      onChange={(e) => setOfferOriginalPrice(e.target.value ? Number(e.target.value) : '')}
                      className="w-full px-3 py-2 rounded-xl bg-black border border-zinc-800 text-white text-xs focus:border-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-300 font-semibold mb-1">عدد الفيديوهات والريلز (اختياري):</label>
                    <input
                      type="number"
                      placeholder="مثال: 12"
                      value={reelsCount}
                      onChange={(e) => setReelsCount(e.target.value ? Number(e.target.value) : '')}
                      className="w-full px-3 py-2 rounded-xl bg-black border border-zinc-800 text-white text-xs focus:border-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-300 font-semibold mb-1">عدد البوستات الإعلانية (اختياري):</label>
                    <input
                      type="number"
                      placeholder="مثال: 30"
                      value={postsCount}
                      onChange={(e) => setPostsCount(e.target.value ? Number(e.target.value) : '')}
                      className="w-full px-3 py-2 rounded-xl bg-black border border-zinc-800 text-white text-xs focus:border-white outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-zinc-300 font-semibold mb-1">
                    المزايا والتفاصيل (ضع كل ميزة في سطر جديد):
                  </label>
                  <textarea
                    rows={3}
                    placeholder="ميزة 1&#10;ميزة 2&#10;ميزة 3"
                    value={offerFeatures}
                    onChange={(e) => setOfferFeatures(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black border border-zinc-800 text-white text-xs focus:border-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-zinc-300 font-semibold mb-1">الهدية الإضافية (Bonus):</label>
                  <input
                    type="text"
                    placeholder="مثال: هدية مجانية: اقتراح تريندات حصرية للفيديوهات"
                    value={offerBonus}
                    onChange={(e) => setOfferBonus(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black border border-zinc-800 text-white text-xs focus:border-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-zinc-300 font-semibold mb-1">صورة العرض (رفع صورة أو رابط):</label>
                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'offer')}
                      className="w-full text-xs text-zinc-400 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-zinc-800 file:text-white file:font-semibold hover:file:bg-zinc-700 cursor-pointer"
                    />
                    <span className="text-zinc-500 text-xs">أو</span>
                    <input
                      type="url"
                      placeholder="رابط مباشر للصورة (URL)..."
                      value={offerImage}
                      onChange={(e) => setOfferImage(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl bg-black border border-zinc-800 text-white text-xs focus:border-white outline-none"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-800 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-xs shadow-lg active:scale-95 flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>حفظ العرض ونشره في الموقع فوراً</span>
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: Add Design to Carousel */}
            {activeTab === 'design' && (
              <form onSubmit={handleAddDesign} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-zinc-300 font-semibold mb-1">اسم التصميم (بالانجليزية):</label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: MODERN LUXURY SOFA"
                      value={designTitle}
                      onChange={(e) => setDesignTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-black border border-zinc-800 text-white text-xs focus:border-white outline-none uppercase font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-300 font-semibold mb-1">الاسم بالعربية:</label>
                    <input
                      type="text"
                      placeholder="مثال: تصميم كنبة فاخرة"
                      value={designTitleAr}
                      onChange={(e) => setDesignTitleAr(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-black border border-zinc-800 text-white text-xs focus:border-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-300 font-semibold mb-1">القسم / التصنيف:</label>
                    <select
                      value={designCategory}
                      onChange={(e) => setDesignCategory(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl bg-black border border-zinc-800 text-white text-xs focus:border-white outline-none"
                    >
                      <option value="furniture">أثاث وتصاميم (Furniture / Decor)</option>
                      <option value="graphic">تصاميم جرافيك وإعلانات (Graphic Design)</option>
                      <option value="video">ريلز ومونتاج (Reels & Shorts)</option>
                      <option value="web">مواقع خاصة وبرمجة (Web Design)</option>
                      <option value="branding">هوية بصرية كاملة (Branding)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-300 font-semibold mb-1">السعر أو الوسم (اختياري):</label>
                    <input
                      type="text"
                      placeholder="مثال: $145 أو 500 ج.م"
                      value={designPriceTag}
                      onChange={(e) => setDesignPriceTag(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-black border border-zinc-800 text-white text-xs focus:border-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-300 font-semibold mb-1">الشارة العلوية (Badge):</label>
                    <input
                      type="text"
                      placeholder="مثال: Best Deal أو الأكثر طلباً"
                      value={designBadge}
                      onChange={(e) => setDesignBadge(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-black border border-zinc-800 text-white text-xs focus:border-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-300 font-semibold mb-1">وصف موجز أو ميزة:</label>
                    <input
                      type="text"
                      placeholder="مثال: Approved Quality"
                      value={designHighlight}
                      onChange={(e) => setDesignHighlight(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-black border border-zinc-800 text-white text-xs focus:border-white outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-zinc-300 font-semibold mb-1">صورة التصميم (رفع صورة أو رابط):</label>
                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'design')}
                      className="w-full text-xs text-zinc-400 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-zinc-800 file:text-white file:font-semibold hover:file:bg-zinc-700 cursor-pointer"
                    />
                    <span className="text-zinc-500 text-xs">أو</span>
                    <input
                      type="url"
                      placeholder="أو الصق رابط الصورة المباشر..."
                      value={designImage}
                      onChange={(e) => setDesignImage(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl bg-black border border-zinc-800 text-white text-xs focus:border-white outline-none"
                    />
                  </div>
                </div>

                {designImage && (
                  <div className="p-2 rounded-xl bg-black border border-zinc-800 flex items-center gap-3">
                    <img src={designImage} alt="Preview" className="w-16 h-16 object-cover rounded-lg border border-zinc-700" />
                    <span className="text-xs text-zinc-300 font-mono">تم تجهيز الصورة للعرض بالكاروسيل</span>
                  </div>
                )}

                <div className="pt-3 border-t border-zinc-800 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-xs shadow-lg active:scale-95 flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>إضافة التصميم للكاروسيل المتحرك</span>
                  </button>
                </div>
              </form>
            )}

            {/* TAB 3: Manage Existing Items */}
            {activeTab === 'manage' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-zinc-300 mb-2">العروض المسجلة ({allOffers.length} عروض):</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {allOffers.map((o) => (
                      <div key={o.id} className="p-2.5 rounded-xl bg-black border border-zinc-800 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-white block">{o.titleAr}</span>
                          <span className="text-zinc-400">{o.price.toLocaleString('ar-EG')} ج.م {o.isCustom && '(مُضاف يدوياً)'}</span>
                        </div>
                        {o.isCustom ? (
                          <button
                            onClick={() => {
                              customDataManager.deleteOffer(o.id);
                              onDataUpdated();
                              soundManager.playClick();
                            }}
                            className="p-1.5 rounded-lg bg-red-950/40 text-red-400 hover:bg-red-900/60"
                            title="حذف هذا العرض"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <span className="text-[10px] text-zinc-500 font-mono">أساسي</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-zinc-300 mb-2">تصاميم الكاروسيل ({allDesigns.length} تصاميم):</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {allDesigns.map((d) => (
                      <div key={d.id} className="p-2.5 rounded-xl bg-black border border-zinc-800 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2.5">
                          <img src={d.imageUrl} alt="" className="w-8 h-8 rounded object-cover border border-zinc-800" />
                          <div>
                            <span className="font-bold text-white block">{d.title}</span>
                            <span className="text-zinc-400">{d.titleAr} {d.isCustom && '(مُضاف يدوياً)'}</span>
                          </div>
                        </div>
                        {d.isCustom ? (
                          <button
                            onClick={() => {
                              customDataManager.deleteCarouselDesign(d.id);
                              onDataUpdated();
                              soundManager.playClick();
                            }}
                            className="p-1.5 rounded-lg bg-red-950/40 text-red-400 hover:bg-red-900/60"
                            title="حذف هذا التصميم"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <span className="text-[10px] text-zinc-500 font-mono">أساسي</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                  <button
                    onClick={() => {
                      if (window.confirm('هل تريد بالتأكيد إعادة ضبط كافة العروض والتصاميم إلى حالتها الأصلية؟')) {
                        customDataManager.resetOffers();
                        customDataManager.resetCarouselDesigns();
                        onDataUpdated();
                        soundManager.playSuccess();
                      }
                    }}
                    className="text-xs text-zinc-500 hover:text-red-400 flex items-center gap-1.5 transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>إعادة ضبط البيانات للافتراضية</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 4: Firebase Cloud Orders Tracker */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Database className="w-4 h-4 text-emerald-400" />
                      <span>قاعدة بيانات طلبات العملاء (Firebase Firestore)</span>
                    </h4>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      كل طلب يتم إرساله من نموذج واتساب يُسجَّل تلقائياً في حساب Firebase السحابي الخاص بك.
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                    {firebaseOrders.length} طلبات
                  </span>
                </div>

                {isLoadingOrders ? (
                  <div className="py-12 text-center text-zinc-500 text-xs font-mono">
                    جاري جلب الطلبات من Firebase Firestore...
                  </div>
                ) : firebaseOrders.length === 0 ? (
                  <div className="py-12 text-center space-y-2 bg-zinc-950 rounded-2xl border border-zinc-800">
                    <Database className="w-8 h-8 text-zinc-600 mx-auto" />
                    <p className="text-xs font-semibold text-zinc-400">لا توجد طلبات مسجلة بعد في قاعدة البيانات</p>
                    <p className="text-[11px] text-zinc-500">
                      عندما يقوم أي عميل بملء نموذج الطلب في آخر الصفحة، سيظهر هنا فوراً.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                    {firebaseOrders.map((ord: any) => (
                      <div
                        key={ord.id}
                        className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-all text-right space-y-2"
                      >
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <span className="font-bold text-white text-sm">{ord.clientName}</span>
                          <div className="flex items-center gap-2">
                            {ord.budget && (
                              <span className="px-2 py-0.5 rounded-lg bg-zinc-900 border border-zinc-700 text-emerald-400 text-xs font-mono font-bold">
                                {ord.budget}
                              </span>
                            )}
                            <span className="text-[10px] text-zinc-500 font-mono">
                              {ord.createdAt ? new Date(ord.createdAt).toLocaleString('ar-EG') : 'الآن'}
                            </span>
                          </div>
                        </div>

                        {ord.phone && (
                          <div className="flex items-center gap-2 text-xs text-zinc-300 font-mono dir-ltr justify-end">
                            <span>{ord.phone}</span>
                            <Phone className="w-3.5 h-3.5 text-zinc-500" />
                          </div>
                        )}

                        <div className="p-2.5 rounded-xl bg-[#141417] text-xs text-zinc-300 leading-relaxed">
                          {ord.orderDetails}
                        </div>

                        {ord.notes && (
                          <div className="text-[11px] text-zinc-400 flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-zinc-500 shrink-0" />
                            <span>ملاحظات: {ord.notes}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
