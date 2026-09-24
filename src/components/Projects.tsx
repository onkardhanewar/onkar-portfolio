import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Bot, Cpu, Globe, Database, Calculator, FolderGit2, Sparkles } from 'lucide-react';
import { projects, otherAcademicWork, type Project } from '@/data/projects';

const filterCategories = ['ALL', 'AI / NLP', 'ROBOTICS', 'WEB', 'DATABASE', 'C++', 'PYTHON'];

export default function Projects({
  activeFilter,
  setActiveFilter,
  onSelectProject,
}: {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  onSelectProject: (project: Project) => void;
}) {
  const reduceMotion = useReducedMotion();

  const filteredProjects = activeFilter === 'ALL'
    ? projects
    : projects.filter((p) => p.filters.includes(activeFilter));

  return (
    <section className="section-container projects-section-root" id="projects" aria-labelledby="projects-title">
      <div className="section-badge-row">
        <span className="section-index">03 — FEATURED PROJECTS</span>
        <span className="projects-count-badge">06 builds</span>
      </div>

      <div className="projects-header-block">
        <h2 className="section-main-heading" id="projects-title">
          Featured Projects — <span className="heading-highlight">Software &amp; Web Applications.</span>
        </h2>

        {/* Filter Tabs */}
        <div className="project-filter-tabs" role="tablist" aria-label="Project Category Filters">
          {filterCategories.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(filter)}
                className={`filter-tab-btn ${isActive ? 'is-active' : ''}`}
                data-testid={`button-filter-${filter.toLowerCase().replace(/[\s/]+/g, '-')}`}
              >
                <span>{filter}</span>
                {isActive && (
                  <motion.div
                    className="filter-active-indicator"
                    layoutId="filter-tab-pill"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects List with custom visual mockups */}
      <div className="projects-cards-stack">
        <AnimatePresence mode="popLayout" initial={false}>
          {filteredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              layout
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className={`project-card theme-${project.colorScheme}`}
              tabIndex={0}
              onClick={() => onSelectProject(project)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectProject(project);
                }
              }}
              data-testid={`card-project-${project.id}`}
            >
              {/* Project Card Header Visual Mockups matching reference */}
              {project.id === 'college-assistance-chatbot' && (
                <div className="card-mockup-header mockup-chatbot">
                  <div className="mockup-top-row">
                    <span className="mockup-label">AI / NLP</span>
                    <span className="mockup-number">{project.number}</span>
                  </div>
                  <div className="mockup-chat-bubble">
                    <span className="chat-prompt-text">STUDENT QUESTION → HELPFUL ANSWER</span>
                    <div className="chat-progress-bar">
                      <div className="progress-fill" />
                    </div>
                  </div>
                </div>
              )}

              {project.id === 'military-surveillance-robot' && (
                <div className="card-mockup-header mockup-robot">
                  <div className="mockup-top-row">
                    <span className="mockup-label">EMBEDDED SYSTEMS</span>
                    <span className="mockup-number">{project.number}</span>
                  </div>
                  <div className="mockup-radar-widget">
                    <div className="radar-circle">
                      <div className="radar-sweep" />
                      <div className="radar-blip" />
                    </div>
                  </div>
                </div>
              )}

              {project.id === 'amravati-ro-purifier' && (
                <div className="card-mockup-header mockup-ro">
                  <div className="mockup-top-row">
                    <span className="mockup-label">WEB APPLICATION</span>
                    <span className="mockup-number">{project.number}</span>
                  </div>
                  <div className="mockup-product-cards-row">
                    <div className="mock-card mock-card-1" />
                    <div className="mock-card mock-card-2" />
                    <div className="mock-card mock-card-3" />
                  </div>
                </div>
              )}

              {project.id === 'student-profile-management' && (
                <div className="card-mockup-header mockup-database">
                  <div className="mockup-top-row">
                    <span className="mockup-label">04 — DATA WORKFLOW</span>
                    <Database size={22} className="mockup-icon-red" />
                  </div>
                </div>
              )}

              {project.id === 'scientific-calculator' && (
                <div className="card-mockup-header mockup-calculator">
                  <div className="mockup-top-row">
                    <span className="mockup-label">05 — C++ LOGIC</span>
                    <span className="mockup-fx-badge">fx</span>
                  </div>
                </div>
              )}

              {project.id === 'certificate-management' && (
                <div className="card-mockup-header mockup-certificate">
                  <div className="mockup-top-row">
                    <span className="mockup-label">06 — RECORD SYSTEM</span>
                    <FolderGit2 size={22} className="mockup-icon-folder" />
                  </div>
                </div>
              )}

              {/* Card Body Content */}
              <div className="project-card-body">
                <div className="project-title-row">
                  <div className="project-title-left">
                    <h3 className="project-title">{project.title}</h3>
                    {project.liveUrl && (
                      <span className="card-live-tag">
                        <span className="live-dot-mini" /> LIVE DEPLOYED
                      </span>
                    )}
                  </div>
                  <div className="project-action-group">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="project-live-direct-btn"
                        onClick={(e) => e.stopPropagation()}
                        data-testid={`link-direct-live-${project.id}`}
                        title="Open live website on Render"
                      >
                        <span>LIVE SITE</span>
                        <ArrowUpRight size={13} />
                      </a>
                    )}
                    <span className="project-action-link">
                      <span>EXPLORE SPECS</span>
                      <ArrowUpRight size={16} className="project-arrow" />
                    </span>
                  </div>
                </div>
                <p className="project-description">{project.description}</p>

                {/* Tech Badges */}
                <div className="project-tech-badges">
                  {project.technologies.slice(0, 6).map((tech) => (
                    <span key={tech} className="tech-chip">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Sub Features Line */}
                <div className="project-features-line">
                  {project.features.slice(0, 4).map((f, i) => (
                    <span key={i} className="feature-bullet-item">
                      {f.toUpperCase()}
                      {i < 3 && <span className="sep">•</span>}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {/* Other Academic Work Section matching reference */}
      <div className="other-academic-work-card">
        <h4 className="other-work-heading">OTHER ACADEMIC WORK</h4>
        <div className="other-work-tags-list">
          {otherAcademicWork.map((item, idx) => (
            <div className="other-work-pill" key={idx}>
              <Sparkles size={12} className="tag-star" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
