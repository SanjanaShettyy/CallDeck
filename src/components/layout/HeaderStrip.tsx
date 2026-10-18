import React from 'react';
import { Calendar, Clock, Target } from 'lucide-react';

interface HeaderStripProps {
  title?: string;
  subtitle?: string;
  currentCount?: number;
  totalTarget?: number;
}

export const HeaderStrip: React.FC<HeaderStripProps> = ({
  title = "Today's calling plan / Planner",
  subtitle = "The Sleep Company · Retail Walk-out & High Intent Lead Follow-up",
  currentCount = 5,
  totalTarget = 12,
}) => {
  return (
    <div className="bg-gradient-to-r from-[#12233f] via-[#1a3357] to-[#162744] text-white px-4 py-3 sm:px-6 sm:py-3.5 border-b border-slate-700/60 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-sm sm:text-base font-semibold tracking-tight text-white flex items-center gap-2">
            <span>{title}</span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
              Live Plan
            </span>
          </h1>
        </div>
        <p className="text-[11px] text-slate-300/80 mt-0.5">
          {subtitle}
        </p>
      </div>

      <div className="flex items-center gap-4 text-xs text-slate-300 shrink-0">
        <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
          <Calendar className="w-3.5 h-3.5 text-blue-300" />
          <span className="text-[11px]">Sun, 18 Oct 2026</span>
        </div>

        <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
          <Target className="w-3.5 h-3.5 text-emerald-300" />
          <span className="text-[11px]">
            Target: <strong className="text-white">{currentCount}</strong> / {totalTarget}
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
          <Clock className="w-3.5 h-3.5 text-amber-300" />
          <span className="text-[11px]">IST Shift: 09:30 - 18:30</span>
        </div>
      </div>
    </div>
  );
};
