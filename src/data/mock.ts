import type { Lead, Call, WaitingCaller, TaskItem, Channel, ChatMessage, CalendarEvent } from '../types';

export const MOCK_LEADS: Lead[] = [
  {
    id: 'lead-1',
    rank: 1,
    name: 'Mukunda',
    phone: '+91 98450 12894',
    email: 'mukunda.d@outlook.com',
    product: 'Ortho GRID Mattress',
    interest: 'Ortho GRID, ₹9,490',
    price: 9490,
    score: 87,
    icpScore: 87,
    leadIntentScore: 81,
    timeLeft: '2h 15m left to close',
    status: 'OPEN',
    location: 'Indiranagar Store, Bengaluru',
    storeVisited: 'Indiranagar Flagship Experience Store',
    icpBreakdown: {
      budgetMatch: '₹9,000 - ₹12,000 bracket verified. Zero friction on base price.',
      mattressSize: 'King 78x72 inch requirement for primary master bedroom.',
      backPainConcern: 'High fit. Chronic lower back lumbar stiffness reported after long desk hours.',
      timeline: 'Immediate buyer. Current mattress sagging causing morning fatigue.'
    },
    howWeGotHere: 'Walked into Indiranagar store on Saturday afternoon with spouse. Tested SmartGRID Luxe and Ortho GRID for 18 minutes. Left without billing because customer wanted to check zero-cost EMI tenures on HDFC card and awaited salary credit.',
    buyingSignals: [
      {
        category: 'Financing Related',
        quote: 'Asked specifically about EMI options on the Ortho GRID — budget is a key concern, but is a Decider.',
        strength: 'Critical'
      },
      {
        category: 'Quotation Demanded',
        quote: 'Compared pricing with a competitor mattress website; expects a competitive quotient and free contour pillows.',
        strength: 'High'
      },
      {
        category: 'Warranty Related',
        quote: 'Inquired about the 10-year warranty summary — previous memory foam mattress sagged within 2 years.',
        strength: 'Medium'
      }
    ],
    cumulativeMissed: '2 follow-ups missed across retail store & telecaller',
    notes: [
      'Customer preferred firm feel over ultra-soft.',
      'Offered 2 complimentary SmartGRID pillows if booked within 24 hours.'
    ]
  },
  {
    id: 'lead-2',
    rank: 2,
    name: 'Ritu S.',
    phone: '+91 97112 45890',
    email: 'ritu.sharma@gmail.com',
    product: 'SmartGRID Luxe Mattress',
    interest: 'SmartGRID Luxe, ₹34,999',
    price: 34999,
    score: 84,
    icpScore: 84,
    leadIntentScore: 79,
    timeLeft: '3h 40m left',
    status: 'OPEN',
    location: 'Koramangala Store, Bengaluru',
    storeVisited: 'Koramangala 4th Block Experience Centre',
    icpBreakdown: {
      budgetMatch: '₹30,000 - ₹40,000 premium luxury buyer profile.',
      mattressSize: 'Queen 78x60 inch with custom height requirement.',
      backPainConcern: 'Moderate. Looking for plush cloud-like comfort and zero motion isolation.',
      timeline: 'Moving into a new apartment next weekend.'
    },
    howWeGotHere: 'Attended weekend store demo. Spent 25 minutes trying Luxe Plush with cooling SnowTec fabric. Loved motion isolation when partner moved.',
    buyingSignals: [
      {
        category: 'Quotation Demanded',
        quote: 'Wants official WhatsApp quote with festive corporate discount code applied before placing order.',
        strength: 'High'
      },
      {
        category: 'Delivery Speed',
        quote: 'Confirmed delivery must happen before Friday for housewarming puja ceremony.',
        strength: 'Critical'
      }
    ],
    cumulativeMissed: '1 follow-up delayed past 4-hour SLA',
    notes: ['Prefers call during evening after 5:30 PM. Husband also needs to approve colorway.']
  },
  {
    id: 'lead-3',
    rank: 3,
    name: 'Faizan A.',
    phone: '+91 99201 88321',
    email: 'faizan.ahmed@techcorp.in',
    product: 'Elev8 Smart Recliner Bed',
    interest: 'Elev8 Smart Bed, ₹46,500',
    price: 46500,
    score: 81,
    icpScore: 82,
    leadIntentScore: 85,
    timeLeft: '4h 10m left',
    status: 'OPEN',
    location: 'HSR Layout Store, Bengaluru',
    storeVisited: 'HSR Layout Retail Store',
    icpBreakdown: {
      budgetMatch: 'High net-worth executive looking for motorized zero-gravity reading bed.',
      mattressSize: 'King size dual motorized frame configuration.',
      backPainConcern: 'Acid reflux and snoring issues; zero-gravity mode directly recommended by physician.',
      timeline: 'Ready to transact if installation team can assemble this week.'
    },
    howWeGotHere: 'Saw Instagram video on zero-gravity sleep positions. Visited showroom on Sunday. Tested remote presets and anti-snore tilt angles.',
    buyingSignals: [
      {
        category: 'Financing Related',
        quote: 'Checked 12-month zero-cost Bajaj Finserv card swipe availability and down payment requirements.',
        strength: 'High'
      },
      {
        category: 'Warranty Related',
        quote: 'Asked about motor replacement warranty and local technician visit turnaround time.',
        strength: 'Medium'
      }
    ],
    cumulativeMissed: 'Missed scheduled callback from morning slot at 11:30 AM',
    notes: ['Send brochure on motor specs and electrical surge protection safety certification.']
  },
  {
    id: 'lead-4',
    rank: 4,
    name: 'Kavitha R.',
    phone: '+91 98840 92314',
    email: 'kavitha.ramesh@chennai.net',
    product: 'Ortho Pro King Mattress',
    interest: 'Ortho Pro King, ₹18,499',
    price: 18499,
    score: 78,
    icpScore: 76,
    leadIntentScore: 74,
    timeLeft: '5h 30m left',
    status: 'FOLLOW_UP',
    location: 'Whitefield Store, Bengaluru',
    storeVisited: 'Phoenix Marketcity Mall Experience Kiosk',
    icpBreakdown: {
      budgetMatch: '₹15,000 - ₹20,000 mid-premium mattress replacement.',
      mattressSize: 'King 72x72 inch vintage teakwood cot.',
      backPainConcern: 'Orthopedic doctor recommendation for stiff posture correction.',
      timeline: 'Within 7 business days.'
    },
    howWeGotHere: 'Enquired at mall kiosk during shopping. Agent explained patented Japanese SmartGRID grid structure vs coir and PU foam.',
    buyingSignals: [
      {
        category: 'Quotation Demanded',
        quote: 'Requested written pricing comparison vs Wakefit Ortho and Sunday Mattress.',
        strength: 'High'
      }
    ],
    cumulativeMissed: 'No store associate follow-up logged in CRM for 48 hours',
    notes: ['Very polite caller. Wants doorstep mattress measurement to ensure exact teak bed frame fit.']
  },
  {
    id: 'lead-5',
    rank: 5,
    name: 'Divya P.',
    phone: '+91 94481 05672',
    email: 'divya.prasad@yahoo.com',
    product: 'Elev8 Smart Bed Recliner',
    interest: 'Elev8 Smart Bed, ₹22,000',
    price: 22000,
    score: 74,
    icpScore: 73,
    leadIntentScore: 70,
    timeLeft: '6h 15m left',
    status: 'OPEN',
    location: 'Jayanagar Store, Bengaluru',
    storeVisited: 'Jayanagar 3rd Block Store',
    icpBreakdown: {
      budgetMatch: 'Value buyer looking for bundle package discount.',
      mattressSize: 'Queen size mattress and motorized frame bundle.',
      backPainConcern: 'Mild neck stiffness and lifestyle upgrade for work-from-home reading.',
      timeline: 'End of current month pending festival salary bonus.'
    },
    howWeGotHere: 'Received Diwali promotional SMS and visited Jayanagar store for trial.',
    buyingSignals: [
      {
        category: 'Financing Related',
        quote: 'Looking for maximum credit card cashback (ICICI/SBI 10% instant rebate).',
        strength: 'Medium'
      }
    ],
    cumulativeMissed: '1 customer-initiated callback pending response',
    notes: ['Enquired if existing coir mattress can be exchanged under buyback program.']
  }
];

export const MOCK_INCOMING_CALLS: Call[] = [
  {
    id: 'call-inc-1',
    leadName: 'Faizan A.',
    phone: '+91 99201 88321',
    type: 'phone',
    direction: 'missed',
    time: '12m ago',
    duration: '0s',
    expectedValue: 34999,
    product: 'SmartGRID Luxe Mattress',
    outcome: 'Missed Call',
    timestamp: '2026-10-18T13:58:00'
  },
  {
    id: 'call-inc-2',
    leadName: 'Kavitha R.',
    phone: '+91 98840 92314',
    type: 'phone',
    direction: 'missed',
    time: '28m ago',
    duration: '0s',
    expectedValue: 18499,
    product: 'Ortho GRID Mattress',
    outcome: 'Missed Call',
    timestamp: '2026-10-18T13:42:00'
  },
  {
    id: 'call-inc-3',
    leadName: 'Divya P.',
    phone: '+91 94481 05672',
    type: 'in-app',
    direction: 'missed',
    time: '42m ago',
    duration: '0s',
    expectedValue: 22000,
    product: 'Elev8 Smart Bed',
    outcome: 'Missed Call',
    timestamp: '2026-10-18T13:28:00'
  },
  {
    id: 'call-inc-4',
    leadName: 'Ritu S.',
    phone: '+91 97112 45890',
    type: 'phone',
    direction: 'missed',
    time: '1h ago',
    duration: '0s',
    expectedValue: 9490,
    product: 'Ortho GRID Mattress',
    outcome: 'Missed Call',
    timestamp: '2026-10-18T13:10:00'
  },
  {
    id: 'call-inc-5',
    leadName: 'Unknown Shopper',
    phone: '+91 98765 43210',
    type: 'phone',
    direction: 'missed',
    time: '2h ago',
    duration: '0s',
    expectedValue: 15000,
    product: 'General Store Inquiry',
    outcome: 'Missed Call',
    timestamp: '2026-10-18T12:15:00'
  }
];

export const MOCK_RECENT_CALLS: Call[] = [
  {
    id: 'rec-1',
    leadName: 'Ritu S.',
    phone: '+91 97112 45890',
    type: 'in-app',
    direction: 'outgoing',
    time: '10:45 AM',
    duration: '4m 12s',
    expectedValue: 9490,
    product: 'Ortho GRID',
    outcome: 'Quotation Sent',
    qaScore: 84,
    transcriptSnippet: 'Explained patented SmartGRID elasticity, sent PDF quotation with ₹1,000 instant festival coupon on WhatsApp.',
    coachingTip: 'Strong pitch handling. Proactively mention the 100-night risk free trial earlier in the discussion.',
    timestamp: '2026-10-18T10:45:00'
  },
  {
    id: 'rec-2',
    leadName: 'Mukunda',
    phone: '+91 98450 12894',
    type: 'phone',
    direction: 'outgoing',
    time: '09:30 AM',
    duration: '6m 45s',
    expectedValue: 9490,
    product: 'Ortho GRID',
    outcome: 'Follow-up Scheduled',
    qaScore: 91,
    transcriptSnippet: 'Addressed King size fit for customized vintage bed frame, resolved EMI doubts, scheduled 4:30 PM closing call.',
    coachingTip: 'Excellent objection handling on warranty vs saggy foam.',
    timestamp: '2026-10-18T09:30:00'
  },
  {
    id: 'rec-3',
    leadName: 'Kavitha R.',
    phone: '+91 98840 92314',
    type: 'in-app',
    direction: 'incoming',
    time: 'Yesterday',
    duration: '3m 15s',
    expectedValue: 18499,
    product: 'Ortho Pro King',
    outcome: 'Interested',
    qaScore: 78,
    transcriptSnippet: 'Customer enquired about difference between Ortho and Luxe. Provided clinical comparison.',
    coachingTip: 'Remember to ask for customer postal code to guarantee 48-hour delivery availability.',
    timestamp: '2026-10-17T16:20:00'
  },
  {
    id: 'rec-4',
    leadName: 'Faizan A.',
    phone: '+91 99201 88321',
    type: 'phone',
    direction: 'outgoing',
    time: 'Yesterday',
    duration: '5m 20s',
    expectedValue: 34999,
    product: 'SmartGRID Luxe',
    outcome: 'Demo Booking',
    qaScore: 86,
    transcriptSnippet: 'Scheduled VIP in-store comfort test at Indiranagar with dedicated store manager.',
    coachingTip: 'Great rapport building and customer empathy.',
    timestamp: '2026-10-17T14:15:00'
  },
  {
    id: 'rec-5',
    leadName: 'Divya P.',
    phone: '+91 94481 05672',
    type: 'in-app',
    direction: 'incoming',
    time: 'Yesterday',
    duration: '2m 45s',
    expectedValue: 7800,
    product: 'SmartGRID Pillow Bundle',
    outcome: 'Sale Closed',
    qaScore: 92,
    transcriptSnippet: 'Converted customer on 2x Ergonomic Pillows + Waterproof Protector bundle with instant payment link.',
    coachingTip: 'Flawless close. Fast link sharing.',
    timestamp: '2026-10-17T11:05:00'
  }
];

export const MOCK_WAITING_CALLERS: WaitingCaller[] = [
  {
    id: 'wait-1',
    name: 'Priya Iyer',
    phone: '+91 98204 11982',
    waitTime: '2m 14s',
    interest: 'Ortho GRID 78x60 King',
    priority: 'high'
  },
  {
    id: 'wait-2',
    name: 'Suresh Nair',
    phone: '+91 97401 55673',
    waitTime: '45s',
    interest: 'SmartGRID Luxe Plush',
    priority: 'normal'
  }
];

export const MOCK_TASKS: TaskItem[] = [
  {
    id: 'task-1',
    title: '2 callbacks',
    subtitle: 'Scheduled follow-ups due before 5:00 PM',
    count: 2,
    badgeType: 'callback',
    leads: ['Mukunda', 'Faizan A.'],
    actionLabel: 'Review Leads'
  },
  {
    id: 'task-2',
    title: '2 hot leads',
    subtitle: 'High intent (>80 score) walk-outs awaiting call',
    count: 2,
    badgeType: 'hot-lead',
    leads: ['Ritu S.', 'Kavitha R.'],
    actionLabel: 'View High Priority'
  },
  {
    id: 'task-3',
    title: '1 outcome',
    subtitle: 'Call audio pending agent QA self-review',
    count: 1,
    badgeType: 'outcome',
    leads: ['Divya P.'],
    actionLabel: 'Complete Review'
  }
];

export const MOCK_CALLS_HANDLED_CHART = [
  { day: 'Mon', calls: 24, active: false },
  { day: 'Tue', calls: 28, active: false },
  { day: 'Wed', calls: 32, active: false },
  { day: 'Thu', calls: 29, active: false },
  { day: 'Fri', calls: 35, active: false },
  { day: 'Sat', calls: 42, active: false },
  { day: 'Sun', calls: 18, active: true } // Today emphasised
];

export const MOCK_CONVERSION_CHART = [
  { day: 'Mon', rate: 28, csat: 82, active: false },
  { day: 'Tue', rate: 31, csat: 85, active: false },
  { day: 'Wed', rate: 30, csat: 84, active: false },
  { day: 'Thu', rate: 33, csat: 86, active: false },
  { day: 'Fri', rate: 36, csat: 89, active: false },
  { day: 'Sat', rate: 38, csat: 91, active: false },
  { day: 'Sun', rate: 34, csat: 88, active: true } // Today emphasised
];

export const MOCK_CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 'ev-1',
    date: '2026-10-02',
    dayNumber: 2,
    title: 'Monthly Kickoff & Target Review',
    time: '10:00 AM',
    leadName: 'Team Sync',
    type: 'meeting',
    status: 'completed'
  },
  {
    id: 'ev-2',
    date: '2026-10-06',
    dayNumber: 6,
    title: 'VIP Customer Demo - Indiranagar',
    time: '03:30 PM',
    leadName: 'Sanjay Kapoor',
    type: 'demo',
    status: 'completed'
  },
  {
    id: 'ev-3',
    date: '2026-10-12',
    dayNumber: 12,
    title: 'Elev8 Smart Bed Recliner Trial',
    time: '11:00 AM',
    leadName: 'Rohan Mehra',
    type: 'callback',
    status: 'completed'
  },
  {
    id: 'ev-4',
    date: '2026-10-15',
    dayNumber: 15,
    title: 'Ortho Luxe Warranty Clarification',
    time: '04:00 PM',
    leadName: 'Ananya Deshmukh',
    type: 'callback',
    status: 'completed'
  },
  {
    id: 'ev-5',
    date: '2026-10-18', // Today
    dayNumber: 18,
    title: 'Confirm 4:30pm callback for Mukunda',
    time: '04:30 PM',
    leadName: 'Mukunda',
    type: 'callback',
    status: 'pending'
  },
  {
    id: 'ev-6',
    date: '2026-10-18', // Today
    dayNumber: 18,
    title: 'Follow-up with Faizan on Luxe quote',
    time: '05:30 PM',
    leadName: 'Faizan A.',
    type: 'callback',
    status: 'pending'
  },
  {
    id: 'ev-7',
    date: '2026-10-20',
    dayNumber: 20,
    title: 'Submission & Review with Mukunda',
    time: '10:00 AM',
    leadName: 'Founder Review',
    type: 'coaching',
    status: 'pending'
  },
  {
    id: 'ev-8',
    date: '2026-10-24',
    dayNumber: 24,
    title: 'Weekend Walkout Recovery Campaign',
    time: '02:00 PM',
    leadName: 'High Intent Queue',
    type: 'hot-followup',
    status: 'pending'
  },
  {
    id: 'ev-9',
    date: '2026-10-28',
    dayNumber: 28,
    title: 'Month-end Pipeline Close Sprint',
    time: '06:00 PM',
    leadName: 'Closing Leads',
    type: 'callback',
    status: 'pending'
  }
];

export const MOCK_CHANNELS: Channel[] = [
  {
    id: 'ch-team',
    name: 'callcentre-team',
    slug: 'callcentre-team',
    category: 'role',
    description: 'Active call centre team operations, real-time escalations and manager coaching.',
    badge: 'Active',
    unreadCount: 1,
    avatarColor: 'bg-emerald-700'
  },
  {
    id: 'ch-cc-agent',
    name: 'callcentre-agent',
    slug: 'callcentre-agent',
    category: 'role',
    description: 'AI Copilot providing real-time script assistance, objection handling and CRM notes.',
    badge: '98% QA',
    unreadCount: 2,
    avatarColor: 'bg-teal-700'
  },
  {
    id: 'ch-cross-sell',
    name: 'cross-sell-agent',
    slug: 'cross-sell-agent',
    category: 'task',
    description: 'Autonomous agent detecting cross-sell opportunities (Protectors, Pillows, Bed bases).',
    badge: '94% match',
    unreadCount: 3,
    avatarColor: 'bg-purple-700'
  },
  {
    id: 'ch-sop',
    name: 'sop-agent',
    slug: 'sop-agent',
    category: 'task',
    description: 'Instant answers on 100-night trial guidelines, return policies and warranty logistics.',
    badge: 'v4.2 Updated',
    avatarColor: 'bg-blue-700'
  },
  {
    id: 'ch-lead-conv',
    name: 'lead-conversion-agent',
    slug: 'lead-conversion-agent',
    category: 'task',
    description: 'Analyzes high-intent walk-outs and calculates personalized incentive discount codes.',
    badge: '+23.6pp lift',
    unreadCount: 1,
    avatarColor: 'bg-indigo-700'
  },
  {
    id: 'ch-capture',
    name: 'capture-agent',
    slug: 'capture-agent',
    category: 'task',
    description: 'Captures and transcribes audio snippets from in-store walk-in conversations.',
    badge: '5 processed',
    avatarColor: 'bg-amber-700'
  },
  {
    id: 'ch-cust-disc',
    name: 'customer-discussions',
    slug: 'customer-discussions',
    category: 'general',
    description: 'Open discussion feed for store walkout reasons, customer objections and feedback.',
    avatarColor: 'bg-slate-700'
  }
];

export const MOCK_TEAM_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    channelId: 'ch-team',
    senderName: 'Rashmi Sehgal (CEO)',
    senderAvatar: 'RS',
    isMe: false,
    content: 'Team, great conversion numbers yesterday! Over 38% conversion recorded across Indiranagar and Koramangala. Keep pushing the 100-night trial on all Ortho calls.',
    timestamp: '09:15 AM'
  },
  {
    id: 'msg-2',
    channelId: 'ch-team',
    senderName: 'AvaniBot (AI Coach)',
    senderAvatar: 'AB',
    isMe: false,
    isBot: true,
    content: 'Insight: Shoppers who ask about EMI options close at 71% if you offer 3-month zero-cost EMI on HDFC card within the first 3 minutes of the conversation.',
    timestamp: '11:20 AM'
  },
  {
    id: 'msg-3',
    channelId: 'ch-team',
    senderName: 'Mukunda Dwarkanath (Co-founder)',
    senderAvatar: 'MD',
    isMe: false,
    content: 'Arvind, please double check the 4:30 PM slot for the customer interested in the King Ortho GRID. He wants clarification on delivery to Whitefield.',
    timestamp: '01:45 PM'
  },
  {
    id: 'msg-4',
    channelId: 'ch-team',
    senderName: 'Arvind Rajan',
    senderAvatar: 'AR',
    isMe: true,
    content: "Understood Mukunda. Reviewing his buying signals now. He was mainly concerned about warranty vs saggy foam, which I've got covered with the 10-year replacement certificate.",
    timestamp: '02:02 PM'
  }
];

export const CALL_SIMULATION_SCRIPT = [
  {
    speaker: 'Customer (Mukunda)',
    text: "Hello Arvind, thanks for calling back. I was at the Indiranagar store on Saturday checking the Ortho GRID mattress. I liked the firmness, but wanted to know if you provide zero-cost EMI on credit cards?",
    suggestedResponses: [
      "Yes Mukunda! We have 0% interest EMI up to 9 months on all major bank cards including HDFC and ICICI.",
      "Certainly! I can activate a special pre-approved 6-month EMI scheme with ₹0 down payment right now."
    ]
  },
  {
    speaker: 'Customer (Mukunda)',
    text: "That sounds good. My other concern is sagging. My previous memory foam mattress started sinking in the middle after 18 months. Does the SmartGRID also sag?",
    suggestedResponses: [
      "The SmartGRID is made of food-grade hyper-elastic polymer, not foam. It springs back instantly with zero body impressions and comes with an unconditional 10-year replacement warranty.",
      "SmartGRID retains 98% shape elasticity even after 100,000 cycles. Plus, you get our 100-night home trial to test it in your own bedroom!"
    ]
  },
  {
    speaker: 'Customer (Mukunda)',
    text: "That's reassuring. What about delivery to Indiranagar? If I confirm today, can you get it delivered by Thursday before Diwali?",
    suggestedResponses: [
      "I have ready stock at our Bangalore warehouse. I will personally fast-track priority doorstep delivery for Wednesday 2 PM!",
      "Yes, we can guarantee delivery by Wednesday afternoon with free white-glove setup and 2 complimentary SmartGRID pillows."
    ]
  },
  {
    speaker: 'Customer (Mukunda)',
    text: "Wonderful! Please send me the official payment link on WhatsApp and I will complete the order right now.",
    suggestedResponses: [
      "Sending the link to +91 98450 12894 with the complimentary pillows automatically bundled. Thank you for choosing The Sleep Company!",
      "Payment link dispatched! It was a pleasure assisting you Mukunda. Have a restful sleep ahead!"
    ]
  }
];
