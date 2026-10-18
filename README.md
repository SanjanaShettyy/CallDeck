# CallDeck

Call centre agent workspace built for the On-Ground.ai engineering hire assignment, based on the screenshots provided in the assignment PDF.

## Live Demo

- **URL:** [https://call-deck.vercel.app](https://call-deck.vercel.app)
- **GitHub Repository:** [https://github.com/SanjanaShettyy/CallDeck](https://github.com/SanjanaShettyy/CallDeck)

---

## Overview

CallDeck is an operational web interface for call centre telecallers at The Sleep Company. It supports lead management, incoming missed-call recovery, call practice simulation, schedule planning, and AI agent team channels.

The project was constructed by referencing the 8 screen layouts shown in the assignment PDF (without access to the original mock HTML source).

---

## Tech Stack & Architecture

- **React 19 + Vite + TypeScript:** Client-side SPA with type safety and modular components.
- **React Router DOM v7:** Client routing across Dashboard, Calling Plan, Calendar, and Pulse channels.
- **Tailwind CSS v4:** Layout and styling aligned with the forest green, navy gradient, and restrained typography in the PDF reference.
- **Recharts:** 7-day bar charts for calls handled and conversion trends with active day highlight.
- **Lucide React:** Icons for navigation, actions, and status indicators.
- **React Context (`AppContext`):** In-memory state for active calls, chat messaging, lead modal paging, and task status. No backend or external API dependencies.

---

## Project Structure

```
CallDeck/
├── public/
│   └── favicon.svg             # Custom SVG favicon
├── src/
│   ├── types/
│   │   └── index.ts            # Data models (Lead, Call, Task, Channel, Message)
│   ├── data/
│   │   └── mock.ts             # Sample data for leads, missed calls, tasks, channels
│   ├── context/
│   │   └── AppContext.tsx      # Global state for calls, chat, leads, and tasks
│   ├── components/
│   │   ├── common/             # Reusable UI primitives (Card, Badge, Button, Modal, Avatar, Pagination)
│   │   ├── layout/             # Sidebar, TopBar, HeaderStrip, DemoToolbar
│   │   ├── call/               # ActiveCallModal, DialPadModal
│   │   └── leads/              # LeadsModal, CallReviewModal
│   ├── pages/
│   │   ├── Dashboard.tsx       # KPIs, progress card, earnings, waiting queue, charts
│   │   ├── CallsToMake.tsx     # Ranked leads with expandable rows and pagination
│   │   ├── Incoming.tsx        # Missed calls list with 1-click callback simulation
│   │   ├── Recent.tsx          # Call history with search, filters, and review modal
│   │   ├── Calendar.tsx        # October 2026 month grid with day schedules
│   │   ├── PulseHome.tsx       # AvaniBot banner, agent channels, and kudos card
│   │   └── PulseChannel.tsx    # Channel chat with pinned task card and simulated replies
│   ├── App.tsx                 # Root router and layout
│   ├── index.css               # Design tokens, typography, and styling
│   └── main.tsx                # Application entry point
├── vercel.json                 # SPA rewrite configuration
├── package.json
└── vite.config.ts
```

---

## Implemented Screens & Features

1. **App Shell:**
   - Dark forest green sidebar (`#14352a`) with active item highlight and mobile toggle.
   - Top bar with On-Ground.ai branding, "OG" badge, earnings pill (`₹5,200`), notifications, and agent avatar (`AR`).
2. **Dashboard:**
   - Greeting ("Good afternoon, Arvind Rajan") and "The Sleep Company · Call Centre" subtitle.
   - 4 KPI cards: QA score (76), Avg handle time (4m 12s), Conversion trend (34%), In queue (2).
   - "My progress today" card with leads greeted (3) and leads called (2).
   - "My earnings this month" card (₹5,200) with Tier 2 progress bar.
   - "Who's waiting" list (Priya Iyer, Suresh Nair) with wait-time badges and direct call actions.
   - "My Tasks" card (2 callbacks, 2 hot leads, 1 outcome) where clicking any task opens the Leads modal.
   - Two 7-day bar charts (Calls handled, Conversion trend) with the last day emphasised.
3. **Plan > Calls to Make:**
   - Navy gradient header strip ("Today's calling plan / Planner").
   - Ranked leads list (Mukunda, Ritu S., Faizan A., Kavitha R., Divya P.).
   - Expandable rows showing store visit details, shopper requirements, buying signals, and call buttons.
   - Pagination ("Page 1 of 2", Prev/Next).
4. **Plan > Incoming:**
   - Summary card: 5 missed today, ₹81,860 expected value at stake.
   - Rows for Faizan A., Kavitha R., Divya P., Ritu S., and Unknown Shopper with missed duration and expected cart value.
   - Green "Call back" button on each row that launches the live call simulator.
5. **Plan > Recent:**
   - Completed call history with type (in-app / phone), duration, outcome, and QA score.
   - Search bar and call-type filter tabs.
   - Clicking any call opens the Call Review modal with audio waveform simulation, transcript summary, and coaching notes.
6. **Calendar:**
   - October 2026 month grid with event indicator dots.
   - Real current date (Sunday, 18 October 2026) highlighted.
   - Today button, month switcher, top calendar sync banner, and day schedule view.
7. **Pulse Home:**
   - Search bar for agents, discussions, and SOPs.
   - AvaniBot banner card with "Daily Brief" modal and "Ask a question" action.
   - Role agents (`#callcentre-agent`), Task agents (`#cross-sell-agent`, `#sop-agent`, `#lead-conversion-agent`, `#capture-agent`), and general channels.
   - Amber Kudos card recognizing Arvind for closing a ₹45k Ortho Luxe.
8. **Pulse Channel (`#callcentre-team`):**
   - Back button and channel header.
   - Pinned "Needs your input" card with "Confirmed", "Reschedule", and reply input. Answering updates state and posts to the chat.
   - Chat bubbles (others on left, my messages on right in green).
   - Message input at bottom with auto-scroll and simulated AI responses after ~1.2s.
9. **Leads Modal:**
   - Backdrop-blur dialog with purple header ("Leads · Lead 1 of 5", status "OPEN").
   - Lead card with customer details, product interest, and time left badge.
   - ICP score bar (87%) and Lead Intent score bar (81).
   - Collapsible sections: ICP fit breakdown, How we got here, and Where we picked up signals (Financing Related, Quotation Demanded, Warranty Related in italics).
   - Red "Cumulative missed" strip.
   - Next/Previous paging with dot indicators, plus `Escape` key support to close.

---

## Bonus Items Completed

- **Working call simulator:** "Practise a call", "Call back", and dial actions open an active call modal with a running timer, audio visualizer, interactive AI customer dialogue script with clickable agent responses, Mute/Speaker toggles, and QA scoring on hang up.
- **Interactive chat:** Sending a message posts to the right, scrolls down, and receives a contextual reply from AvaniBot or the team.
- **Interactive pinned decision card:** Clicking "Confirmed", "Reschedule", or typing a reply updates the task and records the action in chat.
- **Floating demo toolbar:** Bottom-center strip with "In-app call", "Phone call", and a working dial pad.
- **Responsive design:** Layout adapts down to mobile widths with a slide-out navigation drawer.

---

## Scope & Simplifications

- **Data source:** All data is served from local mock modules (`src/data/mock.ts` and `AppContext`). No external database or backend API was used.
- **Calling engine:** Real WebRTC audio and SIP telephony are simulated in the browser with audio waveforms, reactive timers, and dialogue state trees.
- **Visual reference:** The design was recreated purely from the screenshots in the assignment PDF rather than extracting source HTML.

---

## How to Run Locally

```bash
# 1. Clone repository
git clone https://github.com/SanjanaShettyy/CallDeck.git

# 2. Navigate to directory
cd CallDeck

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

To verify the production build:
```bash
npm run build
```

---

## Deploy to Vercel

The application is deployed live at:
[https://call-deck.vercel.app](https://call-deck.vercel.app)

To deploy directly to your own Vercel account:
1. Go to [vercel.com/new](https://vercel.com/new).
2. Import `https://github.com/SanjanaShettyy/CallDeck`.
3. Vercel detects Vite automatically (Build command: `npm run build`, Output directory: `dist`).
4. Click **Deploy**.

---

## AI Tools Used

- **Tool:** Google Antigravity
- **Model:** Gemini 3.8 Flash (High)
- **Usage:** Assisted in project scaffolding, TypeScript typing, layout structure, Recharts chart setup, and call simulation dialogue flow.
