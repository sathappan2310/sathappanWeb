"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/data";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/Button";
import { cn } from "@/lib/cn";

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "backdrop-blur-xl bg-bg/70 border-b border-line"
          : "bg-transparent",
      )}
    >
      <div className="container-x flex h-16 items-center justify-between md:h-[72px]">
        <Link
          href="#top"
          className="font-display text-lg font-bold tracking-tight"
          aria-label="sathappan.dev home"
        >
          sathappan<span className="text-accent">.</span>dev
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-text"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <ThemeToggle />
          <Button href="#contact" size="md" className="hidden md:inline-flex">
            Hire Me <span aria-hidden>→</span>
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-text md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        className={cn(
          "md:hidden overflow-hidden border-line transition-[max-height,opacity] duration-300 ease-out",
          open
            ? "max-h-[400px] opacity-100 border-t bg-bg/95 backdrop-blur-xl"
            : "max-h-0 opacity-0",
        )}
      >
        <nav className="container-x flex flex-col gap-1 py-4">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={close}
              className="rounded-md px-3 py-3 text-base text-text transition-colors hover:bg-surface-2"
            >
              {l.label}
            </a>
          ))}
          <Button href="#contact" size="md" className="mt-2 self-start" >
            Hire Me <span aria-hidden>→</span>
          </Button>
        </nav>
      </div>
    </header>
  );
}
