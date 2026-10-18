import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { TopBar } from './components/layout/TopBar';
import { Sidebar } from './components/layout/Sidebar';
import { DemoToolbar } from './components/layout/DemoToolbar';
import { Dashboard } from './pages/Dashboard';
import { CallsToMake } from './pages/CallsToMake';
import { Incoming } from './pages/Incoming';
import { Recent } from './pages/Recent';
import { CalendarPage } from './pages/Calendar';
import { PulseHome } from './pages/PulseHome';
import { PulseChannel } from './pages/PulseChannel';
import { LeadsModal } from './components/leads/LeadsModal';
import { CallReviewModal } from './components/leads/CallReviewModal';
import { ActiveCallModal } from './components/call/ActiveCallModal';
import { DialPadModal } from './components/call/DialPadModal';

const AppContent: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7f8fa] flex flex-col font-sans text-slate-800">
      {/* Top Bar */}
      <TopBar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Routed Content Area */}
        <main className="flex-1 min-w-0 overflow-y-auto pb-24 md:pb-16">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/plan" element={<Navigate to="/plan/calls" replace />} />
            <Route path="/plan/calls" element={<CallsToMake />} />
            <Route path="/plan/incoming" element={<Incoming />} />
            <Route path="/plan/recent" element={<Recent />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/pulse" element={<PulseHome />} />
            <Route path="/pulse/:channelId" element={<PulseChannel />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      {/* Floating DEMO Strip (Interactive Calling Tool) */}
      <DemoToolbar />

      {/* Leads Modal (5-page dossier, buying signals, ICP score) */}
      <LeadsModal />

      {/* Call Review Modal (Audio track, QA evaluation) */}
      <CallReviewModal />

      {/* Active Call Simulator (Live timer, AI script, waveform, QA hangup) */}
      <ActiveCallModal />

      {/* Outbound Dialpad */}
      <DialPadModal />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </BrowserRouter>
  );
}
