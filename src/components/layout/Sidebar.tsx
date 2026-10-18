import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Zap,
  PhoneCall,
  PhoneIncoming,
  History,
  Headphones,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { incomingCalls, startCall } = useApp();

  const isPlanActive = location.pathname.startsWith('/plan');

  const navItemClass = (isActive: boolean, customColor?: string) => `
    flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 select-none
    ${
      isActive
        ? customColor || 'bg-[#1e4a3b] text-white shadow-sm font-semibold'
        : 'text-emerald-100/80 hover:text-white hover:bg-[#1a4436]'
    }
  `;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed md:sticky top-13 z-40 h-[calc(100vh-3.25rem)] w-56 bg-[#14352a] text-white flex flex-col justify-between border-r border-[#0f2920] shadow-md transition-transform duration-200 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Navigation Items */}
        <div className="p-3 space-y-4 overflow-y-auto">
          {/* Main Menu */}
          <div className="space-y-1">
            {/* Dashboard */}
            <NavLink
              to="/"
              onClick={onClose}
              className={({ isActive }) => navItemClass(isActive)}
            >
              <LayoutDashboard className="w-4 h-4 text-emerald-300" />
              <span>Dashboard</span>
            </NavLink>

            {/* Plan Header */}
            <div className="pt-2">
              <div className="flex items-center justify-between px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-300/70">
                <span className="flex items-center gap-1.5">
                  Plan
                </span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isPlanActive ? 'rotate-180' : ''}`} />
              </div>

              {/* Plan Sub-items */}
              <div className="pl-2 space-y-1 mt-1 border-l border-emerald-800/40 ml-3">
                <NavLink
                  to="/plan/calls"
                  onClick={onClose}
                  className={({ isActive }) => navItemClass(isActive)}
                >
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-300/80" />
                  <span>Calls to make</span>
                </NavLink>

                <NavLink
                  to="/plan/incoming"
                  onClick={onClose}
                  className={({ isActive }) =>
                    `${navItemClass(isActive)} justify-between`
                  }
                >
                  <div className="flex items-center gap-2">
                    <PhoneIncoming className="w-3.5 h-3.5 text-amber-300/90" />
                    <span>Incoming</span>
                  </div>
                  {incomingCalls.length > 0 && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 bg-rose-500 text-white rounded-full">
                      {incomingCalls.length}
                    </span>
                  )}
                </NavLink>

                <NavLink
                  to="/plan/recent"
                  onClick={onClose}
                  className={({ isActive }) => navItemClass(isActive)}
                >
                  <History className="w-3.5 h-3.5 text-emerald-300/80" />
                  <span>Recent</span>
                </NavLink>

                {/* Practise a call - Interactive simulation trigger */}
                <button
                  onClick={() => {
                    onClose();
                    startCall(
                      'AI Customer (Mukunda)',
                      '+91 98450 12894',
                      'Ortho GRID Mattress',
                      'in-app'
                    );
                  }}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-emerald-200/90 hover:text-white hover:bg-[#1c4838] rounded-lg transition-colors cursor-pointer text-left"
                  title="Launch real-time AI simulated coaching call"
                >
                  <Headphones className="w-3.5 h-3.5 text-[#e2b774]" />
                  <span>Practise a call</span>
                </button>
              </div>
            </div>

            {/* Calendar */}
            <div className="pt-2">
              <NavLink
                to="/calendar"
                onClick={onClose}
                className={({ isActive }) => navItemClass(isActive)}
              >
                <Calendar className="w-4 h-4 text-emerald-300" />
                <span>Calendar</span>
              </NavLink>
            </div>

            {/* Pulse (Purple highlight when active) */}
            <div>
              <NavLink
                to="/pulse"
                onClick={onClose}
                className={({ isActive }) =>
                  navItemClass(
                    isActive,
                    'bg-[#4c1d7a] text-purple-100 shadow-sm font-semibold border border-purple-500/40'
                  )
                }
              >
                <Zap className="w-4 h-4 text-purple-300" />
                <span className="flex-1">Pulse</span>
                <span className="text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 bg-purple-800/80 text-purple-200 rounded border border-purple-600/40">
                  AI
                </span>
              </NavLink>
            </div>
          </div>
        </div>

        {/* Sidebar Footer / Current Agent Status */}
        <div className="p-3 border-t border-emerald-950/80 bg-[#0e261e]/90">
          <div className="flex items-center justify-between text-[11px] text-emerald-300/80 mb-1">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Telecaller Queue
            </span>
            <span className="font-semibold text-emerald-200">Active</span>
          </div>
          <p className="text-[10px] text-emerald-400/60 leading-tight">
            SIP & Audio Link Connected · On-Ground Engine v2.4
          </p>
        </div>
      </aside>
    </>
  );
};
