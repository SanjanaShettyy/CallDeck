import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  Lead,
  Call,
  TaskItem,
  ChatMessage,
  ActiveCallState,
  CalendarEvent
} from '../types';
import {
  MOCK_LEADS,
  MOCK_INCOMING_CALLS,
  MOCK_RECENT_CALLS,
  MOCK_TASKS,
  MOCK_TEAM_MESSAGES,
  MOCK_CALENDAR_EVENTS
} from '../data/mock';

interface AppContextType {
  // Leads & Modal
  leads: Lead[];
  selectedLeadIndex: number;
  isLeadsModalOpen: boolean;
  openLeadsModal: (index?: number) => void;
  closeLeadsModal: () => void;
  setLeadIndex: (index: number) => void;
  nextLead: () => void;
  prevLead: () => void;

  // Incoming Calls & Callbacks
  incomingCalls: Call[];
  dismissIncomingCall: (callId: string) => void;

  // Recent Calls & Reviews
  recentCalls: Call[];
  selectedCallForReview: Call | null;
  openCallReview: (call: Call) => void;
  closeCallReview: () => void;

  // Tasks
  tasks: TaskItem[];
  completeTask: (taskId: string) => void;

  // Pulse Channel & Pinned Task
  messages: ChatMessage[];
  pinnedTaskState: 'pending' | 'confirmed' | 'rescheduled';
  confirmPinnedTask: () => void;
  reschedulePinnedTask: () => void;
  replyToPinnedTask: (reply: string) => void;
  sendMessage: (channelId: string, text: string) => void;

  // Active Call Simulation
  activeCall: ActiveCallState;
  startCall: (name: string, phone: string, product: string, type?: 'in-app' | 'phone') => void;
  endCall: () => void;
  toggleMute: () => void;
  toggleSpeaker: () => void;
  advanceScript: () => void;

  // Dial Pad Modal
  isDialPadOpen: boolean;
  openDialPad: () => void;
  closeDialPad: () => void;

  // Calendar
  calendarEvents: CalendarEvent[];

  // Progress metrics
  todayGreeted: number;
  todayCalled: number;
  monthEarnings: number;
  inQueueCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Leads State
  const [leads] = useState<Lead[]>(MOCK_LEADS);
  const [selectedLeadIndex, setSelectedLeadIndex] = useState<number>(0);
  const [isLeadsModalOpen, setIsLeadsModalOpen] = useState<boolean>(false);

  // Incoming & Recent
  const [incomingCalls, setIncomingCalls] = useState<Call[]>(MOCK_INCOMING_CALLS);
  const [recentCalls, setRecentCalls] = useState<Call[]>(MOCK_RECENT_CALLS);
  const [selectedCallForReview, setSelectedCallForReview] = useState<Call | null>(null);

  // Tasks
  const [tasks, setTasks] = useState<TaskItem[]>(MOCK_TASKS);

  // Pulse & Pinned Card
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_TEAM_MESSAGES);
  const [pinnedTaskState, setPinnedTaskState] = useState<'pending' | 'confirmed' | 'rescheduled'>('pending');

  // Dial Pad
  const [isDialPadOpen, setIsDialPadOpen] = useState<boolean>(false);

  // Calendar
  const [calendarEvents] = useState<CalendarEvent[]>(MOCK_CALENDAR_EVENTS);

  // Progress Counters
  const [todayGreeted] = useState<number>(3);
  const [todayCalled, setTodayCalled] = useState<number>(2);
  const [monthEarnings, setMonthEarnings] = useState<number>(5200);
  const [inQueueCount, setInQueueCount] = useState<number>(2);

  // Active Call State
  const [activeCall, setActiveCall] = useState<ActiveCallState>({
    isActive: false,
    leadName: '',
    phone: '',
    product: '',
    callType: 'in-app',
    durationSeconds: 0,
    isMuted: false,
    isSpeakerOn: true,
    status: 'connecting',
    currentScriptStep: 0,
  });

  // Call duration counter
  useEffect(() => {
    let timer: any = null;
    if (activeCall.isActive && activeCall.status === 'connected') {
      timer = setInterval(() => {
        setActiveCall((prev) => ({
          ...prev,
          durationSeconds: prev.durationSeconds + 1,
        }));
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [activeCall.isActive, activeCall.status]);

  // Lead modal handlers
  const openLeadsModal = (index: number = 0) => {
    setSelectedLeadIndex(index);
    setIsLeadsModalOpen(true);
  };

  const closeLeadsModal = () => {
    setIsLeadsModalOpen(false);
  };

  const nextLead = () => {
    setSelectedLeadIndex((prev) => (prev < leads.length - 1 ? prev + 1 : 0));
  };

  const prevLead = () => {
    setSelectedLeadIndex((prev) => (prev > 0 ? prev - 1 : leads.length - 1));
  };

  // Incoming calls
  const dismissIncomingCall = (callId: string) => {
    setIncomingCalls((prev) => prev.filter((c) => c.id !== callId));
  };

  // Call Review
  const openCallReview = (call: Call) => {
    setSelectedCallForReview(call);
  };

  const closeCallReview = () => {
    setSelectedCallForReview(null);
  };

  // Tasks
  const completeTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  // Pinned card handlers
  const confirmPinnedTask = () => {
    setPinnedTaskState('confirmed');
    // Post confirmation into chat
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      channelId: 'ch-team',
      senderName: 'Arvind Rajan',
      senderAvatar: 'AR',
      isMe: true,
      content: '✅ Confirmed the 4:30 PM callback slot for Mukunda. Updated CRM and calendar.',
      timestamp: 'Just now'
    };
    setMessages((prev) => [...prev, newMsg]);

    // Simulated reply from manager
    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        channelId: 'ch-team',
        senderName: 'Mukunda Dwarkanath (Co-founder)',
        senderAvatar: 'MD',
        isMe: false,
        content: 'Thanks Arvind. Close this one — customer has high buying intent for the King Ortho.',
        timestamp: 'Just now'
      };
      setMessages((prev) => [...prev, replyMsg]);
    }, 1200);
  };

  const reschedulePinnedTask = () => {
    setPinnedTaskState('rescheduled');
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      channelId: 'ch-team',
      senderName: 'Arvind Rajan',
      senderAvatar: 'AR',
      isMe: true,
      content: '⏳ Rescheduled Mukunda callback to 5:30 PM as requested by customer.',
      timestamp: 'Just now'
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  const replyToPinnedTask = (reply: string) => {
    if (!reply.trim()) return;
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      channelId: 'ch-team',
      senderName: 'Arvind Rajan',
      senderAvatar: 'AR',
      isMe: true,
      content: `[Re: 4:30pm callback] ${reply}`,
      timestamp: 'Just now'
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  // Chat message sending with simulated AI response
  const sendMessage = (channelId: string, text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      channelId,
      senderName: 'Arvind Rajan',
      senderAvatar: 'AR',
      isMe: true,
      content: text,
      timestamp: 'Just now'
    };
    setMessages((prev) => [...prev, userMsg]);

    // Simulated AI response based on channel
    setTimeout(() => {
      let botContent = "Noted Arvind. Your response has been indexed by the On-Ground voice engine.";
      let botSender = "AvaniBot (AI Coach)";
      let botAvatar = "AB";

      if (channelId === 'ch-cross-sell') {
        botContent = "Cross-sell recommendation: For Ortho buyers, pitch the Waterproof Bamboo Mattress Protector. 42% attach rate when presented before order confirmation.";
        botSender = "Cross-Sell Agent";
        botAvatar = "XS";
      } else if (channelId === 'ch-sop') {
        botContent = "SOP Rule: The 100-night trial covers all mattresses except customized odd-size dimensions. Full refund issued within 5 business days upon pickup.";
        botSender = "SOP Agent";
        botAvatar = "SOP";
      } else if (channelId === 'ch-team') {
        botContent = "Great update Arvind! Adding this note to the shopper journey timeline.";
        botSender = "Rashmi Sehgal (CEO)";
        botAvatar = "RS";
      }

      const botMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        channelId,
        senderName: botSender,
        senderAvatar: botAvatar,
        isMe: false,
        isBot: true,
        content: botContent,
        timestamp: 'Just now'
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1100);
  };

  // Call simulation
  const startCall = (
    name: string,
    phone: string,
    product: string,
    type: 'in-app' | 'phone' = 'in-app'
  ) => {
    setActiveCall({
      isActive: true,
      leadName: name,
      phone,
      product,
      callType: type,
      durationSeconds: 0,
      isMuted: false,
      isSpeakerOn: true,
      status: 'connecting',
      currentScriptStep: 0,
    });

    // Auto connect after 1.2s
    setTimeout(() => {
      setActiveCall((prev) => ({
        ...prev,
        status: 'connected',
      }));
    }, 1200);
  };

  const advanceScript = () => {
    setActiveCall((prev) => ({
      ...prev,
      currentScriptStep: prev.currentScriptStep + 1,
    }));
  };

  const endCall = () => {
    // Record into recent calls
    if (activeCall.leadName) {
      const minutes = Math.floor(activeCall.durationSeconds / 60);
      const seconds = activeCall.durationSeconds % 60;
      const formattedDuration = `${minutes}m ${seconds < 10 ? '0' : ''}${seconds}s`;

      const newCompletedCall: Call = {
        id: `call-completed-${Date.now()}`,
        leadName: activeCall.leadName,
        phone: activeCall.phone,
        type: activeCall.callType,
        direction: 'outgoing',
        time: 'Just now',
        duration: formattedDuration || '0m 45s',
        expectedValue: 9490,
        product: activeCall.product || 'Ortho GRID',
        outcome: 'Call Completed · Follow-up Logged',
        qaScore: 88,
        transcriptSnippet: 'AI-assisted simulated practice call. Completed objection handling on warranty, pricing and express Bangalore delivery.',
        coachingTip: 'Pacing was steady. Excellent closing technique!',
        timestamp: new Date().toISOString()
      };

      setRecentCalls((prev) => [newCompletedCall, ...prev]);
      setTodayCalled((prev) => prev + 1);
      setMonthEarnings((prev) => prev + 250); // add incentive
      if (inQueueCount > 0) setInQueueCount((prev) => Math.max(0, prev - 1));
    }

    setActiveCall((prev) => ({
      ...prev,
      isActive: false,
      status: 'completed',
    }));
  };

  const toggleMute = () => {
    setActiveCall((prev) => ({ ...prev, isMuted: !prev.isMuted }));
  };

  const toggleSpeaker = () => {
    setActiveCall((prev) => ({ ...prev, isSpeakerOn: !prev.isSpeakerOn }));
  };

  const openDialPad = () => setIsDialPadOpen(true);
  const closeDialPad = () => setIsDialPadOpen(false);

  return (
    <AppContext.Provider
      value={{
        leads,
        selectedLeadIndex,
        isLeadsModalOpen,
        openLeadsModal,
        closeLeadsModal,
        setLeadIndex: setSelectedLeadIndex,
        nextLead,
        prevLead,
        incomingCalls,
        dismissIncomingCall,
        recentCalls,
        selectedCallForReview,
        openCallReview,
        closeCallReview,
        tasks,
        completeTask,
        messages,
        pinnedTaskState,
        confirmPinnedTask,
        reschedulePinnedTask,
        replyToPinnedTask,
        sendMessage,
        activeCall,
        startCall,
        endCall,
        toggleMute,
        toggleSpeaker,
        advanceScript,
        isDialPadOpen,
        openDialPad,
        closeDialPad,
        calendarEvents,
        todayGreeted,
        todayCalled,
        monthEarnings,
        inQueueCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
