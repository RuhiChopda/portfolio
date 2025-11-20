import React, { useState, useEffect } from "react";

const PROJECTS = [
  {
    id: "defi",
    title: "Decentralized Finance (DeFi) Application",
    domain: "Blockchain",
    short: "Full-stack Web3 platform for lending, borrowing, and trading.",
    tech: ["Solidity", "Web3.js", "React", "IPFS"],
    highlights: [
      "Smart contracts for lending pools",
      "Collateral management and interest logic",
      "Wallet authentication & event listeners",
    ],
    repo: "#",
  },
  {
    id: "plant-disease",
    title: "AI-Powered Plant Disease Detection System",
    domain: "AI/ML",
    short: "Upload leaf images → model predicts disease and risk level.",
    tech: ["Python", "Flask", "TensorFlow", "OpenCV"],
    highlights: ["Custom CNN model", "Image preprocessing & pipeline", "Risk-level generation"],
    repo: "#",
  },
  {
    id: "steg-det",
    title: "Steganography Detection System",
    domain: "AI/ML",
    short: "Detect hidden information in images with ML models.",
    tech: ["Python", "Scikit-learn", "CNNs"],
    highlights: ["Research paper + college report PDF", "Multiple experiment versions"],
    repo: "#",
  },
  {
    id: "java-chatbot",
    title: "AI-Based Java Chatbot",
    domain: "AI/ML",
    short: "DJL/OpenNLP chatbot with GUI & memory persistence.",
    tech: ["Java", "DJL", "OpenNLP", "SQLite"],
    highlights: ["GUI client", "Database-backed conversation memory"],
    repo: "#",
  },
  {
    id: "code-editor",
    title: "AI Auto-Completion Code Editor",
    domain: "AI/ML",
    short: "Multi-language editor with AI suggestions & real-time collaboration.",
    tech: ["WebSockets", "Monaco", "Node.js", "REST APIs"],
    highlights: ["Real-time collaboration", "Error detection"],
    repo: "#",
  },
  {
    id: "finance-tracker",
    title: "Personal Finance Tracker with AI Insights",
    domain: "AI/ML",
    short: "ML-based spending insights and pattern detection.",
    tech: ["Python", "Pandas", "React", "MySQL"],
    highlights: ["Spending predictions", "Dashboard visualizations"],
    repo: "#",
  },
  {
    id: "portfolio",
    title: "Portfolio Website (This Site)",
    domain: "Web",
    short: "React + Tailwind portfolio showcasing all projects.",
    tech: ["React", "Tailwind", "Vite"],
    highlights: ["Responsive", "Dynamic content", "Clean UI"],
    repo: "#",
  },
];

function Tag({ children }) {
  return (
    <span className="px-2 py-1 text-sm rounded-full border border-gray-300 dark:border-gray-700">
      {children}
    </span>
  );
}

function Navbar({ theme, setTheme }) {
  return (
    <nav className="w-full py-4 flex items-center justify-between">
      <div className="text-xl font-bold">Ruhi Chopda</div>
      <div className="flex items-center gap-4">
        <a href="#projects" className="hover:underline">Projects</a>
        <a href="#about" className="hover:underline">About</a>
        <a href="#contact" className="hover:underline">Contact</a>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="px-3 py-1 border rounded"
        >
          {theme === "dark" ? "Light" : "Dark"}
        </button>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header className="py-12">
      <h1 className="text-4xl font-extrabold">Hi — I’m Ruhi Chopda</h1>
      <p className="mt-3 text-lg max-w-xl">
        I build end-to-end systems across <strong>AI/ML</strong>, <strong>Web3</strong>, and
        <strong> Full-Stack Web</strong>. Here are my major projects, research, and prototypes.
      </p>
      <div className="mt-6 flex gap-3">
        <a href="#projects" className="px-4 py-2 bg-sky-600 text-white rounded">View Projects</a>
        <a href="#contact" className="px-4 py-2 border rounded">Contact Me</a>
      </div>
    </header>
  );
}

function Filters({ domains, active, setActive }) {
  return (
    <div className="flex gap-2 flex-wrap">
      <button
        onClick={() => setActive("All")}
        className={`px-3 py-1 rounded ${active === "All" ? "bg-sky-600 text-white" : "border"}`}
      >
        All
      </button>
      {domains.map((d) => (
        <button
          key={d}
          onClick={() => setActive(d)}
          className={`px-3 py-1 rounded ${active === d ? "bg-sky-600 text-white" : "border"}`}
        >
          {d}
        </button>
      ))}
    </div>
  );
}

function ProjectCard({ p, onOpen }) {
  return (
    <div className="p-4 border rounded hover:shadow-sm">
      <h3 className="font-semibold">{p.title}</h3>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{p.short}</p>
      <div className="mt-3 flex gap-2 flex-wrap">
        {p.tech.slice(0, 3).map((t) => <Tag key={t}>{t}</Tag>)}
      </div>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-xs text-gray-500">{p.domain}</span>
        <button onClick={() => onOpen(p)} className="text-sm px-3 py-1 border rounded">
          Details
        </button>
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-11/12 md:w-3/4 lg:w-1/2">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">{project.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">{project.short}</p>
          </div>
          <button onClick={onClose} className="px-2 py-1 border rounded">Close</button>
        </div>

        <h4 className="mt-4 font-semibold">Highlights</h4>
        <ul className="list-disc ml-6 mt-2 text-sm">
          {project.highlights.map((h, i) => <li key={i}>{h}</li>)}
        </ul>

        <h4 className="mt-4 font-semibold">Tech</h4>
        <div className="mt-2 flex gap-2 flex-wrap">
          {project.tech.map((t) => <Tag key={t}>{t}</Tag>)}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState("light");
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState(null);

  const domains = Array.from(new Set(PROJECTS.map((p) => p.domain)));

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const visible = PROJECTS.filter((p) => filter === "All" || p.domain === filter);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 px-6 md:px-20 py-6">

      <Navbar theme={theme} setTheme={setTheme} />

      <Hero />

      <section id="projects" className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Projects</h2>
          <Filters domains={domains} active={filter} setActive={setFilter} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((p) => (
            <ProjectCard key={p.id} p={p} onOpen={setOpen} />
          ))}
        </div>
      </section>

      <section id="about" className="mt-12">
        <h2 className="text-2xl font-bold">About</h2>
        <p className="mt-3 max-w-2xl">
          I’m a full-stack engineer working at the intersection of AI, Web3, and product design.
          I love building systems end-to-end from idea to production.
        </p>
      </section>

      <section id="contact" className="mt-12">
        <h2 className="text-2xl font-bold">Contact</h2>
        <p className="mt-2">
          Email me at: <a href="mailto:ruhi@example.com" className="underline">ruhi@example.com</a>
        </p>
      </section>

      <footer className="mt-12 border-t pt-6 text-sm text-gray-500">
        © {new Date().getFullYear()} Ruhi Chopda — Built with ❤️
      </footer>

      <ProjectModal project={open} onClose={() => setOpen(null)} />
    </div>
  );
}
