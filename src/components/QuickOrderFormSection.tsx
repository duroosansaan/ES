import React, { useState } from 'react';
import { Send, Sparkles, MessageSquare, CheckCircle, ShieldCheck, DollarSign, Clock, User, Phone, FileText, Database } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { AGENCY_INFO } from '../data/agencyData';
import { soundManager } from '../utils/audio';

export const QuickOrderFormSection: React.FC = () => {
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [orderDetails, setOrderDetails] = useState('');
  const [budget, setBudget] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Quick budget chips in English numerals as requested
  const quickBudgets = ['1,000 EGP', '2,500 EGP', '5,000 EGP', '9,000 EGP', '15,000+ EGP', 'مرنة حسب العرض'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !orderDetails.trim()) {
      alert('يرجى كتابة اسمك وتفاصيل طلبك أولاً');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Save order to Firebase Firestore
      await addDoc(collection(db, 'orders'), {
        clientName: clientName.trim(),
        phone: phone.trim() || '',
        orderDetails: orderDetails.trim(),
        budget: budget.trim() || '',
        notes: notes.trim() || '',
        status: 'new',
        createdAt: new Date().toISOString()
      });
      console.log('Order successfully saved to Firebase Firestore!');
    } catch (err) {
      console.warn('Saved locally, error syncing to Firestore:', err);
    } finally {
      setIsSubmitting(false);
    }

    soundManager.playSuccess();

    // Construct formatted WhatsApp message
    const formattedMessage = [
      `*طلب مشروع جديد من موقع ES Design Agency*`,
      `━━━━━━━━━━━━━━━━━━━`,
      `👤 *الاسم / النشاط:* ${clientName.trim()}`,
      `📱 *رقم التواصل:* ${phone.trim() || 'غير محدد'}`,
      `💼 *تفاصيل الطلب:* ${orderDetails.trim()}`,
      `💰 *الميزانية المقدرة (البدجت):* ${budget.trim() || 'قيد النقاش'}`,
      notes.trim() ? `📝 *ملاحظات / موعد التسليم:* ${notes.trim()}` : null,
      `━━━━━━━━━━━━━━━━━━━`,
      `رابط المنصة: Follow The Future Changes`
    ].filter(Boolean).join('\n');

    const whatsappUrl = `https://wa.me/201020185275?text=${encodeURIComponent(formattedMessage)}`;

    // Open WhatsApp immediately
    window.open(whatsappUrl, '_blank');
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setClientName('');
    setPhone('');
    setOrderDetails('');
    setBudget('');
    setNotes('');
    setIsSubmitted(false);
  };

  return (
    <section id="custom-request" className="py-20 bg-white text-zinc-900 border-b border-zinc-200 select-none">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-100 border border-zinc-300 text-zinc-900 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>طلب فوري ومخصص حسب ميزانيتك</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-black tracking-tight mb-3">
            اكتب طلبك وميزانيتك ليصلنا فوراً على واتساب
          </h2>

          <p className="text-sm text-zinc-600 leading-relaxed">
            حدد ما تحتاجه بالضبط مع الميزانية المناسبة لك، وسيقوم فريق ES Design Agency بدراسة طلبك والرد عليك مباشرة في غضون دقائق.
          </p>
        </div>

        {/* Form Container */}
        <div className="relative rounded-3xl bg-zinc-50 border-2 border-zinc-900 p-6 sm:p-10 shadow-xl overflow-hidden text-right">
          
          {isSubmitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-black">تم تجهيز طلبك وتحويله لواتساب بنجاح!</h3>
              <p className="text-sm text-zinc-600 max-w-md mx-auto">
                شكرًا لتواصلك مع ES Design Agency. إذا لم تفتح نافذة الواتساب تلقائياً، يمكنك الضغط على الزر أدناه.
              </p>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={`https://wa.me/201020185275`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs shadow-md transition-all"
                >
                  فتح المحادثة على واتساب
                </a>
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 rounded-xl bg-white border border-zinc-300 hover:bg-zinc-100 text-zinc-800 font-semibold text-xs transition-all"
                >
                  إرسال طلب آخر
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-zinc-900 mb-1.5">
                    الاسم / اسم النشاط التجاري <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="مثال: أحمد محمود / متجر الأناقة"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-zinc-300 focus:border-black focus:ring-1 focus:ring-black outline-none text-xs text-zinc-900 placeholder:text-zinc-400"
                    />
                  </div>
                </div>

                {/* Phone / WhatsApp */}
                <div>
                  <label className="block text-xs font-bold text-zinc-900 mb-1.5">
                    رقم الهاتف / الواتساب <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="مثال: 01020185275"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-zinc-300 focus:border-black focus:ring-1 focus:ring-black outline-none text-xs text-zinc-900 placeholder:text-zinc-400 font-mono text-left"
                    />
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div>
                <label className="block text-xs font-bold text-zinc-900 mb-1.5">
                  تفاصيل طلبك والخدمات المطلوبة <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={orderDetails}
                  onChange={(e) => setOrderDetails(e.target.value)}
                  placeholder="اكتب بالتفصيل ما تريده: مثلاً باقة فيديوهات ريلز، تصميم هوية بصرية كاملة، متجر أو موقع إلكتروني، تصاميم شهرية..."
                  className="w-full px-4 py-3 rounded-xl bg-white border border-zinc-300 focus:border-black focus:ring-1 focus:ring-black outline-none text-xs text-zinc-900 placeholder:text-zinc-400 resize-none leading-relaxed"
                />
              </div>

              {/* Budget in English numerals */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-zinc-900">
                    الميزانية المتاحة (البدجت بالجنيه المصري EGP)
                  </label>
                  <span className="text-[11px] text-zinc-500 font-mono">English Digits EGP</span>
                </div>

                <input
                  type="text"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="مثال: 5,000 EGP أو اكتب أي رقم يناسبك"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-zinc-300 focus:border-black focus:ring-1 focus:ring-black outline-none text-xs text-zinc-900 placeholder:text-zinc-400 mb-2 font-mono"
                />

                {/* Quick Budget Tags */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-[11px] text-zinc-500">خيارات سريعة:</span>
                  {quickBudgets.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        setBudget(b);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold transition-all ${
                        budget === b
                          ? 'bg-black text-white'
                          : 'bg-white hover:bg-zinc-200 text-zinc-800 border border-zinc-300'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-xs font-bold text-zinc-900 mb-1.5">
                  ملاحظات إضافية أو موعد التسليم المفضل (اختياري)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="مثال: أحتاج استلام أول نموذج خلال 3 أيام / لدي هوية جاهزة وأحتاج فيديو ريلز فقط"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-zinc-300 focus:border-black focus:ring-1 focus:ring-black outline-none text-xs text-zinc-900 placeholder:text-zinc-400"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-200">
                <div className="flex items-center gap-2 text-xs text-zinc-600">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>الرسالة تُرسل مباشرة إلى رقم الواتساب الرسمي: {AGENCY_INFO.phoneFormatted}</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-black hover:bg-zinc-800 disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all cursor-pointer active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'جاري حفظ الطلب والتحويل...' : 'إرسال الطلب وحفظه عبر واتساب فوراً'}</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
