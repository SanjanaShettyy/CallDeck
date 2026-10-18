import React from 'react';
import {
  X,
  Clock,
  Smartphone,
  Phone,
  Sparkles,
  Headphones,
  FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';

export const CallReviewModal: React.FC = () => {
  const { selectedCallForReview, closeCallReview, startCall } = useApp();

  if (!selectedCallForReview) return null;

  const call = selectedCallForReview;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
    >
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={closeCallReview}
      />

      <div
        className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden transform animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#14352a] text-white px-5 py-4 flex items-center justify-between border-b border-emerald-950">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-full bg-emerald-800/80 flex items-center justify-center">
              <Headphones className="w-4 h-4 text-emerald-300" />
            </div>
            <div>
              <h2 className="text-sm font-semibold tracking-tight text-white flex items-center gap-2">
                <span>Call Recording & QA Review</span>
              </h2>
              <p className="text-[10px] text-emerald-300/80 font-mono">
                {call.leadName} · {call.time}
              </p>
            </div>
          </div>

          <button
            onClick={closeCallReview}
            className="p-1 rounded-full text-emerald-200 hover:text-white hover:bg-emerald-800/60 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs">
          {/* Metadata Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px]">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Type</span>
              <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                {call.type === 'in-app' ? (
                  <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Phone className="w-3.5 h-3.5 text-blue-600" />
                )}
                {call.type === 'in-app' ? 'In-App WebRTC' : 'Phone Outbound'}
              </span>
            </div>

            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Duration</span>
              <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                {call.duration}
              </span>
            </div>

            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Outcome</span>
              <span className="mt-0.5 inline-block">
                <Badge variant="green" size="xs">
                  {call.outcome}
                </Badge>
              </span>
            </div>

            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">QA Score</span>
              <span className="text-sm font-bold text-emerald-700 block mt-0.5">
                {call.qaScore || 85}/100
              </span>
            </div>
          </div>

          {/* Audio Waveform Simulator */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
              <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                Audio Playback Track
              </span>
              <span className="font-mono text-[10px]">00:00 / {call.duration}</span>
            </div>
            <div className="flex items-center gap-1 h-7 px-2 bg-slate-50 rounded-lg border border-slate-100">
              {[30, 60, 40, 80, 100, 70, 50, 90, 85, 45, 65, 95, 40, 75, 55, 35, 70, 85, 60, 40, 90, 50, 30].map(
                (h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-emerald-600/70 hover:bg-emerald-600 rounded-full transition-all cursor-pointer"
                    style={{ height: `${h}%` }}
                    title={`Seek to ${i * 5}s`}
                  />
                )
              )}
            </div>
          </div>

          {/* Transcript Snippet */}
          <div className="border border-slate-200/80 rounded-xl p-3.5 bg-white">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-2">
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              Conversation Transcript Summary
            </span>
            <p className="text-xs text-slate-700 leading-relaxed font-sans bg-slate-50 p-2.5 rounded-lg border border-slate-100 italic">
              "{call.transcriptSnippet || 'Customer tested mattress in showroom and enquired regarding EMI options and guaranteed delivery before festival weekend.'}"
            </p>
          </div>

          {/* AI Coach Feedback */}
          <div className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-200/80 text-purple-900">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-900 flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              AvaniBot Coaching Note
            </span>
            <p className="text-xs text-purple-800 leading-relaxed">
              {call.coachingTip ||
                'Strong call opening and pricing clarity. Customer felt confident about the 10-year warranty coverage.'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={closeCallReview}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium cursor-pointer"
          >
            Close
          </button>

          <button
            onClick={() => {
              closeCallReview();
              startCall(call.leadName, call.phone, call.product, call.type);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium shadow-sm transition-colors cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Back Again</span>
          </button>
        </div>
      </div>
    </div>
  );
};
