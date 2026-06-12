"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

/**
 * Renders children into document.body, escaping any ancestor stacking context
 * (e.g. the page <main> which has `relative z-10`). Required for full-screen
 * overlays/modals so they layer above the fixed HUD chrome (TopBar, nav).
 */
export function Portal({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;
  return createPortal(children, document.body);
}
