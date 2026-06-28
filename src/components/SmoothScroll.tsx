"use client";

import { ReactLenis } from 'lenis/react';
import { ReactNode } from 'react';

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.5,
        smoothWheel: true,
        // Disable on touch devices — native momentum scroll is already smooth
        // and Lenis fighting it causes scroll jank inside overflow containers
        touchMultiplier: 0,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
