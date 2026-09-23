import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Award,
  GraduationCap,
  Calendar,
  BookOpen,
  ExternalLink,
  Download,
  X,
  ShieldCheck,
} from 'lucide-react';

export default function ExperienceEducation() {
  const reduceMotion = useReducedMotion();
  const [showCertModal, setShowCertModal] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // GitHub Pages compatible asset paths
  const baseUrl = import.meta.env.BASE_URL;

  const certificatePdf = `${baseUrl}kiran-academy-certificate.pdf`;
  const certificateImage = `${baseUrl}kiran-academy-certificate.webp`;

  useEffect(() => {
    if (!showCertModal) return;

    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowCertModal(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [showCertModal]);

  return (
    <section
      className="section-container exp-edu-section"
      id="experience"
      aria-labelledby="exp-title"
    >
      <div className="section-badge-row">
        <span className="section-index">04 — TRAINING & EDUCATION</span>
      </div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 25 }}
        whileInView={
          reduceMotion ? undefined : { opacity: 1, y: 0 }
        }
        viewport={{ once: true, margin: '-60px' }}
        transition={{
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <h2 className="section-main-heading" id="exp-title">
          Learn it.{' '}
          <span className="heading-highlight">
            Build it. Repeat.
          </span>
        </h2>

        {/* Stacked Timeline Cards */}
        <div className="exp-edu-stack">

          {/* Card 1: Python Full Stack Development Internship */}
          <div className="timeline-card dark-theme-card">
            <div className="card-top-meta">
              <span className="meta-badge-dark">
                <Calendar size={13} />
                <span>6 MONTHS INTERNSHIP</span>
              </span>

              <span className="cert-badge">
                <Award size={14} className="text-acid" />
                <span>KIRAN ACADEMY, PUNE</span>
              </span>
            </div>

            <h3 className="timeline-card-title">
              Python Full Stack Development Intern
            </h3>

            <p className="timeline-card-school">
              Kiran Academy, Pune (javabyKiran · IT Training &amp; Placement)
            </p>

            <p className="timeline-card-desc">
              Completed a 6-month Python Full Stack Development internship,
              gaining practical experience in Python programming, web
              development, database integration, and full-stack application
              development.
            </p>

            {/* Certificate Verification */}
            <div className="cert-info-bar">
              <div className="cert-info-left">
                <ShieldCheck size={16} className="text-mauve" />

                <span className="cert-code-text">
                  Credential ID:{' '}
                  <strong>
                    JBK-COURSE-COMP-202605-000156
                  </strong>
                </span>

                <span className="cert-date-text">
                  · Issued: 17-May-2026
                </span>
              </div>

              <div className="cert-action-btns">

                {/* View Certificate */}
                <button
                  type="button"
                  onClick={() => setShowCertModal(true)}
                  className="cert-view-btn"
                  title="View Certificate of Completion"
                >
                  <Award size={14} />
                  <span>VIEW CERTIFICATE</span>
                </button>

                {/* Open PDF */}
                <a
                  href={certificatePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-pdf-link"
                  title="Open Certificate PDF in new tab"
                >
                  <ExternalLink size={14} />
                  <span>PDF</span>
                </a>

              </div>
            </div>

            <div className="timeline-tag-list">
              <span className="dark-tag">Python</span>
              <span className="dark-tag">
                Full-Stack Development
              </span>
              <span className="dark-tag">
                Web Development
              </span>
              <span className="dark-tag">
                Database Integration
              </span>
              <span className="dark-tag">
                REST APIs &amp; SQL
              </span>
              <span className="dark-tag">
                AICTE &amp; NSDC Recognized
              </span>
            </div>
          </div>

          {/* Card 2: B.Tech in CSE */}
          <div
            className="timeline-card light-theme-card"
            id="education"
          >
            <div className="card-top-meta">
              <span className="meta-badge-light">
                <GraduationCap size={14} />
                <span>B.TECH · GRADUATING 2026</span>
              </span>

              <span className="univ-badge">
                <BookOpen size={14} />
                <span>RTMNU</span>
              </span>
            </div>

            <h3 className="timeline-card-title">
              Computer Science &amp; Engineering
            </h3>

            <p className="timeline-card-school">
              R.V. Parankar College of Engineering and Technology, Arvi
            </p>

            <p className="timeline-card-desc">
              Rashtrasant Tukadoji Maharaj Nagpur University (RTMNU) ·
              Strong grounding in core computer science disciplines,
              algorithms, operating systems, and software engineering
              principles.
            </p>

            <div className="timeline-tag-list">
              <span className="light-tag">DSA</span>
              <span className="light-tag">DBMS</span>
              <span className="light-tag">OS</span>
              <span className="light-tag">Networks</span>
              <span className="light-tag">AI Fundamentals</span>
              <span className="light-tag">Web Dev</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Certificate Lightbox Modal */}
      <AnimatePresence>
        {showCertModal && (
          <motion.div
            className="modal-overlay cert-modal-overlay"
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowCertModal(false);
              }
            }}
          >
            <motion.div
              className="modal-dialog-box cert-modal-box"
              role="dialog"
              aria-modal="true"
              aria-labelledby="cert-modal-title"
              initial={{
                opacity: 0,
                scale: 0.95,
                y: 15,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 15,
              }}
              transition={{
                duration: 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
            >

              {/* Modal Header */}
              <div className="cert-modal-header">
                <div>
                  <span className="cert-eyebrow">
                    OFFICIAL CREDENTIAL
                  </span>

                  <h3
                    id="cert-modal-title"
                    className="cert-modal-h3"
                  >
                    Certificate of Completion — Python Full Stack
                  </h3>

                  <p className="cert-modal-issuer">
                    Kiran Academy (javabyKiran) · IT Training &amp;
                    Placement
                  </p>
                </div>

                <div className="cert-modal-header-actions">

                  {/* Download Certificate */}
                  <a
                    href={certificatePdf}
                    download="Onkar_Dhanewar_Python_Full_Stack_Certificate.pdf"
                    className="cert-modal-download-btn"
                  >
                    <Download size={15} />
                    <span>DOWNLOAD PDF</span>
                  </a>

                  {/* Close */}
                  <button
                    ref={closeBtnRef}
                    type="button"
                    onClick={() => setShowCertModal(false)}
                    className="modal-close-trigger"
                    aria-label="Close certificate modal"
                  >
                    <X size={18} />
                  </button>

                </div>
              </div>

              {/* Certificate Image */}
              <div className="cert-image-container">
                <img
                  src={certificateImage}
                  alt="Onkar Rajendra Dhanewar - Python Full Stack Certificate of Completion - Kiran Academy"
                  className="cert-img-rendered"
                  loading="eager"
                />
              </div>

              {/* Certificate Verification Footer */}
              <div className="cert-modal-footer">

                <div className="cert-verify-item">
                  <span className="verify-label">
                    RECIPIENT:
                  </span>

                  <span className="verify-value">
                    Onkar Rajendra Dhanewar
                  </span>
                </div>

                <div className="cert-verify-item">
                  <span className="verify-label">
                    VERIFICATION CODE:
                  </span>

                  <span className="verify-value mono-val">
                    JBK-COURSE-COMP-202605-000156
                  </span>
                </div>

                <div className="cert-verify-item">
                  <span className="verify-label">
                    ISSUED DATE:
                  </span>

                  <span className="verify-value">
                    17-May-2026
                  </span>
                </div>

                <div className="cert-verify-item">
                  <span className="verify-label">
                    VERIFY VIA EMAIL:
                  </span>

                  <a
                    href="mailto:operations@thekiranacademy.com"
                    className="verify-link"
                  >
                    operations@thekiranacademy.com
                  </a>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}