export const navLinks = [
  { id: "about", title: "About" },
  { id: "tech", title: "Skills" },
  { id: "work", title: "Work" },
  { id: "stats", title: "Stats" },
  { id: "contact", title: "Contact" },
];

export const services = [
  { title: "Backend Engineering", icon: "Server" },
  { title: "Distributed Systems", icon: "Network" },
  { title: "Event-Driven Architecture", icon: "Workflow" },
  { title: "Web Development", icon: "Globe" },
  { title: "Competitive Programming", icon: "Trophy" },
];

export const technologies = [
  { name: "Java", label: "Java", accent: "#E8B04B", icon: "/tech/java.png" },
  { name: "Spring Boot", label: "Spring", accent: "#6DB33F", icon: "/tech/spring.png" },
  { name: "Kafka", label: "Kafka", accent: "#231F20", icon: "/tech/kafka.png" },
  { name: "gRPC", label: "gRPC", accent: "#4285F4", icon: "/tech/grpc.png" },
  { name: "Redis", label: "Redis", accent: "#DC382D", icon: "/tech/redis.png" },
  { name: "MySQL", label: "MySQL", accent: "#4479A1", icon: "/tech/mysql.png" },
  { name: "PostgreSQL", label: "PgSQL", accent: "#336791", icon: "/tech/postgresql.png" },
  { name: "Docker", label: "Docker", accent: "#2496ED", icon: "/tech/docker.png" },
  { name: "React", label: "React", accent: "#61DAFB", icon: "/tech/reactjs.png" },
  { name: "TypeScript", label: "TypeSc.", accent: "#3178C6", icon: "/tech/typescript.png" },
  { name: "Python", label: "Python", accent: "#3776AB", icon: "/tech/python.png" },
  { name: "C++", label: "C++", accent: "#00599C", icon: "/tech/cpp.png" },
];

export const experiences = [
  {
    title: "SDE Intern",
    company_name: "Hugohub",
    icon: "Server",
    iconBg: "#383E56",
    date: "2026 - Present",
    points: [
      "Building production backend microservices in Java and Spring Boot.",
      "Designing gRPC service contracts and Kafka event pipelines.",
      "Working with MySQL and Redis for persistence and caching.",
      "Shipping services with integration tests and observability.",
    ],
  },
  {
    title: "B.Tech, Information Technology",
    company_name: "IIIT Lucknow",
    icon: "GraduationCap",
    iconBg: "#E6DEDD",
    date: "2022 to 2026",
    points: [
      "CGPA 8.0, focus on distributed systems, databases and algorithms.",
      "Senior Member of the Google Developer Group chapter.",
      "Graduating June 2026.",
    ],
  },
];

export const stats = [
  { platform: "Codeforces", value: "Specialist", numeric: false },
  { platform: "CodeChef", value: "3 Star", numeric: false },
  { platform: "LeetCode", value: "Knight", numeric: false },
  { platform: "Problems Solved", value: "500+", numeric: false },
];

export const projects = [
  {
    name: "MetalPulse",
    description:
      "Production-grade precious metals trading platform. Users trade gold, silver, platinum and palladium at live spot prices with portfolio analytics and an AI assistant. Every trade commits to MySQL first then publishes a TradeExecutedEvent to Kafka after commit, solving the dual-write problem. A KRaft Kafka pipeline feeds an audit log and a live Redis portfolio projection. The AI assistant runs on Spring AI and Gemini with RAG and per-user function-calling tools, guarded by Resilience4j circuit breakers, with Prometheus observability and Testcontainers integration tests.",
    tags: [
      { name: "Spring Boot", color: "blue-text-gradient" },
      { name: "Kafka", color: "green-text-gradient" },
      { name: "gRPC", color: "pink-text-gradient" },
      { name: "Redis", color: "orange-text-gradient" },
    ],
    source_code_link: "https://github.com/tattaisreeram/MetalPulse",
    live_link: null,
    accent: "#E8B04B",
  },
  {
    name: "Breathe ESG",
    description:
      "Emissions ingestion and review system. Analysts upload SAP fuel, utility and travel CSVs which are auto-parsed and normalized (gallons to litres, miles to km, MWh to kWh) with emission scope assigned by source. Bad rows are auto-flagged (negative values, missing units, invalid IATA codes, bad dates) and every status change is logged in a full audit trail. Token-authenticated DRF API, a dashboard with live counts, and a React review UI. 33 passing parser tests, deployed on Vercel and Railway.",
    tags: [
      { name: "Django", color: "green-text-gradient" },
      { name: "React", color: "blue-text-gradient" },
      { name: "PostgreSQL", color: "pink-text-gradient" },
    ],
    source_code_link: "https://github.com/tattaisreeram/Breathe-Esg",
    live_link: "https://breathe-esg-jet-eight.vercel.app",
    accent: "#2DD4BF",
  },
  {
    name: "More on GitHub",
    description:
      "Competitive programming solutions in C++ (500+ problems across Codeforces, CodeChef, and LeetCode) and smaller experimental projects in distributed systems and backend tooling.",
    tags: [
      { name: "C++", color: "blue-text-gradient" },
      { name: "Algorithms", color: "green-text-gradient" },
      { name: "Data Structures", color: "pink-text-gradient" },
    ],
    source_code_link: "https://github.com/tattaisreeram",
    live_link: null,
    accent: "#915EFF",
  },
];
