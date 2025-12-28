import React, { useState, useEffect } from "react";

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
      "Wallet authentication & on-chain events",
    ],
  },
  {
    id: "plant-disease",
    title: "AI-Powered Plant Disease Detection System",
    domain: "AI/ML",
    featured: true,
    short: "Deep learning system to detect plant diseases from leaf images.",
    tech: ["Python", "Flask", "TensorFlow", "OpenCV"],
    highlights: [
      "Custom CNN architecture",
      "Disease severity classification",
      "Treatment recommendations",
    ],
  },
  {
    id: "customer-churn",
    title: "Customer Churn Prediction System",
    domain: "AI/ML",
    short: "ML system to predict customer churn and retention risk.",
    tech: ["Python", "Scikit-learn", "Pandas"],
    highlights: [
      "Customer behavior analysis",
      "Binary classification models",
      "Business-focused insights",
    ],
  },
  {
    id: "sales-insights",
    title: "Sales Insights & Analytics Dashboard",
    domain: "AI/ML",
    short: "Data analytics dashboard for sales trends and performance.",
    tech: ["Python", "Pandas", "SQL", "Power BI"],
    highlights: [
      "Sales trend analysis",
      "Region & product-wise insights",
      "Interactive dashboards",
    ],
  },
  {
    id: "steganography",
    title: "Steganography Detection System",
    domain: "AI/ML",
    short: "ML-based system to detect hidden information in images.",
    tech: ["Python", "Scikit-learn", "CNNs"],
    highlights: [
      "Feature extraction techniques",
      "Research & academic report",
    ],
  },
  {
    id: "java-chatbot",
    title: "AI-Based Java Chatbot",
    domain: "AI/ML",
    short: "Java chatbot with NLP, GUI, and persistent memory.",
    tech: ["Java", "DJL", "OpenNLP", "SQLite"],
    highlights: [
      "GUI-based chatbot",
      "Conversation memory storage",
    ],
  },
  {
    id: "code-editor",
    title: "AI Auto-Completion Code Editor",
    domain: "AI/ML",
    short: "Smart code editor with AI suggestions.",
    tech: ["Node.js", "WebSockets", "Monaco"],
    highlights: [
      "AI-assisted auto-completion",
      "Real-time collaboration",
    ],
  },
  {
    id: "finance-tracker",
    title: "Personal Finance Tracker with AI Insights",
    domain: "AI/ML",
    short: "AI-powered finance tracker with spending insights.",
    tech: ["Python", "Pandas", "React", "MySQL"],
    highlights: [
      "Spending pattern analysis",
      "Predictive insights",
    ],
  },
  {
    id: "pokedex",
    title: "Pokédex Web Application",
    domain: "Web",
    short: "Interactive Pokédex using public APIs.",
    tech: ["React", "REST APIs"],
    highlights: [
      "Dynamic Pokémon data",
      "Search & filter UI",
    ],
  },
  {
    id: "portfolio",
    title: "Developer Portfolio Website",
    domain: "Web",
    short: "Personal portfolio showcasing projects and skills.",
    tech: ["React", "Tailwind", "Vite"],
    highlights: [
      "Project filtering & modals",
      "Dark / light theme",
    ],
  },
];

function Tag({ children }) {
  return <span className="tag">{children}</span>;
}

function Navbar({ theme, setTheme }) {
  return (
    <nav className="flex justify-between items-center py-4">
      <div className="text-xl font-bold">Ruhi Chopda</div>
      <div className="flex gap-4 items-center">
        <a href="#projects">Projects</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="btn-outline"
        >
          {theme === "dark" ? "Light" : "Dark"}
        </button>
      </div>
    </nav>
  );
}

function ProjectCard({ p, onOpen }) {
  return (
    <div className="card">
      <h3 className="font-semibold">{p.title}</h3>
      <p className="mt-2 text-sm text-slate-400">{p.short}</p>

      <div className="mt-3 flex gap-2 flex-wrap">
        {p.tech.slice(0, 3).map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-xs text-slate-500">{p.domain}</span>
        <button onClick={() => onOpen(p)} className="btn-outline">
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
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 w-11/12 md:w-1/2">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{project.title}</h2>
          <button onClick={onClose} className="btn-outline">Close</button>
        </div>

        <ul className="list-disc ml-6 mt-4 text-sm">
          {project.highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState("light");
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState(null);

  const domains = ["All", ...new Set(PROJECTS.map(p => p.domain))];
  const visible = filter === "All" ? PROJECTS : PROJECTS.filter(p => p.domain === filter);
  const featured = PROJECTS.filter(p => p.featured);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="page">
      <Navbar theme={theme} setTheme={setTheme} />

      <section className="py-12">
        <h1 className="text-4xl font-extrabold">Hi — I’m Ruhi Chopda</h1>
        <p className="mt-3 max-w-xl text-slate-400">
          I build end-to-end systems across AI/ML, Blockchain, and Full-Stack Web.
        </p>
        <div className="mt-6 flex gap-3">
          <a href="#projects" className="btn-primary">View Projects</a>
          <a
            href={`${import.meta.env.BASE_URL}Ruhi_Chopda_Resume_Updated.pdf`}
            download
            className="btn-outline"
          >
            Download Resume
          </a>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">Featured Projects</h2>
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          {featured.map(p => (
            <ProjectCard key={p.id} p={p} onOpen={setOpen} />
          ))}
        </div>
      </section>

      <section id="projects" className="mt-12">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Projects</h2>
          <div className="flex gap-2 flex-wrap">
            {domains.map(d => (
              <button
                key={d}
                onClick={() => setFilter(d)}
                className={`filter-btn ${filter === d ? "filter-btn-active" : ""}`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {visible.map(p => (
            <ProjectCard key={p.id} p={p} onOpen={setOpen} />
          ))}
        </div>
      </section>

      <section id="about" className="mt-12 max-w-2xl">
        <h2 className="text-2xl font-bold">About</h2>
        <p className="mt-3 text-slate-400">
          I focus on building clean, scalable, and real-world systems across AI,
          analytics, blockchain, and full-stack web development.
        </p>
      </section>

      <section id="contact" className="mt-12">
        <h2 className="text-2xl font-bold">Contact</h2>
        <p className="mt-2">
          <a href="mailto:chopdaruhi9@gmail.com" className="underline">
            chopdaruhi9@gmail.com
          </a>
        </p>
      </section>

      <footer className="mt-12 border-t border-slate-800 pt-6 text-sm text-slate-500">
        © {new Date().getFullYear()} Ruhi Chopda
      </footer>

      <ProjectModal project={open} onClose={() => setOpen(null)} />
    </div>
  );
}
