"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { awards, education } from "@/lib/data";
import { getIcon } from "@/lib/icons";
import { SectionHeader } from "./ui/SectionHeader";

export function EducationAwards() {
  return (
    <section id="education" className="section bg-surface-2/40">
      <div className="container-x">
        <SectionHeader
          eyebrow="Education & Awards"
          title={
            <>
              Learning &amp; <span className="text-gradient">recognition</span>
            </>
          }
        />

        <div className="grid gap-6 md:grid-cols-2">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="card-base card-hover p-7"
          >
            <div className="mb-5 flex items-center gap-4">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-md text-white shadow-glow"
                style={{
                  background:
                    "linear-gradient(135deg, #9B87F5 0%, #6E56CF 60%, #4C3EA8 100%)",
                }}
              >
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="heading text-xl">Education</h3>
            </div>
            <ul className="space-y-4">
              {education.map((e) => (
                <li key={e.degree}>
                  <div className="text-base font-semibold text-text">
                    {e.degree}
                  </div>
                  <div className="text-sm text-muted">{e.school}</div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-accent">
                    {e.meta}
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Awards */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
            className="card-base card-hover p-7"
          >
            <div className="mb-5 flex items-center gap-4">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-md text-white shadow-glow"
                style={{
                  background:
                    "linear-gradient(135deg, #9B87F5 0%, #6E56CF 60%, #4C3EA8 100%)",
                }}
              >
                {(() => {
                  const Icon = getIcon("Award");
                  return <Icon className="h-6 w-6" />;
                })()}
              </div>
              <h3 className="heading text-xl">Awards</h3>
            </div>
            <ul className="space-y-4">
              {awards.map((a) => {
                const Icon = getIcon(a.icon);
                return (
                  <li key={a.title} className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-md bg-accent/10 text-accent">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-base font-semibold text-text">
                        {a.title}
                      </div>
                      <div className="text-sm text-muted">{a.desc}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
