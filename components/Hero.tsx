"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { profile } from "@/lib/data";
import { Button } from "./ui/Button";
import { Chip } from "./ui/Chip";

const floatChip = (delay: number) => ({
  initial: { y: 0 },
  animate: { y: [0, -14, 0] },
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut",
    delay,
  },
});

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 md:pt-40 pb-20 md:pb-28"
    >
      {/* Background glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-24 h-[560px] w-[560px] rounded-full blur-3xl opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(155,135,245,0.35) 0%, rgba(155,135,245,0) 65%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-24 h-[500px] w-[500px] rounded-full blur-3xl opacity-50"
        style={{
          background:
            "radial-gradient(circle, rgba(124,107,217,0.35) 0%, rgba(124,107,217,0) 65%)",
        }}
      />

      <div className="container-x relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {profile.available && (
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-medium text-muted">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Available for new opportunities
              </div>
            )}

            <h1 className="heading text-4xl leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl">
              Hi, I&apos;m{" "}
              <span className="text-gradient">{profile.shortName}</span>
              <br />
              <span className="text-text">— I craft </span>
              <span className="text-gradient">scalable web experiences</span>
              <span className="text-text">.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base md:text-lg text-muted leading-relaxed">
              {profile.summary}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#projects" size="lg">
                View My Work
              </Button>
              <Button href={`mailto:${profile.email}`} variant="ghost" size="lg">
                Get in Touch
              </Button>
            </div>
          </motion.div>

          {/* Right — avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="relative mx-auto flex h-[320px] w-[320px] items-center justify-center sm:h-[360px] sm:w-[360px] lg:h-[400px] lg:w-[400px]"
          >
            {/* Rotating dashed ring */}
            <div
              aria-hidden
              className="absolute inset-0 animate-spin-slow rounded-full border-2 border-dashed border-accent/40"
            />

            {/* Avatar */}
            <div
              className="relative flex h-[260px] w-[260px] items-center justify-center rounded-full shadow-glow-lg sm:h-[300px] sm:w-[300px] lg:h-[340px] lg:w-[340px]"
              style={{
                background:
                  "linear-gradient(135deg, #9B87F5 0%, #6E56CF 60%, #4C3EA8 100%)",
              }}
            >
              <span className="font-display text-[140px] font-bold leading-none text-white drop-shadow-lg sm:text-[160px] lg:text-[180px]">
                S
              </span>
            </div>

            {/* Floating chips */}
            <motion.div
              {...floatChip(0)}
              className="absolute -left-2 top-8 sm:-left-6"
            >
              <Chip variant="glass" className="px-3.5 py-2 text-sm">
                React.js Expert
              </Chip>
            </motion.div>
            <motion.div
              {...floatChip(1.5)}
              className="absolute -right-4 top-1/2 sm:-right-8"
            >
              <Chip variant="glass" className="px-3.5 py-2 text-sm">
                Next.js Pro
              </Chip>
            </motion.div>
            <motion.div
              {...floatChip(3)}
              className="absolute bottom-6 left-6 sm:bottom-2 sm:left-2"
            >
              <Chip variant="glass" className="px-3.5 py-2 text-sm">
                TypeScript
              </Chip>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {profile.stats.map((s) => (
            <div
              key={s.label}
              className="card-base flex flex-col items-center justify-center p-7 text-center"
            >
              <div className="heading text-4xl text-gradient">{s.value}</div>
              <div className="mt-2 text-sm text-muted">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
