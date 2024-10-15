'use client';

import Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return <>{children}</>;
}
