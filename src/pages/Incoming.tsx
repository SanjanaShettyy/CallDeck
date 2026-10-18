import React from 'react';
import {
  PhoneIncoming,
  Clock,
  Phone,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { HeaderStrip } from '../components/layout/HeaderStrip';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { useApp } from '../context/AppContext';

export const Incoming: React.FC = () => {
  const { incomingCalls, startCall, dismissIncomingCall } = useApp();

  const totalValueAtStake = incomingCalls.reduce(
    (acc, c) => acc + (c.expectedValue || 0),
    0
  );

  return (
    <div className="space-y-4">
      {/* Navy Gradient Header Strip */}
      <HeaderStrip
        title="Today's calling plan / Planner"
        subtitle="Unreturned inbound shopper calls and retail escalation callbacks"
        currentCount={incomingCalls.length}
        totalTarget={5}
      />

      <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-4 animate-in fade-in duration-200">
        {/* Summary Card with Prominent Numbers */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-950 via-rose-900 to-slate-900 text-white shadow-md border border-rose-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30">
                <AlertTriangle className="w-4 h-4" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-rose-300">
                Missed Inbound Queue
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-serif-heading">
              {incomingCalls.length} missed today · ₹{totalValueAtStake.toLocaleString()} expected value at stake
            </h2>
            <p className="text-xs text-rose-200/80">
              Recovering missed calls within 15 minutes preserves 84% conversion probability.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-start sm:self-center">
            <div className="px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-right">
              <span className="text-[10px] text-rose-300 uppercase block font-semibold">
                SLA Compliance
              </span>
              <span className="text-base font-bold text-white font-mono">
                91.4%
              </span>
            </div>
          </div>
        </div>

        {/* Missed Calls Table */}
        <Card className="overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PhoneIncoming className="w-4 h-4 text-rose-500" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Missed Inbound Calls ({incomingCalls.length})
              </h3>
            </div>
            <span className="text-xs text-slate-400">
              Auto-sorted by expected cart value
            </span>
          </div>

          {incomingCalls.length === 0 ? (
            <div className="p-12 text-center text-slate-500 space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <p className="text-sm font-semibold text-slate-800">
                All missed calls cleared!
              </p>
              <p className="text-xs text-slate-400">
                Great job Arvind. There are zero unreturned customer calls right now.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {incomingCalls.map((call) => (
                <div
                  key={call.id}
                  className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-slate-50/70 transition-colors"
                >
                  {/* Left: Caller info */}
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-rose-50 border border-rose-200 text-rose-700 flex items-center justify-center font-bold text-xs shrink-0">
                      {call.leadName
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-slate-900">
                          {call.leadName}
                        </span>
                        <span className="text-xs font-mono text-slate-500">
                          {call.phone}
                        </span>
                        <Badge variant="red" size="xs">
                          {call.time}
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

                  {/* Right: Expected value & Call Back action */}
                  <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Expected Value
                      </span>
                      <span className="text-sm font-bold text-[#b87a2a] font-mono">
                        ₹{call.expectedValue.toLocaleString()}
                      </span>
                    </div>

                    {/* Green Call Back Button */}
                    <button
                      onClick={() => {
                        dismissIncomingCall(call.id);
                        startCall(call.leadName, call.phone, call.product, call.type);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
                      title={`Call back ${call.leadName} immediately`}
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Call back</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Recovery Tip */}
        <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-900 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-600" />
            <span>AI Dispatching: High-value calls (&gt;₹30k) are automatically prioritized for immediate telecaller connect.</span>
          </span>
          <span className="font-semibold text-amber-800 hidden sm:inline">Priority Queue</span>
        </div>
      </div>
    </div>
  );
};
