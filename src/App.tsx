import { useEffect } from 'react';
import { ReactLenis } from 'lenis/react';
import Portfolio from '@/components/Portfolio';
import 'lenis/dist/lenis.css';

function App() {
  useEffect(() => {
    const url = new URL(window.location.href);

    // Remove ChatGPT/other UTM source parameters from the visible URL
    if (url.searchParams.has('utm_source')) {
      url.searchParams.delete('utm_source');

      window.history.replaceState(
        {},
        '',
        url.pathname + url.search + url.hash
      );
    }
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