import * as React from 'react';

const MOBILE_BREAKPOINT = 768;

/**
 * Mobile detection hook
 * 
 * Detects if the current viewport is mobile-sized (width < 768px).
 * Uses window.matchMedia for responsive detection and updates on resize.
 * 
 * @returns boolean - True if viewport is mobile-sized, false otherwise
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener('change', onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return !!isMobile;
}
