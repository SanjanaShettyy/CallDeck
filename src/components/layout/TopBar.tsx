import React from 'react';
import { Bell, Menu, X, ShieldCheck } from 'lucide-react';
import { Avatar } from '../common/Avatar';
import { useApp } from '../../context/AppContext';

interface TopBarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({ onToggleSidebar, isSidebarOpen }) => {
  const { monthEarnings, openLeadsModal, incomingCalls } = useApp();

  return (
    <header className="sticky top-0 z-40 h-13 bg-[#112d23] text-white border-b border-emerald-950/80 px-3 sm:px-5 flex items-center justify-between select-none shadow-sm">
      {/* Left: Mobile hamburger & Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-900/60 transition-colors"
          aria-label="Toggle navigation"
        >
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div className="flex items-center gap-2.5">
          {/* OG Badge */}
          <div className="h-7 w-7 rounded-lg bg-emerald-800/90 border border-emerald-600/40 flex items-center justify-center font-bold text-xs tracking-wider text-emerald-100 shadow-inner">
            OG
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm tracking-tight text-white flex items-center gap-1.5">
              On-Ground.ai
              <span className="hidden sm:inline-block text-[10px] font-medium px-1.5 py-0.2 bg-emerald-900/80 text-emerald-300 rounded border border-emerald-700/50">
                PROD
              </span>
            </span>
            <span className="text-[10px] text-emerald-300/80 -mt-0.5 hidden sm:inline">
              The Sleep Company · Call Centre
            </span>
          </div>
        </div>
      </div>

      {/* Middle: Store / Company Indicator (Desktop) */}
      <div className="hidden lg:flex items-center gap-2 bg-[#0c221a] px-3 py-1 rounded-full border border-emerald-800/40 text-[11px] text-emerald-200">
        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>The Sleep Company · Floor to Call Centre Voice Link</span>
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
      </div>

      {/* Right: Notifications, Stats Pill, Avatar */}
      <div className="flex items-center gap-2.5 sm:gap-3.5">
        {/* Quick Earnings / Incentive Pill */}
        <div
          onClick={() => openLeadsModal(0)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/50 text-[11px] font-medium text-emerald-200 cursor-pointer hover:bg-emerald-900/70 transition-colors"
          title="Current month earnings & incentive"
        >
          <span className="text-[#e2b774] font-semibold">₹{monthEarnings.toLocaleString()}</span>
          <span className="text-emerald-400/80 hidden xs:inline text-[10px]">earned</span>
        </div>

        {/* Notification Bell with Badge */}
        <div className="relative">
          <button
            onClick={() => openLeadsModal(0)}
            className="p-1.5 rounded-full text-emerald-200 hover:text-white hover:bg-emerald-900/60 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {incomingCalls.length > 0 && (
              <span className="absolute top-0.5 right-0.5 h-4 w-4 bg-rose-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center ring-2 ring-[#112d23]">
                {incomingCalls.length}
              </span>
            )}
          </button>
        </div>

        {/* User Profile Avatar with Online indicator */}
        <div className="flex items-center gap-2 pl-1 border-l border-emerald-900/80">
          <div className="relative cursor-pointer" title="Arvind Rajan · Telecaller Specialist">
            <Avatar
              initials="AR"
              size="sm"
              bg="bg-emerald-800"
              textColor="text-emerald-50"
              ring
            />
            <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-400 ring-1 ring-[#112d23]" />
          </div>
          <div className="hidden md:flex flex-col text-left">
            <span className="text-xs font-medium text-slate-100 leading-tight">
              Arvind Rajan
            </span>
            <span className="text-[10px] text-emerald-300/70">
              Agent #8491
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
