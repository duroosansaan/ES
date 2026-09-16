import React, { useState } from 'react';
import { X, Send, CheckCircle2, MessageSquare, Sparkles, MessageCircle, ShieldCheck } from 'lucide-react';
import { saveClientInquiry } from '../firebase';
import { AGENCY_INFO } from '../data/agencyData';
import { soundManager } from '../utils/audio';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPackage?: string;
  totalEstimate?: number;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  defaultPackage = 'طلب استشارة مجانية',
  totalEstimate
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [businessType, setBusinessType] = useState('متجر إلكتروني');
  const [selectedPackage, setSelectedPackage] = useState(defaultPackage);
  const [budget, setBudget] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  React.useEffect(() => {
    if (defaultPackage) {
      setSelectedPackage(defaultPackage);
    }
  }, [defaultPackage]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setIsSubmitting(true);
    soundManager.playClick();

    const formattedBudget = budget.trim() || (totalEstimate ? `${totalEstimate.toLocaleString('en-US')} EGP` : 'حسب العرض');

    try {
      await saveClientInquiry({
        name,
        phone,
        businessType,
        selectedPackage: totalEstimate ? `${selectedPackage} (${totalEstimate.toLocaleString('en-US')} EGP)` : selectedPackage,
        notes: `الميزانية: ${formattedBudget} | ${notes}`,
        createdAt: new Date().toISOString()
      });

      // Also construct direct WhatsApp message for the user
      const whatsappMsg = [
        `*حجز طلب جديد - ES Design Agency*`,
        `━━━━━━━━━━━━━━━━━━━`,
        `👤 *الاسم:* ${name}`,
        `📱 *الهاتف:* ${phone}`,
        `🏢 *نوع النشاط:* ${businessType}`,
        `💼 *الباقة المطلوبة:* ${selectedPackage}`,
        `💰 *الميزانية / التقدير:* ${formattedBudget}`,
        notes ? `📝 *ملاحظات:* ${notes}` : null,
        `━━━━━━━━━━━━━━━━━━━`,
      ].filter(Boolean).join('\n');

      window.open(`https://wa.me/201020185275?text=${encodeURIComponent(whatsappMsg)}`, '_blank');

      setSubmittedSuccess(true);
      soundManager.playSuccess();
    } catch (err) {
      console.error(err);
      setSubmittedSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMessengerShareUrl = () => {
    return AGENCY_INFO.messengerUrl;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm select-none">
      <div className="relative w-full max-w-lg bg-white border-2 border-black rounded-3xl shadow-2xl overflow-hidden text-right">
        
        {/* Header */}
        <div className="p-6 bg-zinc-50 border-b border-zinc-200 flex items-center justify-between">
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-1.5 rounded-xl bg-white border border-zinc-300 hover:bg-zinc-100 text-black transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="text-right">
            <h3 className="text-base sm:text-lg font-black text-black">
              حجز الباقة والتواصل المباشر
            </h3>
            <span className="text-xs text-zinc-500 font-mono">
              DIRECT WHATSAPP & MESSENGER DISPATCH
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {submittedSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-black">تم إرسال طلبك بنجاح!</h4>
              <p className="text-xs text-zinc-600 max-w-sm mx-auto leading-relaxed">
                تم تحويل طلبك مباشرة إلى واتساب ومزامنة البيانات في قاعدة بيانات الوكالة.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-2.5 justify-center">
                <a
                  href={getMessengerShareUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white text-xs font-bold transition-all"
                >
                  فتح Messenger للتأكيد
                </a>
                <button
                  onClick={() => {
                    setSubmittedSuccess(false);
                    onClose();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-white border border-zinc-300 text-zinc-800 text-xs font-semibold hover:bg-zinc-100"
                >
                  إغلاق النافذة
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-zinc-900 mb-1">
                  الباقة المحددة:
                </label>
                <div className="p-3 rounded-xl bg-zinc-100 border border-zinc-200 text-xs font-bold text-black flex items-center justify-between">
                  <span>{selectedPackage}</span>
                  {totalEstimate && (
                    <span className="font-mono text-black font-extrabold text-sm">
                      {totalEstimate.toLocaleString('en-US')} EGP
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-900 mb-1">
                  اسم العميل أو النشاط التجاري <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثال: أحمد عبد الله"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-zinc-300 focus:border-black outline-none text-xs text-black"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-900 mb-1">
                    رقم الهاتف / الواتساب <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01020185275"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-zinc-300 focus:border-black outline-none text-xs text-black font-mono text-left"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-900 mb-1">
                    الميزانية المتاحة (EGP)
                  </label>
                  <input
                    type="text"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="مثال: 5,000 EGP"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-zinc-300 focus:border-black outline-none text-xs text-black font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-900 mb-1">
                  نوع النشاط أو المجال:
                </label>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-zinc-300 focus:border-black outline-none text-xs text-black"
                >
                  <option value="متجر إلكتروني">متجر إلكتروني / E-Commerce</option>
                  <option value="أثاث وديكور">أثاث وديكور داخلي</option>
                  <option value="صانع محتوى">صانع محتوى / شخصي</option>
                  <option value="شركة أو مؤسسة">شركة أو مؤسسة تجارية</option>
                  <option value="كافيه أو مطعم">كافيه أو مطعم</option>
                  <option value="مجال آخر">مجال آخر</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-900 mb-1">
                  ملاحظات أو روابط حساباتكم (اختياري):
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="أي تفاصيل ترغب بإخبارنا بها..."
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-zinc-300 focus:border-black outline-none text-xs text-black resize-none"
                />
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'جاري التحويل...' : 'إرسال الحجز عبر واتساب فوراً'}</span>
                </button>

                <a
                  href={getMessengerShareUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-black font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>أو تواصل عبر Messenger مباشرة</span>
                </a>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>يتم إرسال الطلب فورياً ومباشرة إلى وكالة ESAM AMR الرسمية</span>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
