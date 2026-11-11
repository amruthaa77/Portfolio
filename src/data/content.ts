export interface ProjectStep {
  number: number;
  title: string;
  detail: string;
  badge?: string;
}

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  type: string;
  subtitle: string;
  tagline: string;
  period: string;
  stack: string[];
  problem: string;
  built: string[];
  keyDecisions: {
    decision: string;
    rationale: string;
    metricOrOutcome?: string;
  }[];
  concurrencyOrTestMetric: string;
  architectureSteps: ProjectStep[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface SkillItem {
  name: string;
  category: string;
  percentage: number;
  iconName?: string;
}

export interface StatItem {
  number: string;
  label: string;
  sublabel: string;
}

export interface NapolitaniContent {
  personal: {
    name: string;
    firstName: string;
    lastNameInitial: string;
    role: string;
    tagline: string;
    shortIntro: string;
    location: string;
    email: string;
    github: string;
    linkedin: string;
    resumePdfPath: string;
    portfolioYear: string;
  };
  quote: {
    text: string;
    attribution: string;
  };
  stats: StatItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
}

export const content: NapolitaniContent = {
  personal: {
    name: "AMRUTHA M",
    firstName: "AMRUTHA",
    lastNameInitial: "M",
    role: "Full-Stack Developer & MCA Student",
    tagline: "I build fast, reliable web products that are clean, intuitive and built with purpose.",
    shortIntro: "MCA student at St. Joseph's University, Bengaluru, building concurrency-safe full-stack apps with React, Node.js and Python. Focused on turning real civic and mobility challenges into working software.",
    location: "Bengaluru, Karnataka, India",
    email: "amrutha.m63644@gmail.com",
    github: "https://github.com/amruthaa77",
    linkedin: "https://www.linkedin.com/in/m-amrutha",
    resumePdfPath: "/resume.pdf",
    portfolioYear: "PORTFOLIO 2026",
  },

  quote: {
    text: "I build fast, reliable web products that are clean, intuitive and built with purpose. Turning real civic and mobility challenges into tested, scalable software.",
    attribution: "Amrutha M — Developer & Researcher",
  },

  stats: [
    {
      number: "3+",
      label: "PROJECTS BUILT",
      sublabel: "Full-stack systems deployed & verified in production",
    },
    {
      number: "10+",
      label: "TECHNOLOGIES",
      sublabel: "React, Node.js, Python, MongoDB, PostgreSQL, FastAPI, Git",
    },
    {
      number: "2+",
      label: "INTERNSHIPS & PAPERS",
      sublabel: "ComedKares, Acmegrade • National KAGADA 2026 Runner-Up",
    },
  ],

  skills: [
    { name: "React", category: "Frontend", percentage: 90 },
    { name: "JavaScript & TypeScript", category: "Core", percentage: 90 },
    { name: "Node.js & Express", category: "Backend", percentage: 85 },
    { name: "REST APIs & Swagger", category: "Architecture", percentage: 90 },
    { name: "Python & FastAPI", category: "Backend & AI", percentage: 85 },
    { name: "MongoDB & PostgreSQL / SQL", category: "Database", percentage: 80 },
    { name: "Git & Version Control", category: "Tooling", percentage: 85 },
  ],

  projects: [
    {
      id: "chargeshare-india",
      number: "01",
      title: "ChargeShare India",
      type: "PEER-TO-PEER EV CHARGING MARKETPLACE",
      subtitle: "Concurrency-safe reservation engine with strict double-booking prevention & Razorpay escrow.",
      tagline: "Prevents double-booking with a MongoDB unique partial index. In a Jest concurrency test, 25 simultaneous requests produced exactly 1 booking and 24 conflicts.",
      period: "2024 - 2025",
      stack: ["React", "Node.js", "Express", "MongoDB", "Razorpay", "Jest", "Swagger"],
      problem: "In India's growing EV ecosystem, private chargers sit idle while riders face public queues. Booking systems risk race conditions where two simultaneous riders reserve the exact same charger slot.",
      built: [
        "Peer-to-peer EV charging marketplace where hosts list private chargers and riders book 30- and 60-minute slots with map-based search.",
        "Strict double-booking prevention using a MongoDB unique partial index on (chargerId, slotStart). Tested with 25 simultaneous requests: 1 success, 24 conflicts.",
        "Unpaid slot holds expire automatically after 10 minutes.",
        "Admin KYC and electrical-safety verification before listings go public.",
        "Tiered cancellation refunds (100%, 50%, 0%), role-based access control, and DPDP Act 2023-aligned account erasure.",
        "38 REST endpoints documented with Swagger and 134 automated tests across 16 suites.",
      ],
      keyDecisions: [
        {
          decision: "MongoDB Compound Unique Partial Index",
          rationale: "Enforced database-level atomic exclusivity on (chargerId, slotStart) without complex distributed Redis locks.",
          metricOrOutcome: "25 concurrent requests -> 1 booking, 24 conflicts handled."
        },
        {
          decision: "10-Minute Ephemeral Reservation Hold",
          rationale: "Prevents abandoned checkout locks by expiring pending reservations via TTL/cron.",
          metricOrOutcome: "Zero deadlocked chargers."
        }
      ],
      concurrencyOrTestMetric: "134 automated tests pass • 25-request concurrency test: 1 booking, 24 conflicts",
      architectureSteps: [
        { number: 1, title: "Map Discovery", detail: "Rider queries nearby chargers with geospatial filtering.", badge: "GeoSpatial" },
        { number: 2, title: "Atomic Slot Lock", detail: "Hold initiated with unique index on (chargerId, slotStart).", badge: "Unique Index" },
        { number: 3, title: "Concurrency Guard", detail: "Concurrent attempts trigger duplicate key error 11000.", badge: "Guaranteed" },
        { number: 4, title: "Razorpay Checkout", detail: "Rider completes payment; webhook finalizes slot confirmation.", badge: "Escrow" },
        { number: 5, title: "QR Check-in", detail: "Physical QR scan verifies arrival and unlocks charging session.", badge: "QR Verify" },
      ],
      liveUrl: "https://charge-share-gamma.vercel.app/",
      githubUrl: undefined, // Coming soon
    },
    {
      id: "greenpay",
      number: "02",
      title: "GreenPay",
      type: "URBAN WASTE ACCOUNTABILITY & REWARDS PLATFORM",
      subtitle: "Offline-first doorstep waste verification with tamper-proof reward ledger & OLS forecasting for BBMP.",
      tagline: "Doorstep collection rewards using permanent citizen QR codes (GP-XXXXXX), append-only ledger, and an explainable 0–100 Green Score.",
      period: "2024",
      stack: ["React", "TypeScript", "FastAPI", "PostgreSQL", "Pytest", "Tailwind CSS"],
      problem: "Bengaluru municipal waste segregation suffers from low citizen accountability, manual tracking discrepancies, and lack of direct doorstep incentives.",
      built: [
        "Rewards verified doorstep waste collection using permanent citizen QR codes (GP-XXXXXX) and explainable 0–100 Green Score.",
        "Offline-first weighment sync with cryptographic idempotency keys, preventing duplicate logs in network dead-zones.",
        "Statistical anomaly detection flagging suspicious weight surges or contractor irregularities.",
        "Tenant-isolated role-based access control across BBMP municipal wards.",
        "Ward-level analytics with Ordinary Least Squares (OLS) waste-volume forecasting.",
        "Bilingual English and Kannada localization for grassroots workers.",
      ],
      keyDecisions: [
        {
          decision: "Offline-First Sync with Idempotency Keys",
          rationale: "Weighments stored in IndexedDB with UUIDv4 idempotency keys and synched on cellular reconnect.",
          metricOrOutcome: "Zero duplicate weighment logs."
        },
        {
          decision: "OLS Predictive Waste Volume Modeling",
          rationale: "Statistical regression assists ward engineers in truck dispatch logistics.",
          metricOrOutcome: "Data-driven route optimization."
        }
      ],
      concurrencyOrTestMetric: "Offline-first sync with idempotency keys • Pytest test suite • OLS predictive regression",
      architectureSteps: [
        { number: 1, title: "Citizen QR Scan", detail: "Permanent QR identifier (GP-XXXXXX) scanned at resident doorstep.", badge: "Unique ID" },
        { number: 2, title: "Weighment Capture", detail: "Digital scale input recorded offline in IndexedDB.", badge: "Offline Cache" },
        { number: 3, title: "Idempotent Sync", detail: "FastAPI server validates idempotency key to prevent duplication.", badge: "Idempotency" },
        { number: 4, title: "Ledger Update", detail: "Append-only reward ledger updates Green Score (0-100).", badge: "Audit Ledger" },
        { number: 5, title: "OLS Forecasting", detail: "Predictive model forecasts weekly tonnage for BBMP routes.", badge: "Analytics" },
      ],
      liveUrl: "https://greenpay-five.vercel.app",
      githubUrl: "https://github.com/amruthaa77/Greenpay",
    },
    {
      id: "nova-voice-assistant",
      number: "03",
      title: "Nova Voice Assistant",
      type: "REAL-TIME VOICE AI CONVERSATIONAL ASSISTANT",
      subtitle: "Low-latency streaming voice engine featuring Claude reasoning & barge-in interruption.",
      tagline: "Dual operating pipelines: ElevenLabs conversational agent and custom pipeline with energy-based VAD, Claude LLM, and Flash TTS.",
      period: "2024",
      stack: ["Python", "FastAPI", "React", "ElevenLabs", "Anthropic Claude", "Three.js"],
      problem: "Traditional voice assistants suffer from latency (>1500ms), unnatural turn-taking, and inability to interrupt the AI mid-sentence.",
      built: [
        "Dual operating modes: ElevenLabs Conversational AI agent and custom low-latency modular pipeline.",
        "Custom pipeline incorporates energy-based Voice Activity Detection (VAD), Scribe STT, Claude LLM, and Flash TTS.",
        "Real-time barge-in interruption allowing users to cut in naturally mid-response.",
        "Interactive 3D React user interface reacting visually to audio amplitudes.",
        "FastAPI backend with structured multi-turn conversation memory.",
        "Unit-tested VAD, memory, and LLM orchestration modules. Deployed on Vercel and Render.",
      ],
      keyDecisions: [
        {
          decision: "Energy-Based VAD Barge-In Interruption",
          rationale: "Frontend RMS energy threshold immediately aborts ongoing TTS streaming when user speaks.",
          metricOrOutcome: "<100ms interruption cutoff."
        },
        {
          decision: "Sliding-Window Conversation Memory",
          rationale: "Maintains coherent multi-turn dialogue while keeping prompt tokens and latency low.",
          metricOrOutcome: "Fast response latency and contextual coherence."
        }
      ],
      concurrencyOrTestMetric: "Real-time WebSocket streaming • Unit-tested VAD & memory • Barge-in interruption",
      architectureSteps: [
        { number: 1, title: "Audio Ingestion", detail: "Microphone stream captured via Web Audio API.", badge: "WebSocket" },
        { number: 2, title: "Energy VAD", detail: "RMS power detection detects speech onset and aborts active TTS.", badge: "Barge-in" },
        { number: 3, title: "Scribe STT", detail: "Real-time speech transcription normalized into text tokens.", badge: "STT" },
        { number: 4, title: "Claude Reasoning", detail: "Claude LLM processes prompt with conversation history.", badge: "Claude 3" },
        { number: 5, title: "Streaming TTS", detail: "Synthesized audio streamed back with visual amplitude canvas.", badge: "Audio Stream" },
      ],
      liveUrl: "https://nova-voice-assistant-peach.vercel.app",
      githubUrl: "https://github.com/amruthaa77/Nova_Voice_Assistant",
    },
  ],
};

export const siteContent: any = content;

