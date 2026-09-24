import { useEffect } from 'react';
import { ReactLenis } from 'lenis/react';
import Portfolio from '@/components/Portfolio';
import 'lenis/dist/lenis.css';

const TRACKING_PARAMS = new Set([
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'utm_id',
]);

function cleanTrackingParams() {
  if (typeof window === 'undefined') return;

  try {
    const url = new URL(window.location.href);
    const keysToDelete: string[] = [];

    url.searchParams.forEach((_, key) => {
      if (TRACKING_PARAMS.has(key.toLowerCase())) {
        keysToDelete.push(key);
      }
    });

    if (keysToDelete.length > 0) {
      keysToDelete.forEach((key) => url.searchParams.delete(key));
      const cleanSearch = url.searchParams.toString() ? `?${url.searchParams.toString()}` : '';
      const cleanUrl = `${url.pathname}${cleanSearch}${url.hash}`;
      window.history.replaceState(window.history.state ?? {}, '', cleanUrl);
    }
  } catch (error) {
    console.error('Failed to clean tracking parameters:', error);
  }
}

function App() {
  useEffect(() => {
    cleanTrackingParams();
  }, []);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.2,
        infinite: false,
      }}
    >
      <Portfolio />
    </ReactLenis>
  );
}

export default App;