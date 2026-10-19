'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { projects, stack } from '@/lib/projects'

const BRIEF =
    "I'm Gaurang, a product engineer from Jaipur. I build SaaS products, websites and e-commerce platforms, and I help startups turn an idea into a product people actually use. Every mission starts as an empty sky."

// one word of the brief: dim until the scroll passes its slot, then lit
function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
    const opacity = useTransform(progress, range, [0.15, 1])
    return <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">{children}</motion.span>
}

// numeric stats tick up from zero the first time they scroll into view
function CountUp({ value }: { value: string }) {
    const ref = useRef<HTMLSpanElement>(null)
    const inView = useInView(ref, { once: true, amount: 0.8 })
    const target = Number(value)
    const [shown, setShown] = useState(Number.isNaN(target) ? value : "00")
    useEffect(() => {
        if (!inView || Number.isNaN(target)) return
        const c = animate(0, target, { duration: 1.4, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setShown(String(Math.round(v)).padStart(2, "0")) })
        return () => c.stop()
    }, [inView, target])
    return <span ref={ref} className="tabular-nums">{shown}</span>
}

// Chapter 02: leaving the atmosphere. Brief lights up as you scroll while an
// altimeter climbs to the Kármán line (100 km, where space begins).
export function MissionBrief() {
    const sectionRef = useRef<HTMLElement>(null)
    const textRef = useRef<HTMLParagraphElement>(null)
    const { scrollYProgress: textProgress } = useScroll({ target: textRef, offset: ["start 0.85", "end 0.45"] })
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] })
    const altitude = useTransform(scrollYProgress, [0.1, 0.75], [0, 100], { clamp: true })
    const altText = useTransform(altitude, (v) => String(Math.round(v)).padStart(3, "0"))
    const meter = useTransform(altitude, [0, 100], ["0%", "100%"])
    const crossed = useTransform(altitude, [95, 100], [0, 1])

    const words = BRIEF.split(" ")
    const stats = [
        { value: String(projects.length).padStart(2, "0"), label: "Missions launched" },
        { value: String(stack.length).padStart(2, "0"), label: "Technologies on board" },
        { value: "IST", label: "Base · Jaipur, India" },
        { value: "Open", label: "For new missions" },
    ]

    return (
        <section ref={sectionRef} className="relative w-full overflow-hidden py-16 md:py-24">
            {/* thin atmosphere glow at the bottom edge of the climb */}
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_70%_100%_at_50%_0%,rgba(230,240,255,0.05),transparent)]" />

            <div className="relative max-w-6xl mx-auto px-5 sm:px-8 grid gap-16 lg:grid-cols-[1fr_auto] lg:gap-24 items-start">
                <div>
                    <p className="mb-6 text-[10px] uppercase tracking-[0.35em] font-mono text-zinc-500">Chapter 02 · Ascent</p>
                    <p ref={textRef} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.2] tracking-tight text-white">
                        {words.map((w, i) => (
                            <Word key={i} progress={textProgress} range={[i / words.length, (i + 1) / words.length]}>{w}</Word>
                        ))}
                    </p>

                    {/* mission stats */}
                    <dl className="mt-16 grid grid-cols-2 md:grid-cols-4 border-t border-zinc-900">
                        {stats.map((s, i) => (
                            <motion.div
                                key={s.label}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.6 }}
                                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                                className="pt-6 pb-2 pr-4 border-zinc-900 [&:nth-child(odd)]:border-r md:border-r md:last:border-r-0 md:pl-6 md:first:pl-0 [&:nth-child(even)]:pl-4"
                            >
                                <dd className="text-3xl md:text-4xl font-bold tracking-tighter text-white"><CountUp value={s.value} /></dd>
                                <dt className="mt-2 text-[10px] uppercase tracking-[0.25em] font-mono text-zinc-500">{s.label}</dt>
                            </motion.div>
                        ))}
                    </dl>
                </div>

                {/* altimeter */}
                <div aria-hidden className="hidden lg:flex flex-col items-center gap-4 sticky top-32">
                    <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-zinc-500">Altitude</p>
                    <div className="relative h-72 w-10">
                        {Array.from({ length: 21 }, (_, i) => (
                            <span
                                key={i}
                                className={`absolute right-0 h-px bg-zinc-700 ${i % 5 === 0 ? "w-6" : "w-3"}`}
                                style={{ bottom: `${i * 5}%` }}
                            />
                        ))}
                        <div className="absolute right-8 bottom-0 w-px h-full bg-zinc-900">
                            <motion.div style={{ height: meter }} className="absolute bottom-0 inset-x-0 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                        </div>
                    </div>
                    <p className="font-mono text-3xl font-bold tracking-tighter text-white tabular-nums">
                        <motion.span>{altText}</motion.span>
                        <span className="ml-1 text-sm text-zinc-500">km</span>
                    </p>
                    <motion.p style={{ opacity: crossed }} className="max-w-[9rem] text-center font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-400">
                        Kármán line crossed. Welcome to space.
                    </motion.p>
                </div>
            </div>
        </section>
    )
}
