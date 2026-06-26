"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { experience } from "@/lib/data";
import { SectionHeader } from "./ui/SectionHeader";

export function Experience() {
  return (
    <section id="experience" className="section bg-surface-2/40">
      <div className="container-x">
        <SectionHeader
          eyebrow="Experience"
          title={
            <>
              Where I&apos;ve <span className="text-gradient">shipped</span>
            </>
          }
          description="4+ years across SaaS, AI learning, and logistics platforms."
        />

        <div className="relative mx-auto max-w-3xl">
          {/* Gradient rail */}
          <div
            aria-hidden
            className="absolute left-[15px] top-2 bottom-2 w-px md:left-1/2 md:-translate-x-1/2"
            style={{
              background:
                "linear-gradient(180deg, rgb(var(--accent)) 0%, rgb(var(--accent) / 0.2) 60%, transparent 100%)",
            }}
          />

          <ul className="space-y-10">
            {experience.map((item, idx) => (
              <motion.li
                key={`${item.company}-${item.period}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: idx * 0.1,
                }}
                className="relative pl-12 md:pl-0"
              >
                {/* Dot */}
                <span
                  aria-hidden
                  className="absolute left-2 top-3 h-3 w-3 rounded-full bg-accent shadow-glow md:left-1/2 md:-translate-x-1/2"
                />
                <div
                  className={[
                    "md:grid md:grid-cols-2 md:gap-10",
                    idx % 2 === 0 ? "" : "",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "card-base card-hover p-6 md:p-7",
                      idx % 2 === 0 ? "md:col-start-1" : "md:col-start-2",
                    ].join(" ")}
                  >
                    <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                      {item.period}
                    </div>
                    <h3 className="heading text-xl">{item.role}</h3>
                    <div className="mt-1 text-sm text-muted">
                      {item.company}
                    </div>
                    <ul className="mt-4 space-y-2 text-sm text-text/85 leading-relaxed">
                      {item.bullets.map((b, i) => (
                        <li key={i} className="flex gap-2">
                          <span
                            aria-hidden
                            className="mt-2 h-1 w-1 flex-none rounded-full bg-accent"
                          />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
