import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Github, Linkedin, Mail, ExternalLink, Terminal as TerminalIcon, Menu, X } from 'lucide-react';

interface TerminalCommand {
  id: string;
  command: string;
  output: React.ReactNode;
}

interface HelpCommand {
  name: string;
  description: string;
  icon: string;
}

const Terminal: React.FC = () => {
  const [commands, setCommands] = useState<TerminalCommand[]>([
    {
      id: 'default',
      command: 'about',
      output: null, // Will be set after portfolioData is defined
    },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Portfolio data
  const portfolioData = {
    about: {
      name: 'Venkata Sai Esampalli',
      title: 'Full Stack Developer',
      bio: 'Front-end-focused Full Stack JavaScript Developer with nearly 4+ years of experience building scalable web applications.',
      email: 'venkatsai.esampalli@gmail.com',
      github: 'https://github.com/venkatkvikram',
      linkedin: 'https://linkedin.com/in/venkatasaiesampalli',
      company: 'Deloitte',
      location: 'Hyderabad, Telangana',
    },
    skills: {
      Frontend: ['React.js', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'Tailwind CSS', 'Redux Toolkit', 'Redux-Saga'],
      Backend: ['Node.js', 'NestJS', 'Express.js', 'Spring Boot', 'Hibernate'],
      Architecture: ['RESTful APIs', 'Microservices', 'Domain-Driven Design (DDD)', 'SOLID Principles'],
      Security: ['JWT', 'RBAC', 'Secure Cookies', 'HTTPS', 'CSP'],
      Databases: ['PostgreSQL', 'MySQL', 'MongoDB'],
      DevOps: ['Git', 'GitHub Actions', 'Agile/Scrum', 'GCP', 'Docker'],
    },
    experience: [
      {
        company: 'Deloitte',
        role: 'Consultant - Engineering',
        period: 'June 2025 – Present',
        highlights: [
          'Architected scalable SPA/SSR hybrid platform using Next.js (App Router)',
          'Engineered enterprise-grade state orchestration with Redux Toolkit + Redux-Saga',
          'Designed secure multi-layer authentication authorization model',
        ],
      },
      {
        company: 'Axzora Private Limited',
        role: 'Software Engineer',
        period: 'Sep 2023 – May 2025',
        highlights: [
          'Developed scalable backend services using NestJS, Node.js, MySQL',
          'Designed robust RESTful APIs for complex transactional workflows',
          'Implemented secure authentication using JWT and Keycloak',
        ],
      },
      {
        company: 'Softveer Technologies',
        role: 'Software Engineer',
        period: 'Sep 2022 – Aug 2023',
        highlights: [
          'Developed responsive Mobile-Homebuilder Dashboard UI using React.js',
          'Built reusable components to enhance user experience',
          'Utilized React-redux-toolkit for efficient global state management',
        ],
      },
    ],
    projects: [
      {
        name: 'Event Booking Management Application',
        tech: 'Spring Boot, Hibernate, MySQL, REST APIs',
        desc: 'Comprehensive event booking platform with advanced ticket management algorithms.',
      },
    ],
  };

  const helpCommands: HelpCommand[] = [
    { name: 'about', description: 'View personal information', icon: '👤' },
    { name: 'skills', description: 'Display technical skills', icon: '🛠️' },
    { name: 'experience', description: 'View work history', icon: '💼' },
    { name: 'projects', description: 'Showcase projects', icon: '🚀' },
    { name: 'contact', description: 'Get contact info', icon: '📧' },
    { name: 'clear', description: 'Clear terminal', icon: '🧹' },
  ];

  // Generate about output
  const generateAboutOutput = () => (
    <div className="text-cyan-400 space-y-2">
      <div className="text-yellow-400 font-bold text-lg">{portfolioData.about.name}</div>
      <div className="text-green-400">{portfolioData.about.title}</div>
      <div className="text-white mt-3">{portfolioData.about.bio}</div>
      <div className="mt-3 space-y-1 text-sm">
        <div>📍 {portfolioData.about.location}</div>
        <div>🏢 Currently at: <span className="text-cyan-400">{portfolioData.about.company}</span></div>
      </div>
    </div>
  );

  // Initialize default about command
  useEffect(() => {
    setCommands([
      {
        id: 'default',
        command: 'about',
        output: generateAboutOutput(),
      },
    ]);
  }, []);

  const commandHelp = `
┌─ Available Commands ─────────────────────────────────────────┐
│                                                               │
│  about          Show personal information                    │
│  skills         Display technical skills by category         │
│  experience     View professional work history               │
│  projects       Showcase featured projects                   │
│  contact        Get contact information                      │
│  clear          Clear the terminal                           │
│  help           Show this help message                       │
│                                                               │
│  Navigation: Use ↑↓ arrow keys to browse command history     │
│                                                               │
└───────────────────────────────────────────────────────────────┘
  `;

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.toLowerCase().trim();

    let output: React.ReactNode = <div className="text-red-400">Command not found: {cmd}</div>;

    switch (trimmedCmd) {
      case 'help':
        output = <pre className="text-green-400 font-mono text-xs">{commandHelp}</pre>;
        break;

      case 'about':
        output = generateAboutOutput();
        break;

      case 'skills':
        output = (
          <div className="text-cyan-400 space-y-3">
            <div className="text-yellow-400 font-bold">Technical Toolkit</div>
            {Object.entries(portfolioData.skills).map(([category, techs]) => (
              <div key={category} className="ml-2">
                <div className="text-green-400 font-semibold">{category}:</div>
                <div className="text-white ml-2 text-sm">{techs.join(', ')}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'experience':
        output = (
          <div className="text-cyan-400 space-y-4">
            <div className="text-yellow-400 font-bold">Professional Experience</div>
            {portfolioData.experience.map((exp, idx) => (
              <div key={idx} className="ml-2 border-l border-green-400 pl-3">
                <div className="text-green-400 font-semibold">{exp.role}</div>
                <div className="text-cyan-400">{exp.company} • {exp.period}</div>
                <div className="text-white mt-2 text-sm space-y-1">
                  {exp.highlights.map((h, i) => (
                    <div key={i}>• {h}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="text-cyan-400 space-y-3">
            <div className="text-yellow-400 font-bold">Featured Projects</div>
            {portfolioData.projects.map((proj, idx) => (
              <div key={idx} className="ml-2 border-l border-blue-400 pl-3">
                <div className="text-blue-400 font-semibold">{proj.name}</div>
                <div className="text-cyan-400 text-sm">Tech: {proj.tech}</div>
                <div className="text-white mt-1 text-sm">{proj.desc}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="text-cyan-400 space-y-2">
            <div className="text-yellow-400 font-bold">Get In Touch</div>
            <div className="text-white space-y-1 text-sm">
              <div>📧 Email: <span className="text-green-400">{portfolioData.about.email}</span></div>
              <div>🐙 GitHub: <span className="text-green-400">{portfolioData.about.github}</span></div>
              <div>💼 LinkedIn: <span className="text-green-400">{portfolioData.about.linkedin}</span></div>
            </div>
          </div>
        );
        break;

      case 'clear':
        setCommands([]);
        setInput('');
        return;

      default:
        output = <div className="text-red-400">Unknown command. Type 'help' for available commands.</div>;
    }

    const newCommand: TerminalCommand = {
      id: Date.now().toString(),
      command: cmd,
      output,
    };

    setCommands((prev) => [...prev, newCommand]);
    setHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (input.trim()) {
        executeCommand(input);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = historyIndex + 1;
      if (newIndex < history.length) {
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = historyIndex - 1;
      if (newIndex >= 0) {
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      } else if (newIndex < 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8 font-mono flex flex-col md:flex-row gap-6">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden mb-4 flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-cyan-500/30 rounded-lg transition-colors text-cyan-400"
      >
        {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        {sidebarOpen ? 'Hide' : 'Show'} Commands
      </button>

      {/* Sidebar - Help Menu */}
      {sidebarOpen && (
        <div className="md:w-64 flex-shrink-0">
          <div className="bg-slate-900 border border-cyan-500/30 rounded-lg p-4 sticky top-4 max-h-96 overflow-y-auto shadow-lg shadow-cyan-500/10">
            <h2 className="text-cyan-400 font-bold mb-4 flex items-center gap-2">
              <TerminalIcon className="w-4 h-4" />
              Commands
            </h2>
            <div className="space-y-2">
              {helpCommands.map((cmd) => (
                <button
                  key={cmd.name}
                  onClick={() => executeCommand(cmd.name)}
                  className="w-full text-left px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-cyan-500/20 hover:border-cyan-500/50 rounded transition-all text-sm group"
                >
                  <div className="text-green-400 font-semibold group-hover:text-green-300">
                    {cmd.icon} {cmd.name}
                  </div>
                  <div className="text-slate-400 text-xs mt-1">{cmd.description}</div>
                </button>
              ))}
            </div>

            {/* Quick Links */}
            <div className="mt-6 pt-4 border-t border-cyan-500/20">
              <h3 className="text-cyan-400 font-bold mb-3 text-sm">Connect</h3>
              <div className="space-y-2">
                <a
                  href={portfolioData.about.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-cyan-500/20 rounded text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
                <a
                  href={portfolioData.about.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-cyan-500/20 rounded text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
                <a
                  href={`mailto:${portfolioData.about.email}`}
                  className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-cyan-500/20 rounded text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Terminal Area */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="mb-6 space-y-2">
          <div className="flex items-center gap-3">
            <TerminalIcon className="w-6 h-6 text-cyan-400" />
            <h1 className="text-2xl md:text-3xl font-bold text-cyan-400">
              portfolio@venkata-sai ~ $
            </h1>
          </div>
          <div className="text-green-400 text-sm">Interactive Terminal Portfolio • Click commands on the left or type below</div>
        </div>

        {/* Terminal Output */}
        <div
          ref={terminalRef}
          className="bg-slate-900 border border-cyan-500/30 rounded-lg p-4 md:p-6 mb-4 h-96 md:h-1/2 overflow-y-auto space-y-4 shadow-lg shadow-cyan-500/10"
        >
          {commands.length === 0 ? (
            <div className="text-green-400">Type a command or click on the left...</div>
          ) : (
            commands.map((cmd) => (
              <div key={cmd.id} className="space-y-2">
                <div className="flex items-center gap-2 text-cyan-400">
                  <ChevronRight className="w-4 h-4" />
                  <span>{cmd.command}</span>
                </div>
                <div className="ml-6">{cmd.output}</div>
              </div>
            ))
          )}
        </div>

        {/* Terminal Input */}
        <div className="bg-slate-900 border border-cyan-500/30 rounded-lg p-4 md:p-6 shadow-lg shadow-cyan-500/10">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter command..."
              className="flex-1 bg-transparent text-white outline-none placeholder-slate-500 text-sm md:text-base"
              autoFocus
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-slate-500 text-xs md:text-sm">
          <div>Crafted with ❤️ by Venkata Sai Esampalli</div>
          <div className="mt-2 text-cyan-600">Use arrow keys ↑↓ to browse history</div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
