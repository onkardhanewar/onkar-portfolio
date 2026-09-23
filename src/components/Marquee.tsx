export default function Marquee() {
  const items = [
    'CODE. CREATE. LEARN. BUILD.',
    'PRACTICAL PROJECTS, CLEAR THINKING',
    'READY FOR REAL-WORLD PROBLEMS',
    'FULL STACK & AI/NLP WORKFLOWS',
    'ROBUST DATABASE ARCHITECTURE',
    'CLEAN SYSTEM DESIGN',
  ];

  return (
    <div className="marquee-wrapper" aria-hidden="true">
      <div className="marquee-track">
        {[...items, ...items, ...items, ...items].map((text, idx) => (
          <div className="marquee-item" key={idx}>
            <span className="marquee-text">{text}</span>
            <span className="marquee-symbol">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
