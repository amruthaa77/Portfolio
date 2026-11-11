export const content = {
  personal: {
    name: "AMRUTHA M",
    fullName: "Amrutha M",
    role: "Full-Stack Developer & MCA Student",
    tagline: "I build fast, reliable web products that are clean, intuitive and built with purpose.",
    intro: "MCA student at St. Joseph's University, Bengaluru, building concurrency-safe full-stack apps with React, Node.js and Python. Focused on turning real civic and mobility challenges into working software.",
    email: "amrutha.m63644@gmail.com",
    github: "https://github.com/amruthaa77",
    githubUsername: "github.com/amruthaa77",
    linkedin: "https://www.linkedin.com/in/m-amrutha",
    linkedinUsername: "linkedin.com/in/m-amrutha",
    location: "Bengaluru, Karnataka, India",
    resumeUrl: "/Amrutha_M_Resume.pdf",
    portfolioYear: "PORTFOLIO",
  },

  nav: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ],

  about: {
    label: "ABOUT ME",
    heading: "A Developer, Researcher & Problem Solver.",
    bio: [
      "I am an MCA student at St. Joseph's University, Bengaluru, with an academic foundation in Computer Science and Statistics. I specialize in developing end-to-end web architectures, high-concurrency transactional backends, and practical AI integrations.",
      "Whether it is preventing race conditions in EV charger bookings, engineering offline-first civic platforms with OLS forecasting, or orchestrating low-latency voice pipelines, I focus on clean systems design, comprehensive automated testing, and software that withstands real-world conditions."
    ],
    highlights: [
      {
        number: "01",
        title: "Academic Computing & Stats",
        detail: "Master of Computer Applications (MCA) & B.Sc. in Computer Science & Statistics from St. Joseph's University, Bengaluru.",
      },
      {
        number: "02",
        title: "National Conference Recognition",
        detail: "Runner-up among ~250 participants at KAGADA 2026, IEEE UVCE for research on Edge-Intelligent Hierarchical Industrial IoT Architectures.",
      },
      {
        number: "03",
        title: "Rigorous Test-Driven Backend",
        detail: "134 automated unit and integration tests across 16 suites ensuring concurrency safety and 0 deadlocks.",
      },
    ],
  },

  projects: [
    {
      id: "chargeshare-india",
      number: "01",
      name: "ChargeShare India",
      category: "PEER-TO-PEER EV CHARGING MARKETPLACE",
      description: "A peer-to-peer EV charging marketplace where verified hosts list private chargers and riders reserve 30- and 60-minute slots with map-based search, Razorpay escrow and QR check-in.",
      outcome: "Prevented double-booking with a MongoDB unique partial index on (chargerId, slotStart). In a Jest concurrency test, 25 simultaneous requests produced exactly 1 booking and 24 conflicts. 134 automated tests across 16 suites pass.",
      tags: ["React", "Node.js", "Express", "MongoDB", "Razorpay", "Jest", "Swagger"],
      image: "/projects/chargeshare.png",
      mockupType: "browser",
      mockupData: {
        url: "charge-share-gamma.vercel.app",
        badge: "CONCURRENCY-SAFE",
        stat: "25 -> 1 Guarantee",
        previewTitle: "Live Charger Reservation Engine",
        previewCode: "db.slots.createIndex({ chargerId: 1, slotStart: 1 }, { unique: true, partialFilterExpression: { status: 'BOOKED' } })"
      },
      liveUrl: "https://charge-share-gamma.vercel.app/",
      githubUrl: null, // Coming soon
    },
    {
      id: "greenpay",
      number: "02",
      name: "GreenPay",
      category: "URBAN WASTE ACCOUNTABILITY & REWARDS PLATFORM",
      description: "A municipal waste-accountability platform for BBMP that rewards verified doorstep collection using permanent citizen QR codes (GP-XXXXXX), an append-only reward ledger, and an explainable 0–100 Green Score.",
      outcome: "Engineered offline-first mobile weighment sync with cryptographic idempotency keys, statistical anomaly detection, and ward-level analytics with OLS waste-volume forecasting.",
      tags: ["React", "TypeScript", "FastAPI", "PostgreSQL", "Pytest", "Tailwind CSS"],
      image: "/projects/greenpay.png",
      mockupType: "dashboard",
      mockupData: {
        url: "greenpay-five.vercel.app",
        badge: "OFFLINE-FIRST",
        stat: "Zero Duplicate Sync",
        previewTitle: "BBMP Ward Analytics & Ledger",
        previewCode: "ols_forecast = sm.OLS(y_waste_tonnage, X_ward_features).fit()\nledger.append_entry(citizen_id='GP-584920', score_delta=+4.5)"
      },
      liveUrl: "https://greenpay-five.vercel.app",
      githubUrl: "https://github.com/amruthaa77/Greenpay",
    },
    {
      id: "nova-voice-assistant",
      number: "03",
      name: "Nova Voice Assistant",
      category: "REAL-TIME VOICE AI CONVERSATIONAL ASSISTANT",
      description: "A real-time voice assistant with dual operating pipelines: an ElevenLabs Conversational AI agent and a custom low-latency modular pipeline (energy-based VAD, Scribe STT, Claude LLM, Flash TTS).",
      outcome: "Full barge-in interruption support with <100ms cutoff, 3D React audio visualizer interface, and unit-tested memory and LLM orchestration modules.",
      tags: ["Python", "FastAPI", "React", "ElevenLabs", "Anthropic Claude", "Three.js"],
      image: "/projects/nova.png",
      mockupType: "terminal",
      mockupData: {
        url: "nova-voice-assistant-peach.vercel.app",
        badge: "LOW-LATENCY STREAMING",
        stat: "<100ms Barge-In",
        previewTitle: "Barge-in VAD Voice Pipeline",
        previewCode: "if rms_power(audio_chunk) > VAD_THRESHOLD and tts_active:\n    await websocket.send_interrupt_signal()\n    tts_stream.abort()"
      },
      liveUrl: "https://nova-voice-assistant-peach.vercel.app",
      githubUrl: "https://github.com/amruthaa77/Nova_Voice_Assistant",
    },
  ],

  skillsCategories: [
    {
      category: "Frontend",
      skills: [
        { name: "React" },
        { name: "JavaScript (ES6+)" },
        { name: "TypeScript" },
        { name: "Tailwind CSS" },
        { name: "HTML5 / Semantic Web" },
      ]
    },
    {
      category: "Backend",
      skills: [
        { name: "Node.js & Express" },
        { name: "Python & FastAPI" },
        { name: "REST APIs & Swagger Docs" },
        { name: "Git & Version Control" },
        { name: "Jest & Pytest Automation" },
      ]
    },
    {
      category: "Data & AI",
      skills: [
        { name: "MongoDB (Indexing & Aggregation)" },
        { name: "PostgreSQL & SQL" },
        { name: "Anthropic Claude API" },
        { name: "Data Analysis & OLS Regression" },
        { name: "Machine Learning Concepts" },
      ]
    }
  ],

  impact: {
    stats: [
      {
        value: "3",
        unit: "",
        label: "projects built",
        sublabel: "3 full-stack applications built and deployed with production backends",
      },
      {
        value: "134",
        unit: "",
        label: "tests passing",
        sublabel: "134 automated tests across 16 suites ensuring race-condition prevention",
      },
      {
        value: "25",
        unit: " → 1",
        label: "concurrency test",
        sublabel: "25 simultaneous requests → 1 booking, 24 conflicts",
      },
    ],
    quote: {
      text: "I build fast, reliable web products that are clean, intuitive and built with purpose. Turning real civic and mobility challenges into tested, scalable software.",
      author: "Amrutha M",
      title: "Full-Stack Developer & MCA Student, Bengaluru",
    },
  },

  experienceHighlights: [
    {
      role: "AI/ML Intern",
      company: "ComedKares",
      location: "Bengaluru",
      period: "May 2026 - Jun 2026",
      summary: "5-week AI/ML internship covering design thinking, Python, data analysis and ML. Contributed to research paper and technical implementation of Pawkart retail inventory platform.",
    },
    {
      role: "Web Development Intern",
      company: "ACMEGRADE",
      location: "Bengaluru",
      period: "Jul 2023 - Sep 2023",
      summary: "Developed an Amazon-inspired e-commerce website with responsive UI, catalog management, product listings, navigation and core shopping features.",
    },
    {
      role: "Chapter Chairperson",
      company: "IEEE Computer Society Student Branch",
      location: "St. Joseph's University",
      period: "Current Leadership",
      summary: "Leads the student chapter; organizes technical workshops, seminars, and career development activities with faculty and industry experts.",
    },
  ],

  contact: {
    label: "LET'S CONNECT",
    heading: "Start A Conversation",
    description: "I am actively seeking software development and data roles in Bengaluru or remote. Whether you have an open position or want to discuss full-stack architectures, reach out.",
    email: "amrutha.m63644@gmail.com",
    github: "https://github.com/amruthaa77",
    githubLabel: "github.com/amruthaa77",
    linkedin: "https://www.linkedin.com/in/m-amrutha",
    linkedinLabel: "linkedin.com/in/m-amrutha",
    location: "Bengaluru, Karnataka, India",
    ctaHeading: "Open to full-time roles",
    ctaDescription: "Available for full-stack engineering and software development opportunities.",
    ctaText: "LET'S BUILD SOMETHING GREAT TOGETHER",
  },

  footer: {
    copyright: "AMRUTHA M. © 2026",
    credit: "",
  }
};

export default content;
