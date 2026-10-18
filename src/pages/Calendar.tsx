import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  User,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { useApp } from '../context/AppContext';

export const CalendarPage: React.FC = () => {
  const { calendarEvents, startCall, openLeadsModal } = useApp();

  // Selected date state
  const [currentYear] = useState<number>(2026);
  const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(9); // 9 = October (0-indexed)
  const [selectedDay, setSelectedDay] = useState<number>(18); // Default to 18th (Today)

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = 31; // October has 31 days
  // Oct 1, 2026 is Thursday. In a Sunday-first week (Sun=0, Mon=1, Tue=2, Wed=3, Thu=4, Fri=5, Sat=6):
  const startDayOffset = 4; // Thursday

  const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Events on selected day
  const selectedDayEvents = calendarEvents.filter(
    (ev) => ev.dayNumber === selectedDay && currentMonthIndex === 9
  );

  const prevMonth = () => {
    setCurrentMonthIndex((prev) => (prev > 0 ? prev - 1 : 11));
  };

  const nextMonth = () => {
    setCurrentMonthIndex((prev) => (prev < 11 ? prev + 1 : 0));
  };

  const jumpToToday = () => {
    setCurrentMonthIndex(9);
    setSelectedDay(18);
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-4 animate-in fade-in duration-200">
      {/* Top Banner Text about syncing calendar */}
      <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950 via-[#14352a] to-slate-900 text-emerald-100 border border-emerald-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs shadow-xs">
        <div className="flex items-center gap-2.5">
          <RefreshCw className="w-4 h-4 text-emerald-400 shrink-0 animate-spin-slow" />
          <span>
            Syncing your call schedules with <strong>Google Calendar / CallCentre Calendar</strong> — All appointment times in <strong>IST</strong>.
          </span>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-center">
          <Badge variant="green" size="xs" dot>
            Google Workspace Connected
          </Badge>
        </div>
      </div>

      {/* Main Calendar Card & Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left 2 Cols: Month Grid */}
        <Card className="lg:col-span-2 p-5 flex flex-col justify-between">
          <div>
            {/* Calendar Controls */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <CalendarIcon className="w-5 h-5 text-emerald-700" />
                <h2 className="text-base sm:text-lg font-bold text-slate-900 font-serif-heading">
                  {monthNames[currentMonthIndex]} {currentYear}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={jumpToToday}
                  className="px-3 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/80 transition-colors cursor-pointer"
                >
                  Today
                </button>

                <div className="flex items-center rounded-lg border border-slate-200 bg-white">
                  <button
                    onClick={prevMonth}
                    className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-l-md transition-colors cursor-pointer"
                    aria-label="Previous month"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextMonth}
                    className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-r-md transition-colors cursor-pointer"
                    aria-label="Next month"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Day Headers (Sun-Sat) */}
            <div className="grid grid-cols-7 gap-1 text-center py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {dayHeaders.map((dh) => (
                <div key={dh}>{dh}</div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
              {/* Empty leading cells */}
              {Array.from({ length: startDayOffset }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="h-14 sm:h-16 rounded-xl bg-slate-50/40 border border-transparent"
                />
              ))}

              {/* Day cells 1 to 31 */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const dayNum = i + 1;
                const isToday = dayNum === 18 && currentMonthIndex === 9;
                const isSelected = dayNum === selectedDay;
                const dayEvents = calendarEvents.filter(
                  (ev) => ev.dayNumber === dayNum && currentMonthIndex === 9
                );
                const hasEvents = dayEvents.length > 0;

                return (
                  <div
                    key={dayNum}
                    onClick={() => setSelectedDay(dayNum)}
                    className={`h-14 sm:h-16 p-1.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-emerald-700 bg-emerald-50/60 ring-2 ring-emerald-600/30 shadow-xs'
                        : isToday
                        ? 'border-emerald-500 bg-emerald-50/30'
                        : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50/80 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center ${
                          isToday
                            ? 'bg-emerald-700 text-white font-bold'
                            : isSelected
                            ? 'text-emerald-900 font-bold'
                            : 'text-slate-700'
                        }`}
                      >
                        {dayNum}
                      </span>

                      {isToday && (
                        <span className="text-[9px] uppercase font-bold text-emerald-700 hidden sm:inline">
                          Today
                        </span>
                      )}
                    </div>

                    {/* Event Dots */}
                    {hasEvents && (
                      <div className="flex items-center gap-1 justify-end">
                        {dayEvents.map((ev, eIdx) => (
                          <span
                            key={eIdx}
                            className={`h-1.5 w-1.5 rounded-full ${
                              ev.type === 'callback'
                                ? 'bg-amber-500'
                                : ev.type === 'demo'
                                ? 'bg-purple-500'
                                : ev.type === 'meeting'
                                ? 'bg-blue-500'
                                : 'bg-emerald-500'
                            }`}
                            title={ev.title}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Calendar Legend */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-3">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-600" />
              Today (18 Oct)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              Callbacks
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-purple-500" />
              VIP In-Store Demos
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              Team Coaching
            </span>
          </div>
        </Card>

        {/* Right Col: Day Detail Schedule */}
        <Card className="p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Schedule For
                </span>
                <h3 className="text-sm font-bold text-slate-900">
                  {selectedDay} {monthNames[currentMonthIndex]} 2026
                  {selectedDay === 18 && currentMonthIndex === 9 && (
                    <span className="ml-2 text-xs text-emerald-600 font-semibold font-sans">
                      (Today)
                    </span>
                  )}
                </h3>
              </div>
              <Badge variant="green" size="xs">
                {selectedDayEvents.length} events
              </Badge>
            </div>

            {/* Events List */}
            <div className="mt-4 space-y-3">
              {selectedDayEvents.length === 0 ? (
                <div className="py-12 text-center text-slate-400 space-y-1">
                  <CalendarIcon className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="text-xs font-medium text-slate-600">
                    No scheduled calls on this day.
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Click another day with an event dot or select Today (18th).
                  </p>
                </div>
              ) : (
                selectedDayEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/60 hover:bg-slate-50 transition-colors space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">
                        {ev.title}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase px-1.5 py-0.2 rounded ${
                          ev.status === 'completed'
                            ? 'bg-slate-200 text-slate-700'
                            : 'bg-amber-100 text-amber-900'
                        }`}
                      >
                        {ev.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1 font-mono">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {ev.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        {ev.leadName}
                      </span>
                    </div>

                    {ev.status === 'pending' && (
                      <div className="pt-2 flex items-center gap-2 border-t border-slate-200/60">
                        <button
                          onClick={() => {
                            if (ev.leadName === 'Mukunda') {
                              openLeadsModal(0);
                            } else {
                              startCall(ev.leadName, '+91 98450 12894', 'Ortho GRID', 'in-app');
                            }
                          }}
                          className="w-full py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer text-center"
                        >
                          Execute Call Now
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-4 text-[11px] text-slate-500 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              SOP SLA: 5m grace window
            </span>
            <button
              onClick={jumpToToday}
              className="text-emerald-700 hover:underline font-semibold cursor-pointer"
            >
              Reset to Today
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};
