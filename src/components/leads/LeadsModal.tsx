import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Phone,
  Clock,
  Sparkles,
  MapPin,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';

export const LeadsModal: React.FC = () => {
  const {
    leads,
    selectedLeadIndex,
    isLeadsModalOpen,
    closeLeadsModal,
    nextLead,
    prevLead,
    setLeadIndex,
    startCall
  } = useApp();

  // Collapsible sections state
  const [isIcpOpen, setIsIcpOpen] = useState(true);
  const [isHowWeGotHereOpen, setIsHowWeGotHereOpen] = useState(true);
  const [isSignalsOpen, setIsSignalsOpen] = useState(true);

  if (!isLeadsModalOpen) return null;

  const lead = leads[selectedLeadIndex] || leads[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
    >
      {/* Blurred Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity"
        onClick={closeLeadsModal}
      />

      {/* Modal Dialog Content */}
      <div
        className="relative z-10 w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden transform animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Purple Header */}
        <div className="bg-gradient-to-r from-[#441a78] via-[#5b249b] to-[#441a78] text-white px-5 py-3.5 flex items-center justify-between border-b border-purple-900/60 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-xs sm:text-sm font-semibold tracking-tight text-purple-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-300" />
              <span>Leads · Lead {selectedLeadIndex + 1} of {leads.length}</span>
            </span>

            {/* Status OPEN badge */}
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              {lead.status}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Close button */}
            <button
              onClick={closeLeadsModal}
              className="p-1 rounded-full text-purple-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 max-h-[75vh] overflow-y-auto space-y-4 text-xs">
          {/* Main Lead Card Profile */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900 font-serif-heading">
                  {lead.name}
                </h2>
                <span className="text-xs font-mono text-slate-500">
                  {lead.phone}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 mt-1.5">
                <Badge variant="green" size="sm">
                  {lead.interest}
                </Badge>
                <span className="flex items-center gap-1 text-[11px] text-slate-500">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  {lead.location}
                </span>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
              {/* Time Left Badge */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200/80 text-[11px] font-semibold">
                <Clock className="w-3 h-3 text-amber-600" />
                <span>{lead.timeLeft}</span>
              </div>

              {/* Instant Call Action */}
              <button
                onClick={() => {
                  closeLeadsModal();
                  startCall(lead.name, lead.phone, lead.product, 'in-app');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow-sm transition-colors cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </button>
            </div>
          </div>

          {/* Scores Row: ICP Fit & Lead Intent */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* ICP Score */}
            <div className="p-3.5 rounded-xl border border-slate-200/80 bg-white">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  ICP Score
                </span>
                <span className="text-sm font-bold text-emerald-700">
                  {lead.icpScore}%
                </span>
              </div>
              {/* Visual Progress Bar */}
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${lead.icpScore}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                Profile match with high-LTV mattress buyer
              </p>
            </div>

            {/* Lead Intent Score */}
            <div className="p-3.5 rounded-xl border border-slate-200/80 bg-white">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Lead Intent Score
                </span>
                <span className="text-sm font-bold text-purple-700">
                  {lead.leadIntentScore}
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${lead.leadIntentScore}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                Voice tone, demo time & EMI enquiry signals
              </p>
            </div>
          </div>

          {/* Collapsible 1: ICP Fit Breakdown */}
          <div className="border border-slate-200/80 rounded-xl overflow-hidden">
            <button
              onClick={() => setIsIcpOpen(!isIcpOpen)}
              className="w-full px-4 py-2.5 bg-slate-50/80 hover:bg-slate-100/80 flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <span className="font-semibold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
                ICP Fit Breakdown
              </span>
              {isIcpOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
            </button>

            {isIcpOpen && (
              <div className="p-3.5 bg-white space-y-2 border-t border-slate-100 text-[11px] text-slate-600">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="p-2 rounded bg-slate-50 border border-slate-100">
                    <span className="font-semibold text-slate-700 block text-[10px] uppercase">Budget Match</span>
                    <span>{lead.icpBreakdown.budgetMatch}</span>
                  </div>
                  <div className="p-2 rounded bg-slate-50 border border-slate-100">
                    <span className="font-semibold text-slate-700 block text-[10px] uppercase">Mattress Size</span>
                    <span>{lead.icpBreakdown.mattressSize}</span>
                  </div>
                  <div className="p-2 rounded bg-slate-50 border border-slate-100">
                    <span className="font-semibold text-slate-700 block text-[10px] uppercase">Back Pain Profile</span>
                    <span>{lead.icpBreakdown.backPainConcern}</span>
                  </div>
                  <div className="p-2 rounded bg-slate-50 border border-slate-100">
                    <span className="font-semibold text-slate-700 block text-[10px] uppercase">Decision Timeline</span>
                    <span>{lead.icpBreakdown.timeline}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Collapsible 2: How We Got Here */}
          <div className="border border-slate-200/80 rounded-xl overflow-hidden">
            <button
              onClick={() => setIsHowWeGotHereOpen(!isHowWeGotHereOpen)}
              className="w-full px-4 py-2.5 bg-slate-50/80 hover:bg-slate-100/80 flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <span className="font-semibold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
                How We Got Here
              </span>
              {isHowWeGotHereOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
            </button>

            {isHowWeGotHereOpen && (
              <div className="p-3.5 bg-white border-t border-slate-100 text-xs text-slate-700 leading-relaxed font-sans">
                {lead.howWeGotHere}
              </div>
            )}
          </div>

          {/* Collapsible 3: Where We Picked Up Signals */}
          <div className="border border-slate-200/80 rounded-xl overflow-hidden">
            <button
              onClick={() => setIsSignalsOpen(!isSignalsOpen)}
              className="w-full px-4 py-2.5 bg-slate-50/80 hover:bg-slate-100/80 flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <span className="font-semibold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
                Where We Picked Up Signals
              </span>
              {isSignalsOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
            </button>

            {isSignalsOpen && (
              <div className="p-3.5 bg-white border-t border-slate-100 space-y-2.5">
                {lead.buyingSignals.map((signal, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-slate-50/80 border border-slate-200/60"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[11px] text-slate-800">
                        {signal.category}
                      </span>
                      {signal.strength && (
                        <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded">
                          {signal.strength}
                        </span>
                      )}
                    </div>
                    <p className="italic text-[11px] text-slate-600 leading-snug">
                      "{signal.quote}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Red Cumulative Missed Strip */}
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200/80 flex items-center gap-2.5 text-rose-900">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <div className="text-[11px] leading-tight">
              <strong className="font-bold text-rose-950 uppercase tracking-wider text-[10px] block mb-0.5">
                Cumulative Missed
              </strong>
              <span>{lead.cumulativeMissed}</span>
            </div>
          </div>
        </div>

        {/* Footer Navigation Paging with Dots */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={prevLead}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium shadow-2xs transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {leads.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setLeadIndex(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  selectedLeadIndex === idx
                    ? 'w-6 bg-purple-700'
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to lead ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextLead}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium shadow-2xs transition-colors cursor-pointer"
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
