import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const navLinks = [
  { label: 'ABOUT', href: '#about' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'CONTACT', href: '#contact' },
];

export default function Navbar({ onOpenResume }: { onOpenResume?: () => void }) {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('top');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['top', 'about', 'skills', 'projects', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`nav-wrapper ${scrolled ? 'is-scrolled' : ''}`}>
      <nav className="nav-container" aria-label="Primary Navigation">
        <a href="#top" className="brand-logo" data-testid="link-brand">
          <span className="brand-badge">ORD.</span>
        </a>

        {/* Desktop Nav Links */}
        <div className="nav-desktop-links">
          {navLinks.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link-item ${isActive ? 'is-active' : ''}`}
                data-testid={`link-nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Right CTA */}
        <div className="nav-right-actions">
          {onOpenResume && (
            <button
              type="button"
              onClick={onOpenResume}
              className="nav-resume-btn"
              data-testid="button-nav-resume"
            >
              RESUME
            </button>
          )}
          <a
            href="#contact"
            className="nav-talk-btn"
            data-testid="link-nav-contact"
            aria-label="Contact Onkar"
          >
            <ArrowUpRight size={18} />
          </a>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-toggle"
            type="button"
            aria-label={open ? 'Close Menu' : 'Open Menu'}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            data-testid="button-mobile-menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <div className={`mobile-nav-panel ${open ? 'is-open' : ''}`}>
          <div className="mobile-nav-content">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="mobile-nav-link"
                data-testid={`link-mobile-${link.label.toLowerCase()}`}
              >
                <span>{link.label}</span>
                <ArrowUpRight size={16} />
              </a>
            ))}
            {onOpenResume && (
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onOpenResume();
                }}
                className="mobile-resume-btn"
              >
                VIEW FULL RESUME ↗
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
