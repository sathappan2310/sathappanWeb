import * as React from "react";
import { profile } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line py-8">
      <div className="container-x flex flex-col items-center justify-between gap-2 text-sm text-muted md:flex-row">
        <div>
          © {year} {profile.name}. Built with Next.js, Tailwind &amp; Framer
          Motion.
        </div>
        <div className="font-display">
          sathappan<span className="text-accent">.</span>dev
        </div>
      </div>
    </footer>
  );
}
