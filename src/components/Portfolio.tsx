import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import Cursor from './Cursor';
import Navbar from './Navbar';
import Hero from './Hero';
import Marquee from './Marquee';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import ProjectModal from './ProjectModal';
import ExperienceEducation from './ExperienceEducation';
import WhatIBring from './WhatIBring';
import Contact from './Contact';
import ResumeModal from './ResumeModal';
import { type Project } from '@/data/projects';

export default function Portfolio() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [resumeOpen, setResumeOpen] = useState(false);
  const [showBackTop, setShowBackTop] = useState(false);

  // Subscribe to Lenis RAF scroll & progress updates
  const lenis = useLenis(({ progress, scroll }) => {
    setScrollProgress(progress);
    setShowBackTop(scroll > 400);
  });

  // Fallback for initial load or when Lenis is initializing
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      setScrollProgress(scrollHeight > 0 ? current / scrollHeight : 0);
      setShowBackTop(current > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Control Lenis scrolling when modals are opened / closed
  useEffect(() => {
    if (selectedProject || resumeOpen) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
  }, [selectedProject, resumeOpen, lenis]);

  // Global smooth scroll interceptor for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      e.preventDefault();
      if (href === '#top') {
        if (lenis) {
          lenis.scrollTo(0, { duration: 1.2 });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }

      const targetEl = document.querySelector(href);
      if (targetEl) {
        if (lenis) {
          lenis.scrollTo(targetEl as HTMLElement, { offset: -50, duration: 1.2 });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, [lenis]);

  const handleSkillClick = (skillName: string) => {
    // Map clicked skill to closest filter category or search project
    const upper = skillName.toUpperCase();
    if (upper.includes('PYTHON') || upper.includes('FLASK')) {
      setActiveFilter('PYTHON');
    } else if (upper.includes('C++')) {
      setActiveFilter('C++');
    } else if (upper.includes('SQL') || upper.includes('MYSQL') || upper.includes('DATABASE') || upper.includes('DBMS')) {
      setActiveFilter('DATABASE');
    } else if (upper.includes('REACT') || upper.includes('WEB') || upper.includes('HTML') || upper.includes('TAILWIND')) {
      setActiveFilter('WEB');
    } else if (upper.includes('NLTK') || upper.includes('AI')) {
      setActiveFilter('AI / NLP');
    } else {
      setActiveFilter('ALL');
    }

    if (lenis) {
      lenis.scrollTo('#projects', { offset: -50, duration: 1.2 });
    } else {
      const projectsElem = document.getElementById('projects');
      if (projectsElem) {
        projectsElem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleScrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="portfolio-app-root">
      {/* Background Ambience & Noise */}
      <div className="bg-ambient-noise" aria-hidden="true" />

      {/* Top Fixed Scroll Progress Bar */}
      <div
        className="scroll-progress-indicator"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />

      {/* Interactive Custom Cursor for Desktop */}
      <Cursor />

      {/* Minimal Sticky Navbar */}
      <Navbar onOpenResume={() => setResumeOpen(true)} />

      {/* Main Sections */}
      <main className="portfolio-main-content">
        <Hero onOpenResume={() => setResumeOpen(true)} />
        <Marquee />
        <About />
        <Skills onSkillClick={handleSkillClick} />
        <Projects
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          onSelectProject={(p) => setSelectedProject(p)}
        />
        <ExperienceEducation />
        <WhatIBring />
        <Contact />
      </main>

      {/* Minimal Brutalist Footer */}
      <footer className="portfolio-footer-root">
        <div className="footer-content-inner">
          <div className="footer-col-left">
            <span className="footer-brand">ORD.</span>
            <span className="footer-copy">© 2026 Onkar Rajendra Dhanewar. Software Developer &amp; Computer Science Engineer.</span>
          </div>

          <div className="footer-col-center">
            <span>Designed &amp; Developed by Onkar Dhanewar</span>
          </div>

          <div className="footer-col-right">
            <a
              href="https://github.com/onkardhanewar"
              target="_blank"
              rel="noreferrer"
              className="footer-nav-link"
              data-testid="link-footer-github"
              aria-label="GitHub - Onkar Rajendra Dhanewar"
              title="GitHub - Onkar Rajendra Dhanewar"
            >
              <Github size={14} /> GITHUB
            </a>
            <span className="footer-sep">/</span>
            <a
              href="https://www.linkedin.com/in/onkardhanewar"
              target="_blank"
              rel="noreferrer"
              className="footer-nav-link"
              data-testid="link-footer-linkedin"
              aria-label="LinkedIn - Onkar Rajendra Dhanewar"
              title="LinkedIn - Onkar Rajendra Dhanewar"
            >
              <Linkedin size={14} /> LINKEDIN
            </a>
            <span className="footer-sep">/</span>
            <a
              href="mailto:onkardhanewar@gmail.com"
              className="footer-nav-link"
              data-testid="link-footer-email"
              aria-label="Email Onkar Rajendra Dhanewar"
              title="Email Onkar Rajendra Dhanewar"
            >
              <Mail size={14} /> EMAIL
            </a>
          </div>
        </div>
      </footer>

      {/* Floating Back To Top Button */}
      <AnimatePresence>
        {showBackTop && (
          <button
            type="button"
            className="back-to-top-fab"
            onClick={handleScrollToTop}
            aria-label="Back to top of page"
            data-testid="button-back-to-top"
          >
            <ArrowUp size={18} />
          </button>
        )}
      </AnimatePresence>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      {/* Resume Viewer Modal */}
      <AnimatePresence>
        {resumeOpen && (
          <ResumeModal onClose={() => setResumeOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}