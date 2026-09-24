import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight,
  Check,
  Clipboard,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Send,
  Sparkles,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

export default function Contact() {
  const reduceMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('onkardhanewar@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.href = 'mailto:onkardhanewar@gmail.com';
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const [sendError, setSendError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Please provide your full name.';
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address (e.g. name@domain.com).';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Please add a subject for your inquiry.';
    if (!formData.message.trim()) {
      newErrors.message = 'Please type a brief message.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmitting(true);
      setSendError('');

      try {
        const response = await fetch('https://formsubmit.co/ajax/onkardhanewar@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            _subject: `[Portfolio Inquiry] ${formData.subject}`,
            message: formData.message,
            _replyto: formData.email,
            _template: 'table',
          }),
        });

        const data = await response.json();

        if (response.ok || data.success === 'true' || data.success === true) {
          setSubmitted(true);
        } else {
          // If service returns an error message
          setSendError(data.message || 'Could not send message. Please use direct email or click below.');
        }
      } catch {
        // Fallback gracefully on network issues
        setSendError('Network issue encountered. You can send directly using your email app below.');
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleOpenMailto = () => {
    const subject = encodeURIComponent(formData.subject || 'Portfolio Inquiry');
    const body = encodeURIComponent(`Hi Onkar,\n\n${formData.message}\n\nFrom,\n${formData.name} (${formData.email})`);
    window.location.href = `mailto:onkardhanewar@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleResetForm = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setErrors({});
    setSendError('');
    setSubmitted(false);
  };

  return (
    <section className="section-container contact-section-root" id="contact" aria-labelledby="contact-title">
      <div className="section-badge-row">
        <span className="section-index text-lavender">06 — LET’S CONNECT</span>
      </div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 25 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="section-main-heading text-cream" id="contact-title">
          Contact Onkar Rajendra Dhanewar — <span className="heading-highlight-lime">Let’s Build Something Great.</span>
        </h2>
        <p className="contact-lead-sub">
          I am open to entry-level software development, Python, and web engineering opportunities, projects, and collaborations.
        </p>

        {/* Massive Acid-Lime Email Banner Button matching reference */}
        <div className="giant-email-banner-wrap">
          <button
            type="button"
            className="giant-email-banner"
            onClick={handleCopyEmail}
            data-cursor="copy"
            title="Click to copy email or open mail client"
            aria-label="Copy onkardhanewar@gmail.com to clipboard"
            data-testid="button-giant-email"
          >
            <span className="email-text">ONKARDHANEWAR@GMAIL.COM</span>
            <span className="email-action-badge">
              {copied ? (
                <>
                  <Check size={20} className="text-dark" />
                  <span className="badge-text">COPIED TO CLIPBOARD!</span>
                </>
              ) : (
                <>
                  <Clipboard size={18} />
                  <ArrowUpRight size={24} />
                </>
              )}
            </span>
          </button>
        </div>

        {/* Contact Links & Info Grid */}
        <div className="contact-details-grid">
          <a
            href="tel:+919284721194"
            className="contact-info-row"
            data-testid="link-phone"
            aria-label="Call Onkar Rajendra Dhanewar at +91 9284721194"
            title="Call Onkar Rajendra Dhanewar"
          >
            <div className="info-left">
              <Phone size={15} />
              <span>+91 9284721194</span>
            </div>
            <span className="info-right-tag">CALL ↗</span>
          </a>

          <div className="contact-info-row static-row">
            <div className="info-left">
              <MapPin size={15} />
              <span>MAHARASHTRA, INDIA</span>
            </div>
            <span className="info-right-tag">BASED HERE</span>
          </div>

          <a
            href="https://www.linkedin.com/in/onkardhanewar"
            target="_blank"
            rel="noreferrer"
            className="contact-info-row"
            data-testid="link-linkedin"
            aria-label="LinkedIn - Onkar Rajendra Dhanewar"
            title="LinkedIn - Onkar Rajendra Dhanewar"
          >
            <div className="info-left">
              <Linkedin size={15} />
              <span>LINKEDIN: ONKAR DHANEWAR</span>
            </div>
            <span className="info-right-tag">CONNECT ↗</span>
          </a>

          <a
            href="https://github.com/onkardhanewar"
            target="_blank"
            rel="noreferrer"
            className="contact-info-row"
            data-testid="link-github"
            aria-label="GitHub - Onkar Rajendra Dhanewar"
            title="GitHub - Onkar Rajendra Dhanewar"
          >
            <div className="info-left">
              <Github size={15} />
              <span>GITHUB: GITHUB.COM/ONKARDHANEWAR</span>
            </div>
            <span className="info-right-tag">CODE ↗</span>
          </a>
        </div>

        {/* Contact Message Form */}
        <div className="contact-form-wrapper">
          <div className="form-header-bar">
            <span className="form-header-title">SEND A DIRECT MESSAGE</span>
            <Sparkles size={16} className="text-acid" />
          </div>

          {submitted ? (
            <div className="form-success-state" role="status">
              <CheckCircle2 size={36} className="success-icon" />
              <h3 className="success-title">Message Sent Successfully!</h3>
              <p className="success-copy">
                Thank you for reaching out, <strong>{formData.name}</strong>. Your message has been submitted and forwarded directly to <strong>onkardhanewar@gmail.com</strong>.
              </p>
              <div className="success-actions-row">
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="reset-form-btn"
                >
                  SEND ANOTHER MESSAGE ↗
                </button>
                <button
                  type="button"
                  onClick={handleOpenMailto}
                  className="reset-form-btn mailto-btn"
                >
                  OPEN IN EMAIL APP ↗
                </button>
              </div>
            </div>
          ) : (
            <form className="contact-form-element" onSubmit={handleSubmit} noValidate>
              {sendError && (
                <div className="send-error-banner" role="alert">
                  <div className="send-error-text">
                    <AlertCircle size={16} />
                    <span>{sendError}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleOpenMailto}
                    className="error-mailto-btn"
                  >
                    SEND VIA GMAIL / EMAIL CLIENT ↗
                  </button>
                </div>
              )}

              <div className="form-fields-grid">
                <div className="form-field-group">
                  <label htmlFor="input-name">YOUR NAME *</label>
                  <input
                    id="input-name"
                    type="text"
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={errors.name ? 'has-error' : ''}
                    data-testid="input-contact-name"
                  />
                  {errors.name && (
                    <span className="form-field-error">
                      <AlertCircle size={13} /> {errors.name}
                    </span>
                  )}
                </div>

                <div className="form-field-group">
                  <label htmlFor="input-email">YOUR EMAIL *</label>
                  <input
                    id="input-email"
                    type="email"
                    placeholder="e.g. alex@company.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={errors.email ? 'has-error' : ''}
                    data-testid="input-contact-email"
                  />
                  {errors.email && (
                    <span className="form-field-error">
                      <AlertCircle size={13} /> {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-field-group mt-3">
                <label htmlFor="input-subject">SUBJECT / TOPIC *</label>
                <input
                  id="input-subject"
                  type="text"
                  placeholder="e.g. Entry-level Software Developer Opportunity"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  className={errors.subject ? 'has-error' : ''}
                  data-testid="input-contact-subject"
                />
                {errors.subject && (
                  <span className="form-field-error">
                    <AlertCircle size={13} /> {errors.subject}
                  </span>
                )}
              </div>

              <div className="form-field-group mt-3">
                <div className="label-with-count">
                  <label htmlFor="input-message">YOUR MESSAGE *</label>
                  <span className="char-counter">{formData.message.length} chars</span>
                </div>
                <textarea
                  id="input-message"
                  rows={4}
                  placeholder="Tell me about the role, project, or collaboration..."
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className={errors.message ? 'has-error' : ''}
                  data-testid="input-contact-message"
                />
                {errors.message && (
                  <span className="form-field-error">
                    <AlertCircle size={13} /> {errors.message}
                  </span>
                )}
              </div>

              <div className="form-submit-row">
                <p className="form-integration-note">
                  Messages are sent directly to onkardhanewar@gmail.com. You can also click the top banner to copy the email.
                </p>
                <div className="form-submit-actions">
                  <button
                    type="button"
                    onClick={handleOpenMailto}
                    className="direct-mail-btn"
                    title="Open your device email client"
                  >
                    DIRECT MAIL ↗
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="form-submit-btn"
                    data-testid="button-send-message"
                  >
                    {submitting ? (
                      <span>SENDING...</span>
                    ) : (
                      <>
                        <span>SEND MESSAGE</span>
                        <Send size={15} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  );
}
