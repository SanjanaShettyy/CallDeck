import React, { useState } from 'react';
import {
  History,
  Clock,
  Phone,
  Smartphone,
  ChevronRight,
  Award,
  Search
} from 'lucide-react';
import { HeaderStrip } from '../components/layout/HeaderStrip';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { useApp } from '../context/AppContext';

export const Recent: React.FC = () => {
  const { recentCalls, openCallReview } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'in-app' | 'phone'>('all');

  const filteredCalls = recentCalls.filter((call) => {
    const matchesSearch =
      call.leadName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      call.product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || call.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-4">
      {/* Navy Gradient Header Strip */}
      <HeaderStrip
        title="Today's calling plan / Planner"
        subtitle="Historical call recordings, audio transcripts, QA scoring, and disposition logs"
        currentCount={recentCalls.length}
        totalTarget={15}
      />

      <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-4 animate-in fade-in duration-200">
        {/* Search & Filter Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 font-serif-heading">
              Recent Call Activity & QA Logs
            </h2>
            <p className="text-xs text-slate-500">
              Tap any row to inspect audio waveform, transcript snippets, and AI coach feedback.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by customer or mattress..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#14352a]/20 w-48 sm:w-64"
              />
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center rounded-lg border border-slate-200 bg-white p-0.5 text-xs">
              <button
                onClick={() => setFilterType('all')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                  filterType === 'all'
                    ? 'bg-[#14352a] text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType('in-app')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                  filterType === 'in-app'
                    ? 'bg-[#14352a] text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                In-App
              </button>
              <button
                onClick={() => setFilterType('phone')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                  filterType === 'phone'
                    ? 'bg-[#14352a] text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Phone
              </button>
            </div>
          </div>
        </div>

        {/* Recent Calls List */}
        <Card className="overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-emerald-700" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Completed Calls ({filteredCalls.length})
              </h3>
            </div>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              Avg QA: 84.6%
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredCalls.map((call) => (
              <div
                key={call.id}
                onClick={() => openCallReview(call)}
                className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors cursor-pointer group"
              >
                {/* Left: Caller details */}
                <div className="flex items-start sm:items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0 group-hover:bg-emerald-50 group-hover:text-emerald-800 transition-colors">
                    {call.leadName
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm text-slate-900 group-hover:text-emerald-800 transition-colors">
                        {call.leadName}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {call.phone}
                      </span>
                      <Badge variant="green" size="xs">
                        {call.outcome}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <span className="font-medium text-slate-700">
                        {call.product}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1 text-[11px] text-slate-500">
                        {call.type === 'in-app' ? (
                          <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Phone className="w-3.5 h-3.5 text-blue-600" />
                        )}
                        {call.type === 'in-app' ? 'In-App WebRTC' : 'Phone Outbound'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Time, Duration, QA Score & Review Trigger */}
                <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <div className="flex items-center gap-3 text-right">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Call Time
                      </span>
                      <span className="text-xs font-semibold text-slate-700">
                        {call.time}
                      </span>
                    </div>

                    <div className="pl-3 border-l border-slate-200">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Duration
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-800 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {call.duration}
                      </span>
                    </div>

                    {call.qaScore && (
                      <div className="pl-3 border-l border-slate-200">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">
                          QA Score
                        </span>
                        <span className="text-xs font-bold text-emerald-700 font-mono">
                          {call.qaScore}%
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-slate-400 group-hover:text-emerald-700 transition-colors">
                    <span className="text-xs font-medium hidden sm:inline">
                      Review
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
