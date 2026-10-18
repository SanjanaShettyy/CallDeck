export type LeadStatus = 'OPEN' | 'FOLLOW_UP' | 'CLOSED' | 'MISSED';

export interface BuyingSignal {
  category: 'Financing Related' | 'Quotation Demanded' | 'Warranty Related' | 'Delivery Speed';
  quote: string;
  strength?: 'High' | 'Medium' | 'Critical';
}

export interface IcpBreakdown {
  budgetMatch: string;
  mattressSize: string;
  backPainConcern: string;
  timeline: string;
}

export interface Lead {
  id: string;
  rank: number;
  name: string;
  phone: string;
  email?: string;
  product: string;
  interest: string;
  price: number;
  score: number;
  icpScore: number;
  leadIntentScore: number;
  timeLeft: string;
  status: LeadStatus;
  location: string;
  storeVisited?: string;
  icpBreakdown: IcpBreakdown;
  howWeGotHere: string;
  buyingSignals: BuyingSignal[];
  cumulativeMissed: string;
  notes: string[];
}

export type CallType = 'in-app' | 'phone';
export type CallDirection = 'incoming' | 'outgoing' | 'missed';

export interface Call {
  id: string;
  leadName: string;
  phone: string;
  type: CallType;
  direction: CallDirection;
  time: string;
  duration: string;
  expectedValue: number;
  product: string;
  outcome: string;
  qaScore?: number;
  transcriptSnippet?: string;
  coachingTip?: string;
  timestamp: string;
}

export interface WaitingCaller {
  id: string;
  name: string;
  phone: string;
  waitTime: string;
  interest: string;
  priority: 'high' | 'normal';
}

export interface TaskItem {
  id: string;
  title: string;
  subtitle: string;
  count: number;
  badgeType: 'callback' | 'hot-lead' | 'outcome';
  leads: string[];
  actionLabel: string;
}

export interface Channel {
  id: string;
  name: string;
  slug: string;
  category: 'role' | 'task' | 'general';
  description: string;
  badge?: string;
  unreadCount?: number;
  avatarColor?: string;
}

export interface ChatMessage {
  id: string;
  channelId: string;
  senderName: string;
  senderAvatar: string;
  isMe: boolean;
  content: string;
  timestamp: string;
  isBot?: boolean;
  actionNote?: string;
}

export interface CalendarEvent {
  id: string;
  date: string; // YYYY-MM-DD
  dayNumber: number;
  title: string;
  time: string;
  leadName: string;
  type: 'callback' | 'review' | 'demo' | 'coaching' | 'meeting' | 'hot-followup';
  status: 'pending' | 'completed';
}

export interface ActiveCallState {
  isActive: boolean;
  leadName: string;
  phone: string;
  product: string;
  callType: CallType;
  durationSeconds: number;
  isMuted: boolean;
  isSpeakerOn: boolean;
  status: 'connecting' | 'connected' | 'completed';
  currentScriptStep: number;
}
