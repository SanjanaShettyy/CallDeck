import React from 'react';
import { Phone, Smartphone, PhoneCall, Sparkles, UserCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DemoToolbar: React.FC = () => {
  const { startCall, openDialPad, openLeadsModal } = useApp();

  return (
    <aside aria-label="Demo calling controls" className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-slate-900/95 backdrop-blur-md text-white px-3 py-2 rounded-full shadow-2xl border border-slate-700/80 animate-in slide-in-from-bottom-3 duration-300 select-none">
      <div className="flex items-center gap-1.5 pr-2 border-r border-slate-700/80 text-[10px] font-bold uppercase tracking-wider text-amber-400">
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        <span className="hidden sm:inline">Demo Tools</span>
      </div>

      {/* In-app call */}
      <button
        onClick={() =>
          startCall('Mukunda', '+91 98450 12894', 'Ortho GRID Mattress', 'in-app')
        }
        className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors shadow-sm cursor-pointer"
        title="Simulate In-App WebRTC Call with Mukunda"
      >
        <Smartphone className="w-3.5 h-3.5" />
        <span>In-app call</span>
      </button>

      {/* Phone call */}
      <button
        onClick={() =>
          startCall('Faizan A.', '+91 99201 88321', 'SmartGRID Luxe', 'phone')
        }
        className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-medium transition-colors border border-slate-600 cursor-pointer"
        title="Simulate Outbound Phone PSTN Call"
      >
        <Phone className="w-3.5 h-3.5 text-blue-400" />
        <span>Phone call</span>
      </button>

      {/* Dial Pad Button */}
      <button
        onClick={openDialPad}
        className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors border border-slate-600 cursor-pointer"
        title="Open Numeric Dialpad"
        aria-label="Open Dial Pad"
      >
        <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
      </button>

      {/* Leads Modal Shortcut */}
      <button
        onClick={() => openLeadsModal(0)}
        className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-900/80 hover:bg-purple-800 text-purple-200 text-xs font-medium transition-colors border border-purple-700/60 cursor-pointer"
        title="Open Leads Modal (Lead 1 of 5)"
      >
        <UserCheck className="w-3.5 h-3.5 text-purple-300" />
        <span>Leads Modal</span>
      </button>
    </aside>
  );
};
