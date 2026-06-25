export const data = {
  name: "Eknoor Singh",
  title: "Full Stack Engineer",
  email: "eknoor.singh.dev@gmail.com",
  phone: "+91 99884 50529",
  github: "https://github.com/eknoor-singh",        // ← update username
  githubUsername: "eknoor-singh",                    // ← update username
  linkedin: "https://linkedin.com/in/eknoor-singh",  // ← update slug
  location: "Mohali, India",
  bio: "Full Stack Developer with 1+ year building production-grade web applications for live client projects. I craft scalable APIs, responsive UIs, and reliable systems — from database design to deployment.",

  roles: ["Full Stack Engineer", "React Developer", "Node.js Developer", "API Architect", "TypeScript Developer"],

  /* ── Stats (About section) ── */
  stats: [
    { value: 1,  suffix: "+", label: "Year of professional experience" },
    { value: 25, suffix: "+", label: "REST APIs developed" },
    { value: 3,  suffix: "",  label: "Production systems shipped" },
    { value: 10, suffix: "+", label: "Technologies in my stack" },
  ],

  /* ── Metrics bar (hero / about) ── */
  metrics: [
    { value: "25+",  label: "REST APIs Built" },
    { value: "3",    label: "Production Systems" },
    { value: "10+",  label: "Technologies" },
    { value: "1+",   label: "Year Experience" },
  ],

  about: [
    "I'm a <strong>Full Stack Developer</strong> with over a year of hands-on experience building and shipping production-grade web applications for live client projects at <strong>DigiMantra Labs, Mohali</strong>.",
    "My work spans the full stack — from designing <strong>scalable backend APIs</strong> and optimizing database queries, to building <strong>responsive, accessible front-ends</strong> with React and Next.js. I care deeply about performance, security, and long-term maintainability.",
    "I graduated from <strong>Thapar Institute of Engineering and Technology</strong> with a B.E. in Computer Science Engineering and thrive in fast-paced environments where I can ship features that make a real impact.",
  ],

  skills: [
    { icon: "⚡", name: "Languages",       tags: ["TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3"] },
    { icon: "🎨", name: "Frontend",        tags: ["React.js", "Next.js", "Tailwind CSS", "Bootstrap"] },
    { icon: "⚙️", name: "Backend",         tags: ["Node.js", "Express.js", "RESTful APIs"] },
    { icon: "🗄️", name: "Databases",       tags: ["PostgreSQL", "MongoDB", "MySQL"] },
    { icon: "🔐", name: "Auth & Security", tags: ["JWT", "RBAC", "Input Validation", "Auth Middleware"] },
    { icon: "🛠️", name: "Tools",           tags: ["Git", "GitHub", "Bitbucket", "Postman", "VS Code"] },
  ],

  experience: [
    {
      role: "Full Stack Developer",
      company: "DigiMantra Labs",
      period: "Mar 2025 – Present",
      location: "Mohali, India",
      current: true,
      bullets: [
        "Implemented and validated end-to-end application flows across frontend, backend, and database layers to ensure stable, production-ready releases.",
        "Built, maintained, and refactored reusable components and backend services to support evolving requirements and reduce regressions.",
        "Identified and resolved performance bottlenecks in APIs, database queries, and server-side logic to ensure reliable behavior under high-traffic conditions.",
      ],
    },
    {
      role: "Full Stack Developer (Intern)",
      company: "DigiMantra Labs",
      period: "Jul 2024 – Mar 2025",
      location: "Mohali, India",
      current: false,
      bullets: [
        "Supported development of web app features by implementing frontend components and backend logic using modern JavaScript frameworks.",
        "Integrated user interfaces with backend APIs to enable smooth end-to-end functionality across application modules.",
        "Assisted in troubleshooting issues, refactoring code, and improving application reliability and maintainability.",
      ],
    },
  ],

  /* ── Projects ── */
  projects: [
    {
      number: "01",
      title: "Multi-Jurisdiction Trademark Management Platform",
      description:
        "A production-grade trademark docket and portfolio management system supporting multi-jurisdiction workflows across USPTO, EUIPO, and WIPO — with jurisdiction-specific validation and automated renewal logic.",
      highlights: [
        "Scalable bulk import engine for CSV & Excel with canonical column mapping, duplicate detection, and row-level error reporting",
        "Jurisdiction-aware renewal & deadline calculations ensuring regulatory compliance across multiple trademark offices",
        "Enterprise reliability: async processing, progress tracking, secure file handling, and comprehensive audit trails",
      ],
      tech: ["TypeScript", "Node.js", "React", "PostgreSQL", "Express.js", "REST APIs"],
      caseStudy: {
        problem:
          "Law firms and IP professionals were managing entire trademark portfolios across USPTO, EUIPO, and WIPO in spreadsheets — leading to missed renewal deadlines, compliance failures, and expensive legal penalties for their clients.",
        solution:
          "Built a centralised multi-jurisdiction platform with automated deadline tracking, a bulk import engine, jurisdiction-specific renewal logic, and role-based access — replacing fragmented spreadsheet workflows with a single source of truth.",
        challenges: [
          "Each trademark office has different renewal windows, fee structures, and deadline rules — encoding all of this accurately without errors required deep research and careful data modelling.",
          "Bulk CSV/Excel imports arrived in wildly different column formats from different firms — building a canonical mapping engine that handled every edge case was the hardest engineering problem on the project.",
          "Missed deadline alerts have real legal consequences — ensuring zero false negatives in the notification system required extensive edge-case testing.",
        ],
        results: [
          "Eliminated manual deadline tracking across entire trademark portfolio",
          "Bulk import engine handles thousands of records with row-level error reporting",
          "Jurisdiction-specific validation reduced compliance errors to zero post-launch",
          "Async processing pipeline handles large file uploads without blocking the UI",
        ],
      },
      architecture: [
        { label: "React + TypeScript", layer: "Frontend",       color: "#00d4ff" },
        { label: "Node.js + Express",  layer: "API Layer",      color: "#00ff88" },
        { label: "JWT + RBAC",         layer: "Auth",           color: "#a78bfa" },
        { label: "PostgreSQL",         layer: "Database",       color: "#f59e0b" },
        { label: "CSV / Excel Parser", layer: "File Processor", color: "#f87171" },
      ],
    },
    {
      number: "02",
      title: "Subscription-Based Digital RPG Content & Creator Marketplace",
      description:
        "A production-grade digital RPG platform combining character management, subscriptions, and creator monetization in a single system — built for security, scalability, and seamless user experience.",
      highlights: [
        "Modular character data model with secure sharing, ownership validation, and role-based access control",
        "Subscription-driven digital marketplace with secure payments and automated library provisioning",
        "End-to-end creator publishing & payout workflow with admin approvals and automated disbursements",
      ],
      tech: ["TypeScript", "Next.js", "MongoDB", "Node.js", "JWT", "RBAC"],
      caseStudy: {
        problem:
          "RPG content creators had no dedicated platform to monetise digital assets — they were selling through generic marketplaces with no character management, subscription billing, or automated payout systems.",
        solution:
          "Built an end-to-end RPG creator economy — character sheets, digital marketplace, Stripe subscription lifecycle, role-based access for buyers/creators/admins, and automated creator payouts in a single cohesive system.",
        challenges: [
          "Designing the full subscription lifecycle — handling failed payments, cancellations, dunning, webhook retries, and library access revocation without data loss or inconsistent state.",
          "The RBAC system needed granular permissions for three distinct user types (buyer, creator, admin) across shared data models — a single oversight would expose content or payouts incorrectly.",
          "Creator payout automation required tracking per-creator sales, applying holding periods, and triggering disbursements on schedule — all without manual intervention.",
        ],
        results: [
          "Full payment flow from subscription purchase through to automated creator payout",
          "Role-based access control securing all three user tiers with zero privilege escalation",
          "Automated billing system with webhook-driven lifecycle — zero manual payment intervention",
          "Creator publishing pipeline with admin approval gates and audit trail",
        ],
      },
      architecture: [
        { label: "Next.js + TypeScript", layer: "Frontend",    color: "#00d4ff" },
        { label: "Node.js + Express",    layer: "API Layer",   color: "#00ff88" },
        { label: "JWT + RBAC",           layer: "Auth",        color: "#a78bfa" },
        { label: "Stripe Webhooks",      layer: "Payments",    color: "#f59e0b" },
        { label: "MongoDB",              layer: "Database",    color: "#f87171" },
      ],
    },
  ],

  /* ── Timeline / Journey ── */
  timeline: [
    {
      year: "2021",
      title: "Started Computer Science Engineering",
      detail: "Joined Thapar Institute of Engineering & Technology, Patiala. Began deep-diving into DSA, OOP, and software fundamentals.",
      type: "education",
    },
    {
      year: "2022",
      title: "Built First Full-Stack Projects",
      detail: "Learned React, Node.js, and PostgreSQL by building real projects. Fell in love with the backend — APIs, databases, and system design.",
      type: "milestone",
    },
    {
      year: "2023",
      title: "Mastered DSA & System Design Fundamentals",
      detail: "Completed comprehensive DSA practice, studied scalable system design patterns, and started contributing to team projects.",
      type: "milestone",
    },
    {
      year: "Jul 2024",
      title: "Graduated — B.E. Computer Science",
      detail: "Graduated from TIET with 7.73 CGPA. Immediately joined DigiMantra Labs as a Full Stack Developer Intern.",
      type: "education",
    },
    {
      year: "Jul 2024",
      title: "Joined DigiMantra Labs as Intern",
      detail: "Started as Full Stack Developer Intern — shipped production features from week one across React, Node.js, and PostgreSQL.",
      type: "work",
    },
    {
      year: "Late 2024",
      title: "Shipped Trademark Management Platform",
      detail: "Architected and delivered the multi-jurisdiction trademark platform — bulk import engine, deadline automation, and RBAC across USPTO, EUIPO, and WIPO.",
      type: "project",
    },
    {
      year: "Mar 2025",
      title: "Promoted to Full Stack Developer",
      detail: "Recognised for production impact and promoted to Full Stack Developer. Took ownership of end-to-end feature development and system reliability.",
      type: "work",
    },
    {
      year: "2025",
      title: "Shipped RPG Creator Marketplace",
      detail: "Designed and built the complete Stripe subscription lifecycle, RBAC system, character management, and creator payout automation.",
      type: "project",
    },
  ],

  /* ── Engineering Principles ── */
  principles: [
    {
      icon: "◈",
      title: "API-First Development",
      desc: "Design the contract before writing a single line of implementation. Clean, versioned, and documented APIs are the foundation every system I build starts from.",
    },
    {
      icon: "⬡",
      title: "Security by Default",
      desc: "Authentication, authorisation, input validation, and audit trails are built in from day one — never bolted on as an afterthought.",
    },
    {
      icon: "△",
      title: "Build for Scale",
      desc: "Every schema, route, and service boundary is designed with growth in mind — normalised data, indexed queries, and stateless services.",
    },
    {
      icon: "◻",
      title: "Production Reliability",
      desc: "Async processing, graceful error handling, and comprehensive logging — systems I ship behave correctly under load, not just in demos.",
    },
    {
      icon: "◯",
      title: "Code That Lasts",
      desc: "Readable, typed, and maintainable code survives team changes. I write for the next developer as much as for the machine.",
    },
    {
      icon: "⊕",
      title: "Measure Before Optimising",
      desc: "Profile first, fix what matters. I identify real bottlenecks in API response times and query plans rather than optimising by instinct.",
    },
  ],

  /* ── Terminal commands ── */
  terminal: {
    prompt: "eknoor@portfolio:~$",
    welcome: [
      "Welcome to Eknoor Singh's interactive terminal.",
      'Type "help" to see available commands.',
    ],
    commands: {
      help: {
        output: [
          "Available commands:",
          "",
          "  whoami       — Who I am",
          "  skills       — My technical stack",
          "  experience   — Where I've worked",
          "  projects     — What I've built",
          "  contact      — How to reach me",
          "  metrics      — Numbers that matter",
          "  clear        — Clear the terminal",
        ],
      },
      whoami: {
        output: [
          "Eknoor Singh",
          "Full Stack Engineer — DigiMantra Labs, Mohali",
          "",
          "1+ year building production-grade systems.",
          "Focused on APIs, backend architecture, and scalable data design.",
        ],
      },
      skills: {
        output: [
          "Languages   →  TypeScript, JavaScript (ES6+)",
          "Frontend    →  React.js, Next.js, Tailwind CSS",
          "Backend     →  Node.js, Express.js, REST APIs",
          "Databases   →  PostgreSQL, MongoDB, MySQL",
          "Auth        →  JWT, RBAC, Input Validation",
          "Tools       →  Git, Postman, VS Code, Bitbucket",
        ],
      },
      experience: {
        output: [
          "DigiMantra Labs — Full Stack Developer",
          "Mar 2025 – Present · Mohali, India",
          "",
          "DigiMantra Labs — Full Stack Developer (Intern)",
          "Jul 2024 – Mar 2025 · Mohali, India",
          "",
          "Thapar Institute of Engineering & Technology",
          "B.E. Computer Science Engineering · 7.73 CGPA · 2021–2024",
        ],
      },
      projects: {
        output: [
          "01 — Multi-Jurisdiction Trademark Management Platform",
          "     TypeScript · Node.js · React · PostgreSQL",
          "",
          "02 — Subscription-Based RPG Creator Marketplace",
          "     TypeScript · Next.js · MongoDB · Stripe · RBAC",
        ],
      },
      contact: {
        output: [
          { text: "Email    →  eknoor.singh.dev@gmail.com",   href: "mailto:eknoor.singh.dev@gmail.com" },
          { text: "GitHub   →  github.com/eknoor-singh",     href: "https://github.com/eknoor-singh" },
          { text: "LinkedIn →  linkedin.com/in/eknoor-singh", href: "https://linkedin.com/in/eknoor-singh" },
          { text: "Location →  Mohali, Punjab, India", href: "https://www.google.com/maps/place/Mohali,+Punjab" },
        ],
      },
      metrics: {
        output: [
          "25+  REST APIs developed",
          "3    Production systems shipped",
          "10+  Technologies in stack",
          "1+   Year of professional experience",
        ],
      },
    },
  },

  education: {
    school: "Thapar Institute of Engineering & Technology",
    degree: "B.E. in Computer Science Engineering",
    location: "Patiala, India",
    period: "July 2021 – July 2024",
    cgpa: "7.73",
    courses: ["Data Structures & Algorithms", "Operating Systems", "Database Management Systems", "OOP", "Web Development", "Software Engineering"],
  },
};
