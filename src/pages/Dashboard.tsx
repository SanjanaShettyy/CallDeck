import React from 'react';
import {
  PhoneCall,
  Clock,
  Sparkles,
  TrendingUp,
  UserCheck,
  Award,
  ChevronRight,
  Phone,
  BarChart3
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { KpiCard } from '../components/common/KpiCard';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { useApp } from '../context/AppContext';
import {
  MOCK_CALLS_HANDLED_CHART,
  MOCK_CONVERSION_CHART,
  MOCK_WAITING_CALLERS
} from '../data/mock';

export const Dashboard: React.FC = () => {
  const {
    openLeadsModal,
    tasks,
    startCall,
    todayGreeted,
    todayCalled,
    monthEarnings,
    inQueueCount
  } = useApp();

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-5 animate-in fade-in duration-200">
      {/* Top Greeting & Agency Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-serif-heading">
              Good afternoon, Arvind Rajan
            </h1>
            <span className="hidden sm:inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            The Sleep Company · Call Centre · Indiranagar Hub
          </p>
        </div>

        {/* Live Shift Pill */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <Badge variant="green" size="sm" dot>
            Shift Active · Inbound Queue Open
          </Badge>
          <button
            onClick={() => openLeadsModal(0)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#14352a] hover:bg-[#1a4436] text-white text-xs font-medium shadow-sm transition-colors cursor-pointer"
          >
            <UserCheck className="w-3.5 h-3.5 text-emerald-300" />
            <span>Launch Leads (5)</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <KpiCard
          title="QA score"
          value="76"
          subtitle="Target: 80 · +3 pts vs yesterday"
          badge={{ text: 'Target 80', variant: 'amber' }}
          trend="+3 pts"
          trendPositive={true}
          icon={<Award className="w-4 h-4" />}
        />

        <KpiCard
          title="Avg handle time"
          value="4m 12s"
          subtitle="SOP Benchmark: 4m 00s"
          badge={{ text: 'Benchmark 4m', variant: 'blue' }}
          trend="-18s"
          trendPositive={true}
          icon={<Clock className="w-4 h-4" />}
        />

        <KpiCard
          title="Cvr trend"
          value="34%"
          subtitle="Walk-out recovery conversion"
          badge={{ text: '+4.2pp lift', variant: 'green' }}
          trend="+4.2%"
          trendPositive={true}
          icon={<TrendingUp className="w-4 h-4" />}
        />

        <KpiCard
          title="In queue"
          value={inQueueCount}
          subtitle="Average wait time: 1m 20s"
          badge={{ text: `${inQueueCount} waiting`, variant: inQueueCount > 0 ? 'red' : 'gray' }}
          icon={<PhoneCall className="w-4 h-4" />}
        />
      </div>

      {/* Middle Row: "My progress today" & "My earnings this month" */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* My Progress Today Card */}
        <div className="rounded-xl p-5 bg-gradient-to-br from-[#14352a] via-[#1b4335] to-[#122e24] text-white shadow-sm border border-emerald-950 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                My progress today
              </span>
              <span className="text-xs text-emerald-200/80 font-mono">
                Goal: 8 leads
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 my-2">
              <div className="bg-white/10 rounded-lg p-3 border border-white/10">
                <span className="text-[11px] text-emerald-200 block uppercase font-medium">
                  Leads Greeted
                </span>
                <span className="text-2xl font-bold tracking-tight text-white mt-1 block">
                  {todayGreeted}
                </span>
              </div>

              <div className="bg-white/10 rounded-lg p-3 border border-white/10">
                <span className="text-[11px] text-emerald-200 block uppercase font-medium">
                  Leads Called
                </span>
                <span className="text-2xl font-bold tracking-tight text-white mt-1 block">
                  {todayCalled}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/15">
            <div className="flex justify-between text-xs text-emerald-200 mb-1.5">
              <span>Shift Target Progress</span>
              <span className="font-semibold">{Math.round(((todayGreeted + todayCalled) / 10) * 100)}%</span>
            </div>
            <div className="w-full bg-black/30 rounded-full h-2 overflow-hidden">
              <div
                className="bg-emerald-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.round(((todayGreeted + todayCalled) / 10) * 100))}%` }}
              />
            </div>
          </div>
        </div>

        {/* My Earnings This Month Card */}
        <Card className="p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                My earnings this month
              </span>
              <Badge variant="amber" size="xs">
                Incentive Tier 2
              </Badge>
            </div>

            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-bold tracking-tight text-slate-900 font-sans">
                ₹{monthEarnings.toLocaleString()}
              </span>
              <span className="text-xs font-semibold text-emerald-600">
                +₹850 vs last month
              </span>
            </div>

            {/* Subtext breakdown */}
            <p className="text-xs text-slate-600 mt-2 font-medium">
              Base ₹4,000 + Incentive ₹1,200 · ₹2,800 to Next Slab (₹8,000 target)
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100">
            <div className="flex justify-between text-xs text-slate-500 mb-1.5 font-medium">
              <span>Tier 2 Progress (₹5,200 / ₹8,000)</span>
              <span className="text-slate-800 font-bold">65%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#b87a2a] h-2 rounded-full transition-all duration-500"
                style={{ width: '65%' }}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Row: "Who's waiting" & "My Tasks" */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Who's Waiting List */}
        <Card className="p-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                Who's waiting
              </span>
              <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
            </div>
            <span className="text-xs font-semibold text-slate-500">
              {MOCK_WAITING_CALLERS.length} callers in queue
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {MOCK_WAITING_CALLERS.map((caller) => (
              <div
                key={caller.id}
                className="py-3 flex items-center justify-between gap-3 group"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-slate-900">
                      {caller.name}
                    </span>
                    <Badge variant="red" size="xs">
                      {caller.waitTime} wait
                    </Badge>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Interest: {caller.interest}
                  </p>
                </div>

                <button
                  onClick={() =>
                    startCall(caller.name, caller.phone, caller.interest, 'in-app')
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium shadow-2xs transition-colors cursor-pointer"
                  title={`Connect call with ${caller.name}`}
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call</span>
                </button>
              </div>
            ))}
          </div>
        </Card>

        {/* My Tasks Card */}
        <Card className="p-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
              My Tasks
            </span>
            <span className="text-xs text-slate-400">
              Click task to open Leads Modal
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => openLeadsModal(0)}
                className="py-3 flex items-center justify-between gap-3 group cursor-pointer hover:bg-slate-50/70 -mx-2 px-2 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-8 w-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                      task.badgeType === 'callback'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300/60'
                        : task.badgeType === 'hot-lead'
                        ? 'bg-purple-100 text-purple-900 border border-purple-300/60'
                        : 'bg-emerald-100 text-emerald-900 border border-emerald-300/60'
                    }`}
                  >
                    {task.count}
                  </div>
                  <div>
                    <span className="font-semibold text-xs text-slate-900 group-hover:text-emerald-800 transition-colors">
                      {task.title}
                    </span>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {task.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-slate-400 group-hover:text-emerald-700 transition-colors">
                  <span className="hidden sm:inline font-medium text-[11px]">
                    {task.actionLabel}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom Row: Two 7-day charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Chart 1: Calls Handled Bar Chart */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Calls handled (Last 7 Days)
              </span>
              <p className="text-xs font-semibold text-slate-800 mt-0.5">
                Total 208 calls · Today emphasised
              </p>
            </div>
            <BarChart3 className="w-4 h-4 text-slate-400" />
          </div>

          <div className="h-52 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_CALLS_HANDLED_CHART} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis
                  dataKey="day"
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(20, 53, 42, 0.05)' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-900 text-white p-2 rounded-lg text-xs shadow-md border border-slate-700">
                          <p className="font-semibold">{payload[0].payload.day}</p>
                          <p className="text-emerald-300 font-mono">
                            {payload[0].value} calls
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="calls" radius={[4, 4, 0, 0]}>
                  {MOCK_CALLS_HANDLED_CHART.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.active ? '#14352a' : '#88b5a3'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Chart 2: Conversion Trend Bar Chart */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Conversion trend (Last 7 Days)
              </span>
              <p className="text-xs font-semibold text-slate-800 mt-0.5">
                Average 33.4% · Today emphasised
              </p>
            </div>
            <TrendingUp className="w-4 h-4 text-slate-400" />
          </div>

          <div className="h-52 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_CONVERSION_CHART} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis
                  dataKey="day"
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  unit="%"
                />
                <Tooltip
                  cursor={{ fill: 'rgba(184, 122, 42, 0.05)' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-900 text-white p-2 rounded-lg text-xs shadow-md border border-slate-700">
                          <p className="font-semibold">{payload[0].payload.day}</p>
                          <p className="text-amber-300 font-mono">
                            Conversion: {payload[0].value}%
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="rate" radius={[4, 4, 0, 0]}>
                  {MOCK_CONVERSION_CHART.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.active ? '#b87a2a' : '#e4caa3'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};
