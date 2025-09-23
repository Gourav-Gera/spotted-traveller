import React from "react";
import DashboardShell from "@/components/DashboardShell";

export const metadata = {
  title: "Dashboard - Spotted",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Keep this file as a server component so `metadata` export is allowed.
  // Interactive client behavior lives inside `DashboardShell` (a client component).
  return <DashboardShell>{children}</DashboardShell>;
}
