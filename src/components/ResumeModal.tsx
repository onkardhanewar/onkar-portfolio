import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Printer, Download, Mail, Phone, MapPin, Linkedin, Github, ExternalLink } from 'lucide-react';

export default function ResumeModal({ onClose }: { onClose: () => void }) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

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

  const handlePrint = () => {
    window.print();
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
        className="modal-dialog-box resume-modal-box"
        data-lenis-prevent
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-modal-title"
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Header Action Row */}
        <div className="resume-top-actions">
          <div className="resume-tag-pill">CURRICULUM VITAE · ONKAR DHANEWAR</div>
          <div className="resume-actions-right">
            <a
              href={`${import.meta.env.BASE_URL}Onkar_Dhanewar_Resume.pdf`}
              download="Onkar_Dhanewar_Resume.pdf"
              className="resume-action-btn solid-download-btn"
              data-testid="button-download-pdf"
              title="Download Original Resume PDF"
            >
              <Download size={15} />
              <span>DOWNLOAD PDF</span>
            </a>
            <a
              href={`${import.meta.env.BASE_URL}Onkar_Dhanewar_Resume.pdf`}
              target="_blank"
              rel="noreferrer"
              className="resume-action-btn"
              title="Open Resume in new tab"
            >
              <ExternalLink size={15} />
              <span>OPEN PDF</span>
            </a>
            <button
              type="button"
              onClick={handlePrint}
              className="resume-action-btn"
              title="Print Document"
            >
              <Printer size={15} />
              <span>PRINT</span>
            </button>
            <button
              className="modal-close-trigger resume-close"
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label="Close resume preview"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Resume Document */}
        <div className="resume-document-body" id="printable-resume">
          {/* Header */}
          <div className="resume-doc-header">
            <h1 id="resume-modal-title" className="doc-name">ONKAR DHANEWAR</h1>
            <p className="doc-title">Near Destination Center, Nanded City, Pune - 411041, Maharashtra</p>
            <div className="doc-contacts-row">
              <span><Phone size={13} /> +91 9284721194</span>
              <span><Mail size={13} /> onkardhanewar@gmail.com</span>
              <a href="https://github.com/onkardhanewar" target="_blank" rel="noreferrer" className="doc-link-span">
                <Github size={13} /> github.com/onkardhanewar
              </a>
              <a href="https://linkedin.com/in/onkardhanewar" target="_blank" rel="noreferrer" className="doc-link-span">
                <Linkedin size={13} /> linkedin.com/in/onkardhanewar
              </a>
            </div>
          </div>

          <div className="doc-divider" />

          {/* Education */}
          <div className="doc-section">
            <h2 className="doc-section-title">EDUCATION</h2>
            
            <div className="doc-entry">
              <div className="doc-entry-header">
                <strong>B.Tech – in Computer Science &amp; Engineering</strong>
                <span className="doc-year">November 2022 – May 2026</span>
              </div>
              <p className="doc-entry-sub">Rashtrasant Tukadoji Maharaj Nagpur University</p>
              <p className="doc-entry-note"><strong>CGPA:</strong> 6.11 / 10.00 &nbsp;(Final semester SGPA: 8.50 / 10)</p>
            </div>

            <div className="doc-entry mt-2">
              <div className="doc-entry-header">
                <strong>HSC, Class XII</strong>
                <span className="doc-year">June 2020 – April 2022</span>
              </div>
              <p className="doc-entry-sub">Shivkrupa Jr. College Gadchiroli, Gadchiroli, Maharashtra</p>
            </div>

            <div className="doc-entry mt-2">
              <div className="doc-entry-header">
                <strong>SSC, Class X</strong>
                <span className="doc-year">March 2019 – March 2020</span>
              </div>
              <p className="doc-entry-sub">Shivaji High School And Jr. Science College, Gadchiroli, Maharashtra</p>
            </div>
          </div>

          {/* Skills & Interests */}
          <div className="doc-section">
            <h2 className="doc-section-title">SKILLS AND INTERESTS</h2>
            <div className="doc-skills-grid">
              <div>
                <strong>Interests:</strong> Software Engineering, Backend Development, Full-Stack Web Development, Python Development, SQL, REST API Development, Database Systems, Artificial Intelligence, Data Structures &amp; Algorithms, Software Design, Web Technologies.
              </div>
              <div>
                <strong>Programming &amp; Tech:</strong> Python, C++, Core Java, Django, JDBC, SQL, OOP, Data Structures &amp; Algorithms (DSA), NLTK, NumPy, Pandas, HTML, CSS, JavaScript, REST APIs, Git, GitHub, MySQL, Database Management, CRUD Operations, Exception Handling, File Handling, Functional Programming, Debugging, API Integration, Data Analysis, Web Development.
              </div>
            </div>
          </div>

          {/* Projects */}
          <div className="doc-section">
            <h2 className="doc-section-title">PROJECTS</h2>

            <div className="doc-project-entry">
              <div className="doc-entry-header">
                <strong>RO Product Selling and Service Website — Full-Stack Web Development Project</strong>
                <span>Jan 2026 – April 2026</span>
              </div>
              <p className="doc-entry-note">Major Project as a part of curriculum · <a href="https://ro-water-purifier-1.onrender.com/" target="_blank" rel="noreferrer" className="doc-link-accent">Live Website Link ↗</a></p>
              <p className="doc-entry-desc">
                • Developed a full-stack e-commerce and service-booking web application for RO water purifiers using React (Vite) for frontend and Node.js/Express.js for backend, enabling end-to-end product sales and service management.<br />
                • Designed and integrated RESTful APIs to manage product catalog, booking workflows, and user data, supporting 100+ simulated booking requests for installation, servicing, and repair.<br />
                • Engineered a component-based architecture with optimized frontend tooling, achieving sub-2-second load times across desktop and mobile devices.
              </p>
            </div>

            <div className="doc-project-entry mt-3">
              <div className="doc-entry-header">
                <strong>College Assistance Chatbot — AI/ML Full-Stack Project</strong>
                <span>Nov 2025 – Jan 2026</span>
              </div>
              <p className="doc-entry-note">Major Project as a part of curriculum · <a href="https://github.com/onkardhanewar" target="_blank" rel="noreferrer" className="doc-link-accent">GitHub Link ↗</a></p>
              <p className="doc-entry-desc">
                • Developed a full-stack AI-powered chatbot using Python and Flask, delivering instant 24/7 automated responses to 200+ student inquiries on admissions, academics, and campus services.<br />
                • Engineered a RESTful backend API to receive user queries, process them through a Natural Language Processing (NLP) model, and return structured JSON responses in real time.<br />
                • Implemented an NLP preprocessing pipeline using NLTK, including tokenization, lemmatization, and intent classification, to accurately interpret diverse user queries and improve response relevance.
              </p>
            </div>
          </div>

          {/* Internship & Trainings */}
          <div className="doc-section">
            <h2 className="doc-section-title">INTERNSHIP / TRAININGS</h2>
            <div className="doc-entry">
              <div className="doc-entry-header">
                <strong>Python Full Stack Development Intern</strong>
                <span className="doc-year">6 Months Internship</span>
              </div>
              <p className="doc-entry-sub">Kiran Academy, Pune (javabyKiran)</p>
              <p className="doc-entry-note">
                <strong>Certificate of Completion:</strong> Python Full Stack · Credential ID: <code>JBK-COURSE-COMP-202605-000156</code> (Issued: 17-May-2026) · <a href={`${import.meta.env.BASE_URL}kiran-academy-certificate.pdf`} target="_blank" rel="noreferrer" className="doc-link-accent">View Certificate PDF ↗</a>
              </p>
              <p className="doc-entry-desc">
                • Completed a 6-month Python Full Stack Development internship, gaining practical experience in Python programming, web development, database integration, and full-stack application development.<br />
                • Practical implementation of Python, web development, database integration, REST APIs, and full-stack application development workflows.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="resume-doc-footer">
          <a
            href={`${import.meta.env.BASE_URL}Onkar_Dhanewar_Resume.pdf`}
            download="Onkar_Dhanewar_Resume.pdf"
            className="resume-print-footer-btn solid-footer-download"
          >
            <Download size={16} /> DOWNLOAD OFFICIAL RESUME (PDF)
          </a>
          <a
            href={`${import.meta.env.BASE_URL}Onkar_Dhanewar_Resume.pdf`}
            target="_blank"
            rel="noreferrer"
            className="resume-print-footer-btn outline-footer-btn"
          >
            <ExternalLink size={16} /> OPEN PDF IN BROWSER
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
