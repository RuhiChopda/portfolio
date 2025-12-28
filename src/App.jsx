import React, { useState, useEffect } from "react";

/* ===================== PROJECT DATA ===================== */

const PROJECTS = [
  {
    id: "defi",
    title: "Decentralized Finance (DeFi) Application",
    domain: "Blockchain",
    featured: true,
    short: "Full-stack Web3 platform for lending, borrowing, and trading.",
    tech: ["Solidity", "Web3.js", "React", "IPFS"],
    highlights: [
      "Smart contracts for lending pools",
      "Collateral management and interest logic",
      "Wallet authentication & event listeners",
    ],
    repo: "#",
    demo: null,
  },
  {
    id: "plant-disease",
    title: "AI-Powered Plant Disease Detection System",
    domain: "AI/ML",
    featured: true,
    short: "Upload leaf images → model predicts disease and risk level.",
    tech: ["Python", "Flask", "TensorFlow", "OpenCV"],
    highlights: [
      "Custom CNN model",
      "Image preprocessing & pipeline",
      "Risk-level generation",
    ],
    repo: "#",
    demo: null,
  },
  {
    id: "steg-det",
    title: "Steganography Detection System",
    domain: "AI/ML",
    featured: false,
    short: "Detect hidden information in images with ML models.",
    tech: ["Python", "Scikit-learn", "CNNs"],
    highlights: [
      "Research paper & college report",
      "Multiple experiment versions",
    ],
    repo: "#",
    demo: null,
  },
  {
    id: "java-chatbot",
    title: "AI-Based Java Chatbot",
    domain: "AI/ML",
    featured: false,
    short: "DJL/OpenNLP chatbot with GUI & memory persistence.",
    tech: ["Java", "DJL", "OpenNLP", "SQLite"],
    highlights: [
      "GUI client",
      "Database-backed conversation memory",
    ],
    repo: "#",
    demo: null,
  },
  {
    id: "code-editor",
    title: "AI Auto-Completion Code Editor",
    domain: "AI/ML",
    featured: false,
    short: "Multi-language editor with AI suggestions & real-time collaboration.",
    tech: ["WebSockets", "Monaco", "Node.js", "REST APIs"],
    highlights: [
      "Real-time collaboration",
      "AI-assisted code suggestions",
    ],
    repo: "#",
    demo: null,
  },
  {
    id: "finance-tracker",
    title: "Personal Finance Tracker with AI Insights",
    domain: "AI/ML",
    featured: false,
    short: "ML-based spending insights and pattern detection.",
    tech: ["Python", "Pandas", "React", "MySQL"],
    highlights: [
      "Spending predictions",
      "Interactive dashboard visualizations",
    ],
    repo: "#",
    demo: null,
  },
  {
    id: "portfolio",
    title: "Portfolio Website",
    domain: "Web",
    featured: false,
    short: "React + Tailwind portfolio showcasing projects and skills.",
    tech: ["React", "Tailwind", "Vite"],
    highlights: [
      "Responsive design",
      "Project filtering & modals",
    ],
    repo: "#",
    demo: null,
  },
];

/* ===================== COMPONENTS ===================== */

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
        <a href="#projects">Projects</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
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
        I build end-to-end systems across <strong>AI/ML</strong>,{" "}
        <strong>Web3</strong>, and <strong>Full-Stack Web</strong>.
      </p>
      <div className="mt-6 flex gap-3">
        <a href="#projects" className="px-4 py-2 bg-sky-600 text-white rounded">
          View Projects
        </a>
        <a
          href="/Ruhi_Chopda_Resume.pdf"
          download
          className="px-4 py-2 border rounded"
        >
          Download Resume
        </a>
      </div>
    </header>
  );
}

function Filters({ domains, active, setActive }) {
  return (
    <div className="flex gap-2 flex-wrap">
      <button
        onClick={() => setActive("All")}
        className={`px-3 py-1 rounded ${
          active === "All" ? "bg-sky-600 text-white" : "border"
        }`}
      >
        All
      </button>
      {domains.map((d) => (
        <button
          key={d}
          onClick={() => setActive(d)}
          className={`px-3 py-1 rounded ${
            active === d ? "bg-sky-600 text-white" : "border"
          }`}
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
        {p.tech.slice(0, 3).map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-xs text-gray-500">{p.domain}</span>
        <button
          onClick={() => onOpen(p)}
          className="text-sm px-3 py-1 border rounded"
        >
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
          <h2 className="text-2xl font-bold">{project.title}</h2>
          <button onClick={onClose} className="border px-2 py-1 rounded">
            Close
          </button>
        </div>

        <h4 className="mt-4 font-semibold">Highlights</h4>
        <ul className="list-disc ml-6 mt-2 text-sm">
          {project.highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>

        <h4 className="mt-4 font-semibold">Tech</h4>
        <div className="mt-2 flex gap-2 flex-wrap">
          {project.tech.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          {project.repo && (
            <a href={project.repo} className="px-4 py-2 border rounded">
              View Code
            </a>
          )}
          {project.demo ? (
            <a
              href={project.demo}
              className="px-4 py-2 bg-sky-600 text-white rounded"
            >
              Live Demo
            </a>
          ) : (
            <span className="px-4 py-2 border rounded text-gray-500">
              Demo Unavailable
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ===================== APP ===================== */

export default function App() {
  const [theme, setTheme] = useState("light");
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState(null);

  const domains = Array.from(new Set(PROJECTS.map((p) => p.domain)));
  const featured = PROJECTS.filter((p) => p.featured);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const visible =
    filter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.domain === filter);

  return (
    <div className="min-h-screen px-6 md:px-20 py-6 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Navbar theme={theme} setTheme={setTheme} />
      <Hero />

      {/* Featured */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold">Featured Projects</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {featured.map((p) => (
            <ProjectCard key={p.id} p={p} onOpen={setOpen} />
          ))}
        </div>
      </section>

      {/* All Projects */}
      <section id="projects" className="mt-12">
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

      <section id="about" className="mt-12 max-w-2xl">
        <h2 className="text-2xl font-bold">About</h2>
        <p className="mt-3">
          I’m a developer focused on building clean, scalable, and impactful
          products across AI, blockchain, backend systems, and full-stack web
          development.
        </p>
      </section>

      <section id="contact" className="mt-12">
        <h2 className="text-2xl font-bold">Contact</h2>
        <p className="mt-2">
          Email:{" "}
          <a href="mailto:chopdaruhi9@gmail.com" className="underline">
            chopdaruhi9@gmail.com
          </a>
        </p>
      </section>

      <footer className="mt-12 border-t pt-6 text-sm text-gray-500">
        © {new Date().getFullYear()} Ruhi Chopda
      </footer>

      <ProjectModal project={open} onClose={() => setOpen(null)} />
    </div>
  );
}

