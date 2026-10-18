import React, { useState } from 'react';
import {
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Headphones
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CALL_SIMULATION_SCRIPT } from '../../data/mock';

export const ActiveCallModal: React.FC = () => {
  const { activeCall, endCall, toggleMute, toggleSpeaker, advanceScript } = useApp();
  const [selectedResponse, setSelectedResponse] = useState<string | null>(null);

  if (!activeCall.isActive) return null;

  const minutes = Math.floor(activeCall.durationSeconds / 60);
  const seconds = activeCall.durationSeconds % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const currentStep = CALL_SIMULATION_SCRIPT[activeCall.currentScriptStep % CALL_SIMULATION_SCRIPT.length];

  const handlePickResponse = (text: string) => {
    setSelectedResponse(text);
    setTimeout(() => {
      setSelectedResponse(null);
      advanceScript();
    }, 700);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
    >
      {/* Blurred Backdrop */}
      <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-md" />

      {/* Main Call Window */}
      <div className="relative z-10 w-full max-w-lg bg-slate-900 text-white rounded-3xl shadow-2xl border border-slate-700/80 overflow-hidden transform animate-in zoom-in-95 duration-200">
        {/* Call Header */}
        <div className="bg-slate-800/90 px-6 py-4 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
              <Headphones className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  {activeCall.status === 'connecting' ? 'Connecting SIP Audio...' : 'Live On-Ground Call'}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <p className="text-[11px] text-slate-400">
                {activeCall.callType === 'in-app' ? 'WebRTC High-Def Audio' : 'Outbound Cellular Link'}
              </p>
            </div>
          </div>

          {/* Live Timer */}
          <div className="px-3 py-1 rounded-full bg-slate-950/80 border border-slate-700 text-sm font-mono font-bold text-emerald-300">
            {formattedTime}
          </div>
        </div>

        {/* Customer Profile Strip */}
        <div className="p-6 text-center border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-900/90">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-tr from-emerald-700 to-teal-500 text-white font-bold text-xl shadow-lg ring-4 ring-emerald-950/60 mb-3">
            {activeCall.leadName
              .split(' ')
              .map((n) => n[0])
              .join('')
              .slice(0, 2)
              .toUpperCase()}
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white font-serif-heading">
            {activeCall.leadName}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5 font-mono">
            {activeCall.phone}
          </p>

          <div className="mt-2.5 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs text-emerald-300">
            <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
            <span>Interested in: <strong>{activeCall.product}</strong></span>
          </div>

          {/* Sound wave visualizer animation */}
          <div className="mt-5 flex items-center justify-center gap-1.5 h-8">
            {[40, 75, 90, 60, 100, 45, 80, 65, 95, 50, 85, 30].map((h, i) => (
              <span
                key={i}
                className="w-1 bg-emerald-400/80 rounded-full transition-all duration-300 animate-pulse"
                style={{
                  height: `${activeCall.status === 'connected' ? h : 15}%`,
                  animationDelay: `${i * 90}ms`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Real-time Simulated Voice Script */}
        <div className="p-5 bg-slate-950/60 max-h-64 overflow-y-auto space-y-3">
          <div className="flex items-center justify-between text-[11px] text-slate-400 pb-1 border-b border-slate-800">
            <span className="font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Live AI Script & Co-Pilot
            </span>
            <span>Step {activeCall.currentScriptStep + 1} of {CALL_SIMULATION_SCRIPT.length}</span>
          </div>

          {/* Customer Dialog */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-200 shadow-inner">
            <div className="font-semibold text-emerald-300 mb-1 flex items-center gap-1.5 text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {currentStep.speaker}:
            </div>
            <p className="italic text-slate-100 leading-relaxed font-sans">
              "{currentStep.text}"
            </p>
          </div>

          {/* Agent Suggested Responses */}
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
              Choose your response to speak:
            </span>
            <div className="space-y-1.5">
              {currentStep.suggestedResponses.map((resp, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePickResponse(resp)}
                  disabled={selectedResponse !== null}
                  className={`w-full text-left p-2.5 rounded-lg text-xs transition-all border cursor-pointer ${
                    selectedResponse === resp
                      ? 'bg-emerald-900/60 border-emerald-500 text-white font-medium shadow-md'
                      : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">{resp}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Call Controls Bar */}
        <div className="bg-slate-900 px-6 py-4 border-t border-slate-800 flex items-center justify-around">
          {/* Mute */}
          <button
            onClick={toggleMute}
            className={`p-3 rounded-full transition-all cursor-pointer ${
              activeCall.isMuted
                ? 'bg-amber-600/30 text-amber-300 border border-amber-500'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700'
            }`}
            title={activeCall.isMuted ? 'Unmute' : 'Mute'}
          >
            {activeCall.isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Speaker */}
          <button
            onClick={toggleSpeaker}
            className={`p-3 rounded-full transition-all cursor-pointer ${
              !activeCall.isSpeakerOn
                ? 'bg-slate-800/50 text-slate-500 border border-slate-800'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700'
            }`}
            title={activeCall.isSpeakerOn ? 'Speaker On' : 'Speaker Off'}
          >
            {activeCall.isSpeakerOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>

          {/* End Call Button */}
          <button
            onClick={endCall}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs tracking-wide shadow-lg shadow-rose-900/40 transition-transform active:scale-95 cursor-pointer"
            title="End Call & Save QA Summary"
          >
            <PhoneOff className="w-4 h-4" />
            <span>End Call</span>
          </button>
        </div>

        {/* Footer QA Score Note */}
        <div className="px-6 py-2 bg-slate-950 text-[10px] text-slate-400 text-center flex items-center justify-center gap-1.5 border-t border-slate-900">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          <span>Real-time QA Scoring active: Speech clarity 94% · Script adherence 92%</span>
        </div>
      </div>
    </div>
  );
};
