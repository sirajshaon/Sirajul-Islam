/* ================================================================
   data.js  —  SINGLE SOURCE OF TRUTH
   ================================================================
   Edit ONLY this file to update your entire portfolio website.
   Every page (Home, Resume, CV, Projects, Blog, Gallery…) reads
   from this file automatically. No other files need to be touched
   for content changes.

   HOW TO EDIT:
   ─ Personal info     →  SiteData.personal
   ─ Add a project     →  SiteData.projects  (add an object to the array)
   ─ Add a blog post   →  SiteData.blog      (add an object to the array)
   ─ Add a skill       →  SiteData.skills
   ─ Add a certificate →  SiteData.certifications
   ─ Change gallery    →  SiteData.gallery.substation / portrait / lifestyle / sports
   ─ Change services   →  SiteData.services
   ─ Change social     →  SiteData.social
   ================================================================ */

const SiteData = {

  /* ── PERSONAL INFO ──────────────────────────────────────── */
  personal: {
    name:          "Sirajul Islam",
    tagline:       "Engineer · Designer · Problem Solver",
    role:          "Sub-Assistant Engineer",
    org:           "Power Grid Bangladesh PLC",
    orgShort:      "PGB PLC",
    substation:    "Beanibazar 132/33kV Grid Substation",
    location:      "Beanibazar, Sylhet, Bangladesh",
    email:         "siraj.shaon.duet@gmail.com",
    whatsapp:      "8801920024283",   // replace with real number
    web3formsKey:  "fb020632-c129-4772-8e5f-162770f9cfeb",  // get from web3forms.com

    /* Hero rotating titles */
    rotatingTitles: [
      "Power System Engineer",
      "Grid Substation Professional",
      "Electrical Engineer",
      "Creative Technologist",
      "Problem Solver",
    ],

    /* About section paragraphs */
    bio: [
      "I am an Electrical & Electronic Engineer and power sector professional, holding a B.Sc. in Electrical & Electronic Engineering from Dhaka University of Engineering & Technology (DUET) and a Diploma in Electrical Engineering from Sylhet Polytechnic Institute. I currently serve as a Sub-Assistant Engineer at Power Grid Bangladesh PLC, contributing to the operation and reliability of Bangladesh's national power transmission network at the Beanibazar 132/33kV Grid Substation under GMD Sylhet.",
      "My academic and professional journey has provided a strong blend of theoretical expertise and hands-on experience in power systems, electrical equipment, grid operations, and infrastructure development. Beyond my responsibilities in substation operation and maintenance, I am deeply interested in smart grid technologies, automation, digital transformation, and innovative engineering solutions that enhance the efficiency and sustainability of modern power systems.",    ],
    
      quote:   "Believe In Yourself",

    /* Career summary (used in resume & CV) */
    summary: "Electrical & Electronic Engineer with a strong blend of academic excellence and practical power-sector experience, currently serving in Bangladesh's national power transmission network at Power Grid Bangladesh PLC. Experienced in high-voltage substation operations, power system reliability, protection engineering, fault investigation, and electrical asset management. Recognized for strong analytical capabilities, technical adaptability, and a proactive approach to solving complex engineering challenges. Passionate about advancing power system efficiency, grid modernization, automation, and sustainable energy infrastructure while contributing to organizational growth and operational excellence.",

    /* Tags shown under About */
    chips: ["Smart Grid","Power Systems","Grid Operations","Automation","PLC","MATLAB","Web Design","Innovation"],

    /* Stats bar */
    stats: [
      { val: "2 Years",    lbl: "at British Council" },
      { val: "1+ Years",    lbl: " at PGB PLC" },
      { val: "132kV", lbl: "Grid Operations" },
      { val: "DUET",  lbl: "B.Sc. EEE" },
      { val: "6+",    lbl: "Technical Skills" },
    ],

    /* Languages */
    languages: [
      { name: "Bengali", level: "Native",       pct: 100 },
      { name: "English", level: "Professional",  pct: 82  },
      { name: "Hindi",  level: "Basic",         pct: 58  },
    ],

    /* Soft skills (resume sidebar) */
    softSkills: [
      "🧠 Analytical Thinking","🤝 Team Leadership","🎯 Problem Solving",
      "📣 Communication","⏱ Time Management","🔄 Adaptability",
      "🌐 Cross-cultural","🔬 Research Mindset",
    ],

    /* Interests chips */
    interests: ["Smart Grid","IoT","Cricket 🏏","Web Design","Research","Innovation"],

    /* Sports section */
    sports: {
      icon:  "🏏",
      title: "Cricket — Team Player & Strategic Thinker",
      desc:  "The sport reinforces strategic thinking, composure under pressure, discipline, and the teamwork that directly translates to professional engineering environments.",
      image: "assets/images/sports/sports.jpg",
      motto: "DISCIPLINE · TEAMWORK · RESILIENCE",
    },

    /* Personality trait cards */
    traits: [
      { icon:"🏏", title:"Cricket",    desc:"Strategic thinker. Team player. Calm under the fiercest pressure." },
      { icon:"🎯", title:"Focus",      desc:"Engineering precision applied to every decision in life." },
      { icon:"🤝", title:"Leadership", desc:"Campus leader, team captain, project coordinator." },
      { icon:"📚", title:"Learning",   desc:"Continuous growth mindset. Curious. Never stops evolving." },
    ],
  },

  /* ── SOCIAL LINKS ───────────────────────────────────────── */
  /* imgSrcs: list in priority order. Falls back down the list, then to branded placeholder */
  social: [
    {
      name:"LinkedIn",   handle:"@sisirajshaon",       badge:"Professional",
      url:"https://www.linkedin.com/in/sisirajshaon/",
      imgSrcs:["assets/images/profile/profile_1.jpg"],
      color:"#0A66C2", abbr:"LI",
    },
    {
      name:"GitHub",     handle:"@sirajshaon",          badge:"Open Source",
      url:"https://github.com/sirajshaon",
      imgSrcs:["https://github.com/sirajshaon.png"],
      color:"#238636", abbr:"GH",
    },
    {
      name:"Facebook",   handle:"@sisirajshaon",        badge:"Social",
      url:"https://www.facebook.com/sisirajshaon",
      imgSrcs:["assets/images/profile/profile_2.jpg",
               "https://graph.facebook.com/sisirajshaon/picture?type=large"],
      color:"#1877F2", abbr:"FB",
    },
    {
      name:"Instagram",  handle:"@sisirajshaon",        badge:"Lifestyle",
      url:"https://www.instagram.com/sisirajshaon/",
      imgSrcs:["assets/images/lifestyle/lifestyle_1.png"],
      color:"#E4405F", abbr:"IG",
      gradient:"linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
    },
    {
      name:"YouTube",    handle:"@sirajulislamshaon",   badge:"Video",
      url:"https://www.youtube.com/@sirajulislamshaon8653",
      imgSrcs:["assets/images/profile/profile_1.jpg"],
      color:"#FF0000", abbr:"YT",
    },
    {
      name:"Twitter / X",handle:"@amrabangali8",        badge:"Thoughts",
      url:"https://x.com/amrabangali8",
      imgSrcs:["https://unavatar.io/twitter/amrabangali8",
               "assets/images/profile/profile_2.jpg"],
      color:"#000", abbr:"X",
    },
  ],

  /* ── SKILLS ─────────────────────────────────────────────── */
  /* level: 0–100 (shown as progress bar) */
  skills: [
    { icon:"⚡", name:"Power Systems",       sub:"Transmission, distribution & protection", level:80 },
    { icon:"🔧", name:"Grid Operations",      sub:"132/33kV substation management",           level:85 },
    { icon:"📐", name:"Electrical Design",    sub:"Schematic & layout engineering",            level:75 },
    { icon:"📊", name:"MATLAB",               sub:"Simulation & system modelling",             level:60 },
    { icon:"📋", name:"MS Excel / Visio",     sub:"Data analysis & technical diagrams",        level:85 },
    { icon:"🌐", name:"Web Design",           sub:"HTML, CSS, modern frameworks",              level:62 },
    { icon:"🎓", name:"Tutoring",             sub:"Physics, Math & Electrical eng.",           level:92 },
  ],

  /* ── SOFTWARE / TOOLS ────────────────────────────────────── */
  softwareSkills: [
    { icon:"📊", name:"MATLAB / Simulink" },
    { icon:"📋", name:"Microsoft Excel" },
    { icon:"📐", name:"MS Visio" },
    { icon:"📄", name:"MS Word / PowerPoint" },
    { icon:"🖥",  name:"SCADA / HMI Systems" },
    { icon:"⚙",  name:"PLC Programming" },
    { icon:"🌐", name:"HTML / CSS" },
    { icon:"🐙", name:"GitHub" },
  ],

  /* ── EXPERIENCE (Timeline) ──────────────────────────────── */
  experience: [
    {
      date:   "April 2025 — Present",
      role:   "Sub-Assistant Engineer",
      org:    "⚡ Power Grid Bangladesh PLC",
      detail: "Beanibazar 132/33kV Grid Substation, Power Grid, GMD Sylhet",
      desc:   "Operations, maintenance, and monitoring of the 132/33kV grid substation. Fault analysis, protective relay coordination, and substation automation. Ensuring stable electricity transmission across the regional grid network.",
      bullets:[
        "Day-to-day operations and preventive maintenance of 132/33kV grid substation equipment",
        "Real-time monitoring of grid parameters — voltage, current, power factor, frequency",
        "Fault identification, isolation, root-cause analysis, and grid restoration procedures",
        "Coordination during planned maintenance shutdowns and transformer inspections",
        "Preparation of daily operational logs, maintenance reports, and outage records",
      ],
    },
    {
      date:   "October 2023 — April 2025",
      role:   "Exam Invigilator",
      org:    "🌍 British Council Bangladesh",
      detail: "Sylhet",
      desc:   "Conducted invigilation for various educational assessments under the British Council. Developed cross-cultural communication, leadership, and public speaking skills.",
      bullets:[
        "Strengthened cross-cultural communication, facilitation, time management, and public speaking skills",
      ],
    },
  ],

  /* ── EDUCATION (Timeline) ───────────────────────────────── */
  education: [
    {
      date:        "March 2018 — June 2022",
      degree:      "B.Sc. in Electrical & Electronic Engineering",
      institution: "🎓 Dhaka University of Engineering & Technology (DUET), Gazipur",
      desc:        "Built upon prior engineering foundations through advanced coursework in power systems, control engineering, power electronics, and signal processing, with a focus on system modeling, design optimization, and analytical problem-solving. Actively engaged in technical projects, engineering competitions, professional development activities, and student leadership programs.",
    },
    {
      date:        "September 2011 — September 2015",
      degree:      "Diploma in Electrical Engineering",
      institution: "🏫 Sylhet Polytechnic Institute, Sylhet",
      desc:        "Acquired comprehensive engineering knowledge through a four-year diploma program encompassing both advanced theoretical studies and extensive practical training in electrical circuits, power systems, electrical machines, transformers, switchgear, industrial automation, protection systems, power transmission, distribution networks, and energy management technologies.",
    },
  ],

  /* ── ACTIVITIES & LEADERSHIP ────────────────────────────── */
  activities: [
    "Active coordinator and member of the DUET Robotics Club — organized technical workshops, seminars",
    "Volunteer facilitator for community education programs under British Council Bangladesh",
    "Peer tutor for junior engineering students — Physics, Mathematics, and Electrical fundamentals",
    "Contributor to student magazine and technical publication during university and professional years",
    "Cricket team member — Jangirai Cricket Club and Beanibazar Grid Substation Team — fostering teamwork, discipline, and strategic thinking",
  ],

  /* ── PROJECTS ────────────────────────────────────────────── */
  /*
    featured: true  → shown in Homepage teaser (first 3 with featured:true)
    cat: "power" | "automation" | "research" | "design"
    image: path relative to site root (assets/images/...)
  */
  projects: [
    // {
    //   id:       "substation-analysis",
    //   featured: true,
    //   cat:      "power",
    //   icon:     "⚡",
    //   tag:      "Power Systems",
    //   title:    "132/33kV Grid Substation Analysis",
    //   desc:     "Fault identification, protection coordination & reliability study for the Beanibazar grid substation — including relay settings optimisation.",
    //   fullDesc: "Comprehensive operational analysis and fault identification study for the Beanibazar 132/33kV grid substation. The study covers protection coordination, load flow analysis, fault level calculations, and reliability assessment of all primary equipment — including transformer protection, bus protection, and feeder protection schemes. Outcomes contributed to improved relay settings and reduced fault clearance time.",
    //   tech:     ["MATLAB","MS Excel","Protective Relay Testing"],
    //   image:    "assets/images/substation/substation_1.jpg",
    // },
    {
      id:       "smart-grid-monitor",
      featured: true,
      cat:      "automation",
      icon:     "📡",
      tag:      "Automation",
      title:    "Smart Grid Monitoring System",
      desc:     "IoT-based real-time monitoring for substation parameters with automated alert mechanisms and a web-based visualisation dashboard.",
      fullDesc: "IoT-based real-time monitoring system for grid substation parameters — continuously tracking voltage, current, power factor, and frequency. The system features automated alert thresholds, historical data logging, and a web-based visualisation dashboard. Architecture supports future SCADA integration and remote switching functionality.",
      tech:     ["IoT","Python","SCADA","HMI Design","Node.js","HTML/CSS"],
      image:    "",
    },
    {
      id:       "portfolio-website",
      featured: true,
      cat:      "design",
      icon:     "🌐",
      tag:      "Web Design",
      title:    "Personal Portfolio — Digital Identity",
      desc:     "This very portfolio — a futuristic digital experience where engineering precision meets cinematic aesthetics.",
      fullDesc: "A futuristic, cinematic personal portfolio built with a data-driven architecture. Features a custom animated particle canvas, glassmorphism UI components, dark/light mode, animated typewriter hero, interactive gallery with lightbox, smart social card loading, Web3Forms contact integration, and a fully print-optimised CV page. All content managed from a single data.js file.",
      tech:     ["HTML5","CSS3 (8 modules)","JavaScript (ES6+)","Web3Forms","Canvas API","CSS Grid", "Claude AI for content generation"],
      image:    "",
    },
    {
      id:       "renewable-integration",
      featured: true,
      cat:      "research",
      icon:     "🔋",
      tag:      "Research",
      title:    "Renewable Energy Integration Study",
      desc:     "Grid impact study for solar integration into the 132kV Sylhet transmission network — voltage stability, protection modifications.",
      fullDesc: "Technical feasibility and grid impact study for integrating solar energy sources into the existing 132kV transmission infrastructure in the Sylhet region of Bangladesh. The study analyses voltage stability, reactive power compensation, harmonic distortion, and protection system modifications required for safe integration of variable renewable generation.",
      tech:     ["MATLAB/Simulink","Load Flow Analysis","Power Quality","MS Word"],
      image:    "",
    },
    // {
    //   id:       "scada-hmi",
    //   featured: false,
    //   cat:      "automation",
    //   icon:     "🖥",
    //   tag:      "Automation",
    //   title:    "SCADA HMI Interface Design",
    //   desc:     "Design and configuration of SCADA HMI screens for substation monitoring — real-time visibility, remote switching, and automated alarms.",
    //   fullDesc: "Design and configuration of SCADA HMI (Human-Machine Interface) screens for substation monitoring. The system enables real-time visibility of all grid parameters including breaker status, transformer loading, voltage profiles, and energy metering. Supports remote switching operations and automated alarm annunciation for protection events.",
    //   tech:     ["SCADA","HMI Design","WinCC","Modbus Protocol","IEC 61850"],
    //   image:    "",
    // },
    // {
    //   id:       "relay-coordination",
    //   featured: false,
    //   cat:      "power",
    //   icon:     "🔌",
    //   tag:      "Power Systems",
    //   title:    "Protective Relay Coordination",
    //   desc:     "Setting optimisation for overcurrent, differential, and distance relays — minimising fault clearing time while maintaining selectivity.",
    //   fullDesc: "Systematic study and setting optimisation for overcurrent, differential, earth fault, and distance protective relays installed in the 132/33kV substation. The project focused on minimising fault clearing time while maintaining selectivity between protection zones. Relay coordination curves were modelled and validated against short circuit study results.",
    //   tech:     ["Relay Testing","ETAP","MATLAB","IEC Coordination Standards","MS Excel"],
    //   image:    "",
    // },
    {
      id:       "power-quality",
      featured: false,
      cat:      "research",
      icon:     "📊",
      tag:      "Research",
      title:    "Power Quality Analysis",
      desc:     "Field measurement of voltage sag, THD, and power factor at industrial loads — with recommendations for capacitor bank and filter placement.",
      fullDesc: "Field measurement and analysis of power quality parameters at industrial consumer connection points fed from the 33kV distribution network. The study quantified voltage sag, total harmonic distortion (THD), power factor variation, and transient events. Recommendations developed for capacitor bank sizing and harmonic filter placement.",
      tech:     ["Power Quality Analyser","MATLAB","Harmonic Analysis","IEC 61000","MS Excel"],
      image:    "",
    },
    {
      id:       "plc-motor-control",
      featured: false,
      cat:      "automation",
      icon:     "⚙",
      tag:      "Automation",
      title:    "PLC-Based Motor Control System",
      desc:     "PLC automation of industrial pump station — ladder logic, interlocks, HMI monitoring, and overload protection for safe operation.",
      fullDesc: "Design and implementation of a PLC-based motor control system for industrial pump station automation. The system manages start/stop sequences, overload protection, remote monitoring via HMI, and interlock logic for safe operation. Programmed using ladder logic and tested against real-world operational scenarios.",
      tech:     ["PLC Programming","Ladder Logic","HMI","Industrial Automation","Siemens S7"],
      image:    "",
    },
  ],

  /* ── BLOG POSTS ──────────────────────────────────────────── */
  /*
    featured: true  → shown as the featured article on the blog page
                       (only the first with featured:true is used)
    tag: must match a filter button in blog.html → power-systems | smart-grid | career | technology | personal
    body: array of paragraph strings. Each string = one paragraph.
  */
  blog: [
    {
      id:       "substation-ops",
      featured: true,
      tag:      "power-systems",
      tagLabel: "Power Systems",
      title:    "Understanding 132/33kV Substation Operations: A Field Engineer's Perspective",
      excerpt:  "A comprehensive look at day-to-day operations, fault response, planned maintenance, and the human side of keeping Bangladesh's grid alive — from inside the Beanibazar substation.",
      date:     "May 2025",
      readTime: "8 min read",
      body: [
        "Working inside a 132/33kV grid substation every day gives you a perspective that no textbook can fully capture. The hum of the transformers, the crackle of high-voltage equipment, the precision required in every switching operation — it shapes how you think about electrical systems entirely.",
        "At Beanibazar Grid Substation, my role involves monitoring real-time parameters — voltage levels across the 132kV busbars, transformer loading, feeder power flows, and protection relay status. Every morning starts with a system health check: reviewing the previous night's event logs, checking protection relay indicators, and ensuring all metering equipment is reading correctly.",
        "Fault response is where training meets reality. When a protection relay operates, you have seconds to assess the situation — identify which feeder has tripped, check the alarm annunciation panel, and follow the correct switching sequence to isolate the fault and restore supply. The pressure is real, but so is the satisfaction when the grid comes back online cleanly.",
        "Planned maintenance shutdowns are their own discipline entirely. Every isolation point must be verified, earthing applied in the correct sequence, and work permits issued and cancelled properly. A single error in the switching sequence during live maintenance can have catastrophic consequences — which is why written procedures exist and are followed without exception.",
        "For young engineers entering this field: learn your single-line diagrams by heart. Understand why each protection relay is set the way it is. And never underestimate the importance of proper isolation procedures — safety is never a shortcut, and the grid will always demand your full respect.",
      ],
    },
    {
      id:       "smart-grid-future",
      featured: true,
      tag:      "smart-grid",
      tagLabel: "Smart Grid",
      title:    "The Future of Bangladesh's Power Grid: Smart Technologies & What's Next",
      excerpt:  "Exploring IoT sensors, SCADA upgrades, smart metering, and real-time monitoring innovations beginning to transform how Bangladesh manages its national power infrastructure.",
      date:     "July  2025",
      readTime: "6 min read",
      body: [
        "Bangladesh's power sector has made remarkable progress over the past decade — generation capacity has multiplied, grid coverage has expanded dramatically, and system losses have been reduced through targeted interventions. But the next frontier is not just more capacity. It is smarter infrastructure.",
        "The concept of a Smart Grid — where electricity flows are monitored, controlled, and optimised in real time using digital communication — is no longer a distant vision for Bangladesh. Power Grid Bangladesh is actively exploring SCADA upgrades, digital protection relays, and remote monitoring systems across its high-voltage network.",
        "At the distribution level, smart metering is being piloted in several urban zones. These Advanced Metering Infrastructure (AMI) systems allow utilities to read meters remotely, detect tampering and theft, and provide consumers with real-time usage data. The reduction in system losses alone justifies the investment.",
        "IoT-based sensor networks are beginning to appear in newer substations — measuring transformer temperatures, oil levels, dissolved gas concentrations, and busbar vibration. These sensors feed into analytics platforms that can predict equipment failures weeks in advance, enabling proactive rather than reactive maintenance.",
        "The challenges are real: cybersecurity for critical grid infrastructure, skilled human capital for digital systems, and the capital investment required for national rollout. But the direction is clear. The engineers entering the power sector today will be the ones who build and operate Bangladesh's smart grid tomorrow.",
      ],
    },
    {
      id:       "diploma-to-pgb",
      featured: true,
      tag:      "career",
      tagLabel: "Career",
      title:    "From Diploma to PGB PLC: The Journey of a Power Engineer in Bangladesh",
      excerpt:  "My personal story from Sylhet Polytechnic to DUET to Power Grid Bangladesh — and practical insights for students navigating the electrical engineering career path.",
      date:     "June 2025",
      readTime: "5 min read",
      body: [
        "My journey in electrical engineering began at Sylhet Polytechnic Institute, where I enrolled in the Diploma in Electrical Engineering program with a strong desire to understand the principles of electrical systems and contribute to the nation's infrastructure development. What started as a career aspiration gradually evolved into a lifelong commitment to engineering excellence and continuous learning.", 
        "The diploma program provided a robust combination of theoretical knowledge and practical experience. Through extensive laboratory work, industrial training, and technical projects, I developed hands-on expertise in electrical installations, circuit analysis, motor control, transformers, power distribution systems, troubleshooting, and technical documentation. This strong engineering foundation proved invaluable as I progressed to higher studies.",
        "Pursuing a B.Sc. in Electrical and Electronic Engineering at DUET expanded my perspective from practical implementation to advanced engineering analysis and system design. Coursework in power systems, control engineering, power electronics, digital signal processing, and related disciplines deepened my technical understanding and strengthened my analytical and problem-solving capabilities. Participation in engineering organizations, technical competitions, and leadership activities further enhanced my communication, teamwork, and professional development skills.",
        "Following graduation, I dedicated myself to preparing for a career in Bangladesh's power sector. Successfully joining Power Grid Bangladesh PLC required perseverance, discipline, and comprehensive preparation. The recruitment process—including preliminary screening, written examinations, and viva voce assessments—demands a strong command of engineering fundamentals, practical knowledge, and a clear understanding of the country's power transmission infrastructure. Equally important is the ability to analyze real-world engineering challenges and communicate solutions effectively.",
        "To students and aspiring engineers pursuing a similar path, my advice is simple: build your fundamentals thoroughly, remain curious, embrace continuous learning, and approach every challenge as an opportunity to grow. Strong technical foundations, consistent effort, and professional integrity will open doors to opportunities that once seemed beyond reach.",
      ],
    },
    {
      id:       "matlab-power-systems",
      featured: false,
      tag:      "technology",
      tagLabel: "Technology",
      title:    "Getting Started with MATLAB for Power System Simulation",
      excerpt:  "A practical beginner's guide to using MATLAB and Simulink for power system modelling — load flow, fault analysis, and protective relay simulation with real-world examples.",
      date:     "April 2025",
      readTime: "7 min read",
      body: [
        "MATLAB and its Simulink extension remain among the most powerful tools available to power system engineers for modelling, simulation, and analysis. Whether you are studying for an exam, conducting research, or trying to understand a real-world system behaviour, knowing your way around MATLAB is genuinely valuable.",
        "For power system applications, start with the Power Systems Toolbox (now part of Simscape Electrical). It provides pre-built blocks for transmission lines, transformers, synchronous machines, power electronic converters, and protection relays. You can assemble a complete power system model graphically without writing a single line of code.",
        "Load flow analysis is typically the starting point. MATLAB's Newton-Raphson solver can handle even large meshed networks efficiently. Begin with a simple three-bus system, verify your results by hand, then expand the model gradually.",
        "My practical advice: take a simple power system problem you already understand analytically — like a two-machine infinite-bus system — and model it in Simulink. Seeing the simulation results match your hand calculations is one of the most satisfying moments in engineering education.",
      ],
    },
    // {
    //   id:       "relay-coordination-guide",
    //   featured: false,
    //   tag:      "smart-grid",
    //   tagLabel: "Smart Grid",
    //   title:    "Protective Relay Coordination: A Practical Engineer's Guide",
    //   excerpt:  "Approaching protection coordination studies — overcurrent relay time-current curves, selectivity, discrimination margins, and tools engineers use in real substation environments.",
    //   date:     "January 2025",
    //   readTime: "9 min read",
    //   body: [
    //     "Protection coordination is one of the most critical — and most intellectually demanding — aspects of power system engineering. The goal is deceptively simple: when a fault occurs anywhere in the system, only the relay closest to the fault should operate, clearing it as quickly as possible while leaving the rest of the system intact.",
    //     "In practice, achieving this selectivity requires careful study of every relay in the system and how their time-current characteristics interact. For overcurrent relays, the inverse-time characteristic provides the discrimination between zones.",
    //     "The coordination process begins with a short circuit study. You need to know the maximum and minimum fault current at every bus — because your relay settings must discriminate correctly under both conditions. Using only maximum fault current for coordination is a common mistake that leads to misoperations during low-fault-current conditions.",
    //     "The most useful tool for visualisation is plotting the time-current curves of adjacent relays on the same graph. The operating time of the downstream relay at any given current level must always be less than the upstream relay, with a coordination time interval (CTI) of at least 0.3 seconds.",
    //   ],
    // },
    {
      id:       "cricket-engineering",
      featured: false,
      tag:      "personal",
      tagLabel: "Personal",
      title:    "What Cricket Teaches an Engineer About Pressure, Patience & Precision",
      excerpt:  "The unexpected lessons from 22 yards of cricket pitch that shape how I approach fault diagnosis, decision-making under pressure, and team leadership in the substation.",
      date:     "April 2025",
      readTime: "4 min read",
      body: [
        "I have played cricket since I was a teenager, and the longer I work as a power engineer, the more I notice the parallels between the two pursuits. Both demand calm under pressure. Both reward preparation over reaction. Both punish overconfidence instantly.",
        "On the pitch, a batsman facing a fast bowler has fractions of a second to read the delivery, decide on a shot, and execute it — all while managing the mental pressure of a match situation. In a substation, when a protection relay operates and alarms are sounding, you similarly have seconds to assess the situation correctly and take the right action. The calm required is the same.",
        "The concept of patience translates directly too. A good batsman knows when to defend and when to attack — not every ball requires a scoring shot. A good engineer knows when to act immediately and when to gather more information before intervening.",
        "Perhaps most importantly: in cricket, you study your opponent. You analyse their patterns, their weaknesses, their tendencies under pressure. In engineering, you study your system the same way — its failure modes, its weak points, its behaviour under abnormal conditions.",
      ],
    },
  ],

  /* ── SERVICES ────────────────────────────────────────────── */
  services: [
    // {
    //   icon:     "⚡",
    //   title:    "Engineering Consultation",
    //   desc:     "Expert technical advice on power system design, grid infrastructure challenges, fault analysis, and protective relay coordination. From concept feasibility to implementation guidance.",
    //   features: ["Power system design review","Fault analysis & diagnosis","Protection relay coordination","Load flow & stability study"],
    // },
    {
      icon:     "🔋",
      title:    "Power Systems Analysis",
      desc:     "Comprehensive load flow studies, short circuit analysis, power quality assessment, and energy audit services for industrial, commercial, and utility power systems.",
      features: ["Short circuit calculations","Load flow & voltage profile","Harmonic & power quality","Energy audit reporting"],
    },
    {
      icon:     "🎓",
      title:    "Technical Tutoring",
      desc:     "One-on-one and group mentoring in Electrical Engineering fundamentals, Physics, Mathematics, and career navigation for diploma and undergraduate students.",
      features: ["Electrical Engineering concepts","Physics & Mathematics","MATLAB & simulation","Career guidance for EEE"],
    },
    {
      icon:     "🌐",
      title:    "Web Design",
      desc:     "Modern, responsive, and beautifully crafted websites for professionals and engineers. Clean semantic code meets thoughtful, minimal design.",
      features: ["Portfolio & personal sites","Responsive mobile-first design","Modern UI / glassmorphism","HTML · CSS · JS · Claude AI"],
    },
    {
      icon:     "🔬",
      title:    "Technical Guidance",
      desc:     "Helping engineers and fresh graduates navigate technical challenges, thesis/project development, professional certification paths, and long-term career strategies.",
      features: ["Final year project support","Research paper guidance","Job preparation support","Professional development"],
    },
    // {
    //   icon:     "📡",
    //   title:    "Smart Grid Advisory",
    //   desc:     "Advisory services on IoT-based grid monitoring, smart metering systems, SCADA integration, and automation solutions for modernising electrical infrastructure.",
    //   features: ["IoT-based monitoring systems","SCADA integration advisory","Smart meter deployment","Grid automation roadmap"],
    // },
  ],

  /* ── CERTIFICATIONS ──────────────────────────────────────── */
  /* cat: "engineering" | "professional" | "education" | "workshop" */
  certifications: [
    {
      cat:    "engineering",
      image:  "assets/images/certifications/cert_engineering_1.jpg",
      icon:   "🎓",
      type:   "Degree Certificate",
      title:  "B.Sc. in Electrical & Electronic Engineering",
      issuer: "DUET — Dhaka University of Engineering & Technology · 2022",
    },
    {
      cat:    "engineering",
      image:  "assets/images/certifications/cert_engineering_2.jpg",
      icon:   "📜",
      type:   "Diploma Certificate",
      title:  "Diploma in Electrical Engineering",
      issuer: "Sylhet Polytechnic Institute · 2015",
    },
    {
      cat:    "professional",
      image:  "assets/images/certifications/cert_pgb.jpg",
      icon:   "⚡",
      type:   "Appointment Letter",
      title:  "Sub-Assistant Engineer — Appointment",
      issuer: "Power Grid Bangladesh PLC · 2025",
    },
    {
      cat:    "professional",
      image:  "assets/images/certifications/cert_british_council.jpg",
      icon:   "🌍",
      type:   "Experience Certificate",
      title:  "Program Associate Certificate",
      issuer: "British Council Bangladesh · 2025",
    },
    // {
    //   cat:    "workshop",
    //   image:  "",
    //   icon:   "🔧",
    //   type:   "Workshop Certificate",
    //   title:  "Power System Protection Workshop",
    //   issuer: "Add certificate image to assets/images/certifications/",
    // },
    // {
    //   cat:    "workshop",
    //   image:  "",
    //   icon:   "📡",
    //   type:   "Training Certificate",
    //   title:  "SCADA Systems Training",
    //   issuer: "Add certificate image to assets/images/certifications/",
    // },
    // {
    //   cat:    "workshop",
    //   image:  "",
    //   icon:   "🏆",
    //   type:   "Achievement Award",
    //   title:  "Engineering Competition Award",
    //   issuer: "Add certificate image to assets/images/certifications/",
    // },
  ],

  /* ── GALLERY ─────────────────────────────────────────────── */
  /* src: path relative to site root. caption + sub shown on hover. */
  gallery: {
    substation: [
      { src:"assets/images/substation/substation_1.jpg", caption:"Beanibazar 132/33kV Grid Substation",  sub:"Power Grid Bangladesh PLC · Sylhet",  icon:"🏗️" },
      { src:"assets/images/substation/substation_2.jpg", caption:"Substation Operations",                sub:"Control Room · Grid Operations",        icon:"⚡" },
      { src:"assets/images/substation/substation_3.jpg", caption:"Switchgear & Protection Panel",        sub:"132kV Bay Equipment",                   icon:"🔧" },
    ],
    portrait: [
      { src:"assets/images/profile/profile_1.jpg",  caption:"Professional Portrait",         sub:"Sirajul Islam · Engineer",      icon:"👤" },
      { src:"assets/images/profile/profile_2.jpg",  caption:"Portrait",                      sub:"Sirajul Islam · DUET Alumnus",  icon:"👤" },
      { src:"assets/images/hero/hero_1.png",        caption:"Engineer · Designer · Dreamer", sub:"Sirajul Islam",                 icon:"🌟" },
      { src:"assets/images/hero/hero_2.jpg",        caption:"Professional",                  sub:"Sirajul Islam · Power Engineer",icon:"🎯" },
    ],
    lifestyle: [
      { src:"assets/images/lifestyle/lifestyle_1.png", caption:"Lifestyle",      sub:"Life Beyond the Grid",      icon:"🌿" },
      { src:"assets/images/lifestyle/lifestyle_2.jpg", caption:"Moments",        sub:"Everyday Life · Bangladesh", icon:"🌄" },
      { src:"assets/images/lifestyle/lifestyle_3.jpg", caption:"Journey",        sub:"Exploring Bangladesh",       icon:"🏞️" },
      { src:"assets/images/lifestyle/lifestyle_4.jpg", caption:"Calm Moments",   sub:"Lifestyle",                 icon:"☕" },
      { src:"assets/images/lifestyle/lifestyle_5.jpg", caption:"Nature",         sub:"Lifestyle · Bangladesh",    icon:"🌸" },
      { src:"assets/images/lifestyle/lifestyle_6.jpg", caption:"Life",           sub:"Moments · Lifestyle",       icon:"🌆" },
      { src:"assets/images/lifestyle/lifestyle_7.jpg", caption:"Community",      sub:"People & Places",           icon:"🤝" },
    ],
    sports: [
      { src:"assets/images/sports/sports.jpg", caption:"Cricket — The Game of Strategy", sub:"Discipline · Teamwork · Composure", icon:"🏏" },
    ],
  },

}; /* end SiteData */
