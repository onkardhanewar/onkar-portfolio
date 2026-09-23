import { useEffect, useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, Mail, Download, Github, Linkedin, Sparkles } from 'lucide-react';
import type { CSSProperties } from 'react';

export default function Hero({ onOpenResume }: { onOpenResume?: () => void }) {
  const reduceMotion = useReducedMotion();
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0, rotate: 0 });
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reduceMotion) return;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX / innerWidth - 0.5) * 2;
      const normY = (e.clientY / innerHeight - 0.5) * 2;

      setMouseOffset({
        x: normX * 18,
        y: normY * 18,
        rotate: normX * 8,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [reduceMotion]);

  return (
    <section
      className="hero-section"
      id="top"
      ref={heroRef}
      aria-labelledby="hero-title"
    >
      {/* Top Meta Bar */}
      <div className="hero-meta-bar">
        <div className="eyebrow-tag">
          <span className="eyebrow-accent" />
          <span>
            SOFTWARE DEVELOPER · B.TECH CSE (2026) · MAHARASHTRA, INDIA
          </span>
        </div>

        <div className="availability-badge">
          <span className="live-dot" />
          <span>AVAILABLE FOR FULL-TIME ROLES</span>
        </div>
      </div>

      {/* Main Massive Editorial Typography */}
      <div className="hero-title-container">
        <motion.h1
          className="hero-headline"
          id="hero-title"
          initial={reduceMotion ? false : { opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <span className="hero-line hero-line-1">
            <span className="word-text">Onkar</span>
          </span>

          <span className="hero-line hero-line-2">
            <span className="word-text">Rajendra</span>
          </span>

          <span className="hero-line hero-line-3">
            <span className="word-text">
              Dhanewar<span className="headline-period">.</span>
            </span>
          </span>

          {/* SEO Semantic Alternate Names */}
          <span className="sr-only">
            Onkar Dhanewar, also known as Omkar Dhanewar, Onkar Dhannewar,
            Omkar Dhannewar, OnkarOD, ORD. Computer Science Engineer
            (2026 Graduate), Python Developer, Full Stack Web Developer
            based in Maharashtra, India.
          </span>
        </motion.h1>

        {/* Floating Interactive Profile Avatar */}
        <motion.div
          className="hero-orb-wrapper"
          initial={
            reduceMotion
              ? false
              : { scale: 0.7, opacity: 0, rotate: -8 }
          }
          animate={{
            scale: 1,
            opacity: 1,
            rotate: 0,
          }}
          transition={{
            duration: 0.9,
            delay: 0.25,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          style={
            {
              '--orb-x': `${mouseOffset.x}px`,
              '--orb-y': `${mouseOffset.y}px`,
              '--orb-rot': `${mouseOffset.rotate}deg`,
            } as CSSProperties
          }
        >
          <div
            className="hero-photo-frame"
            tabIndex={0}
            role="img"
            aria-label="Onkar Rajendra Dhanewar - 2026 CSE Graduate"
          >
            <div className="hero-photo-circle">
              <img
                src={`${import.meta.env.BASE_URL}onkar-photo.jpg`}
                alt="Onkar Rajendra Dhanewar - Software Developer"
                className="hero-avatar-image"
                loading="eager"
              />

              <div className="hero-photo-ring" />
            </div>

            {/* Floating 2026 Graduate Badge */}
            <div className="hero-grad-badge">
              <span className="grad-badge-dot" />

              <div className="grad-badge-info">
                <span className="grad-badge-year">2026</span>
                <span className="grad-badge-sub">
                  CSE GRADUATE
                </span>
              </div>

              <Sparkles
                size={13}
                className="grad-badge-icon"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Hero Bottom Bar */}
      <div className="hero-footer-grid">
        <div className="hero-bio-block">
          <p className="hero-bio-text">
            Computer Science Engineer focused on turning practical ideas
            into reliable software solutions.
          </p>

          <div className="hero-tags-row">
            <span>PYTHON</span>
            <span className="bullet-sep">•</span>

            <span>C++</span>
            <span className="bullet-sep">•</span>

            <span>WEB</span>
            <span className="bullet-sep">•</span>

            <span>DATABASES</span>
            <span className="bullet-sep">•</span>

            <span>PROBLEM SOLVING</span>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="hero-cta-group">
          <a
            href="#projects"
            className="hero-cta-btn hero-cta-solid"
            data-testid="link-view-projects"
          >
            <span>VIEW PROJECTS</span>
            <ArrowDown
              size={16}
              className="btn-icon-move"
            />
          </a>

          <a
            href="#contact"
            className="hero-cta-btn hero-cta-outline"
            data-testid="link-contact-me"
          >
            <span>CONTACT ME</span>
            <Mail
              size={16}
              className="btn-icon-move"
            />
          </a>
        </div>
      </div>

      {/* Quick Access Anchor Links */}
      <div className="hero-quick-links">

        {/* FIXED RESUME PATH */}
        <a
          href={`${import.meta.env.BASE_URL}Onkar_Dhanewar_Resume.pdf`}
          download="Onkar_Dhanewar_Resume.pdf"
          className="quick-link-item"
          data-testid="link-download-resume"
          title="Download Official Resume in PDF format"
        >
          <span>DOWNLOAD RESUME (PDF)</span>
          <Download size={13} />
        </a>

        <span className="quick-sep">/</span>

        <a
          href="https://github.com/onkardhanewar"
          target="_blank"
          rel="noreferrer"
          className="quick-link-item"
          data-testid="link-hero-github"
        >
          <span>GITHUB</span>
          <Github size={13} />
        </a>

        <span className="quick-sep">/</span>

        <a
          href="https://www.linkedin.com/in/onkardhanewar"
          target="_blank"
          rel="noreferrer"
          className="quick-link-item"
          data-testid="link-hero-linkedin"
        >
          <span>LINKEDIN</span>
          <Linkedin size={13} />
        </a>
      </div>
    </section>
  );
}