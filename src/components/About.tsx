import { motion, useReducedMotion } from 'framer-motion';
import { Terminal, Database, Code2, Sparkles, CheckCircle2 } from 'lucide-react';

export default function About() {
  const reduceMotion = useReducedMotion();

  const stats = [
    { number: '2026', label: 'CSE GRADUATION', icon: <Terminal size={18} /> },
    { number: '06+', label: 'KEY PROJECTS', icon: <Code2 size={18} /> },
    { number: '15+', label: 'TECH TOOLS', icon: <Database size={18} /> },
    { number: '100%', label: 'PRACTICAL FOCUS', icon: <Sparkles size={18} /> },
  ];

  return (
    <section className="section-container about-section" id="about" aria-labelledby="about-title">
      <div className="section-badge-row">
        <span className="section-index">01 — ABOUT ME</span>
      </div>

      <motion.div
        className="about-grid-layout"
        initial={reduceMotion ? false : { opacity: 0, y: 25 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="about-main-col">
          <h2 className="section-main-heading" id="about-title">
            I like useful software with a <span className="heading-highlight">clear point of view.</span>
          </h2>
          <p className="about-paragraph lead-p">
            I am a Computer Science and Engineering student graduating in 2026, with a strong interest in software development, Python programming, web development, databases, and problem-solving. I enjoy turning ideas into functional applications using logical, structured approaches.
          </p>
          <p className="about-paragraph secondary-p">
            My academic and practical work spans full-stack web applications, AI chatbots, database systems, and software engineering. Having completed a 6-month Python Full Stack Development internship at Kiran Academy, Pune, I am looking for an opportunity to contribute to real-world projects and keep growing as a software developer.
          </p>

          {/* Callout Box matching reference */}
          <div className="career-objective-box">
            <div className="box-header">
              <span className="box-label">CAREER OBJECTIVE</span>
              <CheckCircle2 size={16} className="text-coral" />
            </div>
            <p className="objective-text">
              Begin as a Software Developer, building reliable solutions with programming, web development, databases, and problem-solving.
            </p>
          </div>
        </div>

        {/* Aside Column with stats & methodology */}
        <div className="about-aside-col">
          <div className="methodology-card">
            <h3 className="aside-title">A practical approach</h3>
            <p className="aside-copy">
              My work starts with deeply understanding the core requirement, structuring the relational flow, writing maintainable clean code, and careful iterative debugging.
            </p>
            <div className="aside-meta">
              <span className="meta-pill">MAHARASHTRA, INDIA</span>
              <span className="meta-pill">B.TECH CSE · 2026</span>
            </div>
          </div>

          {/* Quick Stat Tiles */}
          <div className="about-stats-grid">
            {stats.map((stat, idx) => (
              <div className="stat-card" key={idx}>
                <div className="stat-icon-wrap">{stat.icon}</div>
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
