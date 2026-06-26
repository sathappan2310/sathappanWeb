"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { skills } from "@/lib/data";
import { SectionHeader } from "./ui/SectionHeader";
import { Chip } from "./ui/Chip";

export function Skills() {
  return (
    <section id="skills" className="section relative">
      <div className="container-x">
        <SectionHeader
          eyebrow="Skills"
          title={
            <>
              The <span className="text-gradient">tools</span> I build with
            </>
          }
          description="A focused toolkit honed across SaaS, dashboards and AI products."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((group, idx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: idx * 0.08,
              }}
              className="card-base card-hover p-6"
            >
              <div className="mb-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <h3 className="heading text-base">{group.category}</h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <Chip>{item}</Chip>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
