import { motion, useReducedMotion } from 'framer-motion';
import { skillCategories } from '@/data/projects';
import { Code, Globe, Database, Cpu } from 'lucide-react';

const iconsMap: Record<string, typeof Code> = {
  programming: Code,
  'web-dev': Globe,
  'data-db': Database,
  'core-tools': Cpu,
};

export default function Skills({ onSkillClick }: { onSkillClick?: (skill: string) => void }) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section-container skills-section-root" id="skills" aria-labelledby="skills-title">
      <div className="section-badge-row">
        <span className="section-index">02 — TECHNICAL TOOLKIT</span>
      </div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 25 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="section-main-heading" id="skills-title">
          Full-stack curiosity. <span className="heading-highlight">Solid foundations.</span>
        </h2>

        {/* 4 Themed Skill Cards Grid matching reference */}
        <div className="skills-cards-grid">
          {skillCategories.map((category) => {
            const IconComponent = iconsMap[category.id] || Code;
            return (
              <div
                key={category.id}
                className={`skill-category-card theme-${category.colorTheme}`}
                data-testid={`card-skill-${category.id}`}
              >
                <div className="category-card-header">
                  <div className="category-title-group">
                    <h3 className="category-title">{category.title}</h3>
                    <p className="category-subtitle">{category.subtitle}</p>
                  </div>
                  <div className="category-icon-bubble">
                    <IconComponent size={20} />
                  </div>
                </div>

                <div className="skills-pill-cloud">
                  {category.skills.map((skill) => (
                    <button
                      type="button"
                      key={skill.name}
                      onClick={() => onSkillClick?.(skill.name)}
                      className={`skill-pill ${skill.highlight ? 'is-highlight' : ''}`}
                      title={`Click to filter projects using ${skill.name}`}
                    >
                      <span className="pill-dot" />
                      <span className="pill-text">{skill.name}</span>
                    </button>
                  ))}
                </div>

                {category.footerNote && (
                  <div className="category-footer-note">
                    <span>{category.footerNote}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
