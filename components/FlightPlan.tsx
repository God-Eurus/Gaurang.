'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Rocket } from 'lucide-react'

const STEPS = [
    { title: "Brief", body: "We talk goals, audience and constraints. I map what success looks like before a pixel moves.", tags: ["Goals", "Sitemap", "Scope"] },
    { title: "Blueprint", body: "Wireframes, motion ideas and a visual direction you can react to early, while changes are cheap.", tags: ["Wireframes", "Moodboard", "Prototype"] },
    { title: "Build", body: "Production code in Next.js or a custom Shopify theme: fast, accessible and easy for your team to edit.", tags: ["Next.js", "Shopify", "CMS"] },
    { title: "Launch", body: "Deploy, test on real devices, hand over, and stay on call for whatever the next mission is.", tags: ["Deploy", "QA", "Support"] },
]

// Chapter 05: how a project runs. The flight path draws itself with scroll and a
// rocket rides its tip.
export function FlightPlan() {
    const pathRef = useRef<HTMLOListElement>(null)
    const { scrollYProgress } = useScroll({ target: pathRef, offset: ["start 0.7", "end 0.6"] })
    const top = useTransform(scrollYProgress, (v) => `${v * 100}%`)

    return (
        <section className="relative w-full overflow-hidden py-12 md:py-24">
            <div className="max-w-5xl mx-auto px-5 sm:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-10 md:mb-24 text-center"
                >
                    <p className="mb-4 text-[10px] uppercase tracking-[0.35em] font-mono text-zinc-500">Chapter 05 · Flight plan</p>
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter uppercase text-transparent bg-clip-text bg-linear-to-b from-white to-white/40">
                        How a mission runs
                    </h2>
                    <p className="mt-3 md:mt-5 mx-auto max-w-md text-sm md:text-base text-zinc-400 leading-relaxed">From first message to lift-off, four stages and no surprises.</p>
                </motion.div>

                <ol ref={pathRef} className="relative">
                    {/* flight path: faint track, lit part grows with scroll, rocket at the tip */}
                    <div aria-hidden className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-zinc-900" />
                    <motion.div aria-hidden style={{ scaleY: scrollYProgress }} className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 origin-top bg-linear-to-b from-white/20 via-white/70 to-white" />
                    <motion.div aria-hidden style={{ top }} className="absolute left-4 md:left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 grid place-items-center w-7 h-7 md:w-9 md:h-9 rounded-full bg-black border border-zinc-700 shadow-[0_0_24px_rgba(255,255,255,0.25)]">
                        <Rocket className="w-3 h-3 md:w-4 md:h-4 text-white rotate-135" />
                    </motion.div>

                    {STEPS.map((step, i) => {
                        const right = i % 2 === 1
                        return (
                            <li key={step.title} className="relative grid md:grid-cols-2 md:gap-16 pl-10 md:pl-0 pb-9 md:pb-16 last:pb-0">
                                {/* waypoint */}
                                {/* waypoint + step light up once they cross the rocket's line, dim again above it */}
                                <motion.span
                                    aria-hidden
                                    className="absolute left-4 md:left-1/2 top-1.5 -translate-x-1/2 w-2.5 h-2.5 rounded-full ring-4 ring-black"
                                    initial={{ backgroundColor: "#27272a", boxShadow: "0 0 0px rgba(255,255,255,0)", scale: 1 }}
                                    whileInView={{ backgroundColor: "#ffffff", boxShadow: "0 0 16px rgba(255,255,255,0.9)", scale: 1.4 }}
                                    viewport={{ margin: "0px 0px -38% 0px" }}
                                    transition={{ duration: 0.4 }}
                                />
                                <motion.div
                                    initial={{ opacity: 0.25, x: right ? 24 : -24 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ margin: "0px 0px -38% 0px" }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    className={right ? "md:col-start-2" : "md:text-right"}
                                >
                                    <p className="font-mono text-xs text-zinc-600">{String(i + 1).padStart(2, "0")}</p>
                                    <h3 className="mt-0.5 md:mt-1 text-lg md:text-3xl font-bold tracking-tight text-white">{step.title}</h3>
                                    <p className="mt-1.5 md:mt-3 text-sm md:text-base text-zinc-400 leading-relaxed">{step.body}</p>
                                    <ul className={`mt-2.5 md:mt-4 flex flex-wrap gap-1.5 md:gap-2 ${right ? "" : "md:justify-end"}`}>
                                        {step.tags.map((t) => (
                                            <li key={t} className="rounded-full border border-zinc-800 px-2 py-0.5 md:px-2.5 md:py-1 font-mono text-[9px] md:text-[10px] uppercase tracking-wider md:tracking-widest text-zinc-400">{t}</li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </li>
                        )
                    })}
                </ol>
            </div>
        </section>
    )
}
