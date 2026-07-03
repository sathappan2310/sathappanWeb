"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { projects } from "@/lib/data";
import { SectionHeader } from "./ui/SectionHeader";
import { Chip } from "./ui/Chip";

export function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container-x">
        <SectionHeader
          eyebrow="Projects"
          title={
            <>
              Selected <span className="text-gradient">work</span>
            </>
          }
          description="A few products I've helped design, build and ship."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((p, idx) => (
            <motion.a
              key={p.slug}
              href={p.href}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: idx * 0.1,
              }}
              className={`group card-base relative overflow-hidden p-0 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glow hover:border-accent/60 ${
                p.featured
                  ? "lg:col-span-2 border-accent/40 shadow-glow"
                  : ""
              }`}
            >
              {p.featured && (
                <span className="absolute right-4 top-4 z-10 inline-flex items-center gap-1 rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-xs font-semibold text-accent backdrop-blur">
                  <Sparkles className="h-3.5 w-3.5" /> Featured · Live
                </span>
              )}

              {/* Gradient top bar */}
              <div className="h-1 w-full bg-brand-gradient" />

              {/* Cover */}
              <div
                className="relative flex h-44 items-center justify-center overflow-hidden md:h-48"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(155,135,245,0.18) 0%, rgba(76,62,168,0.28) 100%)",
                }}
              >
                <span
                  aria-hidden
                  className="font-display text-[80px] font-extrabold tracking-tight text-white/8 md:text-[110px]"
                  style={{ color: "rgba(255,255,255,0.08)" }}
                >
                  {p.codename}
                </span>
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-10 -right-10 h-44 w-44 rounded-full blur-3xl"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(155,135,245,0.4) 0%, rgba(155,135,245,0) 70%)",
                  }}
                />
              </div>

              <div className="p-6 md:p-7">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="heading text-xl md:text-2xl">{p.name}</h3>
                  <ArrowUpRight className="h-6 w-6 flex-none text-accent transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
                <p className="mt-2 text-sm text-muted leading-relaxed md:text-base">
                  {p.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                </div>
                {p.internal && (
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    Explore SkillNest
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                )}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
