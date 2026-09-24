import { motion, useReducedMotion } from 'framer-motion';
import { Code2, Compass, Wrench, RefreshCw } from 'lucide-react';

export default function WhatIBring() {
  const reduceMotion = useReducedMotion();

  const services = [
    {
      id: 'build',
      icon: <Code2 size={24} />,
      title: 'Build',
      symbol: '</>',
      description: 'Software, web apps, APIs, and data-connected tools.',
      details: 'Translating concepts into structured full-stack architectures with clean, reusable frontend components and secure RESTful backend endpoints.',
      colorClass: 'card-theme-cream',
    },
    {
      id: 'solve',
      icon: <Compass size={24} />,
      title: 'Solve',
      symbol: '🌐',
      description: 'Logical thinking grounded in programming fundamentals.',
      details: 'Breaking down complex technical problems through rigorous algorithmic analysis, data structure selection, and modular object-oriented paradigms.',
      colorClass: 'card-theme-yellow',
    },
    {
      id: 'debug',
      icon: <Wrench size={24} />,
      title: 'Debug',
      symbol: '⚙️',
      description: 'Careful testing, diagnosis, and iterative improvement.',
      details: 'Meticulously profiling performance bottlenecks, tracing edge cases, inspecting network payloads, and hardening database query efficiency.',
      colorClass: 'card-theme-lavender',
    },
    {
      id: 'adapt',
      icon: <RefreshCw size={24} />,
      title: 'Adapt',
      symbol: '🔄',
      description: 'Quick learner ready for new technologies and teams.',
      details: 'Rapidly absorbing new language ecosystems, engineering frameworks, cloud deployment tools, and collaborating seamlessly within agile workflows.',
      colorClass: 'card-theme-coral',
    },
  ];

  return (
    <section className="section-container what-i-bring-section" id="what-i-do" aria-labelledby="what-title">
      <div className="section-badge-row">
        <span className="section-index">05 — WHAT I BRING</span>
      </div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 25 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="section-main-heading" id="what-title">
          Engineering &amp; Problem Solving — <span className="heading-highlight">Full-Stack Development Capabilities.</span>
        </h2>

        {/* 4 Colored Service Cards Grid */}
        <div className="bring-cards-grid">
          {services.map((item) => (
            <div className={`bring-service-card ${item.colorClass}`} key={item.id}>
              <div className="bring-card-top">
                <span className="bring-symbol-tag">{item.symbol}</span>
                <h3 className="bring-card-title">{item.title}</h3>
              </div>
              <p className="bring-card-main-p">{item.description}</p>
              <div className="bring-card-hover-expand">
                <p className="bring-card-details">{item.details}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Subtitle Statement matching reference */}
        <div className="bring-footer-statement">
          <p>
            Interested in software development, web development, Python, AI, NLP, data structures &amp; algorithms, 3D animation, and emerging technologies.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
