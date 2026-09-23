import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  ExternalLink,
  Github,
  CheckCircle2,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  Send,
  Play,
  RotateCcw,
} from 'lucide-react';
import type { Project } from '@/data/projects';

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'simulator' | 'code' | 'learnings'>('overview');

  // Interactive Simulator States
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([
    { sender: 'bot', text: 'Hello! I am Onkar’s College Assistance Chatbot. Ask me about Admissions, Placements, Courses, or Faculty.' },
  ]);

  const [calcInput, setCalcInput] = useState('12 * 8 + sqrt(144)');
  const [calcResult, setCalcResult] = useState('108');

  const [robotCommand, setRobotCommand] = useState('STOP');
  const [robotStatus, setRobotStatus] = useState('STANDBY · SENSORS NOMINAL');

  useEffect(() => {
    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleSendChat = (textToSend?: string) => {
    const query = (textToSend || chatInput).trim();
    if (!query) return;

    const newMsgs = [...chatMessages, { sender: 'user' as const, text: query }];
    setChatMessages(newMsgs);
    setChatInput('');

    // Match responses from demo data
    const matched = project.demoData?.prompts?.find((p) =>
      query.toLowerCase().includes(p.category.toLowerCase()) ||
      p.q.toLowerCase().includes(query.toLowerCase())
    );

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: matched
            ? matched.a
            : `Regarding "${query}": The system matched keywords against the knowledge base and provided verified departmental records.`,
        },
      ]);
    }, 350);
  };

  const handleRunCalc = () => {
    try {
      // Safe math evaluator for demo
      const sanitized = calcInput.replace(/sqrt\((\d+)\)/g, 'Math.sqrt($1)');
      // eslint-disable-next-line no-eval
      const res = Function(`'use strict'; return (${sanitized})`)();
      setCalcResult(String(res));
    } catch {
      setCalcResult('Syntax Error in C++ parser guard');
    }
  };

  return (
    <motion.div
      className="modal-overlay"
      role="presentation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        className="modal-dialog-box"
        data-lenis-prevent
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Close Button */}
        <button
          className="modal-close-trigger"
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          aria-label="Close project modal"
          data-testid="button-close-project-modal"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="modal-header-meta">
          <span className="modal-number-tag">{project.number} / {project.category}</span>
          <h2 id="modal-project-title" className="modal-main-title">{project.title}</h2>
          <p className="modal-lead-summary">{project.description}</p>
        </div>

        {/* Stats Row */}
        <div className="modal-stats-bar">
          {project.stats.map((s, i) => (
            <div className="modal-stat-item" key={i}>
              <span className="modal-stat-val">{s.value}</span>
              <span className="modal-stat-lbl">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Navigation Tabs inside Modal */}
        <div className="modal-tabs-header">
          <button
            type="button"
            className={`modal-tab-btn ${activeTab === 'overview' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <Layers size={15} />
            <span>OVERVIEW & SPECS</span>
          </button>
          <button
            type="button"
            className={`modal-tab-btn ${activeTab === 'simulator' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('simulator')}
          >
            <Sparkles size={15} />
            <span>LIVE SIMULATOR</span>
          </button>
          {project.codeSnippet && (
            <button
              type="button"
              className={`modal-tab-btn ${activeTab === 'code' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('code')}
            >
              <Terminal size={15} />
              <span>ARCHITECTURE & CODE</span>
            </button>
          )}
          <button
            type="button"
            className={`modal-tab-btn ${activeTab === 'learnings' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('learnings')}
          >
            <Cpu size={15} />
            <span>CHALLENGES & LEARNINGS</span>
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="modal-tab-content">
            <div className="modal-two-col">
              <div className="modal-block">
                <h3 className="block-title">THE PROBLEM</h3>
                <p className="block-copy">{project.problem}</p>
              </div>
              <div className="modal-block">
                <h3 className="block-title">ENGINEERED SOLUTION</h3>
                <p className="block-copy">{project.solution}</p>
              </div>
            </div>

            <div className="modal-block mt-4">
              <h3 className="block-title">TECHNOLOGY STACK</h3>
              <div className="modal-tech-pills">
                {project.technologies.map((t) => (
                  <span className="tech-pill-large" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="modal-block mt-4">
              <h3 className="block-title">CORE FEATURES & CAPABILITIES</h3>
              <ul className="modal-features-list">
                {project.features.map((feat, i) => (
                  <li key={i} className="feature-item">
                    <CheckCircle2 size={16} className="feature-check-icon" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: Interactive Simulator */}
        {activeTab === 'simulator' && (
          <div className="modal-tab-content simulator-pane">
            {project.demoType === 'chatbot' && (
              <div className="chatbot-sim-container">
                <div className="sim-header">
                  <span className="sim-status-dot" />
                  <span>FLASK NLP CHATBOT ENGINE · ACTIVE</span>
                </div>
                <div className="chatbot-messages-scroll">
                  {chatMessages.map((m, idx) => (
                    <div key={idx} className={`chat-bubble-row ${m.sender}`}>
                      <div className="chat-bubble-body">
                        <span className="sender-tag">{m.sender === 'user' ? 'YOU' : 'AI ASSISTANT'}</span>
                        <p>{m.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="chatbot-quick-prompts">
                  <span className="quick-label">Try Query:</span>
                  {project.demoData?.prompts?.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSendChat(p.q)}
                      className="quick-prompt-btn"
                    >
                      {p.category}
                    </button>
                  ))}
                </div>
                <form
                  className="chatbot-input-row"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendChat();
                  }}
                >
                  <input
                    type="text"
                    placeholder="Type an admission, placement, or campus question..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                  />
                  <button type="submit" className="chatbot-send-btn">
                    <Send size={16} />
                  </button>
                </form>
              </div>
            )}

            {project.demoType === 'robot' && (
              <div className="robot-sim-container">
                <div className="sim-header">
                  <span className="sim-status-dot" />
                  <span>ESP32-CAM TELEMETRY & COMMAND CONSOLE</span>
                </div>
                <div className="telemetry-grid">
                  <div className="tele-box">
                    <span className="tele-lbl">BATTERY (18650)</span>
                    <span className="tele-val">{project.demoData?.telemetry?.battery}</span>
                  </div>
                  <div className="tele-box">
                    <span className="tele-lbl">SIGNAL (ESP8266)</span>
                    <span className="tele-val">{project.demoData?.telemetry?.signal}</span>
                  </div>
                  <div className="tele-box">
                    <span className="tele-lbl">SENSOR STATUS</span>
                    <span className="tele-val text-lime">{project.demoData?.telemetry?.sensor}</span>
                  </div>
                  <div className="tele-box">
                    <span className="tele-lbl">STREAM</span>
                    <span className="tele-val">{project.demoData?.telemetry?.cameraState}</span>
                  </div>
                </div>

                <div className="robot-controls-box">
                  <span className="robot-ctrl-title">REMOTE MOTOR CONTROLLER</span>
                  <div className="dpad-layout">
                    <button
                      type="button"
                      className="dpad-btn"
                      onClick={() => {
                        setRobotCommand('FORWARD');
                        setRobotStatus('MOTORS 1 & 2 ENGAGED (PWM 255)');
                      }}
                    >
                      ▲ FORWARD
                    </button>
                    <div className="dpad-mid-row">
                      <button
                        type="button"
                        className="dpad-btn"
                        onClick={() => {
                          setRobotCommand('LEFT');
                          setRobotStatus('STEERING LEFT (DIFFERENTIAL DRIVE)');
                        }}
                      >
                        ◀ LEFT
                      </button>
                      <button
                        type="button"
                        className="dpad-btn stop-btn"
                        onClick={() => {
                          setRobotCommand('STOP');
                          setRobotStatus('MOTORS HALTED');
                        }}
                      >
                        ■ STOP
                      </button>
                      <button
                        type="button"
                        className="dpad-btn"
                        onClick={() => {
                          setRobotCommand('RIGHT');
                          setRobotStatus('STEERING RIGHT (DIFFERENTIAL DRIVE)');
                        }}
                      >
                        RIGHT ▶
                      </button>
                    </div>
                    <button
                      type="button"
                      className="dpad-btn"
                      onClick={() => {
                        setRobotCommand('REVERSE');
                        setRobotStatus('REVERSING MOTORS (PWM 200)');
                      }}
                    >
                      ▼ REVERSE
                    </button>
                  </div>
                  <div className="robot-status-console">
                    <span className="console-cmd">CURRENT CMD: {robotCommand}</span>
                    <span className="console-msg">{robotStatus}</span>
                  </div>
                </div>
              </div>
            )}

            {project.demoType === 'calculator' && (
              <div className="calc-sim-container">
                <div className="sim-header">
                  <span className="sim-status-dot" />
                  <span>C++ MATHEMATICAL ENGINE RUNNER</span>
                </div>
                <div className="calc-display-box">
                  <span className="calc-expr">{calcInput}</span>
                  <span className="calc-res">= {calcResult}</span>
                </div>
                <div className="calc-controls-row">
                  <input
                    type="text"
                    value={calcInput}
                    onChange={(e) => setCalcInput(e.target.value)}
                    placeholder="Enter mathematical expression..."
                  />
                  <button type="button" onClick={handleRunCalc} className="calc-eval-btn">
                    <Play size={16} /> EVALUATE
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCalcInput('sin(30) + log(100)');
                      setCalcResult('2.5');
                    }}
                    className="calc-reset-btn"
                  >
                    <RotateCcw size={16} />
                  </button>
                </div>
              </div>
            )}

            {project.demoType === 'website' && (
              <div className="generic-sim-container">
                <div className="sim-header">
                  <span className="sim-status-dot" />
                  <span>RESPONSIVE REACT + VITE SHOWCASE</span>
                  {project.liveUrl && (
                    <span className="live-status-pill">● LIVE ON RENDER</span>
                  )}
                </div>
                <p className="generic-sim-p">
                  This production-grade frontend features product filtering, service inquiry workflows, dynamic warranty verification, and responsive mobile architecture.
                </p>
                {project.liveUrl && (
                  <div className="live-preview-box">
                    <div className="live-url-tag">
                      <span>URL:</span>
                      <a href={project.liveUrl} target="_blank" rel="noreferrer" className="live-url-link">
                        {project.liveUrl}
                      </a>
                    </div>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="live-launch-btn"
                    >
                      <span>LAUNCH LIVE WEBSITE</span>
                      <ExternalLink size={15} />
                    </a>
                  </div>
                )}
                <div className="preview-features-grid">
                  <div className="preview-tile">✓ Instant Spec Comparison</div>
                  <div className="preview-tile">✓ Filter Replacement Tracker</div>
                  <div className="preview-tile">✓ Modern Tailwind UI</div>
                  <div className="preview-tile">✓ Accessible Forms</div>
                </div>
              </div>
            )}

            {(project.demoType === 'database' || project.demoType === 'certificate') && (
              <div className="generic-sim-container">
                <div className="sim-header">
                  <span className="sim-status-dot" />
                  <span>RELATIONAL SCHEMA & CRUD WORKFLOW</span>
                </div>
                <div className="db-table-preview">
                  <div className="db-header-row">
                    <span>RECORD_ID</span>
                    <span>TITLE / STUDENT</span>
                    <span>STATUS</span>
                    <span>VERIFICATION_HASH</span>
                  </div>
                  <div className="db-data-row">
                    <span>#REC-2026-01</span>
                    <span>B.Tech CSE Credential</span>
                    <span className="text-lime">VERIFIED</span>
                    <span className="font-mono">8f92a1...bc</span>
                  </div>
                  <div className="db-data-row">
                    <span>#REC-2026-02</span>
                    <span>Python Full Stack</span>
                    <span className="text-lime">VERIFIED</span>
                    <span className="font-mono">3c74e8...a1</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Code Snippet */}
        {activeTab === 'code' && project.codeSnippet && (
          <div className="modal-tab-content code-pane">
            <div className="code-header-bar">
              <span className="code-file-title">{project.codeSnippet.title}</span>
              <span className="code-lang-tag">{project.codeSnippet.language.toUpperCase()}</span>
            </div>
            <pre className="code-pre">
              <code>{project.codeSnippet.code}</code>
            </pre>
          </div>
        )}

        {/* Tab 4: Challenges & Learnings */}
        {activeTab === 'learnings' && (
          <div className="modal-tab-content">
            <div className="modal-block">
              <h3 className="block-title">KEY TECHNICAL CHALLENGES</h3>
              <p className="block-copy">{project.challenges}</p>
            </div>
            <div className="modal-block mt-4">
              <h3 className="block-title">WHAT I LEARNED</h3>
              <p className="block-copy">{project.learned}</p>
            </div>
          </div>
        )}

        {/* Modal Footer Links */}
        <div className="modal-footer-actions">
          {project.liveUrl && (
            <a
              className="modal-action-btn solid-action highlight-live"
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              data-testid={`link-live-${project.id}`}
            >
              <span>OPEN LIVE DEMO</span>
              <ExternalLink size={15} />
            </a>
          )}
          <a
            className={`modal-action-btn ${project.liveUrl ? 'outline-action' : 'solid-action'}`}
            href="#contact"
            onClick={onClose}
            data-testid={`link-contact-project-${project.id}`}
          >
            <span>INQUIRE ABOUT THIS PROJECT</span>
            <ExternalLink size={15} />
          </a>
          <a
            className="modal-action-btn outline-action"
            href="https://github.com/onkardhanewar"
            target="_blank"
            rel="noreferrer"
            data-testid={`link-github-${project.id}`}
          >
            <Github size={15} />
            <span>VIEW ON GITHUB</span>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
