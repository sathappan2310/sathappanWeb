"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { profile } from "@/lib/data";
import { getIcon } from "@/lib/icons";
import { SectionHeader } from "./ui/SectionHeader";

export function About() {
  return (
    <section id="about" className="section">
      <div className="container-x">
        <SectionHeader
          eyebrow="About"
          title={
            <>
              Engineer who turns ideas into{" "}
              <span className="text-gradient">polished products</span>
            </>
          }
        />

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left bio card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="card-base relative overflow-hidden p-8 md:p-10"
            style={{
              background:
                "linear-gradient(135deg, rgb(var(--surface)) 0%, rgb(var(--surface-2)) 100%)",
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full blur-3xl opacity-50"
              style={{
                background:
                  "radial-gradient(circle, rgba(155,135,245,0.45) 0%, rgba(155,135,245,0) 70%)",
              }}
            />
            <div className="relative">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                {profile.role}
              </div>
              <div className="space-y-5 text-base md:text-lg text-text/90 leading-relaxed">
                {profile.bio.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right highlights */}
          <div className="flex flex-col gap-5">
            {profile.highlights.map((h, idx) => {
              const Icon = getIcon(h.icon);
              return (
                <motion.div
                  key={h.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                    delay: idx * 0.1,
                  }}
                  className="card-base card-hover flex items-start gap-5 p-6"
                >
                  <div
                    className="flex h-12 w-12 flex-none items-center justify-center rounded-md text-white shadow-glow"
                    style={{
                      background:
                        "linear-gradient(135deg, #9B87F5 0%, #6E56CF 60%, #4C3EA8 100%)",
                    }}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="heading text-lg">{h.title}</h3>
                    <p className="mt-1 text-sm text-muted leading-relaxed">
                      {h.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
