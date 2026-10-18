import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Sparkles,
  Bot,
  Zap,
  Users,
  ChevronRight,
  HelpCircle,
  FileText
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { MOCK_CHANNELS } from '../data/mock';

export const PulseHome: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showBriefModal, setShowBriefModal] = useState(false);

  const filteredChannels = MOCK_CHANNELS.filter(
    (ch) =>
      ch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const roleAgents = filteredChannels.filter((c) => c.category === 'role');
  const taskAgents = filteredChannels.filter((c) => c.category === 'task');
  const generalChannels = filteredChannels.filter((c) => c.category === 'general');

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-5 animate-in fade-in duration-200">
      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search AI agents, team discussions, trial SOPs, objection scripts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white shadow-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600/30 focus:border-purple-600 transition-all"
        />
      </div>

      {/* AvaniBot Banner Card (Deep Purple) */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#34125d] via-[#4d1d86] to-[#6023a7] text-white shadow-md border border-purple-900/60 flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden">
        {/* Glow backdrop decorative */}
        <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="space-y-1.5 relative z-10 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-purple-400/20 text-purple-200 border border-purple-400/30">
              <Bot className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-200">
              AvaniBot · Autonomous Sales Manager
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-serif-heading">
            Good afternoon Arvind. 3 high-intent walk-outs are primed for close.
          </h2>

          <p className="text-xs text-purple-100/80 leading-relaxed font-sans">
            Store traffic at Indiranagar was +40% yesterday. Customers who tried the patented SmartGRID showed 71% propensity to purchase when 0% EMI was highlighted.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0 relative z-10">
          <button
            onClick={() => setShowBriefModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-purple-950 font-bold text-xs shadow-sm hover:bg-purple-50 transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-purple-700" />
            <span>Daily Brief</span>
          </button>

          <button
            onClick={() => navigate('/pulse/callcentre-team')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-900/80 hover:bg-purple-800 text-purple-100 font-semibold text-xs border border-purple-500/40 transition-colors cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-purple-300" />
            <span>Ask a question</span>
          </button>
        </div>
      </div>

      {/* Kudos Card (Amber Accent) */}
      <div className="p-4 rounded-xl bg-[#fffaf0] border border-[#f3d9a5] shadow-xs flex items-center justify-between gap-3 text-amber-950">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-[#fde9c3] border border-[#ecc47c] flex items-center justify-center font-bold text-base shrink-0">
            🏆
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#9c6114] bg-[#fae8be] px-1.5 py-0.2 rounded">
                Daily Telecaller Recognition
              </span>
              <span className="text-[11px] text-amber-800/80">14m ago</span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-[#663d08] mt-0.5">
              Kudos to Arvind Rajan for closing ₹45k Ortho Luxe today! 🏆 Outstanding objection handling on HDFC zero-cost EMI.
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('/pulse/callcentre-team')}
          className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-[#b87a2a] hover:underline shrink-0 cursor-pointer"
        >
          <span>React in Team Chat</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Agents & Channels Grid */}
      <div className="space-y-4">
        {/* Role Agents */}
        <div>
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-purple-600" />
              Role Agents
            </span>
            <span className="text-[11px] text-slate-400">
              Interactive copilots assigned to your shift
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {roleAgents.map((agent) => (
              <Card
                key={agent.id}
                onClick={() => navigate(`/pulse/${agent.slug}`)}
                hoverable
                className="p-4 flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-10 w-10 rounded-xl ${agent.avatarColor} text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs`}
                  >
                    #{agent.name[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-purple-700 transition-colors">
                        #{agent.name}
                      </span>
                      {agent.badge && (
                        <Badge variant="purple" size="xs">
                          {agent.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                      {agent.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {agent.unreadCount && (
                    <span className="h-5 w-5 rounded-full bg-purple-600 text-white font-bold text-[10px] flex items-center justify-center">
                      {agent.unreadCount}
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-purple-600 transition-colors" />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Task Agents */}
        <div>
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5 text-emerald-700" />
              Task Agents
            </span>
            <span className="text-[11px] text-slate-400">
              Specialized micro-agents providing real-time intelligence
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {taskAgents.map((agent) => (
              <Card
                key={agent.id}
                onClick={() => navigate(`/pulse/${agent.slug}`)}
                hoverable
                className="p-4 flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-10 w-10 rounded-xl ${agent.avatarColor} text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs`}
                  >
                    #{agent.name[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-purple-700 transition-colors">
                        #{agent.name}
                      </span>
                      {agent.badge && (
                        <Badge variant="amber" size="xs">
                          {agent.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                      {agent.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {agent.unreadCount && (
                    <span className="h-5 w-5 rounded-full bg-amber-500 text-white font-bold text-[10px] flex items-center justify-center">
                      {agent.unreadCount}
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-purple-600 transition-colors" />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* General Channels */}
        <div>
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-blue-600" />
              General Discussion Channels
            </span>
            <span className="text-[11px] text-slate-400">
              Team communication & escalation streams
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {generalChannels.map((agent) => (
              <Card
                key={agent.id}
                onClick={() => navigate(`/pulse/${agent.slug}`)}
                hoverable
                className="p-4 flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-10 w-10 rounded-xl ${agent.avatarColor} text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs`}
                  >
                    #{agent.name[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-purple-700 transition-colors">
                        #{agent.name}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                      {agent.description}
                    </p>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-purple-600 transition-colors" />
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Daily Brief Modal */}
      {showBriefModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
        >
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-bold text-sm text-purple-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                AvaniBot Daily Briefing · 18 Oct 2026
              </span>
              <button
                onClick={() => setShowBriefModal(false)}
                className="text-slate-400 hover:text-slate-700 text-xs font-semibold"
              >
                Close
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
              <div className="p-3 rounded-lg bg-purple-50 border border-purple-200/60">
                <strong className="text-purple-950 block text-[11px] uppercase mb-1">
                  1. Focus Product of the Day: Ortho GRID
                </strong>
                Customer objection trends show 68% of walk-outs were worried about memory foam heat trapping. Emphasize that SmartGRID has 2,500 air channels and stays cool all night.
              </div>

              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200/60">
                <strong className="text-emerald-950 block text-[11px] uppercase mb-1">
                  2. Festival Incentive Boost
                </strong>
                Every sale closed today adds an extra ₹250 instant cash incentive to your monthly slab.
              </div>

              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200/60">
                <strong className="text-amber-950 block text-[11px] uppercase mb-1">
                  3. Priority Target
                </strong>
                Mukunda (Ortho GRID, ₹9,490) is waiting for the 4:30 PM callback slot. Be ready with HDFC zero-cost EMI breakdown.
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowBriefModal(false)}
                className="px-4 py-2 bg-purple-900 hover:bg-purple-800 text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                Got it, Start Calling
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
