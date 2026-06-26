"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Github } from "lucide-react";
import { profile } from "@/lib/data";
import { SectionHeader } from "./ui/SectionHeader";

const contactButtons = [
  {
    label: "Email",
    Icon: Mail,
    get href() {
      return `mailto:${profile.email}`;
    },
    value: profile.email,
  },
  {
    label: "Phone",
    Icon: Phone,
    get href() {
      return `tel:${profile.phone.replace(/\s+/g, "")}`;
    },
    value: profile.phone,
  },
  {
    label: "LinkedIn",
    Icon: Linkedin,
    get href() {
      return profile.links.linkedin;
    },
    value: "linkedin.com/in/sathappan2310",
  },
  {
    label: "GitHub",
    Icon: Github,
    get href() {
      return profile.links.github;
    },
    value: "github.com/sathappan2310",
  },
];

export function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container-x">
        <SectionHeader
          eyebrow="Contact"
          title={
            <>
              Let&apos;s build something{" "}
              <span className="text-gradient">great.</span>
            </>
          }
          description="Open to full-time roles, contract work and interesting collaborations."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-lg p-8 shadow-glow-lg md:p-14"
          style={{
            background:
              "linear-gradient(135deg, #9B87F5 0%, #6E56CF 60%, #4C3EA8 100%)",
          }}
        >
          {/* Radial light overlay */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(80% 60% at 20% 20%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 60%)",
            }}
          />

          <div className="relative">
            <h3 className="heading text-3xl text-white md:text-4xl lg:text-5xl">
              Have a project in mind?
            </h3>
            <p className="mt-3 max-w-xl text-base text-white/85 md:text-lg">
              I&apos;m {profile.available ? "available" : "open"} for new
              opportunities. Reach out on any of these and I&apos;ll get back
              within 24 hours.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {contactButtons.map(({ label, Icon, href, value }) => {
                const isExternal = href.startsWith("http");
                return (
                  <a
                    key={label}
                    href={href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer" : undefined}
                    className="group flex flex-col items-start gap-3 rounded-md border border-white/20 bg-white/10 p-5 text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white/15"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-md bg-white/20">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-white/70">
                        {label}
                      </div>
                      <div className="mt-0.5 break-all text-sm font-medium">
                        {value}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
