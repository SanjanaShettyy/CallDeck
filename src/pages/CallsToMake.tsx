import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Phone,
  Sparkles,
  MapPin,
  Clock,
  UserCheck,
  CheckCircle2
} from 'lucide-react';
import { HeaderStrip } from '../components/layout/HeaderStrip';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Pagination } from '../components/common/Pagination';
import { useApp } from '../context/AppContext';

export const CallsToMake: React.FC = () => {
  const { leads, startCall, openLeadsModal } = useApp();

  // Expandable row state
  const [expandedId, setExpandedId] = useState<string | null>('lead-1');
  // Pagination state (3 per page)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 3;
  const totalPages = Math.ceil(leads.length / pageSize);

  const paginatedLeads = leads.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-4">
      {/* Navy Gradient Header Strip */}
      <HeaderStrip
        title="Today's calling plan / Planner"
        subtitle="Ranked high-intent leads generated from The Sleep Company retail store walk-outs"
        currentCount={leads.length}
        totalTarget={8}
      />

      <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-4">
        {/* Table / List Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
          <div>
            <h2 className="text-base font-bold text-slate-900 font-serif-heading">
              Ranked Calls Priority Queue
            </h2>
            <p className="text-xs text-slate-500">
              Ranked by AI buying intent score and offline store dwell time.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">
              Showing {paginatedLeads.length} of {leads.length} leads
            </span>
          </div>
        </div>

        {/* Lead List Cards */}
        <div className="space-y-3">
          {paginatedLeads.map((lead, index) => {
            const isExpanded = expandedId === lead.id;
            const globalIndex = (currentPage - 1) * pageSize + index;

            return (
              <Card
                key={lead.id}
                className={`transition-all duration-200 overflow-hidden ${
                  isExpanded ? 'border-emerald-300 ring-1 ring-emerald-400/20 shadow-md' : 'hover:border-slate-300'
                }`}
              >
                {/* Main Row */}
                <div
                  onClick={() => toggleExpand(lead.id)}
                  className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 cursor-pointer select-none"
                >
                  {/* Left: Rank & Lead Info */}
                  <div className="flex items-start sm:items-center gap-3">
                    {/* Rank Badge */}
                    <div className="h-8 w-8 rounded-lg bg-emerald-50 border border-emerald-200/80 flex items-center justify-center font-bold text-xs text-emerald-900 shrink-0">
                      #{lead.rank}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-slate-900">
                          {lead.name}
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          {lead.phone}
                        </span>
                        <Badge variant="green" size="xs">
                          {lead.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                        <span className="font-medium text-slate-700">
                          {lead.interest}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1 text-[11px] text-slate-400">
                          <MapPin className="w-3 h-3" />
                          {lead.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Scores, Time Left, Actions */}
                  <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                    {/* Lead Intent & ICP Score Pills */}
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] uppercase font-bold text-slate-400">
                          Score
                        </span>
                        <span className="text-xs font-bold text-emerald-700 font-mono">
                          {lead.score} / 100
                        </span>
                      </div>

                      <div className="hidden sm:flex flex-col items-end pl-2 border-l border-slate-200">
                        <span className="text-[10px] uppercase font-bold text-slate-400">
                          ICP Fit
                        </span>
                        <span className="text-xs font-bold text-purple-700 font-mono">
                          {lead.icpScore}%
                        </span>
                      </div>
                    </div>

                    {/* Time Left Badge */}
                    <div className="flex items-center gap-1 text-[11px] text-amber-800 bg-amber-50 border border-amber-200/70 px-2 py-0.5 rounded-full font-medium">
                      <Clock className="w-3 h-3 text-amber-600" />
                      <span>{lead.timeLeft}</span>
                    </div>

                    {/* Action Call Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        startCall(lead.name, lead.phone, lead.product, 'in-app');
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call</span>
                    </button>

                    {/* Expand Arrow */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(lead.id);
                      }}
                      className="p-1 rounded-md text-slate-400 hover:text-slate-600 transition-colors"
                      aria-label={isExpanded ? 'Collapse row' : 'Expand row'}
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Inline Expandable Details */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-2 border-t border-slate-100 bg-slate-50/60 space-y-3 text-xs animate-in slide-in-from-top-2 duration-150">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* Store Visit Journey */}
                      <div className="p-3 rounded-lg bg-white border border-slate-200/80">
                        <span className="font-bold text-[11px] uppercase tracking-wider text-slate-500 block mb-1">
                          In-Store Customer Journey
                        </span>
                        <p className="text-slate-700 leading-relaxed font-sans">
                          {lead.howWeGotHere}
                        </p>
                      </div>

                      {/* ICP Specs */}
                      <div className="p-3 rounded-lg bg-white border border-slate-200/80">
                        <span className="font-bold text-[11px] uppercase tracking-wider text-slate-500 block mb-1">
                          Shopper Requirements
                        </span>
                        <ul className="space-y-1 text-slate-600">
                          <li>• <strong>Budget:</strong> {lead.icpBreakdown.budgetMatch}</li>
                          <li>• <strong>Mattress:</strong> {lead.icpBreakdown.mattressSize}</li>
                          <li>• <strong>Clinical:</strong> {lead.icpBreakdown.backPainConcern}</li>
                        </ul>
                      </div>
                    </div>

                    {/* Buying Signals Snippets */}
                    <div className="p-3 rounded-lg bg-white border border-slate-200/80">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-[11px] uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          Detected Buying Signals
                        </span>
                        <button
                          onClick={() => openLeadsModal(globalIndex)}
                          className="text-[11px] font-semibold text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer"
                        >
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>View Full Lead Dossier</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {lead.buyingSignals.map((sig, sIdx) => (
                          <div
                            key={sIdx}
                            className="p-2 rounded bg-slate-50 border border-slate-200/60"
                          >
                            <span className="text-[10px] font-bold text-slate-700 block">
                              {sig.category}
                            </span>
                            <p className="italic text-[11px] text-slate-600 mt-0.5">
                              "{sig.quote}"
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Agent Quick Toolbar */}
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] text-rose-600 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {lead.cumulativeMissed}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openLeadsModal(globalIndex)}
                          className="px-3 py-1 rounded-md border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium cursor-pointer"
                        >
                          Deep Dive (Modal)
                        </button>
                        <button
                          onClick={() =>
                            startCall(lead.name, lead.phone, lead.product, 'phone')
                          }
                          className="px-3 py-1 rounded-md bg-[#14352a] hover:bg-[#1a4436] text-white text-xs font-medium cursor-pointer"
                        >
                          Outbound PSTN Call
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Pagination Controls */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};
