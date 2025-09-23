"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import DashboardFooter from "./DashboardFooter";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  

  // initialize responsive state and keep in sync with resizes
  useEffect(() => {
    function applyResize() {
      // Treat widths <= 1024 as mobile/overlay: sidebar closed by default and opened via hamburger
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      if (mobile) {
        setCollapsed(false);
        setMobileOpen(false);
      } else {
        // desktop wide: expanded by default
        setCollapsed(false);
        setMobileOpen(false);
      }
    }
    applyResize();
    window.addEventListener('resize', applyResize);
    return () => window.removeEventListener('resize', applyResize);
  }, []);

  const toggle = () => setCollapsed((s) => !s);
  const toggleMobile = () => setMobileOpen((s) => !s);
  const closeMobile = () => setMobileOpen(false);

  return (
    <div className="flex bg-[#F6F7F9] min-h-screen font-gilroy">
  {/* Sidebar is always mounted; on mobile it renders an overlay that animates in/out */}
  <Sidebar collapsed={collapsed} mobileOpen={mobileOpen} onClose={closeMobile} isMobile={isMobile} />

  <div className={`flex-1 flex flex-col min-h-screen ${mobileOpen ? "overflow-hidden" : ""}`}>
        <Topbar
          onToggle={() => {
            // choose mobile vs desktop behavior (use isMobile threshold)
            if (isMobile) toggleMobile();
            else toggle();
          }}
        />

        <main className="flex-1 relative p-4 md:p-8 pb-24">
          {children}
        </main>

  {/* dashboard-only compact footer (separate from the site Footer) */}
  <DashboardFooter />
      </div>
    </div>
  );
}
