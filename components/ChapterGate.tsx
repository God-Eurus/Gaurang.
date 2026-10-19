'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Transition between chapters: a huge outlined chapter number drifts past in
// parallax with a one-line narrative, fading in and out as you scroll through.
export function ChapterGate({ n, label, line }: { n: string; label: string; line: string }) {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
    const y = useTransform(scrollYProgress, [0, 1], [120, -120])
    const opacity = useTransform(scrollYProgress, [0.15, 0.45, 0.55, 0.85], [0, 1, 1, 0])
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 1.1])
    const lineY = useTransform(scrollYProgress, [0, 1], [40, -40])

    return (
        <div ref={ref} aria-hidden className="relative h-[32vh] md:h-[38vh] lg:h-[min(55vh,520px)] overflow-hidden grid place-items-center pointer-events-none select-none">
            <motion.span
                style={{ y, opacity, scale }}
                className="absolute font-bold tracking-tighter leading-none text-[42vw] md:text-[30vw] lg:text-[min(28vw,26rem)] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.12)]"
            >
                {n}
            </motion.span>
            <motion.div style={{ y: lineY, opacity }} className="relative text-center px-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-500">Chapter {n} · {label}</p>
                <p className="mt-3 text-lg md:text-2xl font-medium tracking-tight text-zinc-300">{line}</p>
            </motion.div>
        </div>
    )
}
