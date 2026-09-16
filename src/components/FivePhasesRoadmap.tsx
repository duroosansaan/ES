import React, { useState } from 'react';
import { Compass, CheckCircle2, ChevronDown, ChevronUp, Copy, Check, Sparkles, X, Shield, ArrowLeft } from 'lucide-react';
import { AGENCY_FIVE_PHASES } from '../data/agencyData';
import { soundManager } from '../utils/audio';

interface FivePhasesRoadmapProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FivePhasesRoadmap: React.FC<FivePhasesRoadmapProps> = ({ isOpen, onClose }) => {
  const [expandedPhase, setExpandedPhase] = useState<number>(1);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const togglePhase = (num: number) => {
    soundManager.playClick();
    setExpandedPhase(expandedPhase === num ? 0 : num);
  };

  const copyRoadmap = () => {
    const text = AGENCY_FIVE_PHASES.map((p) => (
      `المرحلة ${p.phaseNumber}: ${p.titleAr}\nالهدف: ${p.objective}\nالمخرجات:\n- ${p.deliverables.join('\n- ')}\nنصائح:\n- ${p.tips.join('\n- ')}\n`
    )).join('\n===============================\n\n');
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    soundManager.playSuccess();
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-3xl bg-[#0e0e10] border border-zinc-700 shadow-2xl my-8 overflow-hidden text-right">
        
        {/* Header */}
        <div className="p-6 sm:p-8 bg-[#141417] border-b border-zinc-800 flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs font-bold mb-2">
              <Compass className="w-3.5 h-3.5 text-white" />
              <span>دليل الخطوات الخمس الشامل للوكالة</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              خارطة طريق بناء مشروع ES Design Agency الشامل على 5 مراحل
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              خطوات استراتيجية قبل وبعد البدء: من تحليل المنافسين وتحديد الجمهور وحتى إطلاق الموقع وربطه بـ Firebase.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyRoadmap}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-white text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium"
              title="نسخ الخطة كاملة"
            >
              {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-zinc-400" />}
              <span className="hidden sm:inline">{copied ? 'تم النسخ!' : 'نسخ الخطة'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Phases Accordion */}
        <div className="p-6 sm:p-8 space-y-4 max-h-[70vh] overflow-y-auto">
          {AGENCY_FIVE_PHASES.map((phase) => {
            const isCurrent = expandedPhase === phase.phaseNumber;

            return (
              <div
                key={phase.phaseNumber}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isCurrent
                    ? 'bg-[#18181b] border-white shadow-xl'
                    : 'bg-[#121214] border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {/* Phase Trigger */}
                <button
                  type="button"
                  onClick={() => togglePhase(phase.phaseNumber)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-right cursor-pointer"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-mono font-black text-sm shrink-0 transition-all ${
                        isCurrent
                          ? 'bg-white text-black shadow'
                          : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                      }`}
                    >
                      0{phase.phaseNumber}
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-zinc-400 block mb-0.5">
                        {phase.titleEn}
                      </span>
                      <h4 className="text-sm sm:text-base font-extrabold text-white">
                        المرحلة {phase.phaseNumber}: {phase.titleAr}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="hidden sm:inline text-xs font-semibold text-zinc-400">
                      {isCurrent ? 'طي التفاصيل' : 'عرض الخطة'}
                    </span>
                    {isCurrent ? (
                      <ChevronUp className="w-5 h-5 text-white" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-zinc-400" />
                    )}
                  </div>
                </button>

                {/* Expanded Content */}
                {isCurrent && (
                  <div className="px-5 pb-6 pt-2 border-t border-zinc-800/80 space-y-5">
                    {/* Objective */}
                    <div className="p-3.5 rounded-xl bg-black border border-zinc-800">
                      <span className="text-xs font-bold text-white block mb-1">
                        الهدف الرئيسي للمرحلة:
                      </span>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        {phase.objective}
                      </p>
                    </div>

                    {/* Grid: Deliverables and Tips */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Deliverables */}
                      <div className="p-4 rounded-xl bg-black border border-zinc-800/80">
                        <div className="flex items-center gap-2 mb-3 text-xs font-bold text-white">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                          <span>المخرجات العملية (Deliverables)</span>
                        </div>
                        <ul className="space-y-2 text-xs text-zinc-300">
                          {phase.deliverables.map((d, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0 mt-1.5" />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tips */}
                      <div className="p-4 rounded-xl bg-black border border-zinc-800/80">
                        <div className="flex items-center gap-2 mb-3 text-xs font-bold text-zinc-300">
                          <Sparkles className="w-4 h-4 text-zinc-400" />
                          <span>نصائح وخطوات التنفيذ الذكية</span>
                        </div>
                        <ul className="space-y-2 text-xs text-zinc-400">
                          {phase.tips.map((t, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 shrink-0 mt-1.5" />
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="p-4 sm:p-5 bg-[#141417] border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-white" />
            <span>كافة المراحل موثقة وقابلة للتطبيق المباشر</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            إغلاق الدليل
          </button>
        </div>

      </div>
    </div>
  );
};
