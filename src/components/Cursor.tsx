import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState<{ active: boolean; text?: string; variant?: 'view' | 'copy' | 'link' | 'normal' }>({
    active: false,
    text: '',
    variant: 'normal',
  });

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || isReduced) return;

    setEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const projectCard = target.closest('.project-card');
      const copyBtn = target.closest('[data-cursor="copy"]');
      const interactiveBtn = target.closest('button, a, .interactive-card, .skill-pill');

      if (projectCard) {
        setCursorState({ active: true, text: 'VIEW', variant: 'view' });
      } else if (copyBtn) {
        setCursorState({ active: true, text: 'COPY', variant: 'copy' });
      } else if (interactiveBtn) {
        setCursorState({ active: true, text: '', variant: 'link' });
      } else {
        setCursorState({ active: false, text: '', variant: 'normal' });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      className="custom-cursor-root"
      aria-hidden="true"
      style={{ '--cursor-x': `${position.x}px`, '--cursor-y': `${position.y}px` } as CSSProperties}
    >
      <div className={`cursor-dot ${cursorState.active ? 'is-active' : ''}`} />
      <div className={`cursor-ring ${cursorState.active ? 'is-active' : ''} ${cursorState.text ? 'has-text' : ''}`}>
        {cursorState.text && <span className="cursor-label">{cursorState.text}</span>}
      </div>
    </div>
  );
}
