import { motion, useReducedMotion } from 'framer-motion';
import { Terminal, Database, Code2, Sparkles, CheckCircle2 } from 'lucide-react';

export default function About() {
  const reduceMotion = useReducedMotion();

  const stats = [
    { number: '2026', label: 'B.TECH CSE GRAD', icon: <Terminal size={18} /> },
    { number: '06+', label: 'KEY PROJECTS', icon: <Code2 size={18} /> },
    { number: '15+', label: 'TECH TOOLS', icon: <Database size={18} /> },
    { number: '100%', label: 'PRACTICAL FOCUS', icon: <Sparkles size={18} /> },
  ];

  return (
    <section className="section-container about-section" id="about" aria-labelledby="about-title">
      <div className="section-badge-row">
        <span className="section-index">01 — ABOUT ONKAR RAJENDRA DHANEWAR</span>
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
            About Onkar Rajendra Dhanewar — <span className="heading-highlight">Software Developer &amp; CSE Engineer.</span>
          </h2>
          <p className="about-paragraph lead-p">
            I am Onkar Rajendra Dhanewar, a Computer Science and Engineering (B.Tech) student graduating in 2026, specializing in software development, Python, React, JavaScript, modern web development, SQL databases, and REST APIs.
          </p>
          <p className="about-paragraph secondary-p">
            With a solid foundation in C++, Data Structures and Algorithms (DSA), and software engineering principles, I build reliable full-stack web applications, AI chatbots, and database management systems. Through my 6-month Python Full Stack Development internship at Kiran Academy, Pune, along with hands-on project builds, I focus on writing clean, scalable code and delivering practical software solutions.
          </p>

          {/* Callout Box matching reference */}
          <div className="career-objective-box">
            <div className="box-header">
              <span className="box-label">CAREER OBJECTIVE</span>
              <CheckCircle2 size={16} className="text-coral" />
            </div>
            <p className="objective-text">
              Begin my career as a Software Developer, building reliable solutions with Python, React, web development, databases, and problem-solving.
            </p>
          </div>
        </div>

        {/* Aside Column with stats & methodology */}
        <div className="about-aside-col">
          <div className="methodology-card">
            <h3 className="aside-title">A practical approach</h3>
            <p className="aside-copy">
              My engineering workflow focuses on understanding requirements, designing relational data flows, writing maintainable code, and iterative testing.
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
