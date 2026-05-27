export const data = {
  name: "Eknoor Singh",
  title: "Full Stack Engineer",
  email: "eknoorsingh0810@gmail.com",
  phone: "+91 99884 50529",
  github: "https://github.com/",
  linkedin: "https://linkedin.com/in/",
  location: "Mohali, India",
  bio: "Full Stack Developer with 1+ year building production-grade web applications for live client projects. I craft scalable APIs, responsive UIs, and reliable systems — from database design to deployment.",

  roles: ["Full Stack Engineer", "React Developer", "Node.js Developer", "API Architect", "TypeScript Developer"],

  stats: [
    { value: 1, suffix: "+", label: "Year of professional experience" },
    { value: 2, suffix: "+", label: "Production systems shipped" },
    { value: 10, suffix: "+", label: "Technologies in my stack" },
    { value: 3, suffix: "", label: "Multi-jurisdiction platforms" },
  ],

  about: [
    "I'm a <strong>Full Stack Developer</strong> with over a year of hands-on experience building and shipping production-grade web applications for live client projects at <strong>DigiMantra Labs, Mohali</strong>.",
    "My work spans the full stack — from designing <strong>scalable backend APIs</strong> and optimizing database queries, to building <strong>responsive, accessible front-ends</strong> with React and Next.js. I care deeply about performance, security, and long-term maintainability.",
    "I graduated from <strong>Thapar Institute of Engineering and Technology</strong> with a B.E. in Computer Science Engineering and thrive in fast-paced environments where I can ship features that make a real impact.",
  ],

  skills: [
    { icon: "⚡", name: "Languages", tags: ["TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3"] },
    { icon: "🎨", name: "Frontend", tags: ["React.js", "Next.js", "Tailwind CSS", "Bootstrap"] },
    { icon: "⚙️", name: "Backend", tags: ["Node.js", "Express.js", "RESTful APIs"] },
    { icon: "🗄️", name: "Databases", tags: ["PostgreSQL", "MongoDB", "MySQL"] },
    { icon: "🔐", name: "Auth & Security", tags: ["JWT", "RBAC", "Input Validation", "Auth Middleware"] },
    { icon: "🛠️", name: "Tools", tags: ["Git", "GitHub", "Bitbucket", "Postman", "VS Code"] },
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
    },
  ],

  education: {
    school: "Thapar Institute of Engineering & Technology",
    degree: "B.E. in Computer Science Engineering",
    location: "Patiala, India",
    period: "July 2021 – July 2024",
    cgpa: "7.73",
    courses: ["Data Structures & Algorithms", "Operating Systems", "Database Management Systems", "OOP", "Web Development", "Software Engineering"],
  },
};
